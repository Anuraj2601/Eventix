




import React, { useState, useEffect } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { FaEye, FaEdit, FaTrash, FaPlus } from "react-icons/fa"; // Import icons
import { useLocation } from "react-router-dom"; // Import useLocation hook
import EventMeetingService from "../service/EventMeetingService";

const AnnouncementNav = ({clubId, event}) => {
  const [activeTab, setActiveTab] = React.useState("Announcements");
  const location = useLocation(); // Get the current path
  const [eventMeetings, setEventMeetings] = useState([]);
  const [hoveredRow, setHoveredRow] = useState(null);

  const isEditablePage = [ '/secretary', '/president'].some(path => location.pathname.startsWith(path));


  const isMeetingToday = (date) => {
    const today = new Date();
    const meetingDate = new Date(date[2], date[1] - 1, date[0]); // assuming date is [day, month, year]
    return today.toDateString() === meetingDate.toDateString();
  };

  const isTimeClose = (time) => {
    const now = new Date();
    const meetingTime = new Date();
    meetingTime.setHours(time[0], time[1], 0, 0); // assuming time is [hour, minute]
    
    // Check if the meeting is within 30 minutes from now
    const diffMinutes = (meetingTime - now) / (1000 * 60);
    return diffMinutes <= 30 && diffMinutes >= 0; // Meeting is within 30 minutes
  };


  useEffect(() => {
    const fetchEventMeetings = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await EventMeetingService.getAllEventMeetings(token);
        //console.log("Event meetings", response);
        const eventMeetingsArray = response.content.filter(meeting => meeting.event_id === event.event_id ) || [];
        console.log("event Meetings array", eventMeetingsArray);

      
        setEventMeetings(eventMeetingsArray); 

        
      } catch (error) {
        console.error("Error fetching meetings", error);
      }
    };

    fetchEventMeetings();
  }, []);

  const formatTime = (timeArray) => {
    if (!Array.isArray(timeArray) || timeArray.length !== 2) return "Invalid time";
    const [hour, minute] = timeArray;
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minute.toString().padStart(2, "0")} ${ampm}`;
  };
  
  const formatDate = (dateArray) => {
    const [year, month, day] = dateArray;
    const date = new Date(year, month - 1, day); // Month is zero-indexed
    return date.toLocaleDateString("en-US", {
      month: "numeric", // Numeric form of the month
      day: "2-digit",   // 2-digit day
      year: "numeric",  // Full year
    });
  };
  
 

  const data = [
    {
      label: "Announcements",
      value: "Announcements",
      desc: "The Event registration link will be available soon.",
      editable: isEditablePage, // Set editable based on the page
    },
  
    ...(isEditablePage
            ? [
                {
                  label: "Meetings",
                  value: "Meeting",
                  desc:  (
                    <div className="mb-2 overflow-auto max-h-24">
  {eventMeetings
    .filter((meeting) => {
      const meetingDate = new Date(meeting.date);
      const currentDate = new Date();

      // Ensure the meeting is in the future
      return meetingDate > currentDate;
    })
    .map((meeting) => (
      <div key={meeting.e_meeting_id} className="mb-4">
        <p className="flex items-center space-x-2 overflow-x-auto whitespace-nowrap">
          <span><strong>{meeting.meeting_name}</strong></span>
          <span className="text-[#AEC90A] font-bold">{formatDate(meeting.date)}</span>
          <span className="text-[#AEC90A] font-bold">{formatTime(meeting.time)}</span>

          {/* Conditionally display the dot for meeting type */}
          {meeting.meeting_type === 'ONLINE' ? (
            <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span> // Green dot for online
          ) : (
            <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> // Red dot for physical
          )}

          <span>at {meeting.venue}</span>

          {/* Conditional "Join" button */}
          {isMeetingToday(meeting.date) && isTimeClose(meeting.time) ? (
            <button
              className="ml-2 p-2 bg-yellow-500 text-white rounded"
              disabled={false}
            >
              Join
            </button>
          ) : (
            <button
              className="ml-2 p-2 bg-gray-500 text-white rounded cursor-not-allowed"
              disabled={true}
            >
              Join
            </button>
          )}
        </p>
      </div>
    ))}
</div>

                  ),
                  editable: isEditablePage,
                },
              ]
            : []),

  ];

  return (
    <Tabs value={activeTab}>
      <TabsHeader
        className={`rounded-none bg-transparent p-0 ${
          data.length === 1 ? 'justify-center' : 'flex'
        }`}
        indicatorProps={{
          className:
            "mt-8 absolute left-1/2 transform -translate-x-1/2 -bottom-3 w-2 h-2 rounded-full transition-opacity bg-transparent border-b-[8px] border-[#AEC90A] shadow-none",
        }}
      >
        {data.map(({ label, value }) => (
          <Tab
            key={value}
            value={value}
            onClick={() => setActiveTab(value)}
            className={`text-white hover:text-[#AEC90A] ${
              activeTab === value ? "text-[#AEC90A]" : ""
            }`}
          >
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody className="overflow-y-auto text-white p-2">
        {data.map(({ value, desc, editable }) => (
          <TabPanel
            key={value}
            value={value}
            className="relative text-white"
          >
            <div className="relative group">
              <p className="mb-4">{desc}</p>
           
              {editable && (
                <button
                  className="absolute -top-6 -left-6 text-[#AEC90A] hover:text-white p-2 rounded-full bg-black transition-colors"
                  style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)' }}
                >
                  <FaPlus size={10} />
                </button>
              )}
            </div>
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
};

export default AnnouncementNav;



