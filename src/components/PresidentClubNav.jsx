import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { useParams } from "react-router-dom";

import Meeting from "./Meeting";
import Announcement from "./Announcement";
import Member from "./Member";
import ElectionDetails from "./election/ElectionDetails";
import ClubEvent from "./ClubEvent";
import Board from "./Board";
import ClubReport from "./ClubReport";


const PresidentClubNav = ({ club }) => {
  const [activeTab, setActiveTab] = React.useState("Events");

  const data = [
    {
      label: "Current Board",
      value: "Current Board",
      desc: <Board />,
    },
    {
      label: "Events",
      value: "Events",
      desc: <ClubEvent club={club} />,
    },
    {
      label: "Members",
      value: "Members",
      desc: <Member />,
    },
    {
      label: "Elections",
      value: "Elections",
      desc: <ElectionDetails />,
    },
    {
      label: "Meetings",
      value: "Meetings",
      desc: <Meeting />,
    },
    {
      label: "Announcement",
      value: "Announcement",
      desc: <Announcement />,
    },
    {
      label: "Event Reports",
      value: "Event Reports",
      desc: <ClubReport />,
    },
    
  ];

  return (
    <Tabs value={activeTab}>
      <TabsHeader
        className="rounded-none bg-transparent p-0 grid grid-cols-9"
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
      <TabsBody className="h-[800px] overflow-y-auto"> {/* Adjust height as needed */}
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
};

export default PresidentClubNav;
