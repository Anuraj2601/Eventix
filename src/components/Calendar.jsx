import { Menu, MenuButton, Transition } from "@headlessui/react";
import { DotsVerticalIcon } from "@heroicons/react/outline";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
} from "date-fns";
import { Fragment, useState } from "react";
import AddEvent from './AddEvent';
import { FaPlus } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import EventService from "../service/EventService";



const clubColors = {
  "IEEE": "#008EDE",
  "ISACA": "#FFFFFF",
  "Rekha": "#8c181b", 
  "Pahasara": "#FFE500",  
  "Rotaract" : "#4a093c",
};

const ColorPalette = ({ clubColors }) => {
  return (
    <div className="mt-4 p-4 border border-[#AEC90A] rounded-lg">
      <div className="flex flex-wrap justify-center space-x-8">
        {Object.entries(clubColors).map(([club, color]) => (
          <div key={club} className="flex items-center space-x-2 mb-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: color }}
            ></div>
            <span className="text-white">{club}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const meetings = [
  {
    id: 1,
    eventName: "MadHack 3.0",
    club: "IEEE",
    startDatetime: "2024-08-01T13:00",
    endDatetime: "2024-08-01T14:30",
    eventLocation: "UCSC Main Hall",
  },
  {
    id: 2,
    eventName: "CodeGen",
    club: "Pahasara",
    startDatetime: "2024-08-01T09:00",
    endDatetime: "2024-08-01T11:30",
    eventLocation: "UCSC Main Hall",
  },
  {
    id: 3,
    eventName: "MadHack 3.0",
    club: "IEEE",
    startDatetime: "2024-08-20T17:00",
    endDatetime: "2024-08-20T18:30",
    eventLocation: "UCSC Main Hall",
  },
  {
    id: 4,
    eventName: "CodeGen",
    club: "Pahasara",
    startDatetime: "2024-08-09T13:00",
    endDatetime: "2024-08-09T14:30",
    eventLocation: "UCSC Main Hall",
  },
  {
    id: 5,
    eventName: "Welocome",
    club: "Rekha ",
    startDatetime: "2024-08-10T14:00",
    endDatetime: "2024-08-12T14:30",
    eventLocation: "UCSC Main Hall",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Calendar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  const handleOpenModal = () => {
      setIsModalOpen(true);
  };

  const handleCloseModal = () => {
      setIsModalOpen(false);
  };
  
  let today = startOfToday();
  let [selectedDay, setSelectedDay] = useState(today);
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  let selectedDayMeetings = meetings.filter((meeting) =>
    isSameDay(parseISO(meeting.startDatetime), selectedDay)
  );

  return (
    <div className="pt-5">
      <div className="w-full h-full p-4 sm:px-7 md:max-w-full md:px-6 bg-[#050505] rounded-lg"  style={{ 
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' 
          }}>
        <div className="md:grid md:grid-cols-2 md:divide-x md:divide-[#050505]" >
          <div className="md:pr-14">
            <div className="flex items-center">
              <h2 className="flex-auto font-semibold text-white">
                {format(firstDayCurrentMonth, "MMMM yyyy")}
              </h2>
              <button
                type="button"
                onClick={previousMonth}
                className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Previous month</span>
                <ChevronLeftIcon
                  className="w-5 h-5 text-white"
                  aria-hidden="true"
                />
              </button>
              <button
                onClick={nextMonth}
                type="button"
                className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Next month</span>
                <ChevronRightIcon
                  className="w-5 h-5 text-white"
                  aria-hidden="true"
                />
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
                const dayMeetings = meetings.filter((meeting) =>
                  isSameDay(parseISO(meeting.startDatetime), day)
                );
                const dayColors = Array.from(new Set(dayMeetings.map(meeting => clubColors[meeting.club])));

                return (
                  <div
                    key={day.toString()}
                    className={classNames(
                      dayIdx === 0 && colStartClasses[getDay(day)],
                      "py-1.5"
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedDay(day)}
                      className={classNames(
                        isEqual(day, selectedDay) && "text-[#050505]",
                        dayMeetings.length > 0 &&
                          !isToday(day) &&
                          "bg-[#AEC90A] hover:bg-[#171717] hover:text-black",
                        !isEqual(day, selectedDay) &&
                          isToday(day) &&
                          "text-[#050505] bg-white hover:text-[#AEC90A]",
                        !isEqual(day, selectedDay) &&
                          !isToday(day) &&
                          isSameMonth(day, firstDayCurrentMonth) &&
                          "text-white",
                        !isEqual(day, selectedDay) &&
                          !isToday(day) &&
                          !isSameMonth(day, firstDayCurrentMonth) &&
                          "text-white",
                        isEqual(day, selectedDay) &&
                          isToday(day) &&
                          "bg-white text-[#050505]",
                        isEqual(day, selectedDay) &&
                          !isToday(day) &&
                          "bg-[#AEC90A] text-black",
                        !isEqual(day, selectedDay) &&
                          "hover:bg-gray-200 hover:text-black",
                        (isEqual(day, selectedDay) || isToday(day)) &&
                          "font-semibold",
                        "mx-auto flex h-8 w-8 items-center justify-center rounded-full"
                      )}
                    >
                      <time dateTime={format(day, "yyyy-MM-dd")}>
                        {format(day, "d")}
                      </time>
                    </button>
                    <div className="w-full h-1 mx-auto mt-1 flex justify-center space-x-1">
                      {dayColors.map((color, index) => (
                        <div
                          key={index}
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: color }}
                        ></div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            <ColorPalette clubColors={clubColors} />
          </div>
          <section className="mt-12 md:mt-0 md:pl-14 bg-black">
            <h2 className="font-semibold text-[#AEC90A] mt-4 text-center">
            {isToday(selectedDay) ? (
                <>Schedule for Today</>
              ) : (
                <>Schedule for{" "}
                  <time dateTime={format(selectedDay, "yyyy-MM-dd")}>
                    {format(selectedDay, "MMM dd, yyyy")}
                  </time>
                </>
              )}
            </h2>
            {selectedDayMeetings.length > 0 ? (
              <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
                {selectedDayMeetings.map((meeting) => (
                  <li
                  key={meeting.id}
                  className="flex items-center justify-between px-4 py-2 border rounded-lg"
                  style={{ borderColor: clubColors[meeting.club] }}
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">
                      {meeting.eventName}
                    </h3>
                    <p className="text-white">
                      <time dateTime={meeting.startDatetime}>
                        {format(parseISO(meeting.startDatetime), "hh:mm a")}
                      </time>{" "}
                      -{" "}
                      <time dateTime={meeting.endDatetime}>
                        {format(parseISO(meeting.endDatetime), "hh:mm a")}
                      </time>
                    </p>
                    <p className="text-white">
                      {meeting.eventLocation}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="ml-4 py-2 px-4 text-white rounded-full"
                    style={{ backgroundColor: clubColors[meeting.club], borderColor: clubColors[meeting.club] }}
                  >
                    Remind Me
                  </button>
                </li>
                
                ))} <div className="mt-4 space-y-1 text-sm leading-6 text-center text-gray-500">
                {(location.pathname.startsWith('/president') || location.pathname.startsWith('/secretary')) && (
                  <button
                    className="mt-4 p-2 bg-[#AEC90A] text-black rounded-full"
                    onClick={handleOpenModal}
                  >
                    Schedule Event
                  </button>
                )}
              </div>
              </ol>
            ) : (
              <div className="mt-4 space-y-1 text-sm leading-6 text-center text-gray-500">
              <p className="text-white">No upcoming events at the moment. Stay tuned for exciting updates!</p>
              {(location.pathname.startsWith('/president') || location.pathname.startsWith('/secretary')) && (
                <button
                  className="mt-4 p-2 bg-[#AEC90A] text-black rounded-full"
                  onClick={handleOpenModal}
                >
                  Schedule Event
                </button>
              )}
            </div>

            )}
          </section>
          {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-lg w-full">
                        <div className="flex justify-end p-4">
                            <button onClick={handleCloseModal} className="text-black">
                                <FaTimes />
                            </button>
                        </div>
                        <div className="p-4">
                            <AddEvent />
                        </div>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Calendar;


let colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];
