import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ieeeImg from '../assets/clubs/ieee.png';
import rotaractImg from '../assets/clubs/rotaract.png';
import acmImg from '../assets/clubs/acm.png';
import isacaImg from '../assets/clubs/isaca1.png';
import wieImg from '../assets/clubs/wie.png';
import msImg from '../assets/clubs/ms.png';
import wicysImg from '../assets/clubs/wicys.png';
import pahasaraImg from '../assets/clubs/pahasara1.png';

import ieee1 from "../assets/events/madhack.png";
import ieee2 from "../assets/events/reid.jpg";
import ieee3 from "../assets/events/intro.jpg";
import ieee4 from "../assets/events/ieeeday.jpg";
import ieee5 from "../assets/events/revol.jpg";
import rac1 from "../assets/events/trail.jpg";
import acm1 from "../assets/farewell.jpg";
import rac2 from "../assets/events/snap.jpg";
import LikeButton from './LikeButton';
import RegistrationModal from './RegistrationModal';

const upcomingItems = [
  { id: 1, name: "Madhack", image: ieee1, details: "IEEE Club Board Election for Term 24/25", date: "2024-08-15", venue: "Main Auditorium", time: "10:00 AM", organizedBy: "IEEE", clubImage: ieeeImg, likes: Math.floor(Math.random() * 100) },
  { id: 2, name: "Tech Trail Blazer", image: rac1, details: "Monthly Rotaract Meeting", date: "2024-08-20", venue: "Conference Room A", time: "2:00 PM", organizedBy: "Rotaract", clubImage: rotaractImg, likes: Math.floor(Math.random() * 100) },
  { id: 3, name: "IEEE Board Election of term 24/25", image: acm1, details: "Annual ACM Hackathon", date: "2024-09-01", venue: "Tech Park", time: "9:00 AM", organizedBy: "ACM", clubImage: ieeeImg, likes: Math.floor(Math.random() * 100) },
  { id: 4, name: "Reid Extreme 3.0", image: ieee2, details: "ISACA Seminar on Cybersecurity", date: "2024-09-10", venue: "Hall B", time: "11:00 AM", organizedBy: "ISACA", clubImage: isacaImg, likes: Math.floor(Math.random() * 100) },
  { id: 5, name: "IEEE Introdcutory session", image: ieee3, details: "WIE Annual Conference", date: "2024-09-20", venue: "Main Hall", time: "10:00 AM", organizedBy: "WIE", clubImage: wieImg, likes: Math.floor(Math.random() * 100) },
  { id: 6, name: "IEEE Day", image: ieee4, details: "Microsoft Azure Workshop", date: "2024-09-25", venue: "Room 101", time: "1:00 PM", organizedBy: "Microsoft", clubImage: msImg, likes: Math.floor(Math.random() * 100) },
  { id: 7, name: "Revolux 3.0", image: ieee5, details: "WiCyS Webinar on Women in Cybersecurity", date: "2024-10-01", venue: "Online", time: "3:00 PM", organizedBy: "WiCyS", clubImage: wicysImg, likes: Math.floor(Math.random() * 100) },
  { id: 9, name: "SnapFlix", image: rac2, details: "Pahasara Photography Exhibition", date: "2024-10-10", venue: "Exhibition Hall", time: "4:00 PM", organizedBy: "Pahasara", clubImage: pahasaraImg, likes: Math.floor(Math.random() * 100) },
];

const Upcoming = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div className="p-2 rounded-md relative">
      <h2 className="text-white text-sm font-bold -mt-2">Upcoming</h2>
      <div className="flex flex-wrap overflow-y-auto -mx-2">
        {upcomingItems.map(item => (
          <div 
            key={item.id} 
            className="w-1/2 p-4 inline-block" // Adjust width as needed
            onMouseEnter={() => setHoveredItem(item)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div className="event-card">
              <div className="event-front">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-60 object-cover custom-3d-shadow" 
                  style={{ 
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' 
                  }}
                />
              </div>
              <div className="event-back">
                <h3 className="text-white text-xl font-bold mb-2">{item.name}</h3>
                <p>{item.details}</p>
                <p className="text-gray-400">Date: {item.date}</p>
                <p className="text-gray-400">Venue: {item.venue}</p>
                <p className="text-gray-400">Time: {item.time}</p>
                <p className="text-gray-400">Organized By:</p>
                <img src={item.clubImage} alt="Club" className="w-12 h-12 rounded-full mb-2" />
                <div className="flex justify-center items-center mt-2">
                  <LikeButton likes={item.likes} />
                  <button 
                    className="button-register ml-4" 
                    onClick={() => openModal(item)}
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedEvent && (
        <RegistrationModal
          event={selectedEvent}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default Upcoming;
