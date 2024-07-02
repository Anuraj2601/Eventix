import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { Event } from "./tabs/Event";
import { CurrentBoard } from "./tabs/CurrentBoard";
import { Meetings } from "./tabs/Meetings";
import { Elections } from "./tabs/Elections";
import { Announcements} from "./tabs/Announcements";
 
export function ClubMemberNav() {
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
      /*label: "Current Board",
      value: "Current Board",
     /* desc: `It really matters and then like it really doesn't matter.
      What matters is the people who are sparked by it. And the people 
      who are like offended by it, it doesn't matter.`,*/
      //desc:`Board Of Term 23/24`
      label: "Current Board",
      value: "Current Board",
      desc: <CurrentBoard />,
    },
    {
      label: "Event",
      value: "Event",
      desc: <Event />,
    },
    
    {
      /*label: "Meetings",
      value: "Meetings",
      desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.`,*/
      label: "Meetings",
      value: "Meetings",
      desc: <Meetings />,
    },
    {
      label: "Elections",
      value: "Elections",
      desc: <Elections />,
      /*desc: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`,*/
    },
    
    {
      label: "Announcements",
      value: "Announcements",
      /*desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.`,*/
      desc: <Announcements/>,
    },
    {
      label: "Members",
      value: "Members",
      desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.`,
    },
  ];
  return (
    <Tabs value={activeTab}>
      <TabsHeader
        className="rounded-none bg-transparent p-0 "
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
            className={`text-white hover:text-[#AEC90A] ${activeTab === value ? 'text-[#AEC90A]' : ''}`}
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