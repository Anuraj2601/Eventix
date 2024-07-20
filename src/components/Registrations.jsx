import React, { useState } from "react";
import { Card, CardBody, Typography, Avatar } from "@material-tailwind/react";
import { FaCheck } from "react-icons/fa";
import CustomSwitch from "./Customswitch"; // Updated import path
import EditButton from "./EditButton"; // Import your EditDeleteButton component

// Predefined teams and events
const teams = ["Content", "Design", "Marketing", "Finance"];
const predefinedEvents = ["Reid Extreme 3.0", "MadHack 2.0", "FreshHack 1.0"];

const getRandomEvents = () => {
  const shuffledEvents = predefinedEvents.sort(() => 0.5 - Math.random());
  return shuffledEvents.slice(0, Math.floor(Math.random() * shuffledEvents.length) + 1);
};

const getRandomYear = () => Math.floor(Math.random() * 3) + 2021;
const getRandomProgram = () => ["cs", "is"][Math.floor(Math.random() * 2)];
const getRandomNumber = () => Math.floor(Math.random() * 900) + 100;
const getRandomMobile = () => `077${Math.floor(Math.random() * 9000000) + 1000000}`;
const getRandomWhy = () => [
  "I am passionate about learning new technologies.",
  "I want to network with industry leaders.",
  "I want to gain hands-on experience in organizing events.",
  "I am interested in exploring new opportunities.",
  "I want to collaborate with like-minded individuals."
][Math.floor(Math.random() * 5)];

const members = Array.from({ length: 20 }, (_, index) => {
  const year = getRandomYear();
  const program = getRandomProgram();
  const number = getRandomNumber();
  const registrationNumber = `${year}${program}${number}`;
  const name = ["Sarah", "John", "Jane", "Alice", "Bob", "Eve", "Mark", "Emily", "Alex", "Grace"][index % 10];
  const image = `https://randomuser.me/api/portraits/${index % 2 === 0 ? "women" : "men"}/${index + 1}.jpg`;

  return {
    id: `${index + 1}`,
    name,
    registrationNumber,
    mobile: getRandomMobile(),
    email: `${registrationNumber}@ucsc.cmb.ac.lk`,
    image,
    events: getRandomEvents(),
    ocPercentage: Math.floor(Math.random() * 31) + 50,
    attendancePercentage: Math.floor(Math.random() * 31) + 50,
    why: getRandomWhy(),
    checkedIn: Math.random() > 0.5
  };
});

const Registrations = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [checkedInStatus, setCheckedInStatus] = useState(
    members.reduce((acc, member) => {
      acc[member.id] = member.checkedIn;
      return acc;
    }, {})
  );

  const handleSwitchChange = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (id) => {
    setCheckedInStatus((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <Card className="w-full bg-neutral-900">
      <CardBody>
        {/* Custom Switch and Duration Section */}
        <div>
          <div className="flex  items-center  mr-50">
            <Typography color="white" variant="h6" className="mr-10">
              Open Registrations
            </Typography>
            <CustomSwitch 
              isOn={isOpen}
              handleToggle={handleSwitchChange}
            />
            <Typography color="white" variant="subtitle1" className="ml-4">
              Duration: 01 July 2024 - 31 July 2024
            </Typography>
            <EditButton className="ml-4" /> {/* Display only the delete button */}
          </div>
        </div>
        {/* Registered Members Section */}
        {members.map((member) => (
          <div
            key={member.id}
            className="relative flex items-start justify-between p-4 mb-4 bg-black rounded-xl"
          >
            <div className="flex items-center gap-4 w-1/3">
              <Avatar
                size="xl"
                src={member.image}
                alt={member.name}
                className="border-2 border-white rounded-full w-24 h-24"
              />
              <div className="text-[#AEC90A]">
                <Typography color="white" variant="h5" className="mb-1">
                  {member.name}
                </Typography>
                <Typography variant="subtitle1" className="mb-1">
                  Reg No: {member.registrationNumber}
                </Typography>
                <Typography variant="subtitle1" className="mb-1">
                  Mobile: {member.mobile}
                </Typography>
                <Typography variant="subtitle1" className="mb-1">
                  Email: {member.email}
                </Typography>
              </div>
            </div>
            <div className="flex flex-col w-1/3 text-white">
              <Typography color="white" variant="subtitle1" className="mb-1">
                The reason to join:
              </Typography>
              {member.why}
            </div>
            <div className="flex items-center w-1/3 justify-end gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={checkedInStatus[member.id] || false}
                  onChange={() => handleCheckboxChange(member.id)}
                  className="form-checkbox h-5 w-5 text-[#AEC90A]"
                />
                <span className="ml-2 text-white">Check-in</span>
              </label>
            </div>
          </div>
        ))}
      </CardBody>
    </Card>
  );
};

export default Registrations;
