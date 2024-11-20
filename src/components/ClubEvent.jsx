import React, { useState, useEffect} from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { IconButton } from '@material-tailwind/react';
import { FaArrowRight, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { HiDocumentText } from "react-icons/hi2";
import ReactModal from 'react-modal';



//upcoming events of rac
import rac1 from "../assets/events/trail.jpg";
import rac2 from "../assets/events/snap.jpg";
import rac3 from "../assets/events/dev.jpg";
import rac4 from "../assets/events/sport.jpg";
//past events of rac
import rac5 from "../assets/events/gtech.jpg";
import rac6 from "../assets/events/training.jpg";


import LikeButton from './LikeButton';
import { MdAdd, MdEdit, MdDelete } from "react-icons/md";
import ClubsService from "../service/ClubsService";
import { Token } from "@mui/icons-material";
import EventService from "../service/EventService";

ReactModal.setAppElement('#root');


const ClubEvent = ({ club }) => {
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);  
  const [loading, setLoading] = useState(true);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);

// // Decode token and retrieve user_id
// const getUserIdFromToken = () => {
//   const token = localStorage.getItem('token'); // Or wherever the token is stored
//   if (!token) return null;

//   try {
//     const decoded = jwtDecode(token);
//     console.log("Decoded user_id:", decoded.user_id); // Print user_id to check
//     return decoded.user_id; // Ensure this matches the user ID key in your JWT payload
//   } catch (error) {
//     console.error("Invalid token", error);
//     return null;
//   }
// };


  const [presidentId, setPresidentId] = useState(-1);
  const userId = localStorage.getItem("User_Id");

  const storedToken = localStorage.getItem("token");
  console.log("Retrieved Token from localStorage:", storedToken); // Log to console

  useEffect(() => {
    console.log("yoooooooo: " + userId);
    
    fetchClubData();
  }, []);

  // Helper function to determine event status based on budget_status and iud_status
  const getEventStatus = (budgetStatus, iudStatus) => {
    if (budgetStatus === 1 && iudStatus === 1) return "Approved";
    if ((budgetStatus === 1 && iudStatus === -1) || (budgetStatus === -1 && iudStatus === -1)) return "Pending";
    if (budgetStatus === 1 && iudStatus === 0) return "Rejected";
    if (budgetStatus === 0 && iudStatus === -1) return "Rejected";
    if (budgetStatus === 0 && iudStatus === 0) return "Rejected";
    return "Pending";
  };


  // Fetch club data for the specific club_id to get president_id
  const fetchClubData = async () => {
    setLoading(true);
    try {
     

      console.log("Club Id:", club.club_id); // Log to console

      const clubData = await ClubsService.getClubById(club.club_id, storedToken)
      console.log("Fetched Club Data:", clubData); // Log the club data

      setPresidentId(clubData.content.president ? clubData.content.president.id : null);  
      console.log("hiiii: " + userId); // Log the president id
      getEvents();
      setLoading(false);
    } catch (error) {
      console.error("Error fetching club data:", error);
      setLoading(false);
    }
  };


// Check if the current path matches the specified routes
  const isAuthorizedUser = () => {
    return location.pathname.startsWith('/president') || 
           location.pathname.startsWith('/secretary') || 
           location.pathname.startsWith('/treasurer');
  };

  const getButtonStyles = (status) => {
    if (status === "Approved") {
      return "";
    } else {
      return "bg-gray-400 text-white cursor-not-allowed";
    }
  };
  
  const getButtonDisabled = (status) => {
    return status !== "Approved";
  };
   
  const handleEvent = () => {
    navigate(`/club/${club.club_id}/add-event`);
  };


  const handleViewEvent = (event) => {
    setSelectedEvent(event);
    setModalIsOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedEvent(null);
  };  

  const handleExploreEvent = (event) => {
    let basePath;

    switch (true) {
      case location.pathname.startsWith('/president'):
        basePath = '/president/club/event';
        break;
        case location.pathname.startsWith('/student'):
          basePath = '/student/club/event';
          break;
      case location.pathname.startsWith('/secretary'):
        basePath = '/secretary/club/event';
        break;
      case location.pathname.startsWith('/admin'):
        basePath = '/admin/club/event';
        break;
      case location.pathname.startsWith('/member'):
        basePath = '/member/club/event';
        break;
      case location.pathname.startsWith('/treasurer'):
        basePath = '/treasurer/club/event';
        break;
      default:
        basePath = '/oc/club/event';
        break;
    }

    const clubDetails = {
      clubImage: club.club_image,
      //clubId: club.club_id,
      clubId: club.club_id,
      ...event,
    };

    navigate(basePath, { state: clubDetails });
  };

  const handleEditEvent = (event) => {
    console.log(`Editing ${event.name}`);
    // Add your edit logic here
  };

  const handleDeleteEvent = (event) => {
    console.log(`Deleting ${event.name}`);
    // Add your delete logic here
  };

  const getEvents = async () => {
    try {
      // Fetch the events data from the API
      const eventsData = await EventService.getAllEventsById(club.club_id, storedToken);
      console.log(eventsData);
  
      const today = new Date(); // Get the current date
      const formattedData = {
        upcoming: [],
        past: [],
      };
  
      // Process and format each event
      eventsData.content.forEach((event) => {
        const eventDate = new Date(event.date[0], event.date[1] - 1, event.date[2]); // Convert event.date to a Date object
  
        const eventDetails = {
          event_id: event.event_id,
          name: event.name,
          image: event.event_image ? event.event_image : rac1,
          date: `${event.date[0]}/${event.date[1]}/${event.date[2]}`,
          venue: event.venue,
          status: getEventStatus(event.budget_status, event.iud_status),
          link: "https://example.com/join-oc",
        };
  
        // Categorize the event as upcoming or past
        if (eventDate >= today) {
          formattedData.upcoming.push(eventDetails);
        } else {
          formattedData.past.push(eventDetails);
        }
      });
  
      // Update state with categorized events
      setUpcomingEvents(formattedData.upcoming);
      setPastEvents(formattedData.past);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };
  


  // const { upcoming, past } = getEvents(); Commented hereeeee

  const getStatusIcon = (status) => {
    switch (status) {
      case "Approved":
        return <FaCheckCircle className="text-[#AEC90A] text-4xl" />;
      case "Rejected":
        return <FaTimesCircle className="text-red-500 text-4xl" />;
      case "Pending":
        return null;
      case "Completed":
        return <FaCheckCircle className="text-green-500 text-4xl" />;
      default:
        return null;
    }
  };

  return (
    <>
    {loading ? <h1 className="text-white">New Loading ....</h1> :   <div className="flex justify-center items-center flex-col p-4 rounded-2xl bg-black opacity-70">
      {userId == presidentId && (
        <div className='flex justify-end mb-2'>
          <button
            className="bg-[#AEC90A] text-black flex items-center justify-center rounded-full hover:bg-[#AEC90A] hover:text-black p-2 absolute top-10 right-32 z-10"
            onClick={handleEvent}
          >
         <MdAdd size={24} />
          </button>
        </div>
      )}

      {/* Upcoming Events */}
      <div className="w-full max-w-screen-lg">
        <h2 className="text-2xl font-bold text-white mb-4">Upcoming</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        {upcomingEvents
  .filter((event) => {
    // Show all events if they're not rejected
    if (event.status !== "Rejected") return true;

    // Show rejected events only for the president's path
    return location.pathname.includes('/president');
  })
  .map((event, index) => (
            <div
              key={index}
              className="relative rounded-lg p-4 custom-card"
              onMouseEnter={() => {
                event.status === "Rejected" && setHoveredEvent(event);
                setHoveredIndex(index);
              }}
              onMouseLeave={() => {
                event.status === "Rejected" && setHoveredEvent(null);
                setHoveredIndex(null);
              }}
            > 
              <div className="relative custom-3d-shadow custom-card">
                <img src={event.image} alt={event.name} className="w-full h-72 object-cover rounded-lg" />
                <div className="absolute top-0 left-0 m-2 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                  <div className="relative group">
                    {isAuthorizedUser() && getStatusIcon(event.status)}
                    {event.status === "Rejected" && hoveredEvent === event && (
                      <div className="absolute top-0 left-0 mt-2 ml-2 bg-red-600 text-white p-4 rounded-lg shadow-lg z-50">
                        <h3 className="text-2xl font-bold">Rejected</h3>
                        <p className="mt-1 text-lg">{event.reason}</p>
                      </div>
                    )}
                  </div>
                </div>
                {event.status === "Approved" && (
  <div
    className={`w-10 h-10 absolute bottom-0 right-0 m-2 p-1 rounded-full flex justify-center items-center ${getButtonStyles(event.status)}`}
    style={{ backgroundColor: '#AEC90A', color: '#000' }}
  >
    <IconButton
      onClick={() => handleExploreEvent(event)}
      className="p-1"
      disabled={getButtonDisabled(event.status)}
    >
      <FaArrowRight className="text-lg text-black" />
    </IconButton>
  </div>
)}


                {isAuthorizedUser() && hoveredIndex === index && (
                  <div className="absolute top-2 right-2 flex space-x-2">
                    <IconButton className="text-white bg-black" onClick={() => handleEditEvent(event)}>
                      <MdEdit size={20} />
                    </IconButton>
                    <IconButton className="text-white bg-black" onClick={() => handleDeleteEvent(event)}>
                      <MdDelete size={20} />
                    </IconButton>
                    <IconButton className="text-white bg-black p-5" onClick={() => handleViewEvent(event)}>
                    <HiDocumentText size={20} />                 </IconButton>
                    
                  </div>
                )}
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
        {pastEvents
  .filter((event) => {
    // Show all events if they're not rejected
    if (event.status !== "Rejected") return true;

    // Show rejected events only for the president's path
    return location.pathname.includes('/president');
  })
  .map((event, index) => (            <div key={index} className="relative rounded-lg p-4 custom-card">
              <div className="relative custom-3d-shadow custom-card">
                <img src={event.image} alt={event.name} className="w-full h-72 object-cover rounded-lg" />
                <div className="absolute top-0 left-0 m-2 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                  {getStatusIcon(event.status)}
                </div>
                <div className="w-10 h-10 absolute bottom-0 right-0 m-2 p-1 rounded-full flex justify-center items-center custom-card" style={{ backgroundColor: '#AEC90A', color: '#000' }}>
                  <IconButton
                    className="font-extrabold text-lg text-black"
                    onClick={() => handleExploreEvent(event)}
                  >
                    <FaArrowRight />
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

      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Event Details"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div className="modal-content bg-neutral-900 text-white p-4 rounded-lg shadow-md">
          {selectedEvent && (
            <>
              <h2 className="text-2xl font-semibold mb-4">{selectedEvent.name}</h2>
              <img src={selectedEvent.image} alt={selectedEvent.name} className="w-full h-40 object-cover rounded-md mb-2" />
              <p className="text-gray-300 mb-2">Date: {selectedEvent.date}</p>
              <p className="text-gray-300 mb-2">Venue: {selectedEvent.venue}</p>
              <p className="text-gray-300 mb-2">Status: {selectedEvent.status}</p>
              {selectedEvent.reason && <p className="text-red-300 mb-2">Reason: {selectedEvent.reason}</p>}
              <button
                className="bg-red-500 text-white font-semibold px-4 py-2 rounded-lg shadow-md mt-4"
                onClick={closeModal}
              >
                Close
              </button>
            </>
          )}
        </div>
      </ReactModal>
    </div>}
  </>
  );
};

export default ClubEvent;
