'use client';
import React, { useEffect, useState,useRef,useContext } from 'react';
import * as signalR from '@microsoft/signalr';
import apicall from '@/agent/ApiCall';
import { getUser } from '@/utility/user';
import { PageContext } from '@/context/pageContext';

const Chat = () => {
  const { messages, setMessages } = useContext(PageContext);
  const user = getUser()?.name || "no one";
  const [message, setMessage] = useState('');
  const [connection, setConnection] = useState(null);
  const bottomRef = useRef(null); 

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(process.env.NEXT_PUBLIC_API_URL_CHATHUB) 
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection.start()
        .then(() => {
          console.log('Connected to SignalR hub');

          connection.on('ReceiveMessage', (user, message) => {
            setMessages(prev => [...prev, { user, message }]);
          });
        })
        .catch(error => console.error('SignalR Connection Error:', error));

      return () => {
        connection.stop();
      };
    }
  }, [connection]);

  

  const sendMessage = () => {
    apicall.chat.sendMessage(user, message)
      .then(() => setMessage(''))
  };


  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow-md rounded-md">
     <div className="h-96 overflow-y-auto border border-gray-200 p-4 mb-4 rounded-md bg-gray-50">
  {messages.map((msg, index) => {
    const isOwnMessage = msg.user === user;
    return (
      <div
        key={index}
        className={`mb-2 flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
      >
        <div
          className={`px-4 py-2 rounded-lg max-w-xs break-words ${
            isOwnMessage
              ? 'bg-blue-500 text-white rounded-br-none'
              : 'bg-gray-200 text-gray-800 rounded-bl-none'
          }`}
        >
          <span className="block text-sm font-semibold">{msg.user}</span>
          <span className="block">{msg.message}</span>
        </div >
      </div>
    );
  })}
  <div ref={bottomRef} />
</div >

      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
    if (e.key === 'Enter' && message.trim() !== '') {
      sendMessage();
    }
  }}

          placeholder="Type your message..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
