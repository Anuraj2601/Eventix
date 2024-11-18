import React, { useState, useEffect } from "react";
import { Card, CardBody, Typography, Avatar } from "@material-tailwind/react";
import { FaCheck } from "react-icons/fa";
import CustomSwitch from "./Customswitch"; // Updated import path
import EditButton from "./EditButton"; // Import your EditButton component
import EventRegistrationService from "../service/EventRegistrationService";
import UsersService from "../service/UsersService";

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

const Registrations = ({clubId, event}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [checkedInStatus, setCheckedInStatus] = useState(
    members.reduce((acc, member) => {
      acc[member.id] = member.checkedIn;
      return acc;
    }, {})
  );
  const [searchTerm, setSearchTerm] = useState("");

  //console.log("event details in registrations",  event);
 //console.log("club id in registrations", clubId);

  const handleSwitchChange = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (id) => {
    setCheckedInStatus((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter members based on search term
  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.registrationNumber.includes(searchTerm)
  );

  const [eventRegistrations, setEventRegisterations] = useState([]);

  const fetchEventRegistrations = async () => {

    const token = localStorage.getItem("token");
    const session_id = localStorage.getItem('session_id');

    try{
      const response2 = await EventRegistrationService.getAllEventRegistrations(token);
      const eventRegArray = response2.content ? response2.content.filter(eReg => eReg.event_id == event.event_id) : [];
      console.log("event reg array ",eventRegArray);


      // if(eventRegArray.length > 0){
      //   setEventRegisterations(eventRegArray);
      // }


      // Fetch user details for each registration
      const registrationsWithUserDetails = await Promise.all(
        eventRegArray.map(async (evReg) => {
          try {
            const userResponse = await UsersService.getUserById(evReg.user_id, token);
            return { ...evReg, user: userResponse.users }; 

          } catch (userError) {

            console.error(`Error fetching details for user_id ${evReg.user_id}:`, userError);
            return { ...evReg, user: null };
          }
        })
      );

      console.log("event reg array with user details",registrationsWithUserDetails);
      setEventRegisterations(registrationsWithUserDetails);

     

    }catch(err){
      console.log("Error while fetching event registration details", err);
    }

  }

  useEffect(() => {

    fetchEventRegistrations();

  }, []);

  return (
    <Card className="w-full bg-neutral-900">
      <CardBody>
        {/* Search Bar */}
        <div className="mb-4 flex justify-end">
  <input
    type="text"
    placeholder="Search by name or reg. number"
    value={searchTerm}
    onChange={handleSearchChange}
    className="w-1/2 p-2 border border-gray-300 bg-black rounded-full text-white"
  />
</div>

        
        {/* Custom Switch and Duration Section */}
        <div>
          <div className="flex items-center mb-4">
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
        {eventRegistrations.map((member) => (
          <div
            key={member.ereg_id}
            className="relative flex items-start justify-between p-4 mb-4 bg-black rounded-xl"
            style={{ 
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' 
            }}
          >
            <div className="flex items-center gap-4 w-1/3">
              <Avatar
                size="xl"
                src={member.user.photoUrl}
                alt={member.user.firstname}
                className="border-2 border-white rounded-full w-24 h-24"
              />
              <div className="text-[#AEC90A]">
                <Typography color="white" variant="h5" className="mb-1">
                  {member.user.firstname}
                </Typography>
                <Typography variant="subtitle1" className="mb-1">
                  Reg No: {member.user.regNo}
                </Typography>
                <Typography variant="subtitle1" className="mb-1">
                  Mobile: {member.mobile_no}
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
              {member.reason}
            </div>
            <div className="flex items-center w-1/3 justify-end gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={checkedInStatus[member.ereg_id] || false}
                  onChange={() => handleCheckboxChange(member.ereg_id)}
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
