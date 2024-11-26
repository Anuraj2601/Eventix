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

const convertTo12HourFormat = (timeString) => {
  if (!timeString || typeof timeString !== 'string') {
    console.error("Invalid time string");
    return "Invalid time"; // Return a default value in case of an error
  }

  const [hour, minute, second] = timeString.split(":").map(Number);
  
  if (isNaN(hour) || isNaN(minute) || isNaN(second)) {
    console.error("Invalid time format");
    return "Invalid time";
  }

  const ampm = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 || 12; // Convert hour to 12-hour format
  return `${formattedHour}:${minute.toString().padStart(2, "0")} ${ampm}`;
};

// Example usage:



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
        .map((event) => ({
          event_id: event.event_id,
          name: event.name,
          image: event.event_image || ieee1, // Fallback to default image
          date: `${event.date[0]}/${event.date[1]}/${event.date[2]}`,
          venue: event.venue,
          club_id: event.club_id,
          clubImage: event.club_image || ieeeImg, // Ensure a fallback
          public_status: event.public_status,
        }));
      setUpcomingEvents(futureEvents);
      console.log(futureEvents)
    } catch (error) {
      console.error("Error fetching events:", error);
    }
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
                  <p className="text-gray-400">Date: {event.date}</p>
                  <p className="text-gray-400">Venue: {event.venue}</p>
                  <p className="text-gray-400">Time:  {convertTo12HourFormat(event.time)}</p> {/* Display formatted time here */}
                  <p className="text-gray-400">Organized By:</p>
                  <img src={event.clubImage} alt="Club" className="w-12 h-12 rounded-full mb-2" />
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
