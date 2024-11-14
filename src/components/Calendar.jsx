import { useState, useEffect } from "react";
import EventService from "../service/EventService";
import { format, eachDayOfInterval, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, isToday } from "date-fns";

const FullCalendar = () => {
  const [events, setEvents] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null); // Store the selected date
  const [hoveredDate, setHoveredDate] = useState(null);
  const [error, setError] = useState(null);

  const today = new Date();

  useEffect(() => {
    fetchEvents();
  }, []);

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

  const eventsByDate = events.reduce((acc, event) => {
    const eventDate = format(event.date, "yyyy-MM-dd");
    if (!acc[eventDate]) acc[eventDate] = [];
    acc[eventDate].push(event);
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
    setSelectedDate(formattedDate === selectedDate ? null : formattedDate); // Toggle the selected date
  };

  const renderCalendar = () => {
    const daysInMonth = getCalendarDays();
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (
      <div
        className="calendar-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "10px",
        }}
      >
        {/* Render day names as column headers */}
        {dayNames.map((day, index) => (
          <div
            key={index}
            style={{
              textAlign: "center",
              fontWeight: "bold",
              color: "white",
            }}
          >
            {day}
          </div>
        ))}

        {daysInMonth.map((date, index) => {
          const formattedDate = date ? format(date, "yyyy-MM-dd") : null;
          const eventsForDay = date ? eventsByDate[formattedDate] || [] : [];

          const isCurrentDate = date && isToday(date);
          const cardHighlightStyle = isCurrentDate
            ? { border: "3px solid rgba(174, 201, 10, 0.5)", color: "#AEC90A" }
            : {};

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
                position: "relative",
                borderRadius: "25px",
                cursor: "pointer", // Allow clicks
                ...cardHighlightStyle,
              }}
              onClick={() => date && handleDateClick(date)}
              onMouseEnter={() => date && setHoveredDate(formattedDate)}
              onMouseLeave={() => setHoveredDate(null)}
            >
              {date && (
                <div className="day-number" style={{ fontWeight: "bold", fontSize: "16px" }}>
                  {date.getDate()}
                  {isCurrentDate && <span style={{ fontSize: "10px", color: "#AEC90A" }}> Today</span>}
                </div>
              )}
              <div className="events-summary">
                {eventsForDay.map((event, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <div
                      className="event-thumbnail"
                      style={{
                        width: "25px",
                        height: "25px",
                        borderRadius: "50%",
                        backgroundImage: `url(${event.event_image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    ></div>
                    <span
                      style={{
                        fontSize: "12px",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {event.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderEventCards = () => {
    if (!selectedDate) return null; // Only render if a date is selected

    const eventsForDay = eventsByDate[selectedDate] || [];

    return (
      <div
        className="event-cards-container"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          borderRadius: "10px",
          padding: "20px",
          zIndex: 9999, // Ensure this is on top
        }}
      >
        {eventsForDay.length === 0 ? (
          <p style={{ color: "white" }}>No events available for this date.</p>
        ) : (
          eventsForDay.map((event, i) => (
            <div
              key={i}
              className="event-card"
              style={{
                minWidth: "250px",
                height: "200px",
                backgroundImage: `url(${event.event_image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "10px",
                position: "relative",
                marginBottom: "10px",
              }}
            >
              <div
                className="event-info"
                style={{
                  position: "absolute",
                  bottom: "0",
                  width: "100%",
                  padding: "10px",
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  color: "white",
                  textAlign: "center",
                }}
              >
                <div style={{ fontWeight: "bold" }}>{event.name}</div>
                <div>Venue: {event.venue}</div>
                <button
                  style={{
                    marginTop: "5px",
                    padding: "5px 10px",
                    backgroundColor: "darkorange",
                    color: "white",
                    border: "none",
                    borderRadius: "3px",
                  }}
                >
                  Register Now
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    );
  };

  return (
    <div
      className="full-calendar"
      style={{
        backgroundColor: "black",
        color: "white",
        padding: "20px",
        borderRadius: "10px",
        position: "relative", // Ensure that event cards can be positioned over this
      }}
    >
      {error && <p className="error">{error}</p>}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <button onClick={handlePreviousMonth}>Previous</button>
        <div style={{ fontSize: "24px", fontWeight: "bold" }}>
          {format(currentMonth, "MMMM yyyy")}
        </div>
        <button onClick={handleNextMonth}>Next</button>
      </div>

      {renderCalendar()}
      {renderEventCards()}
    </div>
  );
};

export default FullCalendar;
