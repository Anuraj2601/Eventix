import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { MdAdd } from "react-icons/md"; // Import the plus icon

import Board from "./Board";
import Posts from "./Posts";
import Oc from "./Oc";

const EventNav = () => {
  const [activeTab, setActiveTab] = React.useState("Posts");
  const [isDropdownVisible, setDropdownVisible] = React.useState(false);

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
          className="rounded-none bg-transparent p-0 grid grid-cols-2"
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
                if (value === "Posts") {
                  toggleDropdown();
                } else {
                  setDropdownVisible(false);
                }
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
      {activeTab === "Posts" && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2">
          <button
            onClick={toggleDropdown}
            className="bg-[#AEC90A] text-black flex items-center justify-center rounded-full p-2 hover:bg-[#AEC90A] hover:text-black"
          >
            <MdAdd size={24} />
          </button>
          {isDropdownVisible && (
            <div className="mt-2 bg-[#0b0b0b] p-2 rounded-md shadow-lg">
              <button
                className="bg-[#AEC90A] text-black px-4 py-2 rounded-full hover:bg-[#AEC90A] hover:text-black"
                onClick={() => alert("Add New Post clicked!")}
              >
                Add New
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EventNav;
