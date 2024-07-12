import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import Candidates from "./Candidates"; // Import the CandidatesNav component

const CandidatesNav = () => {
  const [activeTab, setActiveTab] = React.useState("Applicants");

  const data = [
    {
      label: "Applicants",
      value: "Applicants",
      desc: <Candidates activeTab={activeTab} />,
    },
    {
      label: "Selected",
      value: "Selected",
      desc: <Candidates activeTab={activeTab} />,
    },
    {
      label: "Rejected",
      value: "Rejected",
      desc: <Candidates activeTab={activeTab} />,
    },
  ];

  return (
    <div className="flex w-full mb-6 bg-grey">
      <Tabs value={activeTab} className="w-full">
        <TabsHeader
 className="rounded-none bg-transparent p-0 flex justify-center"
 indicatorProps={{
   className:
     "mt-8 absolute left-1/2 transform -translate-x-1/2 -bottom-3 w-2 h-2 rounded-full transition-opacity bg-transparent border-b-[8px] border-transparent shadow-none",
 }}        >
          {data.map(({ label, value }) => (
            <Tab
              key={value}
              value={value}
              onClick={() => setActiveTab(value)}
              className={`text-white hover:text-[#AEC90A] mx-4 ${
                activeTab === value ? "bg-[#AEC90A] text-black" : ""
              }`}
            >
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody className="w-full h-[500px] overflow-y-auto">
          {data.map(({ value, desc }) => (
            <TabPanel key={value} value={value} className="w-full">
              {desc}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default CandidatesNav;
