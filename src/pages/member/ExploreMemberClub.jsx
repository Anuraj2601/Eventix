import React from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";

import PresidentClubCard from '../../components/PresidentClubCard';
import ClubMember from '../../components/ClubMember';

const clubs = [
    {
        id: "1",
        club_name: "Rotaract Club of UCSC",
        reg_status: "yes",
        description: "The Rotaract Club of UCSC, part of Rotary International District 3220, empowers youth to enact positive change locally and globally.",
        image: "src/assets/clubs/rotaract.png",
    },
    {
        id: "2",
        club_name: "ACM Student Chapter",
        reg_status: "no",
        description: "The ACM Student Chapter aims to advance computing as a science and profession. Activities include coding competitions, guest lectures, and career development workshops.",
        image: "src/assets/clubs/acm.png",
    },
    {
        id: "3",
        club_name: "Pahasara Club (Innovation and Creativity)",
        reg_status: "yes",
        description: "The Pahasara Club offers a platform for photography enthusiasts to enhance their skills through workshops, photo walks, and exhibitions.",
        image: "src/assets/clubs/pahasara1.png",
    },
    {
        id: "4",
        club_name: "ISACA Student Group",
        reg_status: "no",
        description: "The Debate Society aims to improve public speaking and critical thinking skills through regular debates, public speaking workshops, and competitions.",
        image: "src/assets/clubs/isaca1.png",
    },
    {
        id: "5",
        club_name: "(IEEE WIE) IEEE Women in Engineering",
        reg_status: "yes",
        description: "The IEEE Women in Engineering (WIE) Student Branch at the University of Colombo School of Computing strives to enhance women’s participation and empowerment in electrical and electronic engineering.",
        image: "src/assets/clubs/wie.png",
    },
    {
        id: "6",
        club_name: "IEEE Student Chapter",
        reg_status: "yes",
        description: "The IEEE Student Chapter promotes the advancement of technology. Members can participate in technical seminars, project exhibitions, and networking events.",
        image: "src/assets/clubs/ieee.png",
    },
    {
        id: "7",
        club_name: "Mechatronic Society Of UCSC",
        reg_status: "no",
        description: "The Mechatronic Society Of UCSC focuses on sustainability and environmental awareness. Activities include clean-up drives, tree planting, and educational workshops.",
        image: "src/assets/clubs/ms.png",
    },
    {
        id: "8",
        club_name: "Women in Cybersecurity",
        reg_status: "no",
        description: "This club is part of the Institute of Electrical and Electronics Engineers (IEEE) and focuses on all aspects of computer science and engineering.",
        image: "src/assets/clubs/wicys.png",
    },
    {
        id: "9",
        club_name: "Rekha",
        reg_status: "yes",
        description: "Get the opportunity to learn from industry professionals, prepare for certifications like CISA and CRISC and and network with professionals in the field.",
        image: "src/assets/clubs/rekha.png",
    },
    {
        id: "10",
        club_name: "Mechatronic Society Of UCSC",
        reg_status: "no",
        description: "The Mechatronic Society Of UCSC focuses on sustainability and environmental awareness. Activities include clean-up drives, tree planting, and educational workshops.",
        image: "src/assets/clubs/ms.png",
    },
];

const MultipleCards = () => {
    return (
        <div className="flex flex-wrap items-center justify-center gap-10">
            {clubs.map((club, index) => (
                <PresidentClubCard key={index} club={club} />
            ))}
        </div>
    );
};

const ExploreMemberClub = () => {
    const [activeTab, setActiveTab] = React.useState("allClubs");
    const data = [
        {
            label: "All Clubs",
            value: "allClubs",
            desc: <MultipleCards />,
        },
        {
            label: "Your Clubs",
            value: "yourClubs",
            desc: <ClubMember />,
        }
    ];

    return (
        <div className="fixed inset-0 flex">
            <Sidebar className="flex-shrink-0" />
            <div className="flex flex-col flex-1">
                <Navbar className="sticky top-0 z-10 p-4" />
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
    );
}

export default ExploreMemberClub;
