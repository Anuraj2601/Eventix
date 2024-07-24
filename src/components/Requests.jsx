import React, { useState } from "react";
import { MdSend } from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react";
import ieee1 from "../assets/events/madhack.png";
import ieee2 from "../assets/events/reid.jpg";
import ieee3 from "../assets/events/intro.jpg";
import ieee4 from "../assets/events/ieeeday.jpg";

// Dialog Component
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

// RequestTable Component
const RequestTable = ({ type, onAccept, onReject }) => {
  const data = {
    all: [
      { id: 1, president: "Kokul", club: "IEEE", event: "Madhack 3.0", date: "2024-09-15", venue: "Tech Park", image: "https://randomuser.me/api/portraits/men/4.jpg" },
      { id: 2, president: "Jane", club: "CSI", event: "TechFest 4.0", date: "2024-10-22", venue: "Convention Center", image: "https://randomuser.me/api/portraits/women/4.jpg" },
      { id: 3, president: "Doe", club: "IEEE", event: "Hackathon 2.0", date: "2024-11-05", venue: "Innovation Hub", image: "https://randomuser.me/api/portraits/men/5.jpg" },
      { id: 4, president: "Alex", club: "Pahasara", event: "SpaceX Launch", date: "2024-12-12", venue: "Space Station", image: "https://randomuser.me/api/portraits/women/5.jpg" },
    ],
    accepted: [
      { id: 1, president: "Nina", club: "Rotaract", event: "AI Summit", date: "2024-09-30", venue: "AI Center", image: "https://randomuser.me/api/portraits/men/6.jpg" },
      { id: 2, president: "Liam", club: "Rekha", event: "Robotics Expo", date: "2024-11-15", venue: "Expo Hall", image: "https://randomuser.me/api/portraits/women/6.jpg" },
    ],
    rejected: [
      { id: 1, president: "Sophia", club: "Wie of IEEE", event: "Quantum Computing", date: "2024-10-01", venue: "Quantum Lab", image: "https://randomuser.me/api/portraits/men/7.jpg" },
      { id: 2, president: "John", club: "ACM", event: "BioTech Conference", date: "2024-11-25", venue: "BioTech Center", image: "https://randomuser.me/api/portraits/women/7.jpg" },
    ],
  };

  return (
    <div className="bg-black rounded-xl p-3 h-full overflow-auto text-white">
      <table className="w-full">
        <thead className="text-[#AEC90A] text-center tracking-wide p-3">
          <tr>
            <th className="w-48">President</th>
            <th className="w-24">Club</th>
            <th>Event</th>
            <th>Date</th>
            <th>Venue</th>
            <th className="w-52">Event Proposal</th>
            <th className="w-60">Action</th>
          </tr>
        </thead>
        <tbody>
          {data[type].map((row) => (
            <tr key={row.id} className="  text-center">
              <td className="p-3">
                <div className="flex items-center">
                  <img
                    src={row.image}
                    alt="President"
                    className="w-12 h-12 rounded-full mr-3"
                  />
                  <span >{row.president} </span>
                </div>
              </td>
              <td className="p-3">
              <span>president of {row.club}</span>
               
              </td>
              <td className="p-3 ">  <img
                  src={ieee1} // Placeholder club image
                  alt="Club Logo"
                  className="w-40 h-20 rounded-md"
                />{row.event}</td>
              <td className="p-3">{row.date}</td>
              <td className="p-3">{row.venue}</td>
              <td className="p-3">
                <a href="#" className="underline">View Proposal</a>
              </td>
              <td className="flex justify-between items-center p-3 space-x-4 m-3">
                <button
                  className="text-[#AEC90A] border-[#AEC90A]  border px-3 py-1 rounded-full"
                  onClick={() => onAccept(row)}
                >
                  Accept
                </button>
                <button
                  className="text-[#D32F2F] border border-[#D32F2F] px-3 py-1 rounded-full"
                  onClick={() => onReject(row)}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Main Requests Component
const Requests = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState('');
  const [currentRow, setCurrentRow] = useState(null);

  const subTabs = [
    { label: "All", value: "all" },
    { label: "Accepted", value: "accepted" },
    { label: "Rejected", value: "rejected" },
  ];

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
    <div className="flex flex-col h-full">
      <Tabs value={activeTab} className="flex flex-col flex-1">
        <TabsHeader
            className="rounded-none bg-transparent p-0 w-1/4"
            indicatorProps={{
                className:
                    "bg-transparent shadow-none rounded-none",
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
        <TabsBody className="flex-1 overflow-auto">
          {subTabs.map(({ value }) => (
            <TabPanel key={value} value={value} className={`flex-1 p-6 ${activeTab === value ? 'block' : 'hidden'}`}>
              <RequestTable type={value} onAccept={handleAccept} onReject={handleReject} />
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>

      {/* Dialog for Accept/Reject Confirmation */}
      <Dialog
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
        title={currentAction === 'accept' ? 'Accept Event' : 'Reject Event'}
        primaryAction={{ label: currentAction === 'accept' ? 'Confirm Accept' : 'Confirm Reject', onClick: handleDialogConfirm }}
        secondaryAction={{ label: "Cancel", onClick: handleDialogClose }}
        primaryActionClass={currentAction === 'accept' ? 'bg-[#AEC90A]' : 'bg-[#D32F2F]'}
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
