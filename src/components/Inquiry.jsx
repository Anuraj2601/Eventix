import React, { useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import rotaractImage from '../assets/clubs/rotaract.png';
import acmImage from '../assets/clubs/acm.png';
import pahasaraImage from '../assets/clubs/pahasara1.png';
import isacaImage from '../assets/clubs/isaca1.png';
import wieImage from '../assets/clubs/wie.png';
import ieeeImage from '../assets/clubs/ieee.png';
import msImage from '../assets/clubs/ms.png';
import wicysImage from '../assets/clubs/wicys.png';
import rekhaImage from '../assets/clubs/rekha.png';

import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const userProfiles = [
  { image: 'https://randomuser.me/api/portraits/men/1.jpg', name: 'John Doe' },
  { image: 'https://randomuser.me/api/portraits/women/2.jpg', name: 'Jane Smith' },
  { image: 'https://randomuser.me/api/portraits/men/3.jpg', name: 'Mike Johnson' },
  { image: 'https://randomuser.me/api/portraits/women/4.jpg', name: 'Emily Davis' }
];

const clubImages = {
  ieee: ieeeImage,
  rotaract: rotaractImage,
  acm: acmImage,
  pahasara: pahasaraImage,
  isaca: isacaImage,
  wie: wieImage,
  ms: msImage,
  wicys: wicysImage,
  rekha: rekhaImage,
};

const inquiries = [
  {
    id: 1,
    club: 'ieee',
    messages: [
      { type: 'inquiry', text: 'Can you provide more details about the IEEE event Madhack 3.0?', time: '10:00 AM', userIndex: 0 },
      { type: 'reply', text: 'Sure! The event is focused on recent advancements in electrical engineering. It will take place on 25th August.', time: '10:05 AM', userIndex: 1 },
      { type: 'inquiry', text: 'Will there be any workshops or talks during the event?', time: '10:15 AM', userIndex: 2 },
      { type: 'reply', text: 'Yes, there will be both workshops and keynote talks on various topics.', time: '10:30 AM', userIndex: 1 }
    ],
    hasNewMessage: false
  },
  {
    id: 2,
    club: 'rotaract',
    messages: [
      { type: 'inquiry', text: 'When is the next recruitment of your club scheduled?', time: '11:00 AM', userIndex: 0 },
      { type: 'reply', text: 'The next recruitment of our club is scheduled for 30th August at 3 PM.', time: '11:10 AM', userIndex: 1 },
      { type: 'inquiry', text: 'Can you provide details on how to apply?', time: '11:20 AM', userIndex: 3 },
      { type: 'reply', text: 'You can apply by filling out the online form on our website.', time: '11:35 AM', userIndex: 1 },
      { type: 'inquiry', text: 'Is there any application fee?', time: '11:50 AM', userIndex: 2 },
      { type: 'reply', text: 'No, there is no application fee for recruitment.', time: '12:00 PM', userIndex: 1 }
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
    <div className="fixed inset-0 flex">
      <Sidebar className="flex-shrink-0"/>
      <div className="flex flex-col flex-1">
        <Navbar className="sticky top-0 z-10 p-4"/>
        <div className="flex h-screen bg-neutral-900 p-1 text-white">
        <div className="w-1/4 bg-neutral-800 p-2 custom-3d-shadow rounded-2xl">
            <h2 className="text-xl mb-4 text-center">Inquiries</h2>
            <div className="flex flex-col space-y-2">
              {inquiries.slice(0, 2).map(inquiry => (
                <div
                  key={inquiry.id}
                  className={`relative flex items-center p-2 rounded-lg cursor-pointer ${currentInquiry?.id === inquiry.id ? 'border-[#AEC90A] bg-opacity-50 bg-black text-white' : 'border-[#AEC90A]'}`}
                  onClick={() => handleSelectInquiry(inquiry)}
                  style={{ boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' }}
                >
                  <img src={clubImages[inquiry.club]} alt="" className='w-10 h-10 rounded-full mr-3' />
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
                  <img src={clubImages[currentInquiry.club]} alt="" className='w-12 h-12 rounded-full' />
                  <span className="text-xl ml-4">{currentInquiry.club.toUpperCase()} Club</span>
                </div>
                <div>
                  {currentInquiry.messages.map((message, index) => (
                    <div key={index} className={`flex ${message.type === 'inquiry' ? 'justify-start' : 'justify-end'} mb-4`}>
                      {message.type === 'inquiry' && (
                        <div className="flex items-center">
                          <img src={userProfiles[message.userIndex].image} alt="" className='w-8 h-8 rounded-full mr-2' />
                          <div                      style={{ boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' }}
className="bg-[#AEC90A] text-black bg-opacity-80 p-5 rounded-2xl">
                            <p className="text-sm">{userProfiles[message.userIndex].name}</p>
                            <p className="text-sm">{message.text}</p>
                            <div className="text-xs text-black">{message.time}</div>
                          </div>
                        </div>
                      )}
                      {message.type === 'reply' && (
                        <div                     style={{ boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' }}
                         className={`bg-white text-black p-5 rounded-2xl`}>
                          <p className="">{message.text}</p>
                          <div className="text-xs text-gray-700">{message.time}</div>
                          <div className="flex mt-2">
                            <button onClick={() => handleEditMessage(index, prompt('Edit message:', message.text) || message.text)} className="text-black"><MdEdit /></button>
                            <button onClick={() => handleDeleteMessage(index)} className="text-black ml-2"><MdDelete /></button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-neutral-900 flex items-center p-5 mb-3">
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
