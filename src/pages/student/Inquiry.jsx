import React, { useState } from 'react';
import { MdDelete, MdEdit, MdCheckCircle, MdEditNote } from "react-icons/md";
import ieeeImage from "../../assets/clubs/ieee.png";
import rotaractImage from "../../assets/clubs/rotaract.png";
import acmImage from "../../assets/clubs/acm.png";
import pahasaraImage from "../../assets/clubs/pahasara1.png";
import isacaImage from "../../assets/clubs/isaca1.png";
import wieImage from "../../assets/clubs/wie.png";
import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar'
import msImage from '../../assets/clubs/ms.png';
import wicysImage from '../../assets/clubs/wicys.png';
import rekhaImage from '../../assets/clubs/rekha.png';



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
      { type: 'inquiry', text: 'Can you provide more details about the IEEE event Madhack 3.0?', time: '10:00 AM' },
      { type: 'reply', text: 'Sure! The event is focused on recent advancements in electrical engineering. It will take place on 25th August.', time: '10:05 AM' }
    ],
    hasNewMessage: false
  },
  {
    id: 2,
    club: 'rotaract',
    messages: [
      { type: 'inquiry', text: 'When is the next recruitment of your club scheduled?', time: '11:00 AM' },
      { type: 'reply', text: 'The next recruitment of our club is scheduled for 30th August at 3 PM.', time: '11:10 AM' }
    ],
    hasNewMessage: true
  },
  {
    id: 3,
    club: 'acm',
    messages: [
      { type: 'inquiry', text: 'What topics will be covered in the ACM conference?', time: '12:00 PM' },
      { type: 'reply', text: 'The conference will cover AI, machine learning, and data science.', time: '12:20 PM' }
    ],
    hasNewMessage: true
  },
  {
    id: 4,
    club: 'pahasara',
    messages: [
      { type: 'inquiry', text: 'Can you tell me more about the Pahasara project?', time: '1:00 PM' },
      { type: 'reply', text: 'The Pahasara project focuses on community development and environmental conservation.', time: '1:15 PM' },
      { type: 'inquiry', text: 'How can I get involved with Pahasara?', time: '1:30 PM' }
    ],
    hasNewMessage: false
  },
  {
    id: 5,
    club: 'isaca',
    messages: [
        { type: 'inquiry', text: 'Can you tell me more about the ISACA project?', time: '1:00 PM' },
      ],
    hasNewMessage: false
  },
  {
    id: 6,
    club: 'wie',
    messages: [
      { type: 'inquiry', text: 'Can you tell me more about the Pahasara project?', time: '1:00 PM' },
      { type: 'reply', text: 'The Pahasara project focuses on community development and environmental conservation.', time: '1:15 PM' },
      { type: 'inquiry', text: 'How can I get involved with Pahasara?', time: '1:30 PM' }
    ],
    hasNewMessage: false
  },
  {
    id: 7,
    club: 'ms',
    messages: [
      { type: 'inquiry', text: 'Can you tell me more about the Pahasara project?', time: '1:00 PM' },
      { type: 'reply', text: 'The Pahasara project focuses on community development and environmental conservation.', time: '1:15 PM' },
      { type: 'inquiry', text: 'How can I get involved with Pahasara?', time: '1:30 PM' }
    ],
    hasNewMessage: false
  },
  {
    id: 8,
    club: 'wicys',
    messages: [
      { type: 'inquiry', text: 'Can you tell me more about the Pahasara project?', time: '1:00 PM' },
      { type: 'reply', text: 'The Pahasara project focuses on community development and environmental conservation.', time: '1:15 PM' },
      { type: 'inquiry', text: 'How can I get involved with Pahasara?', time: '1:30 PM' }
    ],
    hasNewMessage: false
  },
  {
    id: 9,
    club: 'rekha',
    messages: [
      { type: 'inquiry', text: 'Can you tell me more about the Pahasara project?', time: '1:00 PM' },
      { type: 'reply', text: 'The Pahasara project focuses on community development and environmental conservation.', time: '1:15 PM' },
      { type: 'inquiry', text: 'How can I get involved with Pahasara?', time: '1:30 PM' }
    ],
    hasNewMessage: false
  },
];

const InquiryPage = () => {
  const [currentInquiry, setCurrentInquiry] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  const handleSelectInquiry = (inquiry) => {
    setCurrentInquiry(inquiry);
    // Mark the inquiry as read
    inquiry.hasNewMessage = false;
  };

  const handleSend = () => {
    if (newMessage.trim() && currentInquiry) {
      setCurrentInquiry(prevInquiry => ({
        ...prevInquiry,
        messages: [...prevInquiry.messages, { type: 'inquiry', text: newMessage, time: new Date().toLocaleTimeString() }]
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
          <div className="flex h-screen bg-neutral-900 p-1 text-white overflow-y-auto">
        <div className="w-1/4  p-2 custom-3d-shadow rounded-2xl">
            <h2 className="text-xl mb-4 text-center">Inquire Any Club</h2>
              <div className="flex flex-col space-y-2">
                {inquiries.map(inquiry => (
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
                    <div className="ml-auto text-sm text-white">
                      {currentInquiry?.id === inquiry.id ? (
                        <span className=" px-2 py-1 rounded-full"></span>
                      ) : (
                        <span></span>
                      )}
                    </div>
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
                      <div key={index} className={`flex ${message.type === 'inquiry' ? 'justify-end' : 'justify-start'} mb-4`}>
                        <div                     style={{ boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' }}
 className={`max-w-md p-4 rounded-2xl ${message.type === 'inquiry' ? 'bg-white text-black custom-3d-shadow ' : 'bg-[#AEC90A] text-black bg-opacity-80 custom-3d-shadow'}`}>
                          <p>{message.text}</p>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">{message.time}</span>
                            {message.type === 'inquiry' && (
                              <div className="flex space-x-2">
                                <MdDelete
                                  size={20}
                                  className="cursor-pointer text-black hover:text-[#AEC90A]"
                                  onClick={() => handleDeleteMessage(index)}
                                />
                                <MdEdit
                                  size={20}
                                  className="cursor-pointer text-black hover:text-[#AEC90A]"
                                  onClick={() => {
                                    const newText = prompt('Edit your message:', message.text);
                                    if (newText) handleEditMessage(index, newText);
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="p-4 bg-neutral-900 flex items-center p-5 mb-4">
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
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default InquiryPage;
