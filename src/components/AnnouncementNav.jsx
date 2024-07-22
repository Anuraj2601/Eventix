import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa"; // Import icons

const AnnouncementNav = () => {
  const [activeTab, setActiveTab] = React.useState("Announcements");

  const data = [
    {
      label: "Announcements",
      value: "Announcements",
      desc: "The Event registration link will be available soon.",
    },
    {
      label: "Meetings",
      value: "Meeting",
      desc: "There will be a meeting for all the OC members on 24th August 2024",
    },
  ];

  return (
    <Tabs value={activeTab}>
      <TabsHeader
        className="rounded-none bg-transparent p-0 grid grid-cols-3"
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
            className={`text-white hover:text-[#AEC90A] ${
              activeTab === value ? "text-[#AEC90A]" : ""
            }`}
          >
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody className="overflow-y-auto text-white">
        {data.map(({ value, desc }) => (
          <TabPanel
            key={value}
            value={value}
            className="relative font-extrabold text-white"
          >
            <div className="relative group">
              <p className="mb-4">{desc}</p>
              <div className="absolute inset-0 flex items-center justify-between px-4 py-2 bg-black opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center">
                  <FaEye className="text-[#AEC90A] mr-2" />
                  <select className="bg-neutral-900 text-white border border-[#AEC90A] rounded px-2 py-1">
                    <option value="everyone">Everyone</option>
                    <option value="oc">OC</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <button className="text-[#AEC90A] hover:text-white mr-2">
                    <FaEdit />
                  </button>
                  <button className="text-red-600 hover:text-white">
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
};

export default AnnouncementNav;
