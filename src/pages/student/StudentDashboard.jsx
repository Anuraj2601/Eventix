// export default Dashboard;
import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import Upcoming from "../../components/Upcoming";
import Feedback from "../../components/Feedback";
import RegistrationModal from "../../components/RegistrationModal"; 
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
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 
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
        setEvents(response.data.content); 
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
    <div className="fixed inset-0 flex flex-col md:flex-row">
      <Sidebar className="flex-shrink-0 md:w-1/4" />
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
                  <div
                    className="flex py-6 items-center space-x-6 mb-2 rounded mt-2"
                    style={{ backgroundColor: "#090101" }}
                  >
                    <div className="flex items-center ml-2 mb-2">
                      <AiOutlineCalendar
                        className="text-[#AEC90A] mr-2"
                        size={20}
                      />{" "}
                      {/* Event Name icon */}
                      <p className="text-sm">{event.name}</p>
                    </div>

                    <div className="flex items-center mb-2">
                      <AiOutlineClockCircle
                        className="text-[#AEC90A] mr-2"
                        size={20}
                      />{" "}
                      {/* Date icon */}
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
                      />{" "}
                      {/* Venue icon */}
                      <p className="text-sm">{event.venue}</p>
                    </div>
                  </div>
                  <div className="flex items-center mb-2 ml-2">
                    <AiOutlineInfoCircle
                      className="text-[#AEC90A] mr-2"
                      size={20}
                    />{" "}
                    {/* Purpose icon */}
                    <p className="text-sm font-bold">{event.purpose}</p>
                  </div>

                  <div className="p-1 mb-1 flex flex-col relative">
                    <button
                      onClick={() => {
                        setSelectedEvent(event);
                        setIsModalOpen(true);
                      }}
                      // className="mt-2 px-4 py-2 bg-[#AEC90A] text-black rounded hover:bg-[#93b208]"
                      className="mt-2 ml-auto px-4 py-2 bg-[#AEC90A] text-black rounded hover:bg-[#93b208]"
                    >
                      Register
                    </button>
                  </div>
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
