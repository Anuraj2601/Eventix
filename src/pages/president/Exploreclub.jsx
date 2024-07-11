import React from 'react'
import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar'
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
  } from "@material-tailwind/react";
import Club from '../../components/Club';
import ClubCard from '../../components/ClubCard';

import StudentClubCard from '../../components/StudentClubCard';

const clubs = [
    {
      id: "1",
      club_name: "(CSA) Student Chapter",
      reg_status: "yes",
      description: "Get the opportunity to learn from industry professionals, prepare for certifications like CISA and CRISC and and network with professionals in the field.",
      image: "src/assets/clubs/csa.jpeg",
    },
    {
      id: "2",
      club_name: "ACM Student Chapter",
      reg_status: "no",
      description: "The ACM Student Chapter aims to advance computing as a science and profession. Activities include coding competitions, guest lectures, and career development workshops.",
      image: "src/assets/clubs/isaca.png",
    },
    {
      id: "3",
      club_name: "Women in Cybersecurity",
      reg_status: "no",
      description: "This club is part of the Institute of Electrical and Electronics Engineers (IEEE) and focuses on all aspects of computer science and engineering.",
      image: "src/assets/clubs/wicys.png",
    },
    {
      id: "4",
      club_name: "IoT (Internet of Things) Club",
      reg_status: "yes",
      description: "Get the opportunity to learn from industry professionals, prepare for certifications like CISA and CRISC and and network with professionals in the field.",
      image: "src/assets/clubs/iot.png",
    },
    {
        id: "5",
        club_name: "Rotaract Club of UCSC",
        reg_status: "yes",
        description: "Engage in social service projects, develop leadership skills, and network with like-minded peers in the Rotaract Club.",
        image: "src/assets/clubs/rotaract.png",
    },
    {
        id: "6",
        club_name: "IEEE Student Chapter",
        reg_status: "yes",
        description: "The IEEE Student Chapter promotes the advancement of technology. Members can participate in technical seminars, project exhibitions, and networking events.",
        image: "src/assets/clubs/ieee2.jpeg",
    },
    {
        id: "7",
        club_name: "Environmental Club",
        reg_status: "no",
        description: "The Environmental Club focuses on sustainability and environmental awareness. Activities include clean-up drives, tree planting, and educational workshops.",
        image: "src/assets/clubs/csa.jpeg",
    },
    {
        id: "8",
        club_name: "Pahasara Club (Innovation and Creativity)",
        reg_status: "yes",
        description: "The Pahasara Club offers a platform for photography enthusiasts to enhance their skills through workshops, photo walks, and exhibitions.",
        image: "src/assets/clubs/pahasara.png",
    },
    {
        id: "9",
        club_name: "ISACA Student Group",
        reg_status: "no",
        description: "The Debate Society aims to improve public speaking and critical thinking skills through regular debates, public speaking workshops, and competitions.",
        image: "src/assets/clubs/isaca.png",
    },
    {
        id: "10",
        club_name: "Gavel Club",
        reg_status: "yes",
        description: "The Drama Club encourages students to express their creativity through theater. Activities include acting workshops, play productions, and theater games.",
        image: "src/assets/clubs/gavel.png",
    }
  ];

const MultipleCards = () => {
    return (
      <div className="flex flex-wrap items-center justify-center gap-10">
        {clubs.map(( club , index) => (
          <StudentClubCard key={index} club= {club}/>

        ))}
      </div>
    );
  };

const Exploreclub = () => {

    const [activeTab, setActiveTab] = React.useState("allClubs");
    const data = [
        {
        label: "All Clubs",
        value: "allClubs",
        desc: <MultipleCards/>,
        },
        {
        label: "Your Clubs",
        value: "yourClubs",
        desc: <Club/>,
        }
       
    ];

  return (
    <>
        <div className="fixed inset-0 flex">
            <Sidebar className="flex-shrink-0"/>
            <div className="flex flex-col flex-1">
                <Navbar className="sticky top-0 z-10 p-4"/>
                <div className="bg-neutral-900 text-white flex flex-col flex-1 overflow-hidden">
                    <Tabs value={activeTab} className="max-w-full h-full flex flex-col m-6 cursor-pointer">
                        <TabsHeader
                            className="rounded-none bg-transparent p-0 w-1/4"
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
                                className={activeTab === value ? "text-[#AEC90A]" : ""}
                            >
                                {label}
                            </Tab>
                            ))}
                        </TabsHeader>
                        <TabsBody className="flex-1 overflow-y-auto">
                            {data.map(({ value, desc }) => (
                            <TabPanel 
                                key={value} 
                                value={value}
                                className={`p-6 overflow-y-auto ${value === activeTab ? 'block' : 'hidden'}`}
                                >
                                {desc}
                            </TabPanel>
                            ))}
                        </TabsBody>
                    </Tabs>
                </div>


            </div>
        </div>
        
        
        
    </>
    
  )
}

export default Exploreclub