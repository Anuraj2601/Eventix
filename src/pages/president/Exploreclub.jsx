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
import ClubPresident from '../../components/ClubPresident'; // Corrected import

import { useNavigate } from 'react-router-dom';
import StudentClubCard from '../../components/StudentClubCard';

const ExploreClub = () => {
    const [activeTab, setActiveTab] = React.useState("allClubs");
    const navigate = useNavigate();

    const data = [
        {
            label: "All Clubs",
            value: "allClubs",
            desc: <StudentClubCard/>
            //desc: <PresidentClubCard />,
        },
        {
            label: "Your Clubs",
            value: "yourClubs",
            desc: <ClubPresident />, // Correct component
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

export default ExploreClub;
