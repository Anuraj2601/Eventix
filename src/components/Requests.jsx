import React, { useState } from "react";
import { MdSend } from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react";
import { FaDownload } from "react-icons/fa";
import { IconButton } from '@material-tailwind/react';

import { HiDocumentText } from "react-icons/hi2";

import ieee1 from "../assets/events/madhack.png";
import ieee2 from "../assets/events/reid.jpg";
import ieee3 from "../assets/events/intro.jpg";
import ieee4 from "../assets/events/ieeeday.jpg";
import ieee5 from "../assets/events/revol.jpg";
import ieee6 from "../assets/events/reid2.jpg";

import rac1 from "../assets/events/trail.jpg";
import rac2 from "../assets/events/snap.jpg";
import rac3 from "../assets/events/dev.jpg";
import rac4 from "../assets/events/sport.jpg";
import rac5 from "../assets/events/gtech.jpg";
import rac6 from "../assets/events/training.jpg";

import acm1 from "../assets/events/8.jpg";
import acm2 from "../assets/events/hour.jpg";
import acm3 from "../assets/events/ballet.jpg";
import acm4 from "../assets/events/discussion.jpg";
import acm5 from "../assets/events/creative.jpg";
import acm6 from "../assets/events/reid2.jpg";

import p1 from "../assets/events/8.jpg";
import p2 from "../assets/events/hour.jpg";
import p3 from "../assets/events/ballet.jpg";
import p4 from "../assets/events/discussion.jpg";
import p5 from "../assets/events/creative.jpg";
import p6 from "../assets/events/reid2.jpg";

import ieeeImage from '../assets/clubs/ieee.png';
import rotaractImage from '../assets/clubs/rotaract.png';
import acmImage from '../assets/clubs/acm.png';
import pahasaraImage from '../assets/clubs/pahasara1.png';
import isacaImage from '../assets/clubs/isaca1.png';
import wieImage from '../assets/clubs/wie.png';
import msImage from '../assets/clubs/ms.png';
import wicysImage from '../assets/clubs/wicys.png';
import rekhaImage from '../assets/clubs/rekha.png';

const eventImages = {
  IEEE: [ieee1, ieee2, ieee3, ieee4, ieee5, ieee6],
  Rotaract: [rac1, rac2, rac3, rac4, rac5, rac6],
  ACM: [acm1, acm2, acm3, acm4, acm5, acm6],
  

  

};

// Club Images
const clubImages = {
  IEEE: ieeeImage,
  Rotaract: rotaractImage,
  ACM: acmImage,
  Pahasara: pahasaraImage,
  ISACA: isacaImage,
  WIE: wieImage,
  MS: msImage,
  WICYS: wicysImage,
  Rekha: rekhaImage,
};

// Function to get random event image
// Function to get a random event image within a specified range
const getRandomEventImage = (club, start = 0, end = 5) => {
  const images = eventImages[club] || [];
  // Ensure the end index does not exceed the length of the images array
  const validEnd = Math.min(end, images.length - 1);
  const range = images.slice(start, validEnd + 1);
  return range[Math.floor(Math.random() * range.length)];
};

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
      { id: 2, president: "Jane", club: "Rotaract", event: "TechFest 4.0", date: "2024-10-22", venue: "Convention Center", image: "https://randomuser.me/api/portraits/women/4.jpg" },
      { id: 3, president: "Doe", club: "IEEE", event: "Hackathon 2.0", date: "2024-11-05", venue: "Innovation Hub", image: "https://randomuser.me/api/portraits/men/5.jpg" },
      { id: 4, president: "Alex", club: "ACM", event: "SpaceX Launch", date: "2024-12-12", venue: "Space Station", image: "https://randomuser.me/api/portraits/women/5.jpg" },
    ],
    accepted: [
      { id: 1, president: "Nina", club: "Rotaract", event: "AI Summit", date: "2024-09-30", venue: "AI Center", image: "https://randomuser.me/api/portraits/men/6.jpg" },
      { id: 2, president: "Liam", club: "ACM", event: "Robotics Expo", date: "2024-11-15", venue: "Expo Hall", image: "https://randomuser.me/api/portraits/women/6.jpg" },
    ],
    rejected: [
      { id: 1, president: "Sophia", club: "IEEE", event: "Quantum Computing", date: "2024-10-01", venue: "Quantum Lab", image: "https://randomuser.me/api/portraits/men/7.jpg" },
      { id: 2, president: "John", club: "ACM", event: "BioTech Conference", date: "2024-11-25", venue: "BioTech Center", image: "https://randomuser.me/api/portraits/women/7.jpg" },
    ],
  };

  const getButtonClass = (actionType, rowStatus) => {
    const baseClass = "px-3 py-1 rounded-full";
    if (rowStatus === actionType) {
      return `${baseClass} text-white border border-transparent cursor-not-allowed`; // Disabled button style
    }
    return actionType === "accept"
      ? `${baseClass} text-[#AEC90A] border-[#AEC90A] border`
      : `${baseClass} text-[#D32F2F] border border-[#D32F2F]`;
  };
  return (
    <div className="overflow-auto rounded-lg">
      {data[type].map((row) => (
        <div
          key={row.id}
          className="bg-black text-[#AEC90A] rounded-2xl p-4 mb-6 flex flex-col md:flex-row items-center justify-between" style={{ 
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' 
          }}
        >
          <div className="flex items-center mb-4 md:mb-0">
            <img src={row.image} alt="President" className="w-24 h-24 rounded-full mr-4" />
            <span>{row.president}</span>
          </div>
          <div className="flex items-center mb-4 md:mb-0">
            <img src={clubImages[row.club]} alt="Club Logo" className="w-16 h-16 rounded-md mr-4" />
            <span>President of {row.club}</span>
          </div>
          <div className="flex flex-col items-center mb-4 md:mb-0">
            <span>To conduct:</span>
            <img src={getRandomEventImage(row.club)} alt="Event" className="w-32 h-16 rounded-md mb-2" />
            <span>{row.event}</span>
          </div>
          <div className="flex flex-col items-center mb-4 md:mb-0">
            <span>Date: {row.date}</span>
            <span>Venue: {row.venue}</span>
          </div>
          <div className="flex items-center mb-4 md:mb-0"> <IconButton>
            <FaDownload size={20} className="text-white cursor-pointer mr-4" /></IconButton>
          </div>
          <div className="flex items-center space-x-2">
            <button
              className={getButtonClass("accept")}
              onClick={() => onAccept(row)}
            >
              {type === "accepted" ? "Accepted" : "Accept"}
            </button>
            <button
              className={getButtonClass("reject")}
              onClick={() => onReject(row)}
            >
              {type === "rejected" ? "Rejected" : "Reject"}
            </button>
          </div>
        </div>
      ))}
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
    <div className="flex flex-col  mt-6">
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
        <TabsBody className="overflow-auto">
          {subTabs.map(({ value }) => (
            <TabPanel key={value} value={value} className={` ${activeTab === value ? 'block' : 'hidden'}`}>
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
