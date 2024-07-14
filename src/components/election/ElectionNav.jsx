// C:\wamp64\www\Eventix\src\components\election\ElectionNav.jsx

import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import ElectionviewDetails from "./ElectionviewDetails";
import Votestab from "./Votestab";
import CandidatesNav from "../CandidatesNav";



const ElectionNav = ({ clubName, electionId }) => {
  const [activeTab, setActiveTab] = React.useState("Details");

  const data = [
    {
      label: "Details",
      value: "Details",
      desc: <ElectionviewDetails clubName={clubName} electionId={electionId} />,
    },
    {
      label: "Candidates",
      value: "Candidates",
      desc: <CandidatesNav />,
    },
    {
      label: "Votes",
      value: "Votes",
      desc: <Votestab />, // Include VotesTab component here
    },
  ];

  return (
    <div className="h-full overflow-hidden"> {/* Ensure this container fills the main frame */}
      <Tabs value={activeTab}>
        <TabsHeader
          className="rounded-none bg-transparent mt-2 p-0 grid grid-cols-9"
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
        <div className="overflow-y-auto h-full max-h-[700px]"> {/* Make the tab body scrollable */}
          <TabsBody>
            {data.map(({ value, desc }) => (
              <TabPanel key={value} value={value}>
                {desc}
              </TabPanel>
            ))}
          </TabsBody>
        </div>
      </Tabs>
    </div>
  );
};

export default ElectionNav;
