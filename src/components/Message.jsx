
// export default MessagePage;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdDelete, MdEdit } from 'react-icons/md';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const MessagePage = () => {
  const [userProfiles, setUserProfiles] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentConversation, setCurrentConversation] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  const currentUserId = localStorage.getItem('session_id'); // Using session_id as the logged-in user ID

  // Fetch users
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        const fetchedUsers = response.data.map((user) => ({
          image: user.photoUrl || 'default-image-url.jpg', // Handle missing images
          name: `${user.firstname} ${user.lastname}`,
          id: user.id,
        }));
        setUserProfiles(fetchedUsers);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  // Handle user selection and fetch conversation with that user
  const handleSelectUser = (user) => {
    setSelectedUser(user);
    
    // Fetch messages between current user and the selected user
    axios
      .get('http://localhost:8080/api/messages', {
        params: {
          senderId: currentUserId, 
          receiverId: user.id,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        setCurrentConversation(response.data); // Set the conversation for the selected user
      })
      .catch((error) => {
        console.error('Error fetching conversation:', error);
      });
  };

  // Handle sending a new message
  const handleSendMessage = () => {
    if (newMessage.trim() && selectedUser) {
      axios
        .post(
          'http://localhost:8080/api/messages/send',
          {
            sender: currentUserId, // Use session_id for current logged-in user
            receiver: selectedUser.id,
            content: newMessage,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        .then((response) => {
          setCurrentConversation((prevConversation) => [
            ...prevConversation,
            response.data,
          ]);
          setNewMessage('');
        })
        .catch((error) => {
          console.error('Error sending message:', error);
        });
    }
  };

  // Handle deleting a message
  const handleDeleteMessage = (messageId) => {
    axios
      .delete(`http://localhost:8080/api/messages/delete/${messageId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(() => {
        setCurrentConversation((prevConversation) =>
          prevConversation.filter((msg) => msg.id !== messageId)
        );
      })
      .catch((error) => {
        console.error('Error deleting message:', error);
      });
  };

  const handleEditMessage = (messageId, newText) => {
    axios
      .put(
        `http://localhost:8080/api/messages/edit/${messageId}`, // Ensure the correct endpoint
        newText, // This sends just the string `newText`
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'text/plain', // Ensure the content type is set to plain text
          },
        }
      )
      .then((response) => {
        setCurrentConversation((prevConversation) =>
          prevConversation.map((msg) =>
            msg.id === messageId ? { ...msg, content: newText } : msg
          )
        );
      })
      .catch((error) => {
        console.error('Error editing message:', error);
      });
  };

  return (
    <div className="flex h-screen">
      <Sidebar className="flex-shrink-0" />
      <div className="flex-1 flex flex-col">
        <Navbar className="sticky top-0 z-10 bg-neutral-900 text-white" />
        <div className="flex h-screen bg-neutral-900 p-1 text-white overflow-y-auto">
          {/* Left panel for users */}
          <div className="w-1/6 p-2 custom-3d-shadow rounded-2xl overflow-y-auto">
            <h2 className="text-xl mb-4 text-center">Messages</h2>
            <div className="flex flex-col space-y-2">
              {userProfiles.map((user) => (
                <div
                  key={user.id}
                  className={`relative flex items-center p-2 rounded-lg cursor-pointer ${
                    selectedUser?.id === user.id
                      ? 'border-[#AEC90A] bg-opacity-50 bg-black text-white'
                      : 'border-[#AEC90A]'
                  }`}
                  onClick={() => handleSelectUser(user)}
                  style={{
                    boxShadow:
                      '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <img
                    src={user.image || 'default-image-url.jpg'}
                    alt="User"
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <span className="text-md">{user.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right panel for messages */}
          <div className="flex-1 flex flex-col">
            {selectedUser && (
              <div className="flex-1 overflow-y-auto p-4 bg-neutral-900">
                {/* Display selected user's name and image */}
                <div className="flex items-center mb-4">
                  <img
                    src={selectedUser.image || 'default-image-url.jpg'}
                    alt=""
                    className="w-12 h-12 rounded-full"
                  />
                  <span className="text-xl ml-4">
                    {selectedUser.name.toUpperCase()}
                  </span>
                </div>
                {/* Display conversation */}
                <div>
                  {currentConversation.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        message.sender === currentUserId
                          ? 'justify-end'
                          : 'justify-start'
                      } mb-4`}
                    >
                      <div
                        className="p-5 rounded-2xl"
                        style={{
                          boxShadow:
                            '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)',
                          backgroundColor: '#90a50d',
                          color: 'black' 
                        }}
                      >
                        <p>{message.content}</p>
                        {message.sender === currentUserId && (
                          <div className="flex mt-2">
                            <button
                              onClick={() =>
                                handleEditMessage(
                                  message.id,
                                  prompt('Edit message:', message.content)
                                )
                              }
                              aria-label="Edit message"
                            >
                              <MdEdit className="text-black" />
                            </button>
                            <button
                              onClick={() => handleDeleteMessage(message.id)}
                              aria-label="Delete message"
                            >
                              <MdDelete className="text-black" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                {/* Input box for sending messages */}
                <div className="p-4 bg-neutral-900 flex items-center p-5">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 p-5 rounded-lg bg-neutral-900 text-white"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="p-2 rounded-full bg-[#AEC90A] ml-4"
                  >
                    Send
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagePage;
