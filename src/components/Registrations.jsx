import React, { useState, useEffect } from "react";
import { Card, CardBody, Typography, Avatar } from "@material-tailwind/react";
import { FaCheck } from "react-icons/fa";
import CustomSwitch from "./Customswitch"; // Updated import path
import EditButton from "./EditButton"; // Import your EditButton component
import EventRegistrationService from "../service/EventRegistrationService";
import UsersService from "../service/UsersService";



const Registrations = ({clubId, event}) => {
  const [isOpen, setIsOpen] = useState(false);
  // const [checkedInStatus, setCheckedInStatus] = useState(
  //   members.reduce((acc, member) => {
  //     acc[member.id] = member.checkedIn;
  //     return acc;
  //   }, {})
  // );
  const [checkedInStatus, setCheckedInStatus] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  //console.log("event details in registrations",  event);
 //console.log("club id in registrations", clubId);

  const handleSwitchChange = () => {
    setIsOpen(!isOpen);
  };

  // const handleCheckboxChange = (id) => {
  //   setCheckedInStatus((prev) => ({
  //     ...prev,
  //     [id]: !prev[id]
  //   }));
  // };

  const handleCheckboxChange = async (id) => {

    const token = localStorage.getItem("token");

    try{

      const response = await EventRegistrationService.registrationCheckIn(id, token);
      console.log('Event registration checked in:', response);


    }catch(err){
      console.log("Error while checking in event registrations", err);
    }

    setCheckedInStatus((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  
  

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


      // Initialize checkedInStatus based on is_checked from the backend
      const initialCheckedInStatus = registrationsWithUserDetails.reduce((acc, reg) => {
        acc[reg.ereg_id] = reg._checked; // Assuming `is_checked` is a boolean from the backend
        return acc;
      }, {});
      setCheckedInStatus(initialCheckedInStatus);

     

    }catch(err){
      console.log("Error while fetching event registration details", err);
    }

  }

  useEffect(() => {

    fetchEventRegistrations();

  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Update the searchTerm state with user input
  };
  

  const filteredMembers = eventRegistrations.filter((member) => {
    const searchLower = searchTerm.toLowerCase(); // Normalize for case-insensitive matching
    return (
      member.user.firstname.toLowerCase().includes(searchLower) || // Match name
      member.mobile_no.includes(searchTerm) || // Match mobile number
      member.user.regNo.includes(searchTerm) || // Match registration number
      member.email.toLowerCase().includes(searchLower) // Match email
    );
  });

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
          <div className="flex items-center justify-between mb-4">
  <div className="flex items-center gap-4">
  <Typography style={{ color: '#AEC90A' }} variant="h6">
      Total Registrations: {eventRegistrations.length}
    </Typography>
    <Typography style={{ color: '#AEC90A' }} variant="h6">
      Checked-In: {Object.values(checkedInStatus).filter(status => status).length}
    </Typography>
  </div>
</div>
        </div>
        
        {/* Registered Members Section */}
        {filteredMembers.map((member) => (
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
