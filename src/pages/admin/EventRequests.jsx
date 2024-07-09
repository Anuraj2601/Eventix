import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import ModalDialog from "../../components/ModalDialog";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

const EventRequestsTable = () => {
  const [isRejectModalOpen, setRejectModalOpen] = useState(false);
  const [isAcceptModalOpen, setAcceptModalOpen] = useState(false);

  
  const handleRejectClick = () => {
    setRejectModalOpen(true);
  };

  const handleAcceptClick = () => {
    setAcceptModalOpen(true);
  };

  const handleCloseRejectModal = () => {
    setRejectModalOpen(false);
  };

  const handleCloseAcceptModal = () => {
    setAcceptModalOpen(false);
  };


  return (
    <div className="bg-[#1E1E1E] rounded-[50px] p-6 h-screen">
      <table className="w-full">
        <thead className="text-[#AEC90A] text-center tracking-wide p-3">
          <tr>
            <th className="w-48">President</th>
            <th className="w-24">Club</th>
            <th>Proposed Event</th>
            <th className="w-52">Event Proposal</th>
            <th className="w-60">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-[#0B0B0B] text-center">
            <td className="p-3">
              <div className="flex items-center">
                <img
                  src="https://www.w3schools.com/w3images/avatar2.png"
                  alt="President Photo"
                  className="w-12 h-12 rounded-full mr-3"
                />
                <span>Kokul</span>
              </div>
            </td>
            <td className="p-3">
              <img
                src="src/assets/clubs/ieee2.jpeg"
                alt="Club Logo"
                className="w-12 h-12 rounded-md"
              />
            </td>
            <td className="p-3">Madhack 3.0</td>
            <td className="p-3">
              <a href="#" class="underline">
                View Proposal
              </a>
            </td>
            <td className="flex justify-between items-center p-3 space-x-4 m-3">
              <button
                className="bg-[#AEC90A] text-white px-3 py-1 rounded"
                onClick={handleAcceptClick}
              >
                Accept
              </button>
              <button
                className="bg-[#D32F2F] text-white px-3 py-1 rounded"
                onClick={handleRejectClick}
              >
                Reject
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <ModalDialog
        isOpen={isRejectModalOpen}
        onClose={handleCloseRejectModal}
        title="Reject Event"
        primaryAction={{ label: "Confirm Reject", onClick: handleCloseRejectModal }}
        secondaryAction={{ label: "Cancel", onClick: handleCloseRejectModal }}

      >
        <p className="text-black">
          Are you sure you want to reject this event?
        </p>
      </ModalDialog>
      <ModalDialog
        isOpen={isAcceptModalOpen}
        onClose={handleCloseAcceptModal}
        title="Accept Event"
        primaryAction={{ label: "Confirm Accept", onClick: handleCloseAcceptModal }}
        primaryActionClass = "bg-[#AEC90A] text-white"
        secondaryAction={{ label: "Cancel", onClick: handleCloseAcceptModal }}
        icon= "accept"
      >
        <p className="text-black">
          Are you sure you want to accept this event?
        </p>
      </ModalDialog>
    </div>
  );
};

const EventRequests = () => {
  const [activeTab, setActiveTab] = React.useState("allEventRequests");
  const data = [
    {
      label: "All",
      value: "allEventRequests",
      desc: <EventRequestsTable />,
    },
    {
      label: "Accepted",
      value: "acceptedEventRequests",
      desc: `Accepted Event Requests`,
    },
    {
      label: "Rejected",
      value: "rejectedEventRequests",
      desc: `Rejected Event Requests`,
    },
  ];

  return (
    <>
      <div className="fixed inset-0 flex">
        <Sidebar className="flex-shrink-0" />
        <div className="flex flex-col flex-1">
          <Navbar className="sticky top-0 z-10 p-4" />
          <div className="bg-neutral-900 text-white flex flex-col flex-1 overflow-hidden">
            <div className="flex justify-center items-center h-16">
              <h1 className="font-semibold text-[25px] pt-4">Event Requests</h1>
            </div>
            <Tabs value={activeTab} className="m-6 cursor-pointer">
              <TabsHeader
                className="rounded-none bg-transparent p-0 w-1/4"
                indicatorProps={{
                  className:
                    "bg-transparent border-b-2 border-[#AEC90A] shadow-none rounded-none",
                }}
              >
                {data.map(({ label, value }) => (
                  <Tab
                    key={value}
                    value={value}
                    onClick={() => setActiveTab(value)}
                    className={activeTab === value ? "text-[#AEC90A]" : ""}
                  >
                    {label}
                  </Tab>
                ))}
              </TabsHeader>
              <TabsBody>
                {data.map(({ value, desc }) => (
                  <TabPanel key={value} value={value}>
                    {desc}
                  </TabPanel>
                ))}
              </TabsBody>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventRequests;
