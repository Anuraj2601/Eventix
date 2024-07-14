import React from "react";
import { useNavigate } from 'react-router-dom';
import { IconButton, Button } from '@material-tailwind/react';
import { FaPlus, FaArrowRight } from 'react-icons/fa';
import MadhackImg from "../assets/events/madhack.png";
import ReidImg from "../assets/events/reid.jpg";

const ClubEvent = ({ club }) => {
  const navigate = useNavigate();

  const handleEvent = () => {
    navigate(`/club/${club.club_name}/add-event`);
  };

  const handleExploreEvent = (event) => {
    const clubDetails = {
      clubName: club.club_name,
      clubImage: club.image,
      ...event,
    };
    navigate('/event', { state: clubDetails });
  };

  const events = [
    {
      name: "MadHack 3.0",
      image: MadhackImg,
      date: "05.06.2024",
      link: "https://example.com/join-oc",
    },
    {
      name: "ReidExtreme 3.0",
      image: ReidImg,
      date: "05.06.2024",
      link: "https://example.com/join-oc",
    },
  ];

  return (
    <div className="flex justify-center items-center flex-col p-4 rounded-lg" style={{ backgroundColor: '#1E1E1E' }}>
      <Button
        className="flex items-center gap-2 bg-[#AEC90A] h-10 mr-0 mt-2 ml-[850px] pt-1 pb-1 pl-5 pr-5 rounded-2xl text-black font-medium text-sm"
        variant="gradient"
        onClick={handleEvent}
      >
        <FaPlus />
        New Event
      </Button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-screen-lg">
        {events.map((event, index) => (
          <div key={index} className="rounded-lg p-4">
            <div className="relative">
              <img src={event.image} alt={event.name} className="w-full h-72 object-cover rounded-lg" />
              <div className="w-10 h-10 absolute bottom-0 right-0 m-2 p-1 rounded-full flex justify-center items-center" style={{ backgroundColor: '#AEC90A', color: '#000' }}>
                <IconButton
                  className="font-extrabold text-lg text-black"
                  onClick={() => handleExploreEvent(event)}
                >
                  <FaArrowRight />
                </IconButton>
              </div>
            </div>
            <div className="flex mt-4">
              <h3 className="text-xl font-semibold text-white">{event.name}</h3>
              <span className="text-gray-400 ml-60">{event.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClubEvent;
