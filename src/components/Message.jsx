import React, { useState, useEffect,useRef } from 'react';
import axios from 'axios';
import { MdDelete, MdEdit } from 'react-icons/md';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { format, differenceInMonths } from 'date-fns'; // For date formatting and comparison

const MessagePage = () => {
  const [userProfiles, setUserProfiles] = useState([]);
  const [InteractedUserProfiles, setInteractedUserProfiles] = useState([]);

  const [messages, setMessages] = useState([]);
  const [currentConversation, setCurrentConversation] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [messageToEdit, setMessageToEdit] = useState('');
  const [messageToEditId, setMessageToEditId] = useState(null); // For tracking the message being edited
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [messageToDeleteId, setMessageToDeleteId] = useState(null); // For tracking message to delete
  const messageEndRef = useRef(null); 
  const currentUserId = localStorage.getItem('session_id');
  const [showUsers, setShowUsers] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');


 const filterUsers = (users) => {
  if (!searchQuery) return users;  // If no search query, return all users
  return users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
};

// Users to display: first show searched users, if search is empty or has no results, show interacted users
const usersToDisplay = searchQuery
  ? filterUsers(userProfiles).length > 0  // Check if there are matching users
    ? filterUsers(userProfiles)          // If there are, show those
    : []                                  // If no matches, show an empty array
  : InteractedUserProfiles;               // If no search query, show interacted users



  console.log('Current User ID:', currentUserId);

  // Function to format date as MM/DD/YYYY, HH:MM:SS
  function formatDate(dateString) {
    try {
      let date;
      if (Array.isArray(dateString)) {
        const [year, month, day, hours, minutes, seconds] = dateString;
        date = new Date(year, month - 1, day, hours, minutes, seconds);
      } else if (typeof dateString === 'string') {
        date = new Date(dateString.replace(' ', 'T').split('.')[0]);
      } else if (dateString instanceof Date) {
        date = dateString;
      } else {
        console.warn('Unexpected date format:', dateString);
        return 'Invalid Date';
      }
      if (isNaN(date.getTime())) {
        return 'Invalid Date';
      }
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
    } catch (error) {
      console.error('Error parsing date:', error, '\nOriginal date string:', dateString);
      return 'Invalid Date';
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
    messages.some(
      (message) =>
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



const handleOpenEditDialog = (messageId, content) => {
  setMessageToEdit(content);
  setMessageToEditId(messageId);
  setIsEditDialogOpen(true);
};

// Trigger the delete dialog
const handleOpenDeleteDialog = (messageId) => {
  setMessageToDeleteId(messageId);
  setIsDeleteDialogOpen(true);
};

const handleDeleteMessage = () => {
  axios
    .delete(`http://localhost:8080/api/messages/delete/${messageToDeleteId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then(() => {
      setCurrentConversation((prevConversation) =>
        prevConversation.filter((msg) => msg.id !== messageToDeleteId)
      );
      setIsDeleteDialogOpen(false); // Close the delete dialog after deleting
    })
    .catch((error) => {
      console.error('Error deleting message:', error);
    });
};

const handleSaveEdit = () => {
  if (messageToEdit.trim()) {
    axios
      .put(
        `http://localhost:8080/api/messages/edit/${messageToEditId}`,
        messageToEdit,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'text/plain',
          },
        }
      )
      .then(() => {
        setCurrentConversation((prevConversation) =>
          prevConversation.map((msg) =>
            msg.id === messageToEditId ? { ...msg, content: messageToEdit } : msg
          )
        );
        setIsEditDialogOpen(false); // Close the edit dialog after saving
      })
      .catch((error) => {
        console.error('Error editing message:', error);
      });
  }
};

useEffect(() => {
  if (messageEndRef.current) {
    messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }
}, [currentConversation]);

return (
  <div className="flex h-screen">
    <Sidebar className="flex-shrink-0" />
    <div className="flex-1 flex flex-col">
      <Navbar className="sticky top-0 z-10 bg-neutral-900 text-white" />
      <div className="flex h-screen bg-neutral-900 p-1 text-white overflow-y-auto">
        {/* Left panel for users */}
        <div className="w-1/6 p-2 custom-3d-shadow rounded-2xl overflow-y-auto">
      <h2 className="text-xl mb-4 text-center">Your inbox</h2>

      {/* Search Box */}
      <div className="w-full max-w-xs mx-auto mb-4">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

{!searchQuery && interactedUserProfiles.length > 0 && (
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
          </div> )}
          
      {/* Display user profiles */}
      <div className="flex flex-col space-y-2">
        {usersToDisplay.map((user) => (
          <div
            key={user.id}
            className={`relative flex items-center p-2 rounded-lg cursor-pointer ${
              selectedUser?.id === user.id
                ? 'border-[#AEC90A] bg-opacity-50 bg-black text-white'
                : 'border-[#AEC90A]'
            }`}
            onClick={() => handleSelectUser(user)}
            style={{
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)',
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
                <span className="text-xl ml-4">{selectedUser.name.toUpperCase()}</span>
              </div>
              {currentConversation
                .filter(
                  (message) =>
                    (String(message.sender) === String(currentUserId) &&
                      String(message.receiver) === String(selectedUser.id)) ||
                    (String(message.sender) === String(selectedUser.id) &&
                      String(message.receiver) === String(currentUserId))
                )
                .map((message, index) => (
                  <div
                    key={index}
                    className={`relative flex ${
                      message.sender === currentUserId ? 'justify-end' : 'justify-start'
                    } mb-4`}
                  >
                    <div
                      className={`max-w-xs rounded-lg px-4 py-2 text-black ${
                        message.sender === currentUserId ? 'bg-white' : 'bg-[#AEC90A]'
                      }`}
                    >
                      <p>{message.content}</p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
  {/* Time on the right */}
  <div className="text-right">
    {formatDate(message.timestamp)}
  </div>

  {/* Edit and Delete buttons on the left */}
  {message.sender === currentUserId && (
    <div className="flex space-x-2">
      <button
        onClick={() => handleOpenDeleteDialog(message.id)}
        className="bg- text-black p-2 rounded"
      >
        <MdDelete size={20} />
      </button>
      <button
        onClick={() => handleOpenEditDialog(message.id, message.content)}
        className="bg- text-black p-2 rounded"
      >
        <MdEdit size={20} />
      </button>
    </div>
  )}
</div>


<div ref={messageEndRef}></div>

                    </div>
                  </div>
                ))}
            </div>
          )}
          {selectedUser && (
            <div className="flex items-center p-4">
              <input
                type="text"
                className="w-full p-2 bg-neutral-800 text-white rounded-lg"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
              />
              <button
                onClick={handleSendMessage}
                className="ml-2 p-2 bg-[#AEC90A] text-white rounded-lg"
              >
                Send
              </button>
            </div>
          )}
        {isEditDialogOpen && (
  <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
    <div className="bg-white p-5 rounded-lg max-w-sm w-full text-black">
      <h3>Edit Message</h3>
      <textarea
        className="w-full p-2 mt-2 text-black"
        value={messageToEdit}
        onChange={(e) => setMessageToEdit(e.target.value)}
      /><div className="flex space-x-4 mt-3">
      <button
        onClick={handleSaveEdit}
        className="mt-3 bg-[#AEC90A] justify-center text-white p-2 rounded-md"
      >
        Save Changes
      </button>
      <button
        onClick={() => setIsEditDialogOpen(false)}
        className="mt-3 bg-gray-800 text-white p-2 rounded-md"
      >
        Cancel
      </button>
    </div></div>
  </div>
)}

{/* Delete Confirmation Dialog */}
{isDeleteDialogOpen && (
  <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
    <div className="bg-white text-black p-5 rounded-lg max-w-sm w-full">
      <h3>Are you sure you want to delete this message?</h3>
      <div className="flex space-x-4 mt-3">
        <button
          onClick={handleDeleteMessage}
          className="bg-red-600 text-white p-2 rounded-md"
        >
          Yes, Delete
        </button>
        <button
          onClick={() => setIsDeleteDialogOpen(false)}
          className="bg-gray-800 text-white p-2 rounded-md"
        >
          Cancel
        </button>
      </div>
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
