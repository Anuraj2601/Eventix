import React, { useState, useEffect } from "react";
import { MdSend } from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react";
import { FaDownload } from "react-icons/fa";
import { IconButton } from '@material-tailwind/react';

import EventService from "../service/EventService";
import ClubsService from "../service/ClubsService";

const Dialog = ({ children, isOpen, onClose, title, primaryAction, secondaryAction, primaryActionClass, icon }) => (
  isOpen ? (
    <div className="dialog fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-black bg-opacity-70 absolute inset-0" onClick={onClose}></div>
      <div className="relative bg-black border-2 border-[#AEC90A] p-6 rounded-lg shadow-lg w-1/3">
        <div className="dialog-title flex justify-between items-center">
          {icon && <span className={`dialog-icon ${icon}`}></span>}
          <h3 className="text-xl">{title}</h3>
          <button onClick={onClose} className="dialog-close">
            <IoIosCloseCircle />
          </button>
        </div>
        <div className="dialog-content mt-4">{children}</div>
        <div className="dialog-actions flex justify-end mt-4">
          <button
            onClick={primaryAction.onClick}
            className={`dialog-action ${primaryActionClass} px-4 py-2 rounded-full text-black`}
          >
            {primaryAction.label}
          </button>
          <button
            onClick={secondaryAction.onClick}
            className="dialog-action bg-gray-500 text-black px-4 py-2 rounded-full ml-2"
          >
            {secondaryAction.label}
          </button>
        </div>
      </div>
    </div>
  ) : null
);

const RequestTable = ({ type, events, onAccept, onReject }) => {
  return (
    <div className="overflow-auto rounded-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {events.map((row) => (
          <div
            key={row.id}
            className="bg-black rounded-2xl p-4 flex flex-col items-center"
            style={{ 
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' 
            }}
          >
            <div className="relative flex flex-col items-center mb-4">
              <img
                src={row.image}
                alt="Event"
                className="w-72 h-64 rounded-2xl mb-2 p-2"
                style={{ 
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' 
                }}
              />
              <span className="text-white mb-2">{row.event}</span>
            </div>

            <div className="flex flex-col items-center mb-4">
              <img
                src={row.club_image}
                alt="Club Logo"
                className="w-24 h-24 rounded-full mb-4"
              /> 
              <img
                src={row.president_image}
                alt="President"
                className="w-24 h-24 rounded-full mb-2"
              /> 
              <span className="text-white">President {row.president}</span>
            </div>

            <div className="flex flex-col items-center mb-4">
              <span className="text-white">Date: {row.date}</span>
              <span className="text-white">Venue: {row.venue}</span>
            </div>

            <div className="flex items-center mb-4">
              <IconButton>
                <FaDownload size={20} className="text-white cursor-pointer mr-4" />
              </IconButton>
            </div>

            <div className="flex flex-col space-y-2">
              <button
                className="px-3 py-1 rounded-full text-[#AEC90A] border-[#AEC90A] border"
                onClick={() => onAccept(row)}
              >
                Accept
              </button>
              <button
                className="px-3 py-1 rounded-full text-[#D32F2F] border border-[#D32F2F]"
                onClick={() => onReject(row)}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Requests = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState('');
  const [currentRow, setCurrentRow] = useState(null);
  const [events, setEvents] = useState({ all: [], accepted: [], rejected: [] });
  const [loading, setLoading] = useState(true);

  const subTabs = [
    { label: "All", value: "all" },
    { label: "Accepted", value: "accepted" },
    { label: "Rejected", value: "rejected" },
  ];

  useEffect(() => {
    const fetchEvents = async () => {
      const token = localStorage.getItem("token");
  
      if (token) {
        setLoading(true);
  
        try {
          // Fetch all events
          const events = await EventService.getAllEvents(token);
          console.log("Events:", events);
  
          // Format data without fetching club details
          const formattedEvents = events.content.map((event) => ({
            id: event.event_id,
            event: event.name,
            date: event.date.join("-"), // Assuming `event.date` is an array like [YYYY, MM, DD]
            venue: event.venue,
            image: event.event_image, 
            budget: event.budget_pdf,
            budget_status: event.budget_status,
            iud_status: event.iud_status,
            club_id: event.club_id,
          }));
  
          // Categorize events
          const allEvents = formattedEvents.filter(
            (event) => event.budget_status === -1 && event.iud_status === -1
          );
          const acceptedEvents = formattedEvents.filter((event) => event.budget_status === 1);
          const rejectedEvents = formattedEvents.filter((event) => event.budget_status === 0);
  
          // Update state with categorized events
          setEvents({
            all: allEvents,
            accepted: acceptedEvents,
            rejected: rejectedEvents,
          });
  
          console.log("All Events:", allEvents);
          console.log("Accepted Events:", acceptedEvents);
          console.log("Rejected Events:", rejectedEvents);
        } catch (error) {
          console.error("Error fetching events:", error);
        }
  
        setLoading(false);
      }
    };
  
    fetchEvents();
  }, []);
  
  

  const handleAccept = (row) => {
    setCurrentAction('accept');
    setCurrentRow(row);
    setIsDialogOpen(true);
  };

  const handleReject = (row) => {
    setCurrentAction('reject');
    setCurrentRow(row);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleDialogConfirm = () => {
    if (currentAction === 'accept') {
      console.log(`Accepted event: ${currentRow.event}`);
    } else if (currentAction === 'reject') {
      console.log(`Rejected event: ${currentRow.event}`);
    }
    handleDialogClose();
  };

  return (
    <div className="flex flex-col mt-6">
      <Tabs value={activeTab} className="flex flex-col flex-1">
        <TabsHeader
          className="rounded-none bg-transparent p-0 w-1/4"
          indicatorProps={{
            className: "bg-transparent shadow-none rounded-none",
          }}
        >
          {subTabs.map(({ label, value }) => (
            <Tab
              key={value}
              value={value}
              onClick={() => setActiveTab(value)}
              className={activeTab === value ? "text-[#AEC90A] bg-black rounded-full" : ""}
            >
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody className="overflow-auto">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-white text-xl">Loading Requests...</div>
            </div>
          ) : (
            subTabs.map(({ value }) => (
              <TabPanel key={value} value={value} className={` ${activeTab === value ? 'block' : 'hidden'}`}>
                <RequestTable type={value} events={events[value]} onAccept={handleAccept} onReject={handleReject} />
              </TabPanel>
            ))
          )}
        </TabsBody>
      </Tabs>

      <Dialog
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
        title={currentAction === 'accept' ? 'Accept Event' : 'Reject Event'}
        primaryAction={{ label: currentAction === 'accept' ? 'Confirm Accept' : 'Confirm Reject', onClick: handleDialogConfirm }}
        secondaryAction={{ label: "Cancel", onClick: handleDialogClose }}
        primaryActionClass={currentAction === 'accept' ? 'bg-[#AEC90A]' : 'bg-[#D32F2F]' }
      >
        <p className="text-black">
          {currentAction === 'accept'
            ? "Are you sure you want to accept this event?"
            : "Are you sure you want to reject this event?"}
        </p>
      </Dialog>
    </div>
  );
};

export default Requests;
