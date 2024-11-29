import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Make sure axios is installed
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import Event from '../../components/Event';
import Upcoming from '../../components/Upcoming';
import Feedback from '../../components/Feedback';
import RegistrationModal from '../../components/RegistrationModal'; // Assuming you have this component
import {
  AiOutlineCalendar,
  AiOutlineClockCircle,
  AiOutlineEnvironment,
  AiOutlineInfoCircle,
} from 'react-icons/ai'; // Install react-icons if needed

const Dashboard = () => {
  const [events, setEvents] = useState([]); // State for event data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [selectedEvent, setSelectedEvent] = useState(null); // Selected event state
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state

  // Fetch events from the API
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
        setEvents(response.data.content || []); // Assuming `content` contains the events
        setLoading(false);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events");
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col md:flex-row">
      {/* Sidebar */}
      <Sidebar className="flex-shrink-0 md:w-1/4 w-full" />
      <div className="flex flex-col flex-1">
        {/* Navbar */}
        <Navbar className="sticky top-0 z-10 p-4" />

        {/* Main Content */}
        <div className="bg-neutral-900 text-white flex flex-1 overflow-y-auto flex-col md:flex-row">
          {/* Events Section */}
          <div className="w-full md:w-1/2 px-2 ml-2 overflow-y-auto">
            {loading && <div className="text-[#AEC90A]">Loading events...</div>}
            {error && <div className="text-red-500">{error}</div>}
            {!loading && !error && events.length === 0 && (
              <div className="text-[#AEC90A]">No events yet</div>
            )}
            {!loading &&
              !error &&
              events.length > 0 &&
              events.map((event) => (
                <div key={event.event_id} className="border p-4 mb-4 rounded-lg">
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
                  <div
                    className="flex py-6 items-center space-x-6 mb-2 rounded mt-2"
                    style={{ backgroundColor: "#090101" }}
                  >
                    <div className="flex items-center ml-2 mb-2">
                      <AiOutlineCalendar
                        className="text-[#AEC90A] mr-2"
                        size={20}
                      />
                      <p className="text-sm">{event.name}</p>
                    </div>

                    <div className="flex items-center mb-2">
                      <AiOutlineClockCircle
                        className="text-[#AEC90A] mr-2"
                        size={20}
                      />
                      <p className="text-sm">
                        {event.date && !isNaN(new Date(event.date).getTime())
                          ? new Intl.DateTimeFormat("en-GB", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            }).format(new Date(event.date))
                          : "Invalid date"}
                      </p>
                    </div>
                    <div className="flex items-center mb-2">
                      <AiOutlineEnvironment
                        className="text-[#AEC90A] mr-2"
                        size={20}
                      />
                      <p className="text-sm">{event.venue}</p>
                    </div>
                  </div>
                  <div className="flex items-center mb-2 ml-2">
                    <AiOutlineInfoCircle
                      className="text-[#AEC90A] mr-2"
                      size={20}
                    />
                    <p className="text-sm font-bold">{event.purpose}</p>
                  </div>

                  <div className="p-1 mb-1 flex flex-col relative">
                    <button
                      onClick={() => {
                        setSelectedEvent(event);
                        setIsModalOpen(true);
                      }}
                      className="mt-2 ml-auto px-4 py-2 bg-[#AEC90A] text-black rounded hover:bg-[#93b208]"
                    >
                      Register
                    </button>
                  </div>
                </div>
              ))}
          </div>

          {/* Right Section */}
          <div className="w-full md:w-1/2 flex flex-col py-1 h-full">
            <div className="mb-4 h-[380px] overflow-y-auto rounded-2xl">
              <Upcoming />
            </div>
            <div className="flex-1 overflow-y-auto mb-4">
              <Feedback />
            </div>
          </div>
        </div>
      </div>

      {/* Registration Modal */}
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
