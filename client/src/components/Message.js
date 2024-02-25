import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Message.css';


function ChatList() {
    const [chats, setChats] = useState([]);

    useEffect(() => {
      fetchChats();
    }, []);
  
    const fetchChats = async () => {
      try {
        const response = await fetch(`http://localhost:4000/chat/${localStorage.getItem("id")}`);
        const data = await response.json();
        setChats(data);
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };
  

  
    return (
      <div className="ChatListContainer">
      <h1>Chat List</h1>
      <table className="ChatListTable">
        <thead>
          <tr>
            <th>User</th>
            <th>Last Message</th>
          </tr>
        </thead>
        <tbody>
          {chats.map(chat => (
            <tr key={chat._id}>
              <td>
                {chat.user[0] === localStorage.getItem("id") ? (
                  <Link className="ChatUserName" to={`/chat/${chat.user2[0]}/${chat.username2}`}>{chat.username2}</Link>
                ) : (
                  <Link className="ChatUserName" to={`/chat/${chat.user[0]}/${chat.username}`}>{chat.username}</Link>
                )}
              </td>
              <td className="LastMessage">
                {chat.chat[0] && chat.chat[0].message !== undefined ? (
                  chat.chat[chat.chat.length - 1].message
                ) : (
                  chat.chat[0]
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>    
    );
  };
  
  
  export default ChatList;
  