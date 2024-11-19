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
