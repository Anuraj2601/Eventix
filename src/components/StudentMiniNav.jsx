import React, { useState } from 'react'
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
  } from "@material-tailwind/react";
import { useParams } from "react-router-dom";



import Member from "./Member";
import StudentMiniNavEvent from './StudentMiniNavEvent';
import Board from "./Board";
import Recruitment from './Recruitment';
import ClubEvent from "./ClubEvent";
import StudentMiniNavMember from './StudentMiniNavMember';
import ClubPosts from "./ClubPosts";



const StudentMiniNav = () => {
    const [activeTab, setActiveTab] = useState("Events");

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
        label: "CurrentBoard",
        value: "CurrentBoard",
        desc: <Board />,
        },
        {
          label: "Posts",
          value: "Posts",
          desc: <ClubPosts />,
          },
        {
        label: "Events",
        value: "Events",
        desc:  <StudentMiniNavEvent club={clubs}/> /* `Events` */,
        },
        {
        label: "Members",
        value: "Members",
        desc: <StudentMiniNavMember/>,
        },
        {
        label: "Recruitment",
        value: "Recruitment",
        desc: <Recruitment/>,
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
  )
}

export default StudentMiniNav