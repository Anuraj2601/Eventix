import { BsCalendar2EventFill } from "react-icons/bs";
import { RiTeamFill } from "react-icons/ri";
import { FaClock } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import EventService from "../service/EventService";
import React, { useState, useEffect } from "react";
import madhack2 from "../assets/madhack2.png";
import ClubsService from "../service/ClubsService";

const UpcomingEvent = () => {
  const [activeButton, setActiveButton] = useState("IEEE");
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState("");
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [clubDetails, setClubDetails] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const eventsPerPage = 3; // Number of events to display per page

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
            image: event.event_image || madhack2,
            date: `${event.date[0]}/${event.date[1]}/${event.date[2]}`,
            venue: event.venue,
            club_id: event.club_id,
          };

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

  // Pagination logic for mobile
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = upcomingEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex flex-col items-center mt-3 px-4 sm:px-6 md:px-8">
      <div className="flex items-center bg-dark-background p-4 mt-6 rounded-lg">
        <BsCalendar2EventFill className="text-[#AEC90A] w-9 h-9 shadow-lg" />
        <span className="text-lg font-normal pl-3 text-[#AEC90A] uppercase">Upcoming events</span>
      </div>

      <div
        className="bg-dark-400 w-full sm:w-[90%] md:w-[80%] h-auto mt-4 rounded-lg flex flex-col md:flex-row items-center relative p-6 md:p-10 mb-20"
        style={{
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)",
        }}
      >
        <div className={`w-full md:w-[45%] rounded-md p-0 flex items-center ${animationClass}`}>
          <div className="relative w-full">
            <img
              src={upcomingEvents[currentEventIndex]?.image || madhack2}
              alt={upcomingEvents[currentEventIndex]?.name || "Default Event"}
              className="h-[200px] md:h-[400px] w-full rounded-xl border-4 border-white object-cover"
              style={{
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)",
              }}
            />
          </div>
        </div>

        <div className="w-full md:w-[50%] mt-6 md:mt-0 md:ml-10 flex flex-col">
          <div className="flex items-center space-x-3 mb-4">
            <RiTeamFill className="w-6 h-6 text-primary" />
            <p className="text-[20px] md:text-[25px] text-white font-normal">
              {upcomingEvents[currentEventIndex]?.name}
            </p>
          </div>
          <div className="flex items-center text-sm md:text-base text-white space-x-4">
            <FaClock className="w-5 h-5 text-primary" />
            <span>{upcomingEvents[currentEventIndex]?.date}</span>
            <MdLocationOn className="w-5 h-5 text-primary" />
            <span>{upcomingEvents[currentEventIndex]?.venue}</span>
          </div>
        </div>

        {/* Navigation Buttons on Web */}
        <div className="md:flex hidden justify-between items-center w-full absolute top-1/2 transform -translate-y-1/2 left-2">
          <button
            onClick={handlePrevClick}
            className="text-[#AEC90A] bg-black text-xl p-2 rounded-full hover:bg-[#AEC90A] hover:text-black transition-all"
          >
            <GrFormPrevious />
          </button>
          <button
            onClick={handleNextClick}
            className="text-[#AEC90A] bg-black text-xl p-2 rounded-full hover:bg-[#AEC90A] hover:text-black transition-all"
          >
            <GrFormNext />
          </button>
        </div>
      </div>

      {/* Swiping Events on Mobile */}
      <div className="md:hidden w-full overflow-x-auto flex space-x-4">
        {currentEvents.map((event, index) => (
          <div key={index} className="w-[90%] sm:w-[60%] md:w-[30%] h-[250px] flex-shrink-0">
            <div className="relative h-full">
              <img
                src={event.image || madhack2}
                alt={event.name || "Default Event"}
                className="h-[200px] w-full rounded-xl border-4 border-white object-cover"
              />
              <p className="text-white text-center mt-4">{event.name}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default UpcomingEvent;
