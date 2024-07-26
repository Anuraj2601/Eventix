import React, { useState } from "react";
import { Card, CardBody, Typography, Avatar } from "@material-tailwind/react";
import Chart from "react-apexcharts";
import SelectRemove from "./SelectRemove";
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

// Predefined teams
const teams = ["Content", "Design", "Marketing", "Finance"];

// Predefined events
const predefinedEvents = [
  "Reid Extreme 3.0",
  "MadHack 2.0",
  "FreshHack 1.0"
];

const getRandomEvents = () => {
  const shuffledEvents = predefinedEvents.sort(() => 0.5 - Math.random());
  return shuffledEvents.slice(0, Math.floor(Math.random() * shuffledEvents.length) + 1);
};

const generateRandomMember = (status, position) => {
  return {
    id: Math.random().toString(36).substr(2, 9),
    name: status === "Selected" ? generateRandomName("male") : generateRandomName("female"),
    team: teams[Math.floor(Math.random() * teams.length)],
    image: `https://randomuser.me/api/portraits/${status === "Selected" ? "men" : "women"}/${Math.floor(Math.random() * 99)}.jpg`,
    events: getRandomEvents(),
    ocPercentage: Math.floor(Math.random() * (90 - 60 + 1)) + 60,
    attendancePercentage: Math.floor(Math.random() * (80 - 50 + 1)) + 50,
    status: status,
    position: position,
  };
};

const generateRandomName = (gender) => {
  const names = gender === "male" ?
    ["John", "Michael", "James", "David", "William", "Joseph", "Daniel", "George", "Anthony", "Charles"] :
    ["Mary", "Jennifer", "Linda", "Susan", "Karen", "Lisa", "Nancy", "Betty", "Helen", "Sandra"];
  return names[Math.floor(Math.random() * names.length)];
};

// Generate selected members for each position
const selectedMembers = {
  President: Array.from({ length: 3 }, () => generateRandomMember("Selected", "President")),
  Secretary: Array.from({ length: 3 }, () => generateRandomMember("Selected", "Secretary")),
  Treasurer: Array.from({ length: 3 }, () => generateRandomMember("Selected", "Treasurer")),
};

const Finalists = () => {
  const [activePosition, setActivePosition] = useState("President");

  const chartConfig = {
    type: "pie",
    width: 80,
    height: 80,
    series: [20, 80],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#1E1E1E", "#AEC90A"],
      legend: {
        show: false,
      },
    },
  };

  const renderMembers = (members) => (
    <>
      <Typography color="white" variant="h4" className="mb-4">
        Finalists of Election
      </Typography>
      {members.map((member) => (
        <div
          key={member.id}
          className="relative flex items-start justify-between p-4 mb-4 bg-black rounded-2xl"
          style={{ 
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' 
          }}
        >
          <div className="flex items-center gap-4">
            <Avatar
              size="xl"
              src={member.image}
              alt={member.name}
              className="border-4 border-black rounded-full w-24 h-24"
            />
            <div>
              <Typography color="white" variant="h5" className="mb-1">
                {member.name}
              </Typography>
              <Typography color="white" variant="subtitle1" className="mb-1">
                From Team: {member.team}
              </Typography>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Typography color="white" variant="subtitle1" className="mb-1">
              Joined Event OCs:
            </Typography>
            <ul className="list-disc list-inside">
              {member.events.map((event, idx) => (
                <li key={idx} className="text-[#AEC90A]">
                  {event}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2">
              
            </div>
          </div>
        </div>
      ))}
    </>
  );

  return (
    <div className="flex h-screen">
      <Sidebar className="flex-shrink-0" />
      <div className="flex-1 flex flex-col">
        <Navbar className="sticky top-0 z-10 bg-neutral-900 text-white " />
        <div className="flex h-screen bg-neutral-900 p-1 text-white overflow-y-auto"></div>
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-neutral-800 p-4 text-white ">
        <Typography variant="h5" className="mb-4 text-center">
          Positions
        </Typography>
        <ul>
          {Object.keys(selectedMembers).map((position) => (
            <li
              key={position}
              className={`cursor-pointer mb-2 p-2 rounded-lg ${activePosition === position ? 'bg-[#AEC90A] text-black' : 'hover:bg-gray-700'}`}
              onClick={() => setActivePosition(position)}
            >
              {position}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-6 bg-neutral-900">
        <Card className="w-full bg-neutral-900">
          <CardBody>
            {renderMembers(selectedMembers[activePosition])}
          </CardBody>
        </Card>
      </div>
    </div></div></div>
  );
};

export default Finalists;
