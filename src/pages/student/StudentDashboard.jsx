// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Sidebar from "../../components/Sidebar";
// import Navbar from "../../components/Navbar";
// import Upcoming from "../../components/Upcoming";
// import Feedback from "../../components/Feedback";

// const Dashboard = () => {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchEvents = async () => {
//       const token = localStorage.getItem('token'); // Get token from localStorage
//       if (!token) {
//         console.error("No token found");
//         setError("Authentication token is missing");
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await axios.get("http://localhost:8080/event/getAllEvents", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         console.log("Fetched events:", response.data); // Debugging line
//         setEvents(response.data.content); // Assuming `content` contains the array of events
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching events:", err);
//         setError("Failed to load events");
//         setLoading(false);
//       }
//     };

//     fetchEvents();
//   }, []);

//   console.log("Events state before render:", events);
//   console.log("Loading state:", loading);
//   console.log("Error state:", error);

//   // Inline Event component definition
//   const Event = ({ eventName, description, date, venue, image }) => {
//     if (!eventName) {
//       console.error("Event data is missing or incomplete");
//       return null; // Prevent rendering if any prop is undefined
//     }

//     return (
//       <div className="event-card p-4 bg-neutral-800 rounded-lg shadow-lg mb-4">
//         <img
//           src={image || 'default-image-url.jpg'}
//           alt={eventName}
//           className="w-full h-48 object-cover rounded-lg mb-2"
//         />
//         <h2 className="text-lg font-bold mb-2">{eventName}</h2>
//         <p className="text-sm mb-2">{description}</p>
//         <p className="text-sm mb-2">Date: {date}</p>
//         <p className="text-sm">Venue: {venue}</p>
//       </div>
//     );
//   };

//   // return (
//   //   <div className="fixed inset-0 flex">
//   //     <Sidebar className="flex-shrink-0" />
//   //     <div className="flex flex-col flex-1">
//   //       <Navbar className="sticky top-0 z-10 p-4" />
//   //       <div className="bg-neutral-900 text-white flex flex-1 overflow-y-auto">
//   //         <div className="w-2/4 px-2 ml-2 overflow-y-auto">
//   //           {loading && <div className="text-[#AEC90A]">Loading events...</div>}
//   //           {error && <div className="text-red-500">{error}</div>}
//   //           {!loading && !error && events.length === 0 && (
//   //             <div className="text-[#AEC90A]">No events yet</div>
//   //           )}
//   //           {!loading &&
//   //             !error &&
//   //             events.length > 0 &&
//   //             events.map((event) => {
//   //               console.log("Rendering event:", event); // Debugging line
//   //               return (
//   //                 <Event
//   //                   key={event.event_id}
//   //                   eventName={event.name}
//   //                   description={event.purpose}
//   //                   // date={event.date}
//   //                   date={
//   //                     new Intl.DateTimeFormat('en-GB', {
//   //                       day: '2-digit',
//   //                       month: '2-digit',
//   //                       year: 'numeric',
//   //                     }).format(new Date(event.date))
//   //                   }
//   //                   venue={event.venue}
//   //                   image={
//   //                     event.event_image && event.event_image.startsWith('http')
//   //                       ? event.event_image // Use full URL if provided
//   //                       : event.event_image
//   //                       ? `http://localhost:8080/uploads/events/eventImages/${event.event_image}` // Construct URL for backend-served images
//   //                       : 'default-image-url.jpg' // Fallback image if no image is provided
//   //                   }
//   //                 />
//   //               );
//   //             })}
//   //         </div>
//   //         <div className="w-2/4 flex flex-col py-1 h-full">
//   //           <div className="mb-4 h-[380px] overflow-y-auto rounded-2xl">
//   //             <Upcoming />
//   //           </div>
//   //           <div className="flex-1 overflow-y-auto mb-4">
//   //             <Feedback />
//   //           </div>
//   //         </div>
//   //       </div>
//   //     </div>
//   //   </div>
//   // );
//   return (
//     <div className="fixed inset-0 flex">
//       <Sidebar className="flex-shrink-0" />
//       <div className="flex flex-col flex-1">
//         <Navbar className="sticky top-0 z-10 p-4" />
//         <div className="bg-neutral-900 text-white flex flex-1 overflow-y-auto">
//           <div className="w-2/4 px-2 ml-2 overflow-y-auto">
//             {loading && <div className="text-[#AEC90A]">Loading events...</div>}
//             {error && <div className="text-red-500">{error}</div>}
//             {!loading && !error && events.length === 0 && (
//               <div className="text-[#AEC90A]">No events yet</div>
//             )}
//             {!loading &&
//               !error &&
//               events.length > 0 &&
//               events.map((event) => {
//                 return (
//                   <div key={event.event_id} className="border p-4 mb-4 rounded-lg">
//                     <img
//                       src={
//                         event.event_image && event.event_image.startsWith('http')
//                           ? event.event_image
//                           : event.event_image
//                           ? `http://localhost:8080/uploads/events/eventImages/${event.event_image}`
//                           : 'default-image-url.jpg'
//                       }
//                       alt={event.name}
//                       className="w-full h-40 object-cover rounded-md mb-2"
//                     />
//                     <h3 className="text-lg font-bold">{event.name}</h3>
//                     <p className="text-sm">{event.purpose}</p>
//                     <p className="text-sm">
//                       {new Intl.DateTimeFormat('en-GB', {
//                         day: '2-digit',
//                         month: '2-digit',
//                         year: 'numeric',
//                       }).format(new Date(event.date))}
//                     </p>
//                     <p className="text-sm">{event.venue}</p>
//                     <button
//                       onClick={() => {
//                         setSelectedEvent(event); // Set the selected event
//                         setIsModalOpen(true); // Open the modal
//                       }}
//                       className="mt-2 px-4 py-2 bg-[#AEC90A] text-black rounded hover:bg-[#93b208]"
//                     >
//                       Register
//                     </button>
//                   </div>
//                 );
//               })}
//           </div>
//           <div className="w-2/4 flex flex-col py-1 h-full">
//             <div className="mb-4 h-[380px] overflow-y-auto rounded-2xl">
//               <Upcoming />
//             </div>
//             <div className="flex-1 overflow-y-auto mb-4">
//               <Feedback />
//             </div>
//           </div>
//         </div>
//       </div>
//       <RegistrationModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         event={selectedEvent}
//       />
//     </div>
//   );

// };

// export default Dashboard;
import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import Upcoming from "../../components/Upcoming";
import Feedback from "../../components/Feedback";
import RegistrationModal from "../../components/RegistrationModal"; // Import RegistrationModal
import {
  AiOutlineCalendar,
  AiOutlineInfoCircle,
  AiOutlineEnvironment,
  AiOutlineClockCircle,
} from "react-icons/ai";

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null); // State for selected event
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  useEffect(() => {
    const fetchEvents = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        setError("Authentication token is missing");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:8080/event/getAllEvents",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEvents(response.data.content); // Assuming `content` contains the events array
        setLoading(false);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events");
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const Event = ({ eventName, description, date, venue, image }) => {
    if (!eventName) return null;

    return (
      <div className="event-card p-4 bg-neutral-800 rounded-lg shadow-lg mb-4">
        <img
          src={image || "default-image-url.jpg"}
          alt={eventName}
          className="w-full h-48 object-cover rounded-lg mb-2"
        />
        <h2 className="text-lg font-bold mb-2">{eventName}</h2>
        <p className="text-sm mb-2">{description}</p>
        <p className="text-sm mb-2">Date: {date}</p>
        <p className="text-sm">Venue: {venue}</p>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 flex">
      <Sidebar className="flex-shrink-0" />
      <div className="flex flex-col flex-1">
        <Navbar className="sticky top-0 z-10 p-4" />
        <div className="bg-neutral-900 text-white flex flex-1 overflow-y-auto">
          <div className="w-2/4 px-2 ml-2 overflow-y-auto">
            {loading && <div className="text-[#AEC90A]">Loading events...</div>}
            {error && <div className="text-red-500">{error}</div>}
            {!loading && !error && events.length === 0 && (
              <div className="text-[#AEC90A]">No events yet</div>
            )}
            {!loading &&
              !error &&
              events.length > 0 &&
              events.map((event) => (
                <div
                  key={event.event_id}
                  className="border p-4 mb-4 rounded-lg"
                >
                  <img
                    src={
                      event.event_image && event.event_image.startsWith("http")
                        ? event.event_image
                        : event.event_image
                        ? `http://localhost:8080/uploads/events/eventImages/${event.event_image}`
                        : "default-image-url.jpg"
                    }
                    alt={event.name}
                    className="w-full h-40 object-cover rounded-md mb-2"
                  />
                  <h3 className="text-lg font-bold">{event.name}</h3>
                  {/* <p className="text-sm">{event.purpose}</p>
                  <p className="text-sm">
                    {new Intl.DateTimeFormat("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    }).format(new Date(event.date))}
                  </p>
                  <p className="text-sm">{event.venue}</p> */}

                  <div className="flex items-center mb-2">
                    <AiOutlineCalendar
                      className="text-[#AEC90A] mr-2"
                      size={20}
                    />{" "}
                    {/* Event Name icon */}
                    <p className="text-sm font-bold">{event.name}</p>
                  </div>
                  <div className="flex items-center mb-2">
                    <AiOutlineInfoCircle
                      className="text-[#AEC90A] mr-2"
                      size={20}
                    />{" "}
                    {/* Purpose icon */}
                    <p className="text-sm">{event.purpose}</p>
                  </div>
                  <div className="flex items-center mb-2">
                    <AiOutlineClockCircle
                      className="text-[#AEC90A] mr-2"
                      size={20}
                    />{" "}
                    {/* Date icon */}
                    <p className="text-sm">
                      {new Intl.DateTimeFormat("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      }).format(new Date(event.date))}
                    </p>
                  </div>
                  <div className="flex items-center mb-2">
                    <AiOutlineEnvironment
                      className="text-[#AEC90A] mr-2"
                      size={20}
                    />{" "}
                    {/* Venue icon */}
                    <p className="text-sm">{event.venue}</p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedEvent(event);
                      setIsModalOpen(true);
                    }}
                    className="mt-2 px-4 py-2 bg-[#AEC90A] text-black rounded hover:bg-[#93b208]"
                  >
                    Register
                  </button>
                </div>
              ))}
          </div>
          <div className="w-2/4 flex flex-col py-1 h-full">
            <div className="mb-4 h-[380px] overflow-y-auto rounded-2xl">
              <Upcoming />
            </div>
            <div className="flex-1 overflow-y-auto mb-4">
              <Feedback />
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <RegistrationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          event={selectedEvent}
        />
      )}
    </div>
  );
};

export default Dashboard;
