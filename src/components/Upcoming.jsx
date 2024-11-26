import React, { useState, useEffect } from "react";
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
import LikeButton from './LikeButton'; // Make sure this path is correct
import RegistrationModal from './RegistrationModal'; // Make sure this path is correct
import EventService from "../service/EventService"; // Ensure correct import
import ClubsService from "../service/ClubsService"; // Ensure correct import

const convertDateToReadableFormat = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' }); // Gets the full month name
  const year = date.getFullYear();
  
  // Add suffix to day (e.g. 1 -> 1st, 2 -> 2nd, etc.)
  const suffix = (day) => {
    if (day > 3 && day < 21) return 'th'; // Special case for 11th, 12th, and 13th
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };
  
  return `${day}${suffix(day)} ${month} ${year}`;
};



const Upcoming = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [clubDetails, setClubDetails] = useState([]);

  const openModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const fetchClubs = async () => {
    try {
      const clubs = await ClubsService.getAllClubslanding();
      setClubDetails(clubs.content || []);
    } catch (error) {
      console.error("Failed to fetch clubs:", error);
    }
  };

  const fetchEvents = async () => {
    try {
      const eventsData = await EventService.getAllEventslanding();
      const today = new Date();
      const futureEvents = eventsData.content
        .filter((event) => {
          const eventDate = new Date(event.date[0], event.date[1] - 1, event.date[2]);
          return eventDate >= today && event.iud_status !== 0 && event.budget_status !== 0; // Only include future events
        })
        .map((event) => {
          let formattedTime = "Time not available"; // Default value
  
          if (event.time) {
            if (Array.isArray(event.time) && event.time.length === 2) {
              // Ensure event.time is an array with 2 elements (hour and minute)
              formattedTime = formatTime(event.time);
            } else {
              console.warn(`Invalid time format for event: ${event.name}. Expected an array of [hour, minute], but got: ${typeof event.time}`);
            }
          }
  
          console.log(`Event: ${event.name} | Time: ${event.time} | Formatted Time: ${formattedTime}`);
          
          return {
            event_id: event.event_id,
            name: event.name,
            venue: event.venue,

            image: event.event_image || ieee1, // Fallback to default image
            date: convertDateToReadableFormat(event.date), // Format date
            time: formattedTime,  // Use formatted time
            club_id: event.club_id,
            clubImage: event.club_image || ieeeImg, // Ensure a fallback
            public_status: event.public_status,
            budget_status: event.budget_status,
            iud_status: event.iud_status,
          };
        });
  
      setUpcomingEvents(futureEvents);
      console.log(futureEvents); // Log the processed future events
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };
  
  const formatTime = (timeArray) => {
    const [hour, minute] = timeArray;
    const period = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;  // Convert 24-hour to 12-hour format
    const formattedMinute = minute < 10 ? `0${minute}` : minute;  // Ensure minute is two digits
    return `${formattedHour}:${formattedMinute} ${period}`;
  };
  

  useEffect(() => {
    fetchClubs();
    fetchEvents();
  }, []);

  return (
    <div className="p-2 rounded-md relative">
      <h2 className="text-white text-sm font-bold -mt-2">Upcoming</h2>
      

      <div className="flex flex-wrap overflow-y-auto -mx-2">
        {upcomingEvents.map((event) => {
           const activeClub = clubDetails.find((club) => club.club_id === event.club_id) || {};
           const clubImage = activeClub.club_image || "https://via.placeholder.com/100"; // Fallback image
           const clubName = activeClub.club_name || "Unknown Club"; // Fallback name
           const canRegister = event.iud_status === 1 && event.budget_status === 1;
          return (          
            <div 
              key={event.event_id} 
              className="w-1/2 p-4 inline-block" // Adjust width as needed
              onMouseEnter={() => setHoveredItem(event)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="event-card">
                <div className="event-front">
                  <img 
                    src={event.image} 
                    alt={event.name} 
                    className="w-full h-60 object-cover custom-3d-shadow" 
                    style={{ 
                      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' 
                    }}
                  />
                </div>
                <div className="event-back">
                  <h3 className="text-white text-xl font-bold mb-2">{event.name}</h3>
                  <p>{event.details}</p>
                  <p className="text-gray-400">On  {event.date}</p>
                  <p className="text-gray-400">In {event.venue}</p>
                  <p className="text-gray-400">At {event.time}</p>
                  <p className="text-gray-400">Organized By:</p>
                  <img src={clubImage} alt="Club" className="w-12 h-12 rounded-full mb-2" />
                  <div className="flex justify-center items-center mt-2">
                    <LikeButton likes={event.likes} />
                    {canRegister && (
              <button 
              className="button-register ml-4" 
              onClick={() => openModal(event)}
            >
              Register
            </button>
            )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
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
