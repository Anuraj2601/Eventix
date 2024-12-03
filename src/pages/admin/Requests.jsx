import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import Requests from '../../components/Requests';
import Users from '../../components/Users';
import UserManagement from '../../components/UserManagement';

import { Tabs, TabsHeader, Tab } from "@material-tailwind/react";


const ExploreClub = () => {
    const [activeTab, setActiveTab] = useState("event-requests");

    const mainTabs = [
        { label: "Event Requests", value: "event-requests" },
    ];
    

    return (
        <div className="fixed inset-0 flex">
            <Sidebar className="flex-shrink-0" />
            <div className="flex flex-col flex-1">
                <Navbar className="sticky top-0 z-10 p-4" />
                <div className="bg-neutral-900 text-white flex flex-col flex-1 overflow-hidden">
                    <Tabs value={activeTab} className="max-w-full h-full flex flex-col mt-2 cursor-pointer">
                        <TabsHeader
                            className="rounded-none bg-transparent p-0 w-full"
                            indicatorProps={{
                                className: "bg-transparent border-b-2 border-[#AEC90A] shadow-none rounded-none",
                            }}
                        >
                            {mainTabs.map(({ label, value }) => (
                                <Tab
                                    key={value}
                                    value={value}
                                    onClick={() => setActiveTab(value)}
                                    className={activeTab === value ? "text-[#AEC90A]" : ""}
                                >
                                    {label}
                                </Tab>
                                
                            ))}
                             <Tab
            key="import-users"
            value="import-users"
            onClick={() => setActiveTab("import-users")}
            className={activeTab === "import-users" ? "text-[#AEC90A]" : ""}
        >
            Import Users
        </Tab>
        <Tab
            key="Access granting"
            value="Access granting"
            onClick={() => setActiveTab("Access granting")}
            className={activeTab === "Access granting" ? "text-[#AEC90A]" : ""}
        >
           Access granting
        </Tab>
                        </TabsHeader>
                        <div className=" overflow-y-auto px-10">
                            {activeTab === "event-requests" && <Requests />}
                            {activeTab === "import-users" && <Users />}

                            {activeTab === "Access granting" && <UserManagement />}

                        </div>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}

export default ExploreClub;
