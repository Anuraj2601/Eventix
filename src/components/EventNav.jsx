import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

import Board from "./Board";
import Posts from "./Posts";
import Oc from "./Oc";

const EventNav = () => {
  const [activeTab, setActiveTab] = React.useState("Posts");

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

  return (
    <Tabs         className="w-full"
     value={activeTab}>
      <TabsHeader
        className="rounded-none bg-transparent p-0 grid grid-cols-2 "
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
              activeTab === value ? " text-[#AEC90A]" : ""
            }`}
          >
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody className="h-[600px] overflow-auto "> {/* Adjust height as needed */}
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
};

export default EventNav;
