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

    return (
      <div
        className="calendar-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "10px",
        }}
      >
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
                borderRadius: "5px",
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
          overflowX: "scroll",
          gap: "10px",
          marginTop: "20px",
          paddingBottom: "20px",
          justifyContent: "center", // Center the cards horizontally
        }}
      >
        {eventsForDay.map((event, i) => (
          <div
            key={i}
            className="event-card"
            style={{
              minWidth: "150px",
              height: "200px",
              backgroundImage: `url(${event.event_image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "5px",
              position: "relative",
              cursor: "pointer",
              transformStyle: "preserve-3d",
              transition: "transform 0.5s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "rotateY(180deg)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "rotateY(0deg)"}
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
                transform: "rotateY(180deg)",
                opacity: "0",
                transition: "opacity 0.5s",
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
        ))}
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
      }}
    >
      {error && <p className="error">{error}</p>}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={handlePreviousMonth}
          style={{
            backgroundColor: "#333",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
            marginRight: "10px",
          }}
        >
          &lt;
        </button>
        <h1 style={{ fontSize: "1.5em", color: "white" }}>
          {format(currentMonth, "MMMM yyyy")}
        </h1>
        <button
          onClick={handleNextMonth}
          style={{
            backgroundColor: "#333",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
            marginLeft: "10px",
          }}
        >
          &gt;
        </button>
      </div>

      {renderCalendar()}
      {renderEventCards()}
    </div>
  );
};

export default FullCalendar;
