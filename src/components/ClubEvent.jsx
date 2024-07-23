import React, { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { IconButton, Button } from '@material-tailwind/react';
import { FaArrowRight, FaRegSmile, FaRegFrown, FaRegMeh, FaArrowRight as FaArrowRightYellow } from 'react-icons/fa';
import MadhackImg from "../assets/events/madhack.png";
import ReidImg from "../assets/events/reid.jpg";
import LikeButton from './LikeButton'; // Ensure LikeButton is correctly implemented
import { MdAdd } from "react-icons/md";

const ClubEvent = ({ club }) => {
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleEvent = () => {
    navigate(`/club/${club.club_name}/add-event`);
  };

  const handleExploreEvent = (event) => {
    const basePath = location.pathname.startsWith('/president')
        ? '/president/club/event'
        : '/secretary/club/event';

    const clubDetails = {
        clubName: club.club_name,
        clubImage: club.image,
        ...event,
    };

    navigate(basePath, { state: clubDetails });
  };

  const handleFeedback = (event) => {
    console.log(`Feedback for ${event.name}`);
  };

  const events = [
    {
      name: "MadHack 3.0",
      image: MadhackImg,
      date: "05.06.2024",
      venue: "S204 Hall",
      status: "Approved",
      link: "https://example.com/join-oc",
    },
    {
      name: "ReidExtreme 3.0",
      image: ReidImg,
      date: "05.06.2024",
      venue: "S104 Hall",
      status: "Pending",
      link: "https://example.com/join-oc",
    },
    {
      name: "ReidExtreme 3.0",
      image: ReidImg,
      date: "05.06.2024",
      venue: "S104 Hall",
      status: "Rejected",
      reason: "Budget not approved",
      link: "https://example.com/join-oc",
    },
    {
      name: "MadHack 3.0",
      image: MadhackImg,
      date: "05.06.2024",
      venue: "S204 Hall",
      status: "Approved",
      link: "https://example.com/join-oc",
    },
  ];

  const pastEvents = [
    {
      name: "MadHack 2.0",
      image: MadhackImg,
      date: "01.09.2023",
      venue: "A101 Hall",
      status: "Completed",
      link: "https://example.com/join-oc",
    },
    {
      name: "ReidExtreme 2.0",
      image: ReidImg,
      date: "15.12.2023",
      venue: "B202 Hall",
      status: "Completed",
      link: "https://example.com/join-oc",
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "Approved":
        return <FaRegSmile className="text-green-500 text-4xl" />;
      case "Rejected":
        return <FaRegFrown className="text-red-500 text-4xl" />;
      case "Pending":
        return <FaRegMeh className="text-gray-800 text-4xl" />;
      case "Completed":
        return <span className="text-yellow-500 text-4xl">🥳</span>;
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center items-center flex-col p-4 rounded-2xl bg-black opacity-70">
      <div className='flex justify-end mb-2'>
        <button
          className="bg-[#AEC90A] text-black flex items-center justify-center rounded-full hover:bg-[#AEC90A] hover:text-black p-2 absolute top-10 right-32 z-10"
          onClick={handleEvent} // Ensure this button triggers handleEvent
        >
          <MdAdd size={24} />
        </button>
      </div>

      {/* Upcoming Events */}
      <div className="w-full max-w-screen-lg">
        <h2 className="text-2xl font-bold text-white mb-4">Upcoming</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          {events.map((event, index) => (
            <div
              key={index}
              className="relative rounded-lg p-4 custom-card"
              onMouseEnter={() => event.status === "Rejected" && setHoveredEvent(event)}
              onMouseLeave={() => event.status === "Rejected" && setHoveredEvent(null)}
            >
              <div className="relative custom-3d-shadow custom-card ">
                <img src={event.image} alt={event.name} className="w-full h-72 object-cover rounded-lg" />
                <div className="absolute top-0 left-0 m-2 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                  <div className="relative group">
                    {getStatusIcon(event.status)}
                    {event.status === "Rejected" && hoveredEvent === event && (
                      <div className="absolute top-0 left-0 mt-2 ml-2 bg-red-600 text-white p-4 rounded-lg shadow-lg z-50">
                        <h3 className="text-2xl font-bold">Rejected</h3>
                        <p className="mt-1 text-lg">{event.reason}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="w-10 h-10 absolute bottom-0 right-0 m-2 p-1 rounded-full flex justify-center items-center custom-card" style={{ backgroundColor: '#AEC90A', color: '#000' }}>
                  <IconButton
                    className="font-extrabold text-lg text-black "
                    onClick={() => handleExploreEvent(event)}
                  >
                    <FaArrowRightYellow />
                  </IconButton>
                </div>
              </div>
              <div className="flex flex-col mt-4">
                <h3 className="text-xl font-semibold text-white">{event.name}</h3>
                <span className="text-gray-400">in {event.venue} on {event.date}</span>
                <div className="flex justify-end items-center -mt-10 custom-card">
                  <LikeButton />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Past Events */}
      <div className="w-full max-w-screen-lg mt-8">
        <h2 className="text-2xl font-bold text-white mb-4">Past Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          {pastEvents.map((event, index) => (
            <div key={index} className="relative rounded-lg p-4 custom-card">
              <div className="relative custom-3d-shadow custom-card">
                <img src={event.image} alt={event.name} className="w-full h-72 object-cover rounded-lg" />
                <div className="absolute top-0 left-0 m-2 rounded-full flex items-center justify-center">
                  {getStatusIcon(event.status)}
                </div>
                <div className="w-10 h-10 absolute bottom-0 right-0 m-2 p-1 rounded-full flex justify-center items-center custom-card" style={{ backgroundColor: '#AEC90A', color: '#000' }}>
                  <IconButton
                    className="font-extrabold text-lg text-black"
                    onClick={() => handleExploreEvent(event)}
                  >
                    <FaArrowRightYellow />
                  </IconButton>
                </div>
              </div>
              <div className="flex flex-col mt-4">
                <h3 className="text-xl font-semibold text-white">{event.name}</h3>
                <span className="text-gray-400">{event.venue} {event.date}</span>
                <div className="mt-2 flex justify-between items-center">
                  <LikeButton className="mb-2 custom-card" />
                  <Button
                    className="bg-[#AEC90A] text-black font-bold rounded-full px-4 py-2 custom-card"
                    onClick={() => handleFeedback(event)}
                  >
                    Give Feedback
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClubEvent;
