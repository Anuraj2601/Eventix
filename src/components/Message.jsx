import React, { useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

// Updated random user image URLs
const userProfiles = [
  { image: 'https://randomuser.me/api/portraits/men/9.jpg', name: 'John Doe' },
  { image: 'https://randomuser.me/api/portraits/women/8.jpg', name: 'Jane Smith' },
  { image: 'https://randomuser.me/api/portraits/men/3.jpg', name: 'Mike Johnson' },
  { image: 'https://randomuser.me/api/portraits/women/4.jpg', name: 'Emily Davis' }
];

const inquiries = [
  {
    id: 1,
    club: 'John Doe',
    messages: [
      { type: 'inquiry', text: 'Hey! Did you check out the event registration?', time: '10:00 AM', userIndex: 0 },
      { type: 'reply', text: 'Yeah, it’s awesome! Can’t wait to sign up!', time: '10:05 AM', userIndex: 1 },
      { type: 'inquiry', text: 'Have you seen the early bird discount?', time: '10:15 AM', userIndex: 0 },
      { type: 'reply', text: 'Totally! It’s a steal.', time: '10:30 AM', userIndex: 1 }
    ],
    hasNewMessage: false
  },
  {
    id: 2,
    club: 'Jane Smith',
    messages: [
      { type: 'inquiry', text: 'Did you hear about the new event?', time: '11:00 AM', userIndex: 0 },
      { type: 'reply', text: 'Oh yes! It’s going to be epic.', time: '11:10 AM', userIndex: 1 },
      { type: 'inquiry', text: 'I’m so pumped. Are you registering?', time: '11:20 AM', userIndex: 0 },
      { type: 'reply', text: 'Absolutely! Already got my ticket.', time: '11:35 AM', userIndex: 1 },
      { type: 'inquiry', text: 'We should plan to go together!', time: '11:50 AM', userIndex: 0 },
      { type: 'reply', text: 'Definitely! It’s going to be fun.', time: '12:00 PM', userIndex: 1 }
    ],
    hasNewMessage: true
  }
];

const InquiryPage = () => {
  const [currentInquiry, setCurrentInquiry] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  const handleSelectInquiry = (inquiry) => {
    setCurrentInquiry(prev => {
      if (prev && prev.id === inquiry.id) return prev;
      return { ...inquiry, hasNewMessage: false };
    });
  };

  const handleSend = () => {
    if (newMessage.trim() && currentInquiry) {
      setCurrentInquiry(prevInquiry => ({
        ...prevInquiry,
        messages: [...prevInquiry.messages, { type: 'reply', text: newMessage, time: new Date().toLocaleTimeString(), userIndex: 0 }]
      }));
      setNewMessage('');
    }
  };

  const handleDeleteMessage = (index) => {
    if (currentInquiry) {
      const updatedMessages = currentInquiry.messages.filter((_, i) => i !== index);
      setCurrentInquiry(prevInquiry => ({
        ...prevInquiry,
        messages: updatedMessages
      }));
    }
  };

  const handleEditMessage = (index, newText) => {
    if (currentInquiry) {
      const updatedMessages = currentInquiry.messages.map((msg, i) =>
        i === index ? { ...msg, text: newText } : msg
      );
      setCurrentInquiry(prevInquiry => ({
        ...prevInquiry,
        messages: updatedMessages
      }));
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar className="flex-shrink-0" />
      <div className="flex-1 flex flex-col">
        <Navbar className="sticky top-0 z-10 bg-neutral-900 text-white " />
        <div className="flex h-screen bg-neutral-900 p-1 text-white overflow-y-auto">
        <div className="w-1/4  p-2 custom-3d-shadow rounded-2xl overflow-y-auto">
            <h2 className="text-xl mb-4 text-center">Messages</h2>
            <div className="flex flex-col space-y-2">
              {inquiries.slice(0, 2).map((inquiry, index) => (
                <div
                  key={inquiry.id}
                  className={`relative flex items-center p-2 rounded-lg cursor-pointer ${currentInquiry?.id === inquiry.id ? 'border-[#AEC90A] bg-opacity-50 bg-black text-white' : 'border-[#AEC90A]'}`}
                  onClick={() => handleSelectInquiry(inquiry)}
                  style={{ boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' }}

                >
                  <img src={userProfiles[index].image} alt="" className='w-10 h-10 rounded-full mr-3' />
                  {inquiry.hasNewMessage && (
                    <span className="absolute top-5 right-5 w-4 h-4 bg-[#AEC90A] rounded-full border-2 border-neutral-900"></span>
                  )}
                  <span className="text-lg">{inquiry.club.toUpperCase()}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 flex flex-col">
            {currentInquiry && (
              <div className="flex-1 overflow-y-auto p-4 bg-neutral-900">
                <div className="flex items-center mb-4">
                  <img src={userProfiles[inquiries.findIndex(i => i.id === currentInquiry.id)].image} alt="" className='w-12 h-12 rounded-full' />
                  <span className="text-xl ml-4">{currentInquiry.club.toUpperCase()}</span>
                </div>
                <div>
                  {currentInquiry.messages.map((message, index) => (
                    <div key={index} className={`flex ${message.type === 'inquiry' ? 'justify-start' : 'justify-end'} mb-4`}>
                      <div                    style={{ boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' }}
className={`p-5 rounded-2xl ${message.type === 'inquiry' ? 'bg-[#AEC90A] text-black bg-opacity-80' : 'bg-white text-black'}`}>
                        <p className="">{message.text}</p>
                        <div className="text-xs text-black">{message.time}</div>
                        {message.type === 'reply' && (
                          <div className="flex mt-2">
                            <button onClick={() => handleEditMessage(index, prompt('Edit message:', message.text))}>
                              <MdEdit className='text-black' />
                            </button>
                            <button onClick={() => handleDeleteMessage(index)}>
                              <MdDelete className='text-black' />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-neutral-900 flex items-center p-5">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your inquiry..."
                  className="flex-1 p-5 rounded-lg bg-neutral-900 text-white"
                />
                <button
                  onClick={handleSend}
                  className="ml-4 bg-[#AEC90A] text-black p-2 rounded-full"
                >
                  Reply
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

export default InquiryPage;
