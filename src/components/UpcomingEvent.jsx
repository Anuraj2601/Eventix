import React, { useState, useEffect } from "react";
import { BsCalendar2EventFill } from "react-icons/bs";
import { RiTeamFill } from "react-icons/ri";
import { FaClock, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import EventService from "../service/EventService";
import ClubsService from "../service/ClubsService";
import Modal from "react-modal";
import madhack2 from "../assets/madhack2.png"; // Default image

Modal.setAppElement("#root");

const UpcomingEvent = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [clubDetails, setClubDetails] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false); // State to manage modal visibility
  const [selectedEvent, setSelectedEvent] = useState(null); // State to manage selected event for registration
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
  });

  const eventsPerPage = 6;

  useEffect(() => {
    fetchClubs();
    fetchEvents();
  }, []);

  const fetchClubs = async () => {
    try {
      const clubs = await ClubsService.getAllClubslanding();
      setClubDetails(clubs.content || []);
    } catch (error) {
      console.error("Failed to fetch clubs:", error);
    }
  };

  const fetchEvents = async () => {
    try {
      const eventsData = await EventService.getAllEventslanding();
      const today = new Date();
      const futureEvents = eventsData.content
        .filter((event) => {
          const eventDate = new Date(
            event.date[0],
            event.date[1] - 1,
            event.date[2]
          );
          return eventDate >= today;
        })
        .map((event) => ({
          event_id: event.event_id,
          name: event.name,
          image: event.event_image || madhack2,
          date: `${event.date[0]}/${event.date[1]}/${event.date[2]}`,
          venue: event.venue,
          club_id: event.club_id,
          public_status: event.public_status,
        }));
      setUpcomingEvents(futureEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const filteredEvents = upcomingEvents.filter((event) =>
    event.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * eventsPerPage,
    currentPage * eventsPerPage
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const openModal = (event) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setFormData({ name: "", mobile: "", email: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted with Data:", formData);
    closeModal(); // Close modal after form submission
  };

  return (
    <div className="flex flex-col items-center px-4 sm:px-6 md:px-8">
      <div className="flex items-center bg-dark-background p-4 rounded-lg">
        <BsCalendar2EventFill className="text-[#AEC90A] w-9 h-9 shadow-lg" />
        <span className="text-lg font-normal pl-3 text-[#AEC90A] uppercase pr-10">
          Upcoming events
        </span>
        <input
          type="text"
          className="ml-auto bg-black text-white p-2 rounded-md"
          placeholder="Search events..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <div className="bg-dark-400 w-full sm:w-[90vw] p-6 rounded-lg mb-20">
        {paginatedEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedEvents.map((event) => {
              const activeClub =
                clubDetails.find((club) => club.club_id === event.club_id) || {};
              return (
                <div
                  key={event.event_id}
                  className="bg-dark-500 rounded-lg p-5 transform transition-transform hover:scale-105"
                  style={{
                    boxShadow:
                      "0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <img
                    src={event.image}
                    alt={event.name}
                    className="rounded-md w-full h-56 object-cover mb-4"
                  />
                  <div className="flex items-center mb-2">
                    <RiTeamFill className="mr-2 w-6 h-6 text-primary" />
                    <h3 className="text-lg text-white font-semibold">
                      {event.name}
                    </h3>
                  </div>
                  <div className="flex items-center text-sm text-gray-400 mb-2">
                    <FaClock className="mr-2 w-5 h-5 text-primary" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-400 mb-4">
                    <MdLocationOn className="mr-2 w-5 h-5 text-primary" />
                    <span>{event.venue}</span>
                  </div>
                  <button
                    onClick={() => openModal(event)}
                    className="w-full py-2 px-4 text-white bg-primary rounded hover:bg-primary-dark"
                  >
                    Register Now
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-white text-center mt-4">No events found.</p>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 space-x-2">
          {/* Previous Button with Icon */}
          <button
            className={`flex items-center justify-center w-10 h-10 rounded-full ${currentPage === 1
                ? "bg-dark-500 cursor-not-allowed"
                : "bg-primary hover:bg-primary-dark text-white"
              }`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FaChevronLeft className="w-4 h-4" />
          </button>

          {/* Numbered Pagination */}
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`flex items-center justify-center w-10 h-10 rounded-full ${currentPage === index + 1
                  ? "bg-primary text-white"
                  : "bg-dark-500 hover:bg-dark-600 text-white"
                }`}
            >
              {index + 1}
            </button>
          ))}

          {/* Next Button with Icon */}
          <button
            className={`flex items-center justify-center w-10 h-10 rounded-full ${currentPage === totalPages
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-primary hover:bg-primary-dark text-white"
              }`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <FaChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Registration Form Modal */}
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        contentLabel="Register for Event"
        className="bg-dark-600 p-6 mt-48 rounded-lg max-w-md mx-auto relative"
        overlayClassName="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm"
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-3 rounded-md bg-dark-500 text-white placeholder-gray-400"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleInputChange}
              className="w-full p-3 rounded-md bg-dark-500 text-white placeholder-gray-400"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-3 rounded-md bg-dark-500 text-white placeholder-gray-400"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default UpcomingEvent;
