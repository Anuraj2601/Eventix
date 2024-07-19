import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

const AnnouncementNav = () => {
  const [activeTab, setActiveTab] = React.useState("Announcements");

  const data = [
    {
      label: "Announcements",
      value: "Announcements",
      desc: "The Event registration link will be available soon. ",
    },
    {
      label: "Meetings",
      value: "Meeting",
      desc: "List of Announcements goes here..",
    },
  ];

  return (
    <Tabs value={activeTab}>
      <TabsHeader
        className="rounded-none bg-transparent p-0 grid grid-cols-3"
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
              activeTab === value ? "text-[#AEC90A]" : ""
            }`}
          >
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody className="overflow-y-auto text-white"> {/* Adjust height as needed */}
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value} className="font-extrabold text-white"
          >
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
};

export default AnnouncementNav;
