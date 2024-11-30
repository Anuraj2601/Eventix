import { useState, useEffect } from "react";
import MeetingService from "../service/MeetingService";
import EventService from "../service/EventService";
import ClubsService from "../service/ClubsService";  // Import ClubsService
import { getUserIdFromToken } from '../utils/utils';
import RegistrationService from '../service/registrationService'; // Adjust the path as needed
import axios from 'axios';

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
  const token = localStorage.getItem('token') || '';
  const [qrCodeDialogVisible, setQrCodeDialogVisible] = useState(false);

  const userId = getUserIdFromToken();
  const [registrations, setRegistrations] = useState([]);

  const handleExploreEvent = (event) => {
    const studentPagePath = `/student/club/event/${event.id}`;
    console.log("Navigating to:", studentPagePath);
    window.location.href = studentPagePath;
  };
  

  useEffect(() => {
    fetchEvents();
    fetchMeetings();
    fetchClubs();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const response = await RegistrationService.getAllRegistrations(token);
      const fetchedRegistrations = response.data || response.content || [];
      setRegistrations(fetchedRegistrations);


      console.log('Registrations:', registrations);
    } catch (error) {
      console.error("Error fetching registrations:", error);
    }
  };

  useEffect(() => {
    if (token) {

      fetchRegistrations();
    }
  }, [token]);

  const validPositions = ["president", "member", "secretary", "treasurer", "oc"];
  const filteredRegistrations = registrations.filter(
    (reg) =>
      reg.email === userId &&
      reg.accepted === 1 &&
      validPositions.includes(reg.position.toLowerCase())
  );

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


  const formatTime = (timeArray) => {
    const [hour, minute] = timeArray;
    const period = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12; // Convert to 12-hour format (0 becomes 12)
    const formattedMinute = minute < 10 ? `0${minute}` : minute;
    return `${formattedHour}:${formattedMinute} ${period}`;
  };


  const eventsByDate = events.reduce((acc, event) => {
    const eventDate = format(event.date, "yyyy-MM-dd");
    if (!acc[eventDate]) acc[eventDate] = [];
    acc[eventDate].push(event);
    return acc;
  }, {});



  const filterFutureMeetings = (meetings) => {
    const currentDate = new Date();
    return meetings.filter((meeting) => {
      const meetingDate = new Date(meeting.date);
      const [hour, minute] = meeting.time;
      meetingDate.setHours(hour, minute);
      return meetingDate >= currentDate;
    });
  };

  // Filter Meetings by Participant Type
  const filterMeetingsByParticipantType = (meetings) => {
    return meetings.filter((meeting) => {
      const { participant_type, club_id } = meeting;

      if (participant_type === 'EVERYONE') {
        return true;
      }

      const userRegistration = registrations.find(
        (reg) => reg.clubId === club_id && reg.userId === userId && reg.accepted === 1
      );

      if (!userRegistration) return false;

      const { position } = userRegistration;

      if (participant_type === 'CLUB_MEMBERS') {
        const validPositions = ['president', 'member', 'secretary', 'treasurer'];
        return validPositions.includes(position.toLowerCase());
      }

      if (participant_type === 'CLUB_BOARD') {
        const validBoardPositions = ['president', 'treasurer', 'secretary'];
        return validBoardPositions.includes(position.toLowerCase());
      }

      return false;
    });
  };

  // Step 1: Filter future meetings first
  const futureMeetings = filterFutureMeetings(meetings);

  // Step 2: Filter meetings based on participant type from the future meetings
  const allowedMeetings = filterMeetingsByParticipantType(futureMeetings);

  // Grouping meetings by date
  const meetingsByDate = allowedMeetings.reduce((acc, meeting) => {
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
      <div className="calendar-grid" style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "5px" }}>
        {dayNames.map((day, index) => (
          <div key={index} style={{ textAlign: "center", fontWeight: "bold", color: "white", fontSize: "16px" }}>{day}</div>
        ))}
        {daysInMonth.map((date, index) => {
          const formattedDate = date ? format(date, "yyyy-MM-dd") : null;
          const eventsForDay = date ? eventsByDate[formattedDate] || [] : [];
          const meetingsForDay = date ? meetingsByDate[formattedDate] || [] : [];
          const isCurrentDate = date && isToday(date);
          const cardHighlightStyle = isCurrentDate ? { border: "2px solid rgba(174, 201, 10, 0.5)", color: "#AEC90A" } : {};
          const isSelectedDate = date && selectedDate === formattedDate;
          const selectedStyle = isSelectedDate ? { backgroundColor: "rgba(255, 255, 0, 0.2)" } : {};

          return (
            <div
              key={index}
              className="calendar-day"
              style={{
                padding: "4px",
                minHeight: "80px",
                backgroundColor: date ? "black" : "transparent",
                color: date ? "white" : "transparent",
                borderRadius: "12px",
                border: "1px solid rgba(255, 255, 255, 0.2)", // Light white with low opacity
                cursor: "pointer",
                ...cardHighlightStyle,
                ...selectedStyle,
              }}
              onClick={() => date && handleDateClick(date)}
            >
              {date && (
                <div className="day-number" style={{ fontWeight: "bold", fontSize: "20px", padding: "12px" }}>
                  {date.getDate()}
                  {isCurrentDate && <span style={{ fontSize: "8px", color: "#AEC90A" }}> Today</span>}
                </div>
              )}

              {meetingsForDay.map((meeting, i) => {
                const club = clubDetails.find((club) => club.club_id === meeting.club_id);
                return (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "8px",
                      fontSize: "10px",
                      color: "#AEC90A",
                    }}
                  >
                    {club && club.club_image ? (
                      <img
                        src={club.club_image}
                        alt={club.club_name}
                        style={{
                          width: "25px",
                          height: "25px",
                          borderRadius: "50%",
                          objectFit: "cover",
                          border: "2px solid #AEC90A",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "25px",
                          height: "25px",
                          borderRadius: "50%",
                          backgroundColor: "#ccc",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <span style={{ color: "#fff", fontSize: "12px" }}>?</span>
                      </div>
                    )}

                    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <span style={{ fontWeight: "bold", fontSize: "10px" }}>{meeting.meeting_name}</span>
                      <span
                        style={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          backgroundColor: meeting.meeting_type === "ONLINE" ? "green" : "yellow",
                          display: "inline-block",
                          cursor: "pointer",
                        }}
                        title={meeting.meeting_type}
                      ></span>
                    </div>
                  </div>
                );
              })}

              {eventsForDay.map((event, i) => {
                const club = clubDetails.find((club) => club.club_id === event.club_id);
                return (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px", fontSize: "10px", color: "white" }}>
                    {club && club.club_image && (
                      <img
                        src={club.club_image}
                        alt={club.club_name}
                        style={{ width: "25px", height: "25px", borderRadius: "50%" }}
                      />
                    )}
                    <span style={{ fontSize: "10px" }}>{event.name}</span>
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
    const hasMeetings = meetingsForDay.length > 0;

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

          <h2 className="text-center font-bold">
            {isToday(new Date(selectedDate))
              ? "Schedule for Today"
              : `Schedule for ${format(new Date(selectedDate), "eeee, MMMM do yyyy")}`}
          </h2>

          {/* Main Content Grid */}
          <div
            className={`grid ${hasMeetings && eventsForDay.length > 0 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
              } gap-6`}
            style={{ marginTop: "20px" }}
          >
            {/* Empty State */}
            {eventsForDay.length === 0 && meetingsForDay.length === 0 && (
              <p>
                No events or meetings scheduled for{" "}
                {isToday(new Date(selectedDate))
                  ? "Today"
                  : format(new Date(selectedDate), "eeee, MMMM do yyyy")}
              </p>
            )}

            {/* Events Section */}
            {eventsForDay.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-[#AEC90A]">Events</h3>
                {eventsForDay.map((event, i) => {
                  const club = clubDetails.find((club) => club.club_id === event.club_id);
                  return (
                    <div
                      key={i}
                      className="relative custom-3d-shadow custom-card"
                      style={{ padding: "20px" }}
                    >
                      <img
                        src={event.event_image}
                        className="w-full h-72 object-cover rounded-lg"
                        style={{ marginBottom: "20px" }}
                      />
                      {club && club.club_image && (
                        <div className="absolute top-2 right-2 w-20 h-20 border-2 border-white rounded-full overflow-hidden shadow-md">
                          <img
                            src={club.club_image}
                            alt={club.club_name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="text-white flex justify-between">
                        {/* Event Details Section */}
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold">{event.name}</h3>
                          <ul className="list-disc pl-5">
                            <li className="text-sm">
                              Time: {formatTime(event.time || [0, 0])} | <strong>{format(event.date, "EEEE")}</strong>
                            </li>
                            <li className="text-sm">Venue: {event.venue}</li>
                          </ul>
                        </div>


                        {/* Buttons Section */}
                        <div className="flex flex-col items-end gap-2">
                          {new Date(event.date) > new Date() ? (
                            <button className="text-[#AEC90A] py-2 px-2 rounded-full border-2 border-[#AEC90A]">
                              Register
                            </button>
                          ) : (
                            <button className="text-[#AEC90A] py-2 px-2 rounded-full border-2 border-[#AEC90A]">
                              Feedback
                            </button>
                          )}
                          <button className="text-white py-2 px-2 rounded-full text-black border-2 border-white">
                            Explore
                          </button>
                        </div>
                      
 {/* Buttons Section */}
{/* 
<div className="flex flex-col items-end gap-2">
  {new Date(event.date) > new Date() ? (
    <button className="text-[#AEC90A] py-2 px-2 rounded-full border-2 border-[#AEC90A]" onClick={() => handleRegister(event)}>
      Register
    </button>
  ) : (
    <button className="text-[#AEC90A] py-2 px-2 rounded-full border-2 border-[#AEC90A]" onClick={() => handleFeedback(event)}>
      Feedback
    </button>
  )}
  <button className="text-white py-2 px-2 rounded-full text-black border-2 border-white" onClick={() => handleExploreEvent(event)}>
    Explore
  </button>
</div>
*/}

</div>


                    </div>
                  );
                })}
              </div>
            )}

            {/* Meetings Section */}
            {hasMeetings && (
              <div>
                <h3 className="text-lg font-semibold text-[#AEC90A]">Meetings</h3>
                {meetingsForDay.map((meeting, i) => {
                  const club = clubDetails.find((club) => club.club_id === meeting.club_id);
                  // Check if the meeting date is in the past
                  const meetingDate = new Date(meeting.date);
                  const currentDate = new Date();

                  // Disable button if meeting date is in the past
                  const isPastMeeting = meetingDate < currentDate;
                  return (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "10px",
                        fontSize: "12px",
                        color: "white",
                      }}
                    >

                      <div>
                        <h3>
                          {meeting.meeting_type}{" "}
                          <span />

                          {meeting.meeting_name}
                          <span
                            style={{
                              width: "10px",
                              height: "10px",
                              borderRadius: "50%",
                              backgroundColor:
                                meeting.meeting_type === "ONLINE" ? "green" : "red",
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
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          {/* Meeting Details */}


                          {/* Join Button */}
                          <button
                            style={{
                              padding: "8px 12px",
                              backgroundColor: isPastMeeting ? "gray" : "#AEC90A",
                              cursor: isPastMeeting ? "not-allowed" : "pointer",
                              opacity: isPastMeeting ? 0.5 : 1,
                              border: "none",
                              borderRadius: "4px",
                              color: "black",
                            }}
                            disabled={isPastMeeting}
                            title={isPastMeeting ? "This meeting has already passed" : "Join Meeting"}
                          >
                            {isPastMeeting ? "Meeting Passed" : "Join Meeting"}
                          </button>
                        </div>
                        <p>At: {formatTime(meeting.time, "PP")}</p>

                        {club && club.club_image && (
                          <img
                            src={club.club_image}
                            alt={club.club_name}
                            style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "50%",
                            }}
                          />
                        )}

                        {/* Container for button and details */}

                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };




  return (
    <div className="bg-black bg-opacity-0 rounded-md px-24 onset-0 " style={{ color: "white" }}>
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
