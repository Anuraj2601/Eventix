// import React from 'react';
// import Sidebar from '../../components/Sidebar';
// import Navbar from '../../components/Navbar';
// import Event from '../../components/Event';
// import Upcoming from '../../components/Upcoming';
// import Feedback from '../../components/Feedback';

// // Import images
// import dp from '../../assets/clubs/ieee.png';
// import dp1 from '../../assets/clubs/rotaract.png';
// import madhackImage from '../../assets/events/flix.jpg';
// import hackathonImage from '../../assets/events/rainbow.jpg';
// import rekaImage from '../../assets/events/journey.jpg';
// import careerfairImage from '../../assets/events/session.jpg';
// import dhackImage from '../../assets/events/install.jpg';

// import vesakImage from "../../assets/vesak.jpg";
// import eidImage from "../../assets/farewell.jpg";
// import farewellImage from "../../assets/farewell.jpg";
// import esalaImage from "../../assets/esala.jpg";
// import posonImage from "../../assets/poson.jpg";
// import { useNavigate } from 'react-router-dom';

// const Dashboard = () => {

//   const events = [
//     {
//       id: "2",
//       publisher_name: "John Doe",
//       publisher_position: "President of Club IEEE",
//       publisher_img: dp1,
//       event: "Tech Symposium 2025",
//       deadline: "10th of April 2025",
//       description: "A symposium showcasing the latest in technology and innovation.",
//       date: "25.09.2025",
//       time: "10 am",
//       venue: "UCSC Mini Auditorium",
//       contact: "0217988235",
//       email: "techsymposium@ucsc.edu",
//       image: hackathonImage,
//     },
//     {
//       id: "1",
//       publisher_name: "Lori Kletzer",
//       publisher_position: "President of Club Rotaract",
//       publisher_img: dp,
//       event: "2025 Career Fair",
//       deadline: "30th of March 2025",
//       description: "Join us for the annual career fair to meet potential employers and learn about job opportunities.",
//       date: "20.08.2025",
//       time: "9 am",
//       venue: "UCSC Mini Auditorium",
//       contact: "0217988234",
//       email: "career25@gmail.com",
//       image: eidImage,

//     },

//     {
//       id: "3",
//       publisher_name: "Jane Smithhhhhhhhhhhhhh",
//       publisher_position: "President of Club ACM",
//       publisher_img: dp,
//       event: "Health and Wellness Fair",
//       deadline: "15th of May 2025",
//       description: "An event focused on promoting health and wellness among students.",
//       date: "30.05.2025",
//       time: "8 am",
//       venue: "UCSC Mini Auditorium",
//       contact: "0217988236",
//       email: "wellnessfair@ucsc.edu",
//       image: rekaImage,
//     },
//     {
//       id: "4",
//       publisher_name: "Mark Johnson",
//       publisher_position: "President of Club Rotaract",
//       publisher_img: dp1,
//       event: "Alumni Homecoming 2025",
//       deadline: "20th of June 2025",
//       description: "Reconnect with fellow alumni and celebrate our university's achievements.",
//       date: "30.06.2025",
//       time: "8 am",
//       venue: "UCSC Mini Auditorium",
//       contact: "0217988237",
//       email: "homecoming@ucsc.edu",
//       image: careerfairImage,
//     },
//     {
//       id: "5",
//       publisher_name: "John Doe",
//       publisher_position: "President of Club IEEE",
//       publisher_img: dp,
//       event: "Cultural Festival 2025",
//       deadline: "5th of August 2025",
//       description: "Celebrate the diversity of our campus with performances, food, and art from different cultures.",
//       date: "03.05.2025",
//       time: "8 am",
//       venue: "UCSC Mini Auditorium",
//       contact: "0217988238",
//       email: "culturalfest@ucsc.edu",
//       image: dhackImage,
//     }
//   ];

//   return (
//     <div className="fixed inset-0 flex">
//       <Sidebar className="flex-shrink-0" />
//       <div className="flex flex-col flex-1">
//         <Navbar className="sticky top-0 z-10 p-4" />
//         <div className="bg-neutral-900 text-white flex flex-1 overflow-y-auto">
//   <div className="w-2/4 px-2 ml-2 overflow-y-auto">
//     {events.length === 0 && <div className='text-[#AEC90A]'>No events yet</div>}
//     {events.length > 0 && events.map(event => <Event event={event} key={event.id} />)}
//   </div>
//   <div className="w-2/4 flex flex-col py-1 h-full">
//     <div className="mb-4 h-[380px] overflow-y-auto rounded-2xl ">
//       <Upcoming />
//     </div>
//     <div className="flex-1  overflow-y-auto  mb-4" >      <Feedback />

//     </div>
//   </div>
// </div>

//         </div>
//       </div>
//   );
// }

// export default Dashboard;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Sidebar from '../../components/Sidebar';
// import Navbar from '../../components/Navbar';
// import Event from '../../components/Event';
// import Upcoming from '../../components/Upcoming';
// import Feedback from '../../components/Feedback';

// // Import images (optional fallback or default images)
// import dp from '../../assets/clubs/ieee.png';
// import dp1 from '../../assets/clubs/rotaract.png';

// const Dashboard = () => {
//   // State variables for events, loading, and error handling
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch events from the backend when the component mounts
//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         // Replace with your backend endpoint for fetching events
//         const response = await axios.get('http://localhost:8080/api/v1/event/getAllEvents');
//         setEvents(response.data);
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching events:', err);
//         setError('Failed to load events');
//         setLoading(false);
//       }
//     };

//     fetchEvents();
//   }, []);

//   return (
//     <div className="fixed inset-0 flex">
//       <Sidebar className="flex-shrink-0" />
//       <div className="flex flex-col flex-1">
//         <Navbar className="sticky top-0 z-10 p-4" />
//         <div className="bg-neutral-900 text-white flex flex-1 overflow-y-auto">
//           <div className="w-2/4 px-2 ml-2 overflow-y-auto">
//             {loading && <div className='text-[#AEC90A]'>Loading events...</div>}
//             {error && <div className='text-red-500'>{error}</div>}
//             {!loading && !error && events.length === 0 && <div className='text-[#AEC90A]'>No events yet</div>}
//             {!loading && events.length > 0 && events.map(event => (
//               <Event event={event} key={event.id} />
//             ))}
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
//     </div>
//   );
// }

// export default Dashboard;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Sidebar from "../../components/Sidebar";
// import Navbar from "../../components/Navbar";
// import Event from "../../components/Event";
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
//         const response = await axios.get("http://localhost:8080/api/v1/event/getAllEvents", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         console.log("Fetched events:", response.data); // Add this line for debugging
//         setEvents(response.data);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching events:", err);
//         setError("Failed to load events");
//         setLoading(false);
//       }
//     };
  
//     fetchEvents();
//   }, []);
  
//   console.log("Events state:", events);
  

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
//             {/* {!loading && events.length > 0 && events.map(event => (
//               <Event event={event} key={event.id} />
//             ))} */}
//             {!loading &&
//               events.length > 0 &&
//               events.map((event) => (
//                 <Event
//                   key={event.event_id}
//                   eventName={event.name}
//                   venue={event.venue}
//                   date={event.date}
//                   purpose={event.purpose}
//                   imageUrl={event.image_url}
                 
//                 />
//               ))}
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
//     </div>
//   );
// };

// // export default Dashboard;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Sidebar from "../../components/Sidebar";
// import Navbar from "../../components/Navbar";
// import Event from "../../components/Event";
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
//         const response = await axios.get("http://localhost:8080/api/v1/event/getAllEvents", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         console.log("Fetched events:", response.data); // Debugging line
//         setEvents(response.data);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching events:", err);
//         setError("Failed to load events");
//         setLoading(false);
//       }
//     };

//     fetchEvents();
//   }, []);

//   console.log("Events state:", events);

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
//               events.map((event) => (
//                 <Event
//                   key={event.event_id}
//                   eventName={event.name}
//                   // publisherName={event.publisher_name}
//                   // publisherPosition={event.publisher_position}
//                   // publisherImg={event.publisher_img}
//                   // deadline={event.deadline}
//                   description={event.purpose}
//                   date={event.date}
//                   // time={event.time}
//                   venue={event.venue}
//                   // contact={event.contact}
//                   // email={event.email}
//                   image={event.event_image}
//                 />
//               ))}
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
//     </div>
//   );
// };

// export default Dashboard;
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
//         const response = await axios.get("http://localhost:8080/api/v1/event/getAllEvents", {
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
//                 console.log("Rendering event:", event); // Debugging line
//                 return (
//                   <Event
//                     key={event.event_id}
//                     eventName={event.name}
//                     description={event.purpose}
//                     date={event.date}
//                     venue={event.venue}
//                     // image={event.event_image}
//                     // image={
//                     //   event.event_image 
//                     //     ? `http://localhost:8080/static/uploads/posts/${event.event_image}`// Construct full image URL
//                     //     : 'default-image-url.jpg' // Fallback image if no image is provided
//                     // }
//                     image={
//                       event.event_image 
//                         ? `http://localhost:8080/api/v1/event/image/${event.event_image}` // Ensure this matches the backend's path
//                         : 'default-image-url.jpg' // Fallback image if no image is provided
//                     }
                    
//                   />
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
//     </div>
//   );
// };

// export default Dashboard;
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
//         const response = await axios.get("http://localhost:8080/api/v1/event/getAllEvents", {
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
//                 console.log("Rendering event:", event); // Debugging line
//                 return (
//                   <Event
//                     key={event.event_id}
//                     eventName={event.name}
//                     description={event.purpose}
//                     date={event.date}
//                     venue={event.venue}
//                     image={
//                       event.event_image 
//                         ? `http://localhost:8080/api/v1/event/image/${event.event_image}` // Ensure this matches the backend's path
//                         : 'default-image-url.jpg' // Fallback image if no image is provided
//                     }
//                   />
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

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const token = localStorage.getItem('token'); // Get token from localStorage
      if (!token) {
        console.error("No token found");
        setError("Authentication token is missing");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:8080/event/getAllEvents", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Fetched events:", response.data); // Debugging line
        setEvents(response.data.content); // Assuming `content` contains the array of events
        setLoading(false);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events");
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  console.log("Events state before render:", events);
  console.log("Loading state:", loading);
  console.log("Error state:", error);

  // Inline Event component definition
  const Event = ({ eventName, description, date, venue, image }) => {
    if (!eventName) {
      console.error("Event data is missing or incomplete");
      return null; // Prevent rendering if any prop is undefined
    }

    return (
      <div className="event-card p-4 bg-neutral-800 rounded-lg shadow-lg mb-4">
        <img
          src={image || 'default-image-url.jpg'}
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
              events.map((event) => {
                console.log("Rendering event:", event); // Debugging line
                return (
                  <Event
                    key={event.event_id}
                    eventName={event.name}
                    description={event.purpose}
                    date={event.date}
                    venue={event.venue}
                    image={
                      event.event_image && event.event_image.startsWith('http')
                        ? event.event_image // Use full URL if provided
                        : event.event_image
                        ? `http://localhost:8080/uploads/events/eventImages/${event.event_image}` // Construct URL for backend-served images
                        : 'default-image-url.jpg' // Fallback image if no image is provided
                    }
                  />
                );
              })}
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
    </div>
  );
};

export default Dashboard;
