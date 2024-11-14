import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdDelete, MdEdit } from 'react-icons/md';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { format, differenceInMonths } from 'date-fns'; // For date formatting and comparison

const MessagePage = () => {
  const [userProfiles, setUserProfiles] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentConversation, setCurrentConversation] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [interactedUsers, setInteractedUsers] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const currentUserId = localStorage.getItem('session_id');
  console.log('Current User ID:', currentUserId);
    function formatDate(dateString) {
    try {
        let date;

        // Check if dateString is a Date object, an array, or a string
        if (Array.isArray(dateString)) {
            // If it's an array, construct a new Date object directly
            const [year, month, day, hours, minutes, seconds] = dateString;
            date = new Date(year, month - 1, day, hours, minutes, seconds);
        } else if (typeof dateString === 'string') {
            // If it's a string, ensure it can be parsed
            date = new Date(dateString.replace(' ', 'T').split('.')[0]);
        } else if (dateString instanceof Date) {
            // If it's already a Date object, use it directly
            date = dateString;
        } else {
            console.warn('Unexpected date format:', dateString);
            return "Invalid Date"; // Return "Invalid Date" for an unexpected format
        }

        // Check if the resulting date is valid
        if (isNaN(date.getTime())) {
            return "Invalid Date";
        }

        // Return formatted date string in "MM/DD/YYYY, HH:MM:SS" format
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
    } catch (error) {
        console.error('Error parsing date:', error, '\nOriginal date string:', dateString);
        return "Invalid Date"; // Return "Invalid Date" in case of an error
    }
}


  
  // Fetch all messages
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/messages', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.error('Error fetching messages:', error);
      });
  }, []);

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
          image: user.photoUrl || 'default-image-url.jpg',
          name: `${user.firstname} ${user.lastname}`,
          id: user.id,
        }));
        setUserProfiles(fetchedUsers);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const interactedUserProfiles = userProfiles.filter((user) =>
    messages.some((message) =>
    (String(message.sender) === String(currentUserId) && String(message.receiver) === String(user.id)) ||
  (String(message.receiver) === String(currentUserId) && String(message.sender) === String(user.id))
    )
  );

  // Handle user selection and fetch conversation with that user
  const handleSelectUser = (user) => {
    setSelectedUser(user);
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
        setCurrentConversation(response.data);
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
            sender: currentUserId,
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
        `http://localhost:8080/api/messages/edit/${messageId}`,
        newText,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'text/plain',
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
            <h2 className="text-xl mb-4 text-center">All Users</h2>
            <div className="flex flex-col space-y-2">
            {interactedUserProfiles.map((user) => (
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
                    src={user.image}
                    alt="User"
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <span className="text-md">{user.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Middle panel for conversations */}
          <div className="flex-1 flex flex-col">
            {selectedUser && (
              <div className="flex-1 overflow-y-auto p-4 bg-neutral-900">
                <div className="flex items-center mb-4">
                  <img
                    src={selectedUser.image}
                    alt=""
                    className="w-12 h-12 rounded-full"
                  />
                  <span className="text-xl ml-4">
                    {selectedUser.name.toUpperCase()}
                    {selectedUser.id}
                  </span>
                </div>
                {currentConversation
   .filter((message) =>
   (String(message.sender) === String(currentUserId) && String(message.receiver) === String(selectedUser.id)) ||
   (String(message.sender) === String(selectedUser.id) && String(message.receiver) === String(currentUserId))
 )
  .map((message, index) => (
    <div
      key={index}
      className={`flex ${
        message.sender === currentUserId ? 'justify-end' : 'justify-start'
      } mb-4`}
    >
      <div
        className="p-5 rounded-2xl"
        style={{
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)',
          backgroundColor: '#AEC90A',
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

          {/* Right panel for interacted users */}
        {/* Right panel for messages table */}
          <div className="w-1/6 p-2 custom-3d-shadow rounded-2xl overflow-y-auto">
            <h2 className="text-xl mb-4 text-center">All Messages</h2>
            <table className="min-w-full bg-neutral-800 rounded-lg text-white">
              <thead>
                <tr>
                  <th className="p-2">Sender</th>
                  <th className="p-2">Receiver</th>
                  <th className="p-2">Message</th>
                  <th className="p-2">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((message) => (
                  <tr key={message.id}>
                    <td className="p-2">{message.sender}</td>
                    <td className="p-2">{message.receiver}</td>
                    <td className="p-2">{message.content}</td>
                    <td className="p-2">{formatDate(message.timestamp)}</td> {/* Usage of formatDate */}
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagePage;
