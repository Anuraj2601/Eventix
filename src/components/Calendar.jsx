import { useState, useEffect } from "react";
import MeetingService from "../service/MeetingService";
import EventService from "../service/EventService";
import ClubsService from "../service/ClubsService";  // Import ClubsService

import {
  format,
  eachDayOfInterval,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  isToday,
} from "date-fns";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const FullCalendar = () => {
  const [events, setEvents] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [error, setError] = useState(null);
  const [clubDetails, setClubDetails] = useState([]);

  useEffect(() => {
    fetchEvents();
    fetchMeetings();
    fetchClubs();
  }, []);

  const fetchClubs = async () => {
    try {
      const token = localStorage.getItem("token");
      const clubs = await ClubsService.getAllClubs(token);
      const clubsArray = clubs.content || [];
      setClubDetails(clubsArray);
    } catch (error) {
      console.error("Failed to fetch clubs", error);
    }
  };

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await EventService.getAllEvents(token);
      const eventsArray = response.data || response.content || [];
      const formattedEvents = eventsArray.map((event) => ({
        ...event,
        date: new Date(event.date),
      }));
      setEvents(formattedEvents);
    } catch (error) {
      setError("Error fetching events");
      console.error("Error fetching events:", error);
    }
  };

  const fetchMeetings = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await MeetingService.getAllMeetings(token);
      const meetingsArray = response.content || [];
      const formattedMeetings = meetingsArray
        .filter((meeting) => meeting.participant_type === "EVERYONE")
        .map((meeting) => ({
          ...meeting,
          date: new Date(meeting.date), // Ensure date formatting is consistent
        }));
      setMeetings(formattedMeetings);
    } catch (error) {
      setError("Error fetching meetings");
      console.error("Error fetching meetings:", error);
    }
  };
  

  const eventsByDate = events.reduce((acc, event) => {
    const eventDate = format(event.date, "yyyy-MM-dd");
    if (!acc[eventDate]) acc[eventDate] = [];
    acc[eventDate].push(event);
    return acc;
  }, {});

  const meetingsByDate = meetings.reduce((acc, meeting) => {
    const meetingDate = format(meeting.date, "yyyy-MM-dd");
    if (!acc[meetingDate]) acc[meetingDate] = [];
    acc[meetingDate].push(meeting);
    return acc;
  }, {});

  const getCalendarDays = () => {
    const start = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 0 });
    const end = endOfMonth(currentMonth);
    const daysInMonth = eachDayOfInterval({ start, end });
    const daysBeforeStart = daysInMonth[0].getDay();
    return Array.from({ length: daysBeforeStart }).fill(null).concat(daysInMonth);
  };

  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const handlePreviousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const handleDateClick = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    setSelectedDate(formattedDate === selectedDate ? null : formattedDate);
  };

  const renderCalendar = () => {
    const daysInMonth = getCalendarDays();
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (
      <div className="calendar-grid  " style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "10px" }}>
        {dayNames.map((day, index) => (
          <div key={index} style={{ textAlign: "center", fontWeight: "bold", color: "white" }}>{day}</div>
        ))}
        {daysInMonth.map((date, index) => {
          const formattedDate = date ? format(date, "yyyy-MM-dd") : null;
          const eventsForDay = date ? eventsByDate[formattedDate] || [] : [];
          const meetingsForDay = date ? meetingsByDate[formattedDate] || [] : [];
          const isCurrentDate = date && isToday(date);
          const cardHighlightStyle = isCurrentDate ? { border: "3px solid rgba(174, 201, 10, 0.5)", color: "#AEC90A" } : {};
          const isSelectedDate = date && selectedDate === formattedDate;
          const selectedStyle = isSelectedDate ? { backgroundColor: "rgba(255, 255, 0, 0.3)" } : {};

          return (
            <div
              key={index}
              className="calendar-day"
              style={{
                padding: "10px",
                border: "1px solid #555",
                minHeight: "100px",
                backgroundColor: date ? "black" : "transparent",
                color: date ? "white" : "transparent",
                borderRadius: "25px",
                cursor: "pointer",
                ...cardHighlightStyle,
                ...selectedStyle,
              }}
              onClick={() => date && handleDateClick(date)}
            >
 {date && (
                <div className="day-number" style={{ fontWeight: "bold", fontSize: "16px" }}>
                  {date.getDate()}
                  {isCurrentDate && <span style={{ fontSize: "10px", color: "#AEC90A" }}> Today</span>}
                </div>
              )}              {eventsForDay.map((event, i) => {
                const club = clubDetails.find((club) => club.club_id === event.club_id);
                return (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "5px" ,fontSize: "12px", color: "#AEC90A" ,fontWeight: "bold"}}>
                   
                   {club && club.club_image && (
                      <img
                        src={club.club_image}
                        alt={club.club_name}
                        style={{ width: "20px", height: "20px", borderRadius: "50%" }}
                      />
                    )} 
                    <span >{event.name}</span>
                   
                  </div>
                );
              })}
      {meetingsForDay.map((meeting, i) => {
  const club = clubDetails.find((club) => club.club_id === meeting.clubId);  // Correct club matching

  return (
    <div
      key={i}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px",
        fontSize: "12px",
        color: "#AEC90A",
      }}
    >
      {/* Display club image before meeting name */}
      {club && club.club_image && (
        <img
          src={club.club_image}
          alt={club.club_name}
          style={{ width: "20px", height: "20px", borderRadius: "50%" }}
        />
      )}
      
      {/* Meeting name and type dot with tooltip */}
      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <span style={{ fontWeight: "bold" }}>{meeting.meeting_name}</span>
        
        {/* Dot representing meeting type */}
        <span
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: meeting.meeting_type === "ONLINE" ? "green" : "yellow",
            display: "inline-block",
            cursor: "pointer",
          }}
          title={meeting.meeting_type}  // Tooltip for meeting type
        ></span>
      </div>
    </div>
  );
})}


            </div>
          );
        })}
      </div>
    );
  };

  const renderEventModal = () => {
    if (!selectedDate) return null;
    const eventsForDay = eventsByDate[selectedDate] || [];
    const meetingsForDay = meetingsByDate[selectedDate] || [];
  
    return (
      <div
        className="modal-overlay"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000,
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "800px",
            backgroundColor: "black",
            padding: "20px",
            borderRadius: "10px",
            position: "relative",
            color: "white",
            border: "0.5px solid rgba(130, 201, 10, 0.5)",
            overflowY: "auto",
            maxHeight: "80vh",
          }}
        >
          <button
            onClick={() => setSelectedDate(null)}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "transparent",
              border: "none",
              fontSize: "20px",
              color: "white",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
  
          <h2 className="text-center">
            {isToday(new Date(selectedDate))
              ? "Schedule for Today"
              : `Schedule for ${format(new Date(selectedDate), "eeee, MMMM do yyyy")}`}
          </h2>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ marginTop: "20px" }}>
            {eventsForDay.length === 0 && meetingsForDay.length === 0 ? (
              <p>No events or meetings scheduled for{" "}
                {isToday(new Date(selectedDate))
                  ? "Today"
                  : format(new Date(selectedDate), "eeee, MMMM do yyyy")}
              </p>
            ) : (
              <>
                {/* Events Section */}
                {eventsForDay.length > 0 && (
                  <div style={{ padding: "20px 0" }}>
                    <h3 className="text-lg font-semibold text-[#AEC90A]">Events</h3>
                    {eventsForDay.map((event, i) => {
                      const club = clubDetails.find((club) => club.club_id === event.club_id);
                      return (
                        <div key={i} className="relative custom-3d-shadow custom-card" style={{ padding: "20px" }}>
                          <img
                            src={event.event_image}
                            className="w-full h-72 object-cover rounded-lg"
                            style={{ marginBottom: "20px" }}
                          />
   {club && club.club_image && (
    <div className="absolute top-2 right-2 w-16 h-16 border-2 border-white rounded-full overflow-hidden shadow-md">
      <img
        src={club.club_image}
        alt={club.club_name}
        className="w-full h-full object-cover"
      />
    </div>
  )}
                          {/* Event Details Below Image */}
                          <div className="text-white">
                            <h3 className="text-lg font-semibold">{event.name}</h3>
                            <p className="text-sm">
                              {format(event.date, "PP")} | <strong>{format(event.date, "EEEE")}</strong>
                            </p>
                            <p className="text-sm">Venue: {event.venue}</p>
  
                            {/* Buttons */}
                            <div className="flex gap-2 mt-4">
                              {new Date(event.date) > new Date() ? (
                                <button className="text-[#AEC90A] py-2 px-2 rounded-full border-2 border-[#AEC90A]">
                                  Register
                                </button>
                              ) : (
                                <button className="text-[#AEC90A] py-2 px-2 rounded-full  border-2 border-[#AEC90A]">
                                  Feedback
                                </button>
                              )}
                              <button className="text-white py-2 px-2 rounded-full text-black border-2 border-white">
                                Explore
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
  
                {/* Meetings Section */}
                {meetingsForDay.length > 0 && (
                  <div style={{ padding: "20px 0" }}>
                    <h3 className="text-lg font-semibold text-[#AEC90A]">Meetings</h3>
                    {meetingsForDay.map((meeting, i) => {
                      const club = clubDetails.find((club) => club.club_id === meeting.clubId);
                      return (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            padding: "10px",
                            fontSize: "12px",
                            color: "#AEC90A",
                          }}
                        >
                          {club && club.club_image && (
                            <img
                              src={club.club_image}
                              alt={club.club_name}
                              style={{
                                width: "20px",
                                height: "20px",
                                borderRadius: "50%",
                              }}
                            />
                          )}
                          <div>
                            <h3>{meeting.meeting_type}  <span
                               
                              />
                              {meeting.meeting_name}
                              <span
                                style={{
                                  width: "10px",
                                  height: "10px",
                                  borderRadius: "50%",
                                  backgroundColor:
                                    meeting.meeting_type === "ONLINE" ? "green" : "yellow",
                                  display: "inline-block",
                                  marginLeft: "10px",
                                }}
                                title={
                                  meeting.meeting_type === "ONLINE"
                                    ? "Online Meeting"
                                    : "Physical Meeting"
                                }
                              />
                            </h3>
                            <p>Date: {format(meeting.date, "PP")}</p>
                           
                            <p>Organized by: {meeting.clubId}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  
  

  return (
    <div  className="bg-black bg-opacity-30 rounded-md p-5" style={{  color: "white" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",

          borderRadius: "5px",
          marginBottom: "7px",
          padding: "5px",
          background: "black",
        }}
      >
        <FaArrowLeft
          onClick={handlePreviousMonth}
          style={{
            cursor: "pointer",
            background: "black",
            borderRadius: "50%",
           
            color: "#AEC90A",
          }}
        />
        <h2 style={{ margin: 0, fontSize: 30, color: "#AEC90A" }}>
          {format(currentMonth, "MMMM yyyy")}
        </h2>
        <FaArrowRight
          onClick={handleNextMonth}
          style={{
            cursor: "pointer",
            background: "black",
            borderRadius: "50%",
           
            color: "#AEC90A",
          }}
        />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {renderCalendar()}
      {renderEventModal()}
    </div>
  );
  
  
};

export default FullCalendar;
