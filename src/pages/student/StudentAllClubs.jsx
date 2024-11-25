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
import ClubPresident from '../../components/ClubPresident'; // Corrected import
import StudentClubCard from '../../components/StudentClubCard';

const StudentAllClubs = () => {
    const [activeTab, setActiveTab] = React.useState("allClubs");
    const data = [
        {
            label: "All Clubs",
            value: "allClubs",
            desc: <StudentClubCard />,
        },
        {
            label: "Your Club",
            value: "yourClubs",
            desc: <ClubPresident />,
        },
    ];

    return (
        <>
            <div className="fixed inset-0 flex flex-col md:flex-row">
                {/* Sidebar */}
                <Sidebar className="hidden md:block flex-shrink-0" />
                <div className="flex flex-col flex-1">
                    {/* Navbar */}
                    <Navbar className="sticky top-0 z-10 p-4 md:p-6" />
                    {/* Content */}
                    <div className="bg-neutral-900 text-white flex flex-col flex-1 overflow-hidden">
                        <Tabs
                            value={activeTab}
                            className="max-w-full h-full flex flex-col m-4 md:m-6 cursor-pointer"
                        >
                            {/* Tabs Header */}
                            <TabsHeader
                                className="rounded-none bg-transparent p-0 overflow-x-auto flex-nowrap md:w-1/3"
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
                                        className={`whitespace-nowrap ${
                                            activeTab === value ? "text-[#AEC90A]" : ""
                                        }`}
                                    >
                                        {label}
                                    </Tab>
                                ))}
                            </TabsHeader>
                            {/* Tabs Body */}
                            <TabsBody className="flex-1 overflow-y-auto">
                                {data.map(({ value, desc }) => (
                                    <TabPanel
                                        key={value}
                                        value={value}
                                        className={`p-4 md:p-6 overflow-y-auto ${
                                            value === activeTab ? "block" : "hidden"
                                        }`}
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
    );
};

export default StudentAllClubs;
