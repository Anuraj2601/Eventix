import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

import Board from "./Board";
import Registrations from "./Registrations";
import Budget from "./BudgetTable";
import Reports from "./Reports";
import Proposal from "./Proposal";


const EventNav = ({clubId, eventDetails}) => {
  const [activeTab, setActiveTab] = React.useState("Registrations");

  //console.log("event details in eventNav",  eventDetails);
  //console.log("club id in eventNav", clubId);

  const data = [
   
    {
      label: "Registrations",
      value: "Registrations",
      desc: <Registrations clubId={clubId} event={eventDetails}/>,
    },
    {
      label: "Budget",
      value: "Budget",
      desc: <Budget clubId={clubId} event={eventDetails}/>,
    },
    {
      label: "Reports",
      value: "Reports",
      desc: <Reports
      clubId={clubId}
      event={eventDetails} // Ensure eventData is the correct event object
      
    />
    ,
    },
  ];

  return (
    <Tabs className="w-full" value={activeTab}>
      <TabsHeader
        className="flex flex-nowrap justify-between items-center bg-transparent p-0"
        indicatorProps={{
          className:
            "mt-8 absolute left-1/2 transform -translate-x-1/2 -bottom-3 w-2 h-2 rounded-full transition-opacity bg-transparent shadow-none",
        }}
      >
        {data.map(({ label, value }) => (
          <Tab
            key={value}
            value={value}
            onClick={() => setActiveTab(value)}
            className={`flex-1 text-center text-white hover:text-[#AEC90A] ${
              activeTab === value
                ? "text-[#AEC90A] border-2 border-[#AEC90A] rounded-2xl"
                : ""
            }`}
          >
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody className="h-[1200px] overflow-auto"> {/* Adjust height as needed */}
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            {/* {desc} */}
            {activeTab === value && desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
};

export default EventNav;
