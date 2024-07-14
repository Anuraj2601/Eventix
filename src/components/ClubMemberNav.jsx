import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Event } from "./tabs/Event";
import { CurrentBoard } from "./tabs/CurrentBoard";
import { Meetings } from "./tabs/Meetings";
import { Elections } from "./tabs/Elections";
import { Announcements} from "./tabs/Announcements";
import { Members} from "./tabs/Members";
 
export function ClubMemberNav() {
  const [activeTab, setActiveTab] = React.useState("Event");
  const location = useLocation();
  const club = location.state?.club;

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
      desc: <CurrentBoard />,
    },
    {
      label: "Events",
      value: "Events",
      desc: <Event />,
    },
    
    {
     
      label: "Meetings",
      value: "Meetings",
      desc: <Meetings />,
    },
    {
      label: "Elections",
      value: "Elections",
      desc: <Elections />,
      
    },
    
    {
      label: "Announcements",
      value: "Announcements",
      desc: <Announcements/>,
    },
    {
      label: "Members",
      value: "Members",
      desc: <Members/>,
    },
  ];
  return (
    /*<Tabs value={activeTab}>
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
  );*/
  <div>
      {club && (
        <div className="flex items-center mb-4">
          <img src={club.image} alt={club.name} className="w-16 h-16 mr-4" />
          <h1 className="text-white text-2xl">{club.name}</h1>
        </div>
      )}
      <Tabs value={activeTab}>
        <TabsHeader
          className="rounded-none bg-transparent p-0"
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
              className={`text-white hover:text-[#AEC90A] ${
                activeTab === value ? "text-[#AEC90A]" : ""
              }`}
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
  );
}