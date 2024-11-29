import React, { useState, useEffect } from "react";
import { BsCalendar2EventFill } from "react-icons/bs";
import { RiTeamFill } from "react-icons/ri";
import { FaClock } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import EventService from "../service/EventService";
import ClubsService from "../service/ClubsService";
import Modal from "react-modal";
import madhack2 from "../assets/madhack2.png"; // Default image
import { savePublicRegistration } from '../service/PublicService';
import { getPublicRegistrationsByEvent } from '../service/PublicService';  // Import the service

Modal.setAppElement("#root");

const UpcomingEvent = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [clubDetails, setClubDetails] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [eventRegistrations, setEventRegistrations] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(null); // State to track selected event ID

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    clubId: "", // Hidden clubId
    eventId: "", // Hidden eventId
    eventName: "", // Hidden eventName
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    mobile: '',
    email: ''
  });
  const [errorDialog, setErrorDialog] = useState(false); // For showing error dialog
  const [successDialog, setSuccessDialog] = useState(false); // For showing success dialog
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  useEffect(() => {
    if (!selectedEventId) return;  // Don't run if no event is selected

    const fetchRegistrations = async () => {
      try {
        const registrationsData = await getPublicRegistrationsByEvent(selectedEventId);
        setEventRegistrations(registrationsData);  // Update the state with fetched registrations
      } catch (error) {
        setErrorMessage('Error fetching registrations. Please try again.');
        setErrorModalOpen(true);
      }
    };

    fetchRegistrations();
  }, [selectedEventId]);

  // Function to close the error modal
  const closeErrorModal = () => {
    setErrorModalOpen(false);
  };

  useEffect(() => {
    fetchClubs();
    fetchEvents();
  }, []);

  const [isFormValid, setIsFormValid] = useState(false);


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
          const eventDate = new Date(event.date[0], event.date[1] - 1, event.date[2]);
          return eventDate >= today; // Only include future events
        })
<<<<<<< HEAD
        .map((event) => ({
          event_id: event.event_id,
          name: event.name,
          image: event.event_image || madhack2, // Fallback to default image
          date: `${event.date[0]}/${event.date[1]}/${event.date[2]}`,
          venue: event.venue,
          club_id: event.club_id,
          public_status: event.public_status,
        }));
=======
        .map((event) => {
          // Log the event time to see the format
          console.log('Event time:', event.time);
  
          // Check if event.time is an array and contains two elements
          let formattedTime = "Time not available";
          if (Array.isArray(event.time) && event.time.length === 2) {
            formattedTime = formatTime(event.time);
          } else {
            console.warn(`Invalid time format for event ${event.name}. Expected an array, got: ${typeof event.time}`);
          }
  
          return {
            event_id: event.event_id,
            name: event.name,
            image: event.event_image || madhack2, // Fallback to default image
            date: convertDateToReadableFormat(event.date), // Format date
            time: formattedTime,  
            venue: event.venue,
            club_id: event.club_id,
            public_status: event.public_status,
          };
        });
      
>>>>>>> 5984d0d828eb8bce5252f8fb15c0d5f9064e31ce
      setUpcomingEvents(futureEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };
<<<<<<< HEAD

=======
  
  const formatTime = (timeArray) => {
    if (!timeArray || timeArray.length !== 2) {
      return "Invalid time"; // Fallback if timeArray is not in the expected format
    }
    
    const [hour, minute] = timeArray;
    const period = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;  // Convert 24-hour to 12-hour format
    const formattedMinute = minute < 10 ? `0${minute}` : minute;  // Ensure minute is two digits
    return `${formattedHour}:${formattedMinute} ${period}`;
  };
  
  const convertDateToReadableFormat = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' }); // Gets the full month name
    const year = date.getFullYear();
    
    // Add suffix to day (e.g. 1 -> 1st, 2 -> 2nd, etc.)
    const suffix = (day) => {
      if (day > 3 && day < 21) return 'th'; // Special case for 11th, 12th, and 13th
      switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };
    
    return `${day}${suffix(day)} ${month} ${year}`;
  };
>>>>>>> 5984d0d828eb8bce5252f8fb15c0d5f9064e31ce
  const openModal = (event) => {
    setSelectedEvent(event);
    setFormData({
      ...formData,
      eventId: event.event_id,
      eventName: event.name,
      clubId: event.club_id,
      name: formData.name || "",
      mobile: formData.mobile || "",
      email: formData.email || "",
    });
    setModalIsOpen(true); // This should open the modal
  };

  const closeModal = () => setModalIsOpen(false);


  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFieldBlur = () => {
    validateForm();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Real-time validation
    const errors = {
      name: name === "name" && !value.trim() ? "Name is required" : "",
      mobile:
        name === "mobile" && !/^[0-9]{10}$/.test(value)
          ? "Mobile must be a 10-digit number"
          : "",
      email:
        name === "email" && !/^[^\s@]+@gmail\.com$/.test(value)
          ? "Please enter a valid Gmail address"
          : "",
    };

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errors[name] || "",
    }));

    // Update overall form validity
    const isValid = !Object.values(errors).some((error) => error !== "");
    setIsFormValid(isValid);
  };

  useEffect(() => {
    if (!selectedEventId) return;  // Don't run if no event is selected

    const fetchRegistrations = async () => {
      try {
        const registrationsData = await getPublicRegistrationsByEvent(selectedEventId);
        setEventRegistrations(registrationsData);  // Update the state with fetched registrations
      } catch (error) {
        setErrorMessage('Error fetching registrations. Please try again.');
        setErrorModalOpen(true);
      }
    };

    fetchRegistrations();
  }, [selectedEventId]);
  const handleRegister = async (e) => {
    e.preventDefault();
    
    // Check if any field is empty
    if (!formData.name || !formData.mobile || !formData.email || !formData.clubId || !formData.eventId || !formData.eventName) {
      // Display error message in case of empty fields
      setErrorMessage("Please fill in all fields before submitting.");
      setErrorModalOpen(true); // Open error dialog
      return;
    }
  
    // Check if the form is valid based on your existing validation rules
    if (!isFormValid) {
      setErrorMessage("Please provide valid information in all fields.");
      setErrorModalOpen(true); // Open error dialog
      return;
    }
  
    const existingRegistration = eventRegistrations.find(
      (registration) =>
        registration.name === formData.name ||
        registration.mobile === formData.mobile ||
        registration.email === formData.email
    );
  
    if (existingRegistration) {
      setErrorMessage("You have already registered for this event.");
      setErrorModalOpen(true); // Open error dialog
      return; // Stop the registration if duplicate is found
    }
    try {
      const publicRegistrationsDTO = {
        participantName: formData.name,
        mobile: formData.mobile,
        email: formData.email,
        eventId: formData.eventId,
        eventName: formData.eventName,
        clubId: formData.clubId,
      };
  
      // Save the registration data
      await savePublicRegistration(publicRegistrationsDTO);
      setSelectedEventId(formData.eventId);
   setSuccessDialog(true);
      setModalIsOpen(false); // Close the registration modal
      // Reset form after successful registration
      setFormData({
        name: "",
        mobile: "",
        email: "",
        clubId: "",
        eventId: "",
        eventName: "",
      });
    } catch (error) {
      console.error("Failed to register:", error);
    }
  };
  


  
  return (
    <div className="flex flex-col items-center mt-3 px-4 sm:px-6 md:px-8">
      <div className="flex items-center bg-dark-background p-4 mt-6 rounded-lg">
        <BsCalendar2EventFill className="text-[#AEC90A] w-9 h-9 shadow-lg" />
        <span className="text-lg font-normal pl-3 text-[#AEC90A] uppercase pr-10">Upcoming events</span>
        <input
          type="text"
          className="ml-auto bg-black text-white p-2 rounded-md"
          placeholder="Search events..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <div className="bg-dark-400 w-[90vw] p-8 mt-4 rounded-lg mb-20">
        {upcomingEvents.filter(event => event.name.toLowerCase().includes(searchQuery.toLowerCase())).length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents
              .filter((event) => event.name.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((event) => {
                const activeClub = clubDetails.find((club) => club.club_id === event.club_id) || {};
<<<<<<< HEAD
                return (
=======
                const clubImage = activeClub.club_image || "https://via.placeholder.com/100"; // Fallback image
                const clubName = activeClub.club_name || "Unknown Club"; // Fallback name
                const canRegister = event.iud_status === 1 && event.budget_status === 1;                return (
>>>>>>> 5984d0d828eb8bce5252f8fb15c0d5f9064e31ce
                  <div
                    key={event.event_id}
                    className="bg-dark-500 rounded-lg p-5 transform transition-transform hover:scale-105"
                    style={{
                      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)"
                    }}
                  >
                    <img
                      src={event.image}
                      alt={event.name}
                      className="rounded-md w-full h-56 object-cover mb-4"
                    />
<<<<<<< HEAD
                    <div className="flex items-center mb-2">
                      <RiTeamFill className="mr-2 w-6 h-6 text-primary" />
                      <h3 className="text-lg text-white font-semibold">{event.name}</h3>
                    </div>
                    <div className="flex items-center text-sm text-gray-400 mb-2">
                      <FaClock className="mr-2 w-5 h-5 text-primary" />
                      <span>{event.date}</span>
=======
                    <div className="flex items-center justify-between mb-2">
  
  <div className="flex items-center">
    <RiTeamFill className="mr-2 w-6 h-6 text-primary" />
    <h3 className="text-lg text-white font-semibold">{event.name}</h3>
  </div><img
    src={clubImage}
    alt={clubName}
    className="rounded-full w-10 h-10 object-cover mr-2" // Align image on the left
  />
</div>

                    <div className="flex items-center text-sm text-gray-400 mb-2">
                      <FaClock className="mr-2 w-5 h-5 text-primary" />
                      <span>On {event.date} at {event.time} </span>
>>>>>>> 5984d0d828eb8bce5252f8fb15c0d5f9064e31ce
                    </div>
                    <div className="flex items-center text-sm text-gray-400 mb-4">
                      <MdLocationOn className="mr-2 w-5 h-5 text-primary" />
                      <span>{event.venue}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      {event.public_status && (
                        <button
                          className="mt-4 w-full bg-[#AEC90A] text-black py-2 rounded-full  hover:bg-primary-dark transition"
                          onClick={() => openModal(event)} // Trigger the modal on click
                        >
                          Register Now
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
          
        ) : (
          <div className="text-center text-white">
            <h2>No events found</h2>
            
          </div>
        )}
      </div>
      {/* Modal for Registration */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="bg-neutral-900 rounded-md w-[30%] p-6 mx-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-white text-2xl font-bold mb-4">Register for Event</h2>
        <form onSubmit={handleRegister} className="flex flex-col space-y-4 w-full">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleInputChange}
            onBlur={handleFieldBlur}
            className="bg-neutral-900 text-white p-3 rounded-md"
          />
          {formErrors.name && <span className="text-red-500">{formErrors.name}</span>}

          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleInputChange}
            onBlur={handleFieldBlur}
            className="bg-neutral-900 text-white p-3 rounded-md"
          />
          {formErrors.mobile && <span className="text-red-500">{formErrors.mobile}</span>}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleInputChange}
            onBlur={handleFieldBlur}
            className="bg-neutral-900 text-white p-3 rounded-md"
          />
          {formErrors.email && <span className="text-red-500">{formErrors.email}</span>}

          {/* Hidden fields */}
          <input type="hidden" name="clubId" value={formData.clubId} />
          <input type="hidden" name="eventId" value={formData.eventId} />
          <input type="hidden" name="eventName" value={formData.eventName} />
         
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className={`w-full py-2 rounded-md mt-4 ${isFormValid ? 'bg-primary' : 'bg-gray-500 cursor-not-allowed'}`}
              disabled={!isFormValid}
              >
              Register Now
            </button>
          </div>
        </form>
      </Modal>

      {/* Error Dialog */}
      <Modal
        isOpen={errorDialog}
        onRequestClose={() => setErrorDialog(false)}
        className="bg-neutral-800 text-white rounded-md w-[30%] p-6"
  overlayClassName="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50"

      >
        <h2 className="text-lg font-bold">Error!</h2>
        <p className="text-sm">There was an error during registration. Please try again later.</p>
        <button
          onClick={() => setErrorDialog(false)}
          className="mt-4 bg-red-500 py-2 px-6 rounded-md"
        >
          Close
        </button>
      </Modal>

      {/* Success Dialog */}
      <Modal
        isOpen={successDialog}
        onRequestClose={() => setSuccessDialog(false)}
        className="bg-neutral-800 text-white rounded-md w-[30%] p-6"
  overlayClassName="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50"
>
        <h2 className="text-lg font-bold">Success!</h2>
        <p className="text-sm">You have successfully registered for the event!</p>
        <button
          onClick={() => setSuccessDialog(false)}
          className="mt-4 bg-[#AEC90A] py-2 px-6 rounded-md"
        >
          Close
        </button>
      </Modal>

      {errorModalOpen && (
  <Modal
    isOpen={errorModalOpen}
    onRequestClose={closeErrorModal}
    className="bg-neutral-900 rounded-md w-[30%] p-6 mx-auto"
    overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
  >
    <h2 className="text-white text-2xl font-bold mb-4">Error</h2>
    <p className="text-white mb-4">{errorMessage}</p>
    <button
      onClick={closeErrorModal}
      className="w-full py-2 rounded-md mt-4 bg-red-500"
    >
      Close
    </button>
  </Modal>
)}
    </div>
  );
};

export default UpcomingEvent;
