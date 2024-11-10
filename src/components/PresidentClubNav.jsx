import React, { useState, useEffect } from "react";
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react";
import { useLocation, useNavigate } from "react-router-dom";

import Meeting from "./Meeting";
import Announcement from "./Announcement";
import Member from "./Member";
import ElectionDetails from "./election/ElectionDetails";
import ClubEvent from "./ClubEvent";
import Board from "./Board";
import ClubReport from "./ClubReport";
import ClubPosts from "./ClubPosts";
import Recruitment from "./Recruitment";

const PresidentClubNav = ({ club }) => {
  const [activeTab, setActiveTab] = useState(null);  // Initially set to null
  const location = useLocation();
  const navigate = useNavigate();

  const authorizedPaths = ['/president', '/treasurer', '/secretary'];
  const showRestrictedTabs = authorizedPaths.some(path => location.pathname.startsWith(path));

  const data = [
    { label: "Current Board", value: "Current Board", desc: <Board /> },
    { label: "Posts", value: "Posts", desc: <ClubPosts club={club} /> },
    { label: "Events", value: "Events", desc: <ClubEvent club={club} /> },
    { label: "Members", value: "Members", desc: <Member /> },
    { label: "Elections", value: "Elections", desc: <ElectionDetails club={club} /> },
    { label: "Meetings", value: "Meetings", desc: <Meeting club={club} /> },
    { label: "Announcement", value: "Announcement", desc: <Announcement club={club} /> },
    ...(showRestrictedTabs ? [
      { label: "Event Reports", value: "Event Reports", desc: <ClubReport /> },
      { label: "Recruitment", value: "Recruitment", desc: <Recruitment /> }
    ] : []),
  ];

  // Load the active tab from URL or localStorage when the component mounts
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
      navigate(`?tab=${activeTab}`, { replace: true });  // Update the URL without adding to history
    }
  }, [activeTab, navigate]);

  // Loading state while activeTab is not set
  if (activeTab === null) {
    return <div>Loading...</div>;
  }

  return (
    <Tabs value={activeTab} onChange={setActiveTab}>
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
            className={`text-white hover:text-[#AEC90A] ${
              activeTab === value ? " text-[#AEC90A]" : ""
            }`}
            onClick={() => setActiveTab(value)}
          >
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody className="h-[800px] overflow-y-auto">
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            {activeTab === value && desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
};

export default PresidentClubNav;
