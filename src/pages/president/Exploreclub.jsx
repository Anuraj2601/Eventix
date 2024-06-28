// src/pages/Exploreclub.jsx
import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar'; // Adjust the path based on your file structure
import Navbar from '../../components/Navbar';   // Adjust the path based on your file structure
import { HiArrowRightCircle } from "react-icons/hi2";

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import Club from '../../components/Club';

const CardDefault = () => {
  return (
    <Card className="bg-black" style={{ width: '23rem' }}>
      <CardHeader color="blue-gray" className="relative h-40"> {/* Reduced height */}
        <img
          src="src/assets/rotaract.png"
          alt="your-image-description"
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" className="mb-2 text-[#AEC90A] flex items-center"> {/* Adjusted variant */}
          Registrations are open
          <a href="#register-link" className="ml-4 h-auto w-9">
            <HiArrowRightCircle className="text-2xl" /> {/* Adjusted text size */}
          </a>
        </Typography>
        <Typography className="text-sm"> {/* Adjusted font size */}
          Get the opportunity to learn from industry professionals, prepare
          for certifications like CISA and CRISC and network with
          professionals in the field.
        </Typography>
      </CardBody>
      <CardFooter className="pt-0 flex justify-end">
        <a href="#explore-link">
          <Button variant="gradient" className="bg-[#AEC90A] text-black p-1">
            Explore
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
};

const MultipleCards = () => {
  return (
    <div className="flex flex-wrap gap-8">
      {Array.from({ length: 8 }).map((_, index) => (
        <CardDefault key={index} />
      ))}
    </div>
  );
};

const Exploreclub = () => {
  const [selectedTab, setSelectedTab] = useState("All Clubs"); // State to track the selected tab

  const data = [
    {
      label: "All Clubs",
      value: "All Clubs",
      desc: <MultipleCards />, // Use the multiple cards component directly
    },
    {
      label: "Your Clubs",
      value: "Your Clubs",
      desc: <Club />,
    },
  ];

  return (
    <div className="fixed inset-0 flex">
      <Sidebar className="flex-shrink-0" />
      <div className="flex flex-col flex-1">
        <Navbar className="sticky top-0 z-10 p-4" />
        <div className="bg-neutral-900 flex-1 text-white flex flex-col overflow-hidden">
          <Tabs
            value={selectedTab}
            onChange={setSelectedTab}
            className="max-w-full h-full flex flex-col m-6 cursor-pointer"
          >
            <TabsHeader
              className="rounded-none bg-transparent p-0 w-1/4"
              indicatorProps={{
                className: "bg-transparent border-b-2 border-[#AEC90A] shadow-none rounded-none",
              }}
            >
              {data.map(({ label, value }) => (
                <Tab
                  key={value}
                  value={value}
                  onClick={() => setSelectedTab(value)}
                  className={`text-white hover:text-[#AEC90A] ${selectedTab === value ? 'text-[#AEC90A]' : ''}`}
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
                  className={`p-6 overflow-y-auto ${value === selectedTab ? 'block' : 'hidden'}`}
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
};

export default Exploreclub;
