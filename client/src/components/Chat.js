import React, { useState, useEffect } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { useParams } from 'react-router-dom';
import '../styles/Chat.css'



function ChatPage({ currentUser, recipentUserName, recipientUser }) {
  const [messages, setMessages] = useState([]);
  const [myUserName, setMyUserName] = useState([]);
  const { userId, username } = useParams();
  const [image, setImage] = useState("");

  recipentUserName = username;
  recipientUser= userId;
  currentUser = localStorage.getItem("id");
  
  useEffect(() => {
    fetchMessages();
    fetchImage();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await  fetch(`http://localhost:4000/chat/getData/${localStorage.getItem("id")}/${recipientUser}`);
      const fetchedMessages = await response.json();
      
      const chatMessages = fetchedMessages.chat.map(message => message);
      const user = fetchedMessages.username;
      const user2 = fetchedMessages.username2;
      if(user == recipentUserName){
        setMyUserName(user2);
      }else{
        setMyUserName(user)
      }

      setMessages(chatMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const fetchImage = async () => {
    try {
      const response = await fetch(`http://localhost:4000/images/getData/${recipientUser}`); 
      const imageData = await response.json(); 

      // Convert the data array to a Uint8Array
      const uint8Array = new Uint8Array(imageData.buffer.data);

      // Convert the Uint8Array to a Base64 string
      const base64String = uint8Array.reduce((data, byte) => data + String.fromCharCode(byte), '');
      const imageUrl = `data:${imageData.mimetype};base64,${btoa(base64String)}`; 
      setImage(imageUrl);
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };

  const handleSendMessage = async (text) => {
    try {
        const response = await fetch('http://localhost:4000/chat/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: recipientUser,
          chat: text
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="chat-page">
      <div className="profile-info">
        {image ? (
          <img className='profileImage' src={image} alt='Profile' />
        ) : null}
        <h1 className="profile-name">{recipentUserName}</h1>
      </div>
      <MessageList messages={messages} currentUser={currentUser} receiverName={recipentUserName} currentUserName={myUserName}/>
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
}


export default ChatPage;
