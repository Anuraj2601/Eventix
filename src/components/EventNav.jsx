import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { MdAdd } from "react-icons/md"; // Import the plus icon
import { useLocation } from "react-router-dom"; // Import useLocation hook

import Board from "./Board";
import Posts from "./Posts";
import Oc from "./Oc";
import YourRegistration from "./YourRegistration"; // Import YourRegistration component

const EventNav = () => {
  const [activeTab, setActiveTab] = React.useState("Posts");
  const [isDropdownVisible, setDropdownVisible] = React.useState(false);

  const location = useLocation(); // Get the current path
  const isStudentPage = location.pathname.startsWith('/student'); // Check if the path starts with /student

  const data = [
    {
      label: "Posts",
      value: "Posts",
      desc: <Posts />,
    },
    {
      label: "Organizing Committee",
      value: "OC",
      desc: <Oc />,
    },
   
  ];

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  return (
    <div className="relative">
      <Tabs className="w-full" value={activeTab}>
        <TabsHeader
          className={`rounded-none bg-transparent p-0 ${isStudentPage ? 'grid grid-cols-2' : 'grid grid-cols-2'}`}
          indicatorProps={{
            className:
              "mt-8 absolute left-1/2 transform -translate-x-1/2 -bottom-3 w-2 h-2 rounded-full transition-opacity bg-transparent border-b-[8px] border-[#AEC90A] shadow-none",
          }}
        >
          {data.map(({ label, value }) => (
            <Tab
              key={value}
              value={value}
              onClick={() => {
                setActiveTab(value);
                // Toggle dropdown visibility only when "Posts" tab is active
               
              }}
              className={`text-white hover:text-[#AEC90A] ${
                activeTab === value ? " text-[#AEC90A]" : ""
              }`}
            >
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody className="h-[600px] overflow-auto"> {/* Adjust height as needed */}
          {data.map(({ value, desc }) => (
            <TabPanel key={value} value={value}>
              {desc}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>

      {/* Add New Button Dropdown */}
      
    </div>
  );
};

export default EventNav;
