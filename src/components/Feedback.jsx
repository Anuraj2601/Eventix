import React, { useState, useEffect } from "react";
import ieeePast2 from "../assets/events/reid2.jpg"; // Example image
import EventService from "../service/EventService"; // Ensure correct import

const Feedback = () => {
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [emojiRatings, setEmojiRatings] = useState({});
  const [pastEvents, setPastEvents] = useState([]); // Renamed to focus on past events
  const [selectedEvent, setSelectedEvent] = useState(null);

  const convertDateToReadableFormat = (dateString) => {
    const date = new Date(dateString[0], dateString[1] - 1, dateString[2]); // Subtract 1 from the month value
  
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' }); // Full month name
    const year = date.getFullYear();
  
    // Add suffix to the day (e.g., 1 -> 1st, 2 -> 2nd, etc.)
    const suffix = (day) => {
      if (day > 3 && day < 21) return 'th'; // Special case for 11th, 12th, and 13th
      switch (day % 10) {
        case 1:
          return 'st';
        case 2:
          return 'nd';
        case 3:
          return 'rd';
        default:
          return 'th';
      }
    };
  
    return `${day}${suffix(day)} ${month} ${year}`;
  };
  

  const formatTime = (timeArray) => {
    const [hour, minute] = timeArray;
    const period = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12; // Convert 24-hour to 12-hour format
    const formattedMinute = minute < 10 ? `0${minute}` : minute; // Ensure minute is two digits
    return `${formattedHour}:${formattedMinute} ${period}`;
  };

  const fetchEvents = async () => {
    try {
      const eventsData = await EventService.getAllEventslanding();
      const today = new Date();
      const pastEventsData = eventsData.content
        .filter((event) => {
          const eventDate = new Date(event.date[0], event.date[1] - 1, event.date[2]);
          return eventDate < today; // Only include past events
        })
        .map((event) => {
          return {
            event_id: event.event_id,
            name: event.name,
            venue: event.venue,
            image: event.event_image || ieeePast2, // Fallback to example image
            date: convertDateToReadableFormat(event.date), // Format date
            time: event.time ? formatTime(event.time) : "Time not available",
            details: `Share your experience about our event ${event.name}, held on ${event.date}. We welcome your feedback!`,
          };
        });

      setPastEvents(pastEventsData);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = () => {
    alert("Feedback submitted!");
    setFeedback(""); // Clear feedback
    setIsFormVisible(false); // Hide form after submission
  };

  const handleEmojiClick = (eventId, emoji) => {
    setEmojiRatings((prev) => ({
      ...prev,
      [eventId]: {
        ...prev[eventId],
        [emoji]: (prev[eventId]?.[emoji] || 0) + 1,
      },
    }));
  };

  return (
    <div className="relative h-[380px] overflow-hidden">
      <h2 className="text-white text-sm font-bold -mt-1 ml-0 z-1">Feedback</h2>
      <div className="flex flex-wrap h-full p-2">
        {pastEvents.map((event) => (
          <div
            key={event.event_id}
            className="w-full flex items-start mb-4 p-1"
            onClick={() => setSelectedFeedback(event)}
          >
            <img
              src={event.image}
              alt={event.name}
              className="w-40 h-40 object-cover rounded-lg"
              style={{
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)",
              }}
            />
            <div
              className="w-full px-2 ml-0 h-40 flex flex-col justify-between rounded-2xl"
              style={{
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)",
              }}
            >
              {isFormVisible ? (
                <div className="feedback-form bg-neutral-800 p-2 rounded-lg">
                  <p className="text-white text-lg font-bold mb-2">We welcome your feedback!</p>
                  <textarea
                    value={feedback}
                    onChange={handleFeedbackChange}
                    className="w-full bg-neutral-900 h-10 text-white rounded-md"
                    placeholder="Share your thoughts..."
                    rows="3"
                  />
                  <button
                    onClick={handleSubmit}
                    className="w-auto p-2 bg-[#AEC90A] text-black rounded-lg mt-4"
                  >
                    Submit Feedback
                  </button>
                </div>
              ) : (
                <div className="flex flex-col h-full ml-2">
                  <div>
                    <h3 className="text-white text-xl font-bold mb-2 py-2">
                      {event.name} &nbsp;&nbsp;&nbsp;&nbsp;
                      <span
                        className="text-yellow-400 cursor-pointer mr-4"
                        onClick={() => handleEmojiClick(event.event_id, "😊")}
                      >
                        😊 {emojiRatings[event.event_id]?.["😊"] || 0}
                      </span>
                      <span
                        className="text-red-400 cursor-pointer mr-4"
                        onClick={() => handleEmojiClick(event.event_id, "😡")}
                      >
                        😡 {emojiRatings[event.event_id]?.["😡"] || 0}
                      </span>
                      <span
                        className="text-green-400 cursor-pointer mr-4"
                        onClick={() => handleEmojiClick(event.event_id, "👍")}
                      >
                        👍 {emojiRatings[event.event_id]?.["👍"] || 0}
                      </span>
                    </h3>
                    <p className="text-gray-400 mb-2">
                      {event.details}
                      <button
                        onClick={() => setIsFormVisible(true)}
                        className="ml-4 mt-2 py-1 px-3 bg-[#AEC90A] text-black rounded-lg right-0"
                      >
                        Give Feedback
                      </button>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feedback;
