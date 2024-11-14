import { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { eachDayOfInterval, endOfMonth, format, parse, startOfToday, isSameDay, isToday, add } from "date-fns";
import EventService from "../service/EventService"; // Assuming this is where your fetchEvents function is located
import AddEvent from './AddEvent';
import { useLocation } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';

const clubColors = {
  IEEE: "#008EDE",
  ISACA: "#FFFFFF",
  Rekha: "#8c181b",
  Pahasara: "#FFE500",  
  Rotaract: "#4a093c",
};

const Calendar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState([]); // To store fetched events
  const [selectedDay, setSelectedDay] = useState(startOfToday());
  const [currentMonth, setCurrentMonth] = useState(format(startOfToday(), "MMM-yyyy"));
  const [groupedEvents, setGroupedEvents] = useState({}); // Store events grouped by date
  const location = useLocation();

  useEffect(() => {
    // Fetch events from EventService
    const fetchEvents = async () => {
      try {
        const fetchedEvents = await EventService.fetchEvents(); // Assuming this returns a list of events
        setEvents(fetchedEvents);
        groupEventsByDate(fetchedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    groupEventsByDate(events);
  }, [events]);

  // Group events by date
  const groupEventsByDate = (events) => {
    const grouped = events.reduce((acc, event) => {
      const eventDate = format(new Date(event.startDatetime), "yyyy-MM-dd");
      if (!acc[eventDate]) {
        acc[eventDate] = [];
      }
      acc[eventDate].push(event);
      return acc;
    }, {});
    setGroupedEvents(grouped);
  };

  // Get all days in the current month
  const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());
  const days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  const previousMonth = () => {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  };

  const nextMonth = () => {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  };

  // Get the events for the selected day
  const selectedDayKey = format(selectedDay, "yyyy-MM-dd");
  const selectedDayEvents = groupedEvents[selectedDayKey] || [];

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="pt-5">
      <div className="w-full h-full p-4 sm:px-7 md:max-w-full md:px-6 bg-[#050505] rounded-lg" style={{ boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' }}>
        <div className="md:grid md:grid-cols-2 md:divide-x md:divide-[#050505]">
          <div className="md:pr-14">
            <div className="flex items-center">
              <h2 className="flex-auto font-semibold text-white">
                {format(firstDayCurrentMonth, "MMMM yyyy")}
              </h2>
              <button type="button" onClick={previousMonth} className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500">
                <ChevronLeftIcon className="w-5 h-5 text-white" aria-hidden="true" />
              </button>
              <button type="button" onClick={nextMonth} className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500">
                <ChevronRightIcon className="w-5 h-5 text-white" aria-hidden="true" />
              </button>
            </div>
            <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-white">
              <div>Sun</div>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
            </div>
            <div className="grid grid-cols-7 mt-2 text-sm">
              {days.map((day, dayIdx) => {
                const dayKey = format(day, "yyyy-MM-dd");
                const dayMeetings = groupedEvents[dayKey] || [];
                const dayColors = Array.from(new Set(dayMeetings.map(meeting => clubColors[meeting.club])));
                return (
                  <div key={day.toString()} className={`py-1.5 ${dayIdx === 0 && "col-start-1"}`}>
                    <button
                      type="button"
                      onClick={() => setSelectedDay(day)}
                      className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full 
                        ${isSameDay(day, selectedDay) ? 'bg-[#AEC90A] text-black' : 'text-white'}
                        ${!isSameDay(day, selectedDay) && isToday(day) && 'bg-white text-[#050505]'}
                        ${!isSameDay(day, selectedDay) && !isToday(day) && 'hover:bg-gray-200 hover:text-black'}`}
                    >
                      <time dateTime={format(day, "yyyy-MM-dd")}>
                        {format(day, "d")}
                      </time>
                    </button>
                    <div className="w-full h-1 mx-auto mt-1 flex justify-center space-x-1">
                      {dayColors.map((color, index) => (
                        <div key={index} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }}></div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <section className="mt-12 md:mt-0 md:pl-14 bg-black">
            <h2 className="font-semibold text-[#AEC90A] mt-4 text-center">
              {isToday(selectedDay) ? "Schedule for Today" : `Schedule for ${format(selectedDay, "MMM dd, yyyy")}`}
            </h2>
            {selectedDayEvents.length > 0 ? (
              <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
                {selectedDayEvents.map((meeting) => (
                  <li key={meeting.id} className="flex items-center justify-between px-4 py-2 border rounded-lg" style={{ borderColor: clubColors[meeting.club] }}>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">{meeting.eventName}</h3>
                      <p className="text-white">
                        <time dateTime={meeting.startDatetime}>{format(new Date(meeting.startDatetime), "hh:mm a")}</time> - 
                        <time dateTime={meeting.endDatetime}>{format(new Date(meeting.endDatetime), "hh:mm a")}</time>
                      </p>
                      <p className="text-white">{meeting.eventLocation}</p>
                    </div>
                    <button type="button" className="ml-4 py-2 px-4 text-white rounded-full" style={{ backgroundColor: clubColors[meeting.club] }}>
                      Remind Me
                    </button>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="mt-4 text-white">No events scheduled for this day.</p>
            )}
            {(location.pathname.startsWith('/president') || location.pathname.startsWith('/secretary')) && (
              <button className="mt-4 p-2 bg-[#AEC90A] rounded text-black" onClick={handleOpenModal}>Schedule Event</button>
            )}
          </section>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl mx-4 p-6 relative">
            <button className="absolute top-2 right-2" onClick={handleCloseModal}>
              <FaTimes />
            </button>
            <AddEvent onClose={handleCloseModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
