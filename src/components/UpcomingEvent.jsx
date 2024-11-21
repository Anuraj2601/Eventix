import { BsCalendar2EventFill } from "react-icons/bs";
import { RiTeamFill } from "react-icons/ri";
import { FaClock } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { GrFormNext, GrFormPrevious } from "react-icons/gr"; // Import left arrow icon
import EventService from "../service/EventService";
import React, { useState, useEffect } from "react";
import madhack2 from "../assets/madhack2.png"; // Default image in case of missing image in API response
import ClubsService from '../service/ClubsService';

const UpcomingEvent = () => {
  const [activeButton, setActiveButton] = useState("IEEE");
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState("");
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [clubDetails, setClubDetails] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);

  useEffect(() => {
    fetchClubs();
  }, []);

  const fetchClubs = async () => {
    try {
      const clubs = await ClubsService.getAllClubslanding();
      setClubDetails(clubs.content || []);
    } catch (error) {
      console.error("Failed to fetch clubs:", error);
    }
  };

  useEffect(() => {
    const getEvents = async () => {
      try {
        const eventsData = await EventService.getAllEventslanding();
        const today = new Date();
        const formattedData = {
          upcoming: [],
          past: [],
        };

        eventsData.content.forEach((event) => {
          const eventDate = new Date(event.date[0], event.date[1] - 1, event.date[2]);
          const eventDetails = {
            event_id: event.event_id,
            name: event.name,
            image: event.event_image || madhack2, // Fallback to default image
            date: `${event.date[0]}/${event.date[1]}/${event.date[2]}`,
            venue: event.venue,
            club_id: event.club_id,
          };

          // Ensure only future events are included in the upcoming events list
          if (eventDate >= today) {
            formattedData.upcoming.push(eventDetails);
          } else {
            formattedData.past.push(eventDetails);
          }
        });

        setUpcomingEvents(formattedData.upcoming);
        setPastEvents(formattedData.past);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    getEvents();
  }, []);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    setCurrentEventIndex(0);
  };

  const handleNextClick = () => {
    if (upcomingEvents.length === 0) return;
    const nextIndex = (currentEventIndex + 1) % upcomingEvents.length;
    setAnimationClass("slide-out");
    setTimeout(() => {
      setCurrentEventIndex(nextIndex);
      setAnimationClass("slide-in");
    }, 500);
  };

  const handlePrevClick = () => {
    if (upcomingEvents.length === 0) return;
    const prevIndex = (currentEventIndex - 1 + upcomingEvents.length) % upcomingEvents.length;
    setAnimationClass("slide-out");
    setTimeout(() => {
      setCurrentEventIndex(prevIndex);
      setAnimationClass("slide-in");
    }, 500);
  };

  const activeEvent = upcomingEvents[currentEventIndex] || {};
  const activeClub = clubDetails.find(club => club.club_id === activeEvent.club_id) || {};

  return (
    <div className="flex flex-col items-center mt-3">
      <div className="flex items-center bg-dark-background p-4 mt-6 rounded-lg">
        <BsCalendar2EventFill className="text-[#AEC90A] w-9 h-9 shadow-lg" />
        <span className="text-lg font-normal pl-3 text-[#AEC90A] uppercase">Upcoming events</span>
      </div>

      <div className="bg-dark-400 w-[82vw] h-[70vh] mt-2 rounded-lg flex items-center relative p-10 mb-20"
       style={{
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)"
      }}>
        <div className={`w-full h-full rounded-md p-0 flex items-start ${animationClass}`}>
          <div className="w-[500px] h-[400px] mt-1 ml-2 relative">
            <img
              src={activeEvent.image || madhack2}
              alt={activeEvent.name || "Default Event"}
              className="h-full rounded-xl border-4 border-white object-cover"
              style={{
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)"
              }}
            />
            {activeClub.image && (
              <img
                src={activeClub.image || madhack2} // Ensure it uses a default image if the club image is missing
                alt={activeClub.name || "Default Club"}
                className="absolute top-4 right-4 w-16 h-16 rounded-full border-4 border-white shadow-lg"
              />
            )}
          </div>
          <div className="ml-10">
            <div className="flex items-left space-x-6 mt-0 ml-0 p-5">
            <div className="absolute top-2 right-0 transform flex items-center space-x-3 ml-4  border-[#AEC90A] p-2 rounded-full">
  <button
    onClick={handlePrevClick}
    style={{
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)"
      }}
    className="text-[#AEC90A]  bg-black text-4xl hover:bg-[#AEC90A] hover:text-black p-2 rounded-full transition-all"
  >
    <GrFormPrevious />
  </button>
  <button
    onClick={handleNextClick}
    style={{
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)"
      }}
    className="text-[#AEC90A]  bg-black text-4xl hover:bg-[#AEC90A] hover:text-black p-2 rounded-full transition-all"
  >
    <GrFormNext />
  </button>
</div>
            </div>
            

            <div className="relative mt-10 bg-dark-500 rounded-md w-[700px] mx-auto h-26 flex items-center p-5"  style={{
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)"
              }}>
              <div className="flex items-center h-full">
                
               
                <div className="ml-3 flex flex-col justify-center">
                  <div className="flex items-center">
                  <RiTeamFill className="ml-3 w-6 h-6 mb-1 text-primary" />
<span>   ''</span>
                    <p className="text-[25px] text-white font-normal flex items-center mr-5 mt-0">
                      {activeEvent.name}
                    </p>
                  </div>
                  <div className="flex items-center text-[14px] text-white mt-5 ml-5">
                    <FaClock className="mr-3 w-6 h-7 text-primary" />
                    <span className="mr-8 text-[14px] font-normal text-white">{activeEvent.date}</span>
                    <MdLocationOn className="mr-3 w-6 h-7 text-primary" />
                    <span className="mr-10">{activeEvent.venue}</span>
                  </div>
                </div>
              </div>
            

            </div>
            <div className="mt-10 ml-0 flex justify-center items-center gap-4">
              <div className="text-[15px] text-white font-normal bg-dark-background w-1/2 h-12 p-2 rounded-md flex items-center justify-center hover:border border-[#DDFF00]" 
               style={{
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)"
              }}>
                Deadline : <span className="ml-2 text-[15px] font-normal text-primary">{activeEvent.date}</span>
              </div>
              <div className="text-[15px] font-normal text-white bg-dark-background w-1/2 ml-0 h-12 p-2 rounded-md flex items-center justify-center hover:border border-[#DDFF00]" 
               style={{
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)"
              }}>
                Event Date : <span className="ml-2 text-[15px] font-normal text-primary">{activeEvent.date}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvent;
