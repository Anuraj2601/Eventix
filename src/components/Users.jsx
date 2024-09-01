import React, { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react";
import { FaDownload } from "react-icons/fa";
import { IconButton } from '@material-tailwind/react';
import { HiDocumentText } from "react-icons/hi2";

// User Images
const userImages = [
  "https://randomuser.me/api/portraits/men/1.jpg",
  "https://randomuser.me/api/portraits/men/2.jpg",
  "https://randomuser.me/api/portraits/men/3.jpg",
  "https://randomuser.me/api/portraits/men/4.jpg",
  "https://randomuser.me/api/portraits/men/5.jpg",
  "https://randomuser.me/api/portraits/women/1.jpg",
  "https://randomuser.me/api/portraits/women/2.jpg",
  "https://randomuser.me/api/portraits/women/3.jpg",
  "https://randomuser.me/api/portraits/women/4.jpg",
  "https://randomuser.me/api/portraits/women/6.jpg",

  
];

// Function to generate a random registration number
const generateRegNumber = () => {
  const year = 2024; // Or any year close to 2024
  const randomNum = Math.floor(Math.random() * 1000); // Random number between 0 and 999
  const prefix = Math.random() < 0.5 ? 'is' : 'cs'; // Randomly choose 'is' or 'cs'
  return `${year}${prefix}${randomNum.toString().padStart(3, '0')}`;
};

// Function to generate a random email based on the registration number
const generateEmail = (regNumber) => `${regNumber}@ucsc.cmb.ac.lk`;

// Dialog Component
const Dialog = ({ children, isOpen, onClose, title, primaryAction, secondaryAction, primaryActionClass, icon }) => (
  isOpen ? (
    <div className="dialog fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-black bg-opacity-70 absolute inset-0"  onClick={onClose}></div>
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

// RequestTable Component for User Requests
const RequestTable = ({ type, onAccept, onReject }) => {
  const data = {
    all: [
      { id: 1, firstName: "John", lastName: "Doe", regNumber: generateRegNumber(), image: userImages[0] },
      { id: 2, firstName: "Jane", lastName: "Smith", regNumber: generateRegNumber(), image: userImages[1] },
      { id: 3, firstName: "Alice", lastName: "Johnson", regNumber: generateRegNumber(), image: userImages[2] },
      { id: 4, firstName: "Bob", lastName: "Brown", regNumber: generateRegNumber(), image: userImages[3] },
    ],
    accepted: [
      { id: 1, firstName: "Nina", lastName: "Williams", regNumber: generateRegNumber(), image: userImages[4] },
    ],
    rejected: [
      { id: 1, firstName: "Sophia", lastName: "Miller", regNumber: generateRegNumber(), image: userImages[5] },
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
    <div className="overflow-auto rounded-lg text-[#AEC90A]">
      {data[type].map((row) => (
        <div
          key={row.id}
          className="bg-black text-[#AEC90A] rounded-2xl p-6 mb-6 flex flex-col sm:flex-row items-center justify-between" style={{ 
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' 
          }}
        >
          <div className="flex flex-col sm:flex-row items-center ">
            <img src={row.image} alt="User" className="w-24 h-24 rounded-full mr-4" />
            <div className="flex flex-col text-center sm:text-left">
              <span>{`${row.firstName} ${row.lastName}`}</span>
              <span>{row.regNumber}</span>
              <span>{generateEmail(row.regNumber)}</span>
            </div>
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
      console.log(`Accepted user: ${currentRow.firstName} ${currentRow.lastName}`);
    } else if (currentAction === 'reject') {
      console.log(`Rejected user: ${currentRow.firstName} ${currentRow.lastName}`);
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
        title={currentAction === 'accept' ? 'Accept User' : 'Reject User'}
        primaryAction={{ label: currentAction === 'accept' ? 'Confirm Accept' : 'Confirm Reject', onClick: handleDialogConfirm }}
        secondaryAction={{ label: "Cancel", onClick: handleDialogClose }}
        primaryActionClass={currentAction === 'accept' ? 'bg-[#AEC90A]' : 'bg-[#D32F2F]'}
      >
        <p className="text-black">
          {currentAction === 'accept'
            ? `Are you sure you want to accept ${currentRow?.firstName} ${currentRow?.lastName}?`
            : `Are you sure you want to reject ${currentRow?.firstName} ${currentRow?.lastName}?`}
        </p>
      </Dialog>
    </div>
  );
};

export default Requests;
