import React, { useState, useEffect } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

import EventService from "../service/EventService";

const Dialog = ({
  children,
  isOpen,
  onClose,
  title,
  primaryAction,
  secondaryAction,
  primaryActionClass,
  icon,
}) =>
  isOpen ? (
    <div className="dialog fixed inset-0 flex items-center justify-center z-50">
      <div
        className="bg-black bg-opacity-70 absolute inset-0"
        onClick={onClose}
      ></div>
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
  ) : null;

const RequestTable = ({ type, events, onAccept, onReject, onDownloadProposal, userRole }) => {
  return (
    <div className="overflow-auto rounded-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {events.map((row) => (
          <div
            key={row.id}
            className="bg-black rounded-2xl p-4 flex flex-col items-center"
            style={{
              boxShadow:
                "0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)",
            }}
          >
            <div className="relative flex flex-col items-center mb-4">
              <img
                src={row.image || row.club_image}
                alt="Event"
                className="w-72 h-64 rounded-2xl mb-2 p-2"
                style={{
                  boxShadow:
                    "0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)",
                }}
              />
              <span className="text-white font-bold text-2xl mb-2">{row.event}</span>
            </div>

            <div className="flex flex-col items-center mb-4">
              <img
                src={row.club_image}
                alt="Club Logo"
                className="w-24 h-24 rounded-full mb-4"
              />
              <img
                src={row.club_president_image}
                alt="President"
                className="w-24 h-24 rounded-full mb-2"
              />
              <span className="text-white">
                President {row.club_president_name}
              </span>
            </div>

            <div className="flex flex-col items-center mb-4">
              <span className="text-white">Date: {row.date}</span>
              <span className="text-white">Venue: {row.venue}</span>
            </div>
            {userRole === "admin" ? (
              // Show purpose and benefit for admin
              <div className="flex flex-col items-center mb-4">
                <span className="text-white text-lg font-bold">Purpose:</span>
                <p className="text-white text-center mb-2">{row.purpose || "Not provided"}</p>
                <span className="text-white text-lg font-bold">Benefit:</span>
                <p className="text-white text-center">{row.benefit || "Not provided"}</p>
              </div>
            ) : (
              // Show budget button for other roles (e.g., Treasurer)
              <div className="flex items-center mb-4">
                <button
                  onClick={() => window.open(row.budget, "_blank")}
                  className="px-4 py-2 rounded-lg border-[#AEC90A] border text-white hover:bg-[#AEC90A] transition-all"
                >
                  View Event Budget
                </button>
              </div>
            )}
            <div className="flex items-center mb-4">
              <button
                onClick={() => onDownloadProposal(row.id)} // Trigger the download function
                className="px-4 py-2 rounded-lg border-[#AEC90A] border text-white hover:bg-[#AEC90A] transition-all"
              >
                Download Event Proposal
              </button>
            </div>

            <div className="flex flex-col space-y-2">
              {type === "all" && (
                <>
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
                </>
              )}
              {type === "accepted" && (
                <button
                  className="px-3 py-1 rounded-full text-[#D32F2F] border border-[#D32F2F]"
                  onClick={() => onReject(row)}
                >
                  Reject
                </button>
              )}
              {type === "rejected" && (
                <button
                  className="px-3 py-1 rounded-full text-[#AEC90A] border-[#AEC90A] border"
                  onClick={() => onAccept(row)}
                >
                  Accept
                </button>
              )}
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
  const [currentAction, setCurrentAction] = useState("");
  const [currentRow, setCurrentRow] = useState(null);
  const [events, setEvents] = useState({ all: [], accepted: [], rejected: [] });
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  

  const subTabs = [
    { label: "All", value: "all" },
    { label: "Accepted", value: "accepted" },
    { label: "Rejected", value: "rejected" },
  ];
  

  useEffect(() => {
    const fetchEvents = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        // const role = localStorage.getItem("role");
        // console.log("Local Storage Role:", role);

        // setUserRole(role);

        const storedRole = localStorage.getItem("role") || ""; // Fallback to an empty string
        const role = storedRole.trim().toLowerCase(); // Normalize the role

        console.log("Local Storage Role:", storedRole);
        console.log("Local Storage role (Normalized/role):", role);

        setUserRole(role); // Store the normalized role in state

        // Authorization check (customize if needed)
        if (role !== "treasurer" && role !== "admin") {
          alert("You are not authorized to view this page.");
          return;
        }

        setLoading(true);

        try {
          console.log("Authorized Role");
          // Fetch all events
          const events = await EventService.getAllEventsWithClubs(token);
          console.log("Events:", events);

          // Format data without fetching club details
          const formattedEvents = events.content.map((event) => ({
            id: event.event_id,
            event: event.name,
            date: event.date.join("-"), // an array like [YYYY, MM, DD]
            venue: event.venue,
            image: event.event_image,
            budget: event.budget_pdf,
            budget_status: event.budget_status,
            iud_status: event.iud_status,
            club_id: event.club_id,
            club_image: event.clubImage,
            club_president_image: event.clubPresidentImage,
            club_president_name: event.clubPresidentName,
            benefit: event.benefits,
            purpose: event.purpose,
          }));

          if (role == "admin") {
            // Admin-specific event filtering by iud_status
            const allEvents = formattedEvents.filter(
              (event) => event.iud_status === -1 && event.budget_status === 1
            );
            const approvedEvents = formattedEvents.filter(
              (event) => event.iud_status === 1 && event.budget_status === 1
            );
            const rejectedEvents = formattedEvents.filter(
              (event) => event.iud_status === 0 && event.budget_status === 1
            );

            setEvents({
              all: allEvents,
              accepted: approvedEvents,
              rejected: rejectedEvents,
            });

            console.log("Admin View - All Events:", allEvents);
            console.log("Admin View - Approved Events:", approvedEvents);
            console.log("Admin View - Rejected Events:", rejectedEvents);
          } else {
            // Treasurer-specific event filtering by budget_status
            const allEvents = formattedEvents.filter(
              (event) => event.budget_status === -1 && event.iud_status === -1
            );
            const acceptedEvents = formattedEvents.filter(
              (event) => event.budget_status === 1
            );
            const rejectedEvents = formattedEvents.filter(
              (event) => event.budget_status === 0
            );

            // Update state with categorized events
            setEvents({
              all: allEvents,
              accepted: acceptedEvents,
              rejected: rejectedEvents,
            });

            console.log("Treasurer View - All Events:", allEvents);
            console.log("Treasurer View - Accepted Events:", acceptedEvents);
            console.log("Treasurer View - Rejected Events:", rejectedEvents);
          }
        } catch (error) {
          console.error("Error fetching events:", error);
        }

        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleDownloadProposal = async (eventId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to view the proposal.");
        return;
      }
  
      const response = await EventService.downloadEventProposal(eventId, token);
  
      // Create a URL for the binary file and open it in a new browser tab
      const url = window.URL.createObjectURL(new Blob([response.data], { type: "application/pdf" }));
      window.open(url, "_blank"); // Open the file in a new tab
    } catch (error) {
      alert("Failed to fetch the event proposal.");
      console.error("Error fetching the proposal:", error);
    }
  };
  
  

  const handleAccept = (row) => {
    setCurrentAction("accept");
    setCurrentRow(row);
    setIsDialogOpen(true);
  };

  const handleReject = (row) => {
    setCurrentAction("reject");
    setCurrentRow(row);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };
  

  // const handleDialogConfirm = () => {
  //   if (currentAction === "accept") {
  //     console.log(`Accepted event: ${currentRow.event}`);
  //   } else if (currentAction === "reject") {
  //     console.log(`Rejected event: ${currentRow.event}`);
  //   }
  //   handleDialogClose();
  // };

  const handleDialogConfirm = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in to perform this action.");
      return;
    }

    try {
      const isAdmin = userRole?.toLowerCase() === "admin";
      const newStatus = currentAction === "accept" ? 1 : 0;

      let response;

      if (isAdmin) {
        // Admin updates iud_status
        response = await EventService.updateIudStatus(
          currentRow.id,
          newStatus,
          "admin",
          token
        );
      } else {
        // Treasurer updates budget_status
        response = await EventService.updateBudgetStatus(
          currentRow.id,
          newStatus,
          "treasurer",
          token
        );
      }

      if (response.statusCode === "RSP_SUCCESS") {
        alert(
          `Event ${
            currentAction === "accept" ? "accepted" : "rejected"
          } successfully!`
        );
        setEvents((prev) => {
          const updatedAll = prev.all.filter(
            (event) => event.id !== currentRow.id
          );
          const updatedAccepted =
            currentAction === "accept"
              ? [
                  ...prev.accepted,
                  {
                    ...currentRow,
                    [`${isAdmin ? "iud_status" : "budget_status"}`]: 1,
                  },
                ]
              : prev.accepted;
          const updatedRejected =
            currentAction === "reject"
              ? [
                  ...prev.rejected,
                  {
                    ...currentRow,
                    [`${isAdmin ? "iud_status" : "budget_status"}`]: 0,
                  },
                ]
              : prev.rejected;

          return {
            all: updatedAll,
            accepted: updatedAccepted,
            rejected: updatedRejected,
          };
        });
      } else {
        alert(response.message || "Failed to update the event status.");
      }
    } catch (error) {
      console.error("Error updating event status:", error);
      alert("An error occurred. Please try again.");
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
              className={
                activeTab === value
                  ? "text-[#AEC90A] bg-black rounded-full"
                  : ""
              }
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
              <TabPanel
                key={value}
                value={value}
                className={` ${activeTab === value ? "block" : "hidden"}`}
              >
                <RequestTable
                  type={value}
                  events={events[value]}
                  onAccept={handleAccept}
                  onReject={handleReject}
                  onDownloadProposal={handleDownloadProposal}
                  userRole={userRole} 
                />
              </TabPanel>
            ))
          )}
        </TabsBody>
      </Tabs>

      <Dialog
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
        title={
          currentAction === "accept"
            ? userRole === "admin"
              ? "Approve Event"
              : "Accept Budget"
            : userRole === "admin"
            ? "Reject Event"
            : "Reject Budget"
        }
        primaryAction={{
          label:
            currentAction === "accept"
              ? userRole === "admin"
                ? "Confirm Approve"
                : "Confirm Accept"
              : userRole === "admin"
              ? "Confirm Reject"
              : "Confirm Reject",
          onClick: handleDialogConfirm,
        }}
        secondaryAction={{ label: "Cancel", onClick: handleDialogClose }}
        primaryActionClass={
          currentAction === "accept" ? "bg-[#AEC90A]" : "bg-[#D32F2F]"
        }
      >
        <p className="text-white">
          {currentAction === "accept"
            ? userRole === "admin"
              ? "Are you sure you want to Approve this Event Request?"
              : "Are you sure you want to Accept this Event Budget?"
            : userRole === "admin"
            ? "Are you sure you want to Reject this Event Request?"
            : "Are you sure you want to Reject this Event Budget?"}
        </p>
      </Dialog>
    </div>
  );
};

export default Requests;
