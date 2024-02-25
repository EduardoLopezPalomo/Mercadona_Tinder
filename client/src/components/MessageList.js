import React from 'react';

function MessageList({ messages, currentUser, currentUserName, receiverName }) {
  return (
    <div className="message-list">
      {messages.map((message, index) => (
        <div key={index} className={message.sender === currentUser ? 'sent-message' : 'received-message'}>
          <p>{message.message}</p>
          <span>{message.sender === currentUser ? receiverName : currentUserName}</span>
        </div>
      ))}
    </div>
  );
}



export default MessageList;
