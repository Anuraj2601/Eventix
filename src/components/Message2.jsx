import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const MessagePage = () => {
  const [messages, setMessages] = useState([]);
  const currentUserId = localStorage.getItem('session_id'); // Using session_id as the logged-in user ID

  // Fetch messages for the current user
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/messages', {
        params: {
          userId: currentUserId, // Assuming this is how you fetch messages
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        setMessages(response.data); // Set the fetched messages
      })
      .catch((error) => {
        console.error('Error fetching messages:', error);
      });
  }, [currentUserId]);

  return (
    <div className="flex h-screen">
      <Sidebar className="flex-shrink-0" />
      <div className="flex-1 flex flex-col">
        <Navbar className="sticky top-0 z-10 bg-neutral-900 text-white" />
        <div className="flex h-screen bg-neutral-900 p-1 text-white overflow-y-auto">
          {/* Left panel for message list */}
          <div className="w-1/6 p-2 custom-3d-shadow rounded-2xl overflow-y-auto">
            <h2 className="text-xl mb-4 text-center">
              Messages (Current User ID: {currentUserId}) {/* Display current user ID here */}
            </h2>

            {/* Display messages in a table format */}
            <table className="min-w-full table-auto bg-neutral-800 text-white">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b">Message ID</th>
                  <th className="px-4 py-2 border-b">Sender ID</th>
                  <th className="px-4 py-2 border-b">Receiver ID</th>
                  <th className="px-4 py-2 border-b">Content</th>
                  <th className="px-4 py-2 border-b">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((message) => (
                  <tr key={message.id}>
                    <td className="px-4 py-2 border-b">{message.id}</td>
                    <td className="px-4 py-2 border-b">{message.sender}</td>
                    <td className="px-4 py-2 border-b">{message.receiver}</td>
                    <td className="px-4 py-2 border-b">{message.content}</td>
                    <td className="px-4 py-2 border-b">{message.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Right panel for further details (empty in this case) */}
          <div className="flex-1 flex flex-col"></div>
        </div>
      </div>
    </div>
  );
};

export default MessagePage;
