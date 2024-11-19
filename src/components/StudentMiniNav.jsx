import React, { useState, useEffect  } from 'react'
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
  } from "@material-tailwind/react";
import { useParams,useLocation, useNavigate } from "react-router-dom";



import StudentMiniNavEvent from './StudentMiniNavEvent';
import Board from "./Board";
import ClubEvent from "./ClubEvent";
import Member from "./Member"; // Change this line
import ClubPosts from "./ClubPosts";



const StudentMiniNav = ({ club }) => {
  const [activeTab, setActiveTab] = useState(null);  
  const location = useLocation();
  const navigate = useNavigate();// Initially set to null
    //console.log("club in student mini nav", club);

   
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
          desc: <ClubPosts club = { club }/>,
          },
        {
        label: "Events",
        value: "Events",
        desc:  <ClubEvent club={club}/> /* `Events` */,
        },
        {
          label: "Members",
          value: "Members",
          desc: <Member />, // Update this line
      },
      
       
    ];

    useEffect(() => {
      if (activeTab === null) {  // Only set the tab if it's not already set
        const urlTab = new URLSearchParams(location.search).get("tab");
        const savedTab = localStorage.getItem("activeTab");
  
        if (urlTab) {
          setActiveTab(urlTab);  // Use the tab from the URL if available
        } else if (savedTab) {
          setActiveTab(savedTab);  // Fall back to localStorage if URL doesn't have a tab
        } else {
          setActiveTab("Events");  // Default to "Events" if no tab is found
        }
      }
    }, [location, activeTab]);
  
    // Save the active tab to localStorage and URL whenever it changes
    useEffect(() => {
      if (activeTab !== null) {
        localStorage.setItem("activeTab", activeTab);  // Save to localStorage
          // Update the URL without adding to history
      }
    }, [activeTab, navigate]);
  
    // Loading state while activeTab is not set
    if (activeTab === null) {
      return <div>Loading...</div>;
    }
    
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

export default StudentMiniNav;