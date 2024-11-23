// import React, { useState } from "react";
// import {
//   Tabs,
//   TabsHeader,
//   TabsBody,
//   Tab,
//   TabPanel,
// } from "@material-tailwind/react";
// import { FaEye, FaEdit, FaTrash, FaPlus } from "react-icons/fa"; // Import icons
// import { useLocation } from "react-router-dom"; // Import useLocation hook

// const AnnouncementNav = () => {
//   const [activeTab, setActiveTab] = React.useState("Announcements");
//   const location = useLocation(); // Get the current path
//   const [eventMeetings, setEventMeetings] = useState([]);

//   // Check if the path starts with one of the specified routes
//   const isEditablePage = [ '/secretary', '/president'].some(path => location.pathname.startsWith(path));



//   const data = [
//     {
//       label: "Announcements",
//       value: "Announcements",
//       desc: "The Event registration link will be available soon.",
//       editable: isEditablePage, // Set editable based on the page
//     },
//     ...(isEditablePage
//       ? [
//           {
//             label: "Meetings",
//             value: "Meeting",
//             desc: "There will be a meeting for all the OC members on 24th August 2024",
//             editable: isEditablePage,
//           },
//         ]
//       : []),
//   ];

//   return (
//     <Tabs value={activeTab}>
//       <TabsHeader
//         className={`rounded-none bg-transparent p-0 ${
//           data.length === 1 ? 'justify-center' : 'flex'
//         }`}
//         indicatorProps={{
//           className:
//             "mt-8 absolute left-1/2 transform -translate-x-1/2 -bottom-3 w-2 h-2 rounded-full transition-opacity bg-transparent border-b-[8px] border-[#AEC90A] shadow-none",
//         }}
//       >
//         {data.map(({ label, value }) => (
//           <Tab
//             key={value}
//             value={value}
//             onClick={() => setActiveTab(value)}
//             className={`text-white hover:text-[#AEC90A] ${
//               activeTab === value ? "text-[#AEC90A]" : ""
//             }`}
//           >
//             {label}
//           </Tab>
//         ))}
//       </TabsHeader>
//       <TabsBody className="overflow-y-auto text-white p-2">
//         {data.map(({ value, desc, editable }) => (
//           <TabPanel
//             key={value}
//             value={value}
//             className="relative font-extrabold text-white"
//           >
//             <div className="relative group">
//               <p className="mb-4">{desc}</p>
//               {editable && (
//                 <div className="absolute inset-0 flex items-center justify-between px-4 py-2 bg-black opacity-0 group-hover:opacity-100 transition-opacity">
//                   <div className="flex items-center">
//                     <FaEye className="text-[#AEC90A] mr-2" />
//                     <select className="bg-neutral-900 text-white border border-[#AEC90A] rounded px-2 py-1">
//                       <option value="everyone">Everyone</option>
//                       <option value="oc">OC</option>
//                     </select>
//                   </div>
//                   <div className="flex items-center">
//                     <button className="text-[#AEC90A] hover:text-white mr-2">
//                       <FaEdit />
//                     </button>
//                     <button className="text-red-600 hover:text-white">
//                       <FaTrash />
//                     </button>
//                   </div>
//                 </div>
//               )}
//               {editable && (
//                 <button
//                   className="absolute -top-6 -left-6 text-[#AEC90A] hover:text-white p-2 rounded-full bg-black transition-colors"
//                   style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)' }}
//                 >
//                   <FaPlus size={10} />
//                 </button>
//               )}
//             </div>
//           </TabPanel>
//         ))}
//       </TabsBody>
//     </Tabs>
//   );
// };

// export default AnnouncementNav;




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

  // Check if the path starts with one of the specified routes
  const isEditablePage = [ '/secretary', '/president'].some(path => location.pathname.startsWith(path));


  //console.log("club id in announcemnet nav", clubId);
  //console.log("event in announcemnet nav", event);


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
    const [hour, minute] = timeArray;
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12; // Convert 0 or 12+ to 12-hour format
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
    // ...(isEditablePage
    //   ? eventMeetings.map((meeting) => ({
    //     label:`Meeting - ${meeting.meeting_name}`,
    //     value: `Meeting-${meeting.id}`,
    //     desc: meeting.meeting_name,
    //     editable: isEditablePage,
    //   }))
    // : []),
    ...(isEditablePage
            ? [
                {
                  label: "Meetings",
                  value: "Meeting",
                  desc:  (
                    <div>
                      <table className="w-full mb-4 text-white">
                        <thead>
                          <tr>
                          <th className="p-2 text-left">Meeting</th>
                            <th className="p-2 text-left">Date</th>
                            <th className="p-2 text-left">Time</th>
                            <th className="p-2 text-left">Type</th>
                            <th className="p-2 text-left">Venue</th>
                          </tr>
                        </thead>
                      {eventMeetings.map((meeting) => (
                        <tr key={meeting.e_meeting_id} 
                            className="mb-2 "
                            onMouseEnter={() => setHoveredRow(meeting.e_meeting_id)} // Set hovered row
                            onMouseLeave={() => setHoveredRow(null)}
                          >
                          <td className="p-2"><strong>{meeting.meeting_name}</strong></td>
                          <td className="p-2">{formatDate(meeting.date)}</td>
                          <td className="p-2">{formatTime(meeting.time)}</td>
                          <td className="p-2">{meeting.meeting_type}</td>
                          <td className="p-2"> {meeting.venue}</td>
                          {isEditablePage && (
                          <td>
                          
                            {/* <div className="flex items-center">
                              <FaEye className="text-[#AEC90A] mr-2" />
                              <select className="bg-neutral-900 text-white border border-[#AEC90A] rounded px-2 py-1">
                                <option value="everyone">Everyone</option>
                                <option value="oc">OC</option>
                              </select>
                            </div> */}
                            {hoveredRow === meeting.e_meeting_id && ( // Show buttons only for the hovered row
                              <div className="flex space-x-2">
                                <button className="text-[#AEC90A] hover:text-white">
                                  <FaEdit />
                                </button>
                                <button className="text-red-600 hover:text-white">
                                  <FaTrash />
                                </button>
                              </div>
                            )}
                          
                          </td>
                        )}
                          
                        </tr>
                      
                      ))}
                      </table>
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
              {/* {editable && (
                <div className="absolute inset-0 flex items-center justify-between px-4 py-2 bg-black opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center">
                    <FaEye className="text-[#AEC90A] mr-2" />
                    <select className="bg-neutral-900 text-white border border-[#AEC90A] rounded px-2 py-1">
                      <option value="everyone">Everyone</option>
                      <option value="oc">OC</option>
                    </select>
                  </div>
                  <div className="flex items-center">
                    <button className="text-[#AEC90A] hover:text-white mr-2">
                      <FaEdit />
                    </button>
                    <button className="text-red-600 hover:text-white">
                      <FaTrash />
                    </button>
                  </div>
                </div>
              )} */}
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



