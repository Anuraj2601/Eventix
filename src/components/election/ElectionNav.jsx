import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { useParams } from "react-router-dom";

import ElectionDetails from "./ElectionDetails";
 
const ElectionNav = () => {
  const [activeTab, setActiveTab] = React.useState("Details");

  const sname = useParams();

  const data = [
    {
      label: "Details",
      value: "Details",
      desc: <ElectionDetails />,
    },
    {
      label: "Candidates",
      value: "Candidates",
      desc: `Candidates`,
    },
    {
      label: "Votes",
      value: "Votes",
      desc: `Votes`,
    },
  ];
  return (
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
      <TabsBody>
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}

export default ElectionNav;
