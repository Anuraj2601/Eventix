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
import ElectionNav from "./election/ElectionNav";


 
const ClubNav = () => {
  const [activeTab, setActiveTab] = React.useState("Event");

  const clubs = [
    {
      id: "1",
      name: "IEEE Student Group",
      sname: "ieee",
      image: "src/assets/clubs/ieee.png",
    },
    {
      id: "2",
      name: "ISACA Student Group",
      sname: "isaca",
      image: "src/assets/clubs/isaca.png",
    },
    {
      id: "3",
      name: "Gavel Club (Public Speaking and Leadership)",
      sname: "gavel",
      image: "src/assets/clubs/gavel.png",
    },
    {
      id: "4",
      name: "Pahasara Club (Innovation and Creativity)",
      sname: "pahasara",
      image: "src/assets/clubs/pahasara.png",
    },
    {
      id: "5",
      name: "Rotaract Club of UCSC",
      sname: "rotract",
      image: "src/assets/clubs/rotaract.png",
    },
  ];

  const sname = useParams();

  const data = [
    {
      label: "Current Board",
      value: "Current Board",
      desc: `It really matters and then like it really doesn't matter.
      What matters is the people who are sparked by it. And the people 
      who are like offended by it, it doesn't matter.`,
    },
    {
      label: "Event",
      value: "Event",
      desc:  `Events`,
    },
    {
      label: "Members",
      value: "Members",
      desc: <Member />,
    },
    {
      label: "Elections",
      value: "Elections",
      desc: <ElectionNav /> ,
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
            className={`text-white hover:text-[#AEC90A] ${activeTab === value ? ' text-[#AEC90A]' : ''}`}
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
  );
}

export default ClubNav;