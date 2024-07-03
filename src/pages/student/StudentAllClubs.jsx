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


const MultipleCards = () => {
    return (
      <div className="flex flex-wrap gap-10">
        {Array.from({ length: 8 }).map((_, index) => (
          <StudentClubCard key={index} />
        ))}
      </div>
    );
  };

const StudentAllClubs = () => {

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

export default StudentAllClubs