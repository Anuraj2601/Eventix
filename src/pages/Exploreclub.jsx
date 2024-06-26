// src/pages/Exploreclub.jsx
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar'; // Adjust the path based on your file structure
import Navbar from '../components/Navbar';   // Adjust the path based on your file structure
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

const CardDefault = () => {
  return (
<Card className="mt-1 bg-neutral-900 shadow-lg rounded-t-lg backdrop-filter backdrop-blur-lg" style={{ width: '23rem' }}>
      <CardHeader color="blue-gray" className="relative h-56">
        <img
          src="src/assets/rotaract.png"
          alt="your-image-description"
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          UI/UX Review Check
        </Typography>
        <Typography>
          The place is close to Barceloneta Beach and bus stop just 2 min by
          walk and near to &quot;Naviglio&quot; where you can enjoy the main
          night life in Barcelona.
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button>Read More</Button>
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
      desc: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`,
    },
  ];

  return (
    <div className="fixed inset-0 flex">
      <Sidebar className="flex-shrink-0" />
      <div className="flex flex-col flex-1">
        <Navbar className="sticky top-0 z-10" />
        <div className="bg-neutral-800 border-amber-50 flex-1 p-4 text-white flex flex-col overflow-hidden">
          <Tabs
            value={selectedTab}
            onChange={setSelectedTab}
            className="max-w-full font-bold h-full flex flex-col"
          >
            <TabsHeader
              className="bg-transparent space-x-7 flex items-center"
              indicatorProps={{
                className: "bg-gray-900/10 shadow-none !text-gray-900",
                style: { paddingBottom: '12px' } // Increase padding between tab headers
              }}
            >
              {data.map(({ label, value }) => (
                <Tab
                  key={value}
                  value={value}
                  className={`text-lime-400 hover:text-lime-400 ${selectedTab === value ? 'text-lime-400' : ''}`}
                  activeClassName="text-lime-400 font-bold  rounded-t-lg backdrop-filter backdrop-blur-lg bg-opacity-10 bg-white/10 "
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
                  className={`p-6 overflow-y-auto rounded-lg backdrop-filter backdrop-blur-lg bg-opacity-10 bg-white/10 shadow-lg ${
                    value === selectedTab ? 'block' : 'hidden'
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
  );
};

export default Exploreclub;
