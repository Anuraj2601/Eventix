import React, { useEffect, useState } from 'react';
import { Button } from "@material-tailwind/react";
import { RiOpenArmLine } from "react-icons/ri";
import { IoMdBookmark } from "react-icons/io";
import { FaPlus } from "react-icons/fa"; // Import the plus icon
import { useNavigate, useLocation } from 'react-router-dom';
import RegistrationModal from './RegistrationModal';
import RegistrationService from '../service/registrationService'; // Adjust the path as needed
import { getUserEmailFromToken } from '../utils/utils'; // Ensure this function is correctly implemented

import ClubsService from '../service/ClubsService';



const StudentClubCard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null); // Selected event state
  const [clubDetails, setClubDetails] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const userId = getUserEmailFromToken();

  useEffect(() => {
    fetchClubs();
    fetchRegistrations();
  }, [token]);


  const fetchClubs = async () => {
    try {
      const token = localStorage.getItem('token');
      const clubs = await ClubsService.getAllClubs(token);
      const clubsArray = clubs.content || [];
      clubsArray.forEach(club => {
        console.log(`Club: ${club.club_name}, Image URL: ${club.club_image}`);
      });
      setClubDetails(clubsArray);
      console.log(clubsArray);
    } catch (error) {
      console.error("Failed to fetch clubs", error);
    }
  };

  const fetchRegistrations = async () => {
    try {
      const response = await RegistrationService.getAllRegistrations(token);
      const fetchedRegistrations = response.data || response.content || [];
      setRegistrations(fetchedRegistrations);
    } catch (error) {
      console.error("Error fetching registrations:", error);
    }
  };

  const validPositions = ["president", "member", "secretary", "treasurer", "oc"];
  const filteredRegistrations = registrations.filter(
    (reg) =>
      reg.email.toLowerCase() === userId.toLowerCase() &&
      reg.accepted === 1 &&
      validPositions.includes(reg.position.toLowerCase())
  );

  const handleRegisterClick = (club) => {
    const event = {
      club_id: club.club_id,
      club_name: club.club_name,
    };
    console.log("Event Object: ", event); // Log event object here
    setSelectedEvent(event); // Set the event (club details)
    setIsModalOpen(true); // Open the modal with the selected club data
  };
  
  

  const handleRegisterClickks = (club) => {
    let basePath;
    switch (true) {
      case location.pathname.startsWith('/president'):
        basePath = '/president';
        break;
      case location.pathname.startsWith('/student'):
        basePath = '/student';
        break;
      case location.pathname.startsWith('/oc'):
        basePath = '/oc';
        break;
      case location.pathname.startsWith('/secretary'):
        basePath = '/secretary';
        break;
      case location.pathname.startsWith('/admin'):
        basePath = '/admin';
        break;
      case location.pathname.startsWith('/member'):
        basePath = '/member';
        break;
      case location.pathname.startsWith('/treasurer'):
        basePath = '/treasurer';
        break;
      default:
        basePath = ''; // Default base path or handle other cases
    }
    navigate(`${basePath}/clubregister/${club.club_id}`);
  };

  const handleExploreClick = (club) => {
    // Find the user's registration in the filtered registrations list
    const userRegistration = filteredRegistrations.find(
      (reg) => reg.clubId === club.club_id
    );
  
    if (!userRegistration) {
      navigate(`/student/club/${club.club_id}`, { state: { club, image: club.club_image } });
      return; // Exit the function early to prevent further code execution
    }
    // Check if the registration is accepted and the position is president or member
    if (userRegistration && userRegistration.accepted === 1) {
      let basePath = '';
      
      // Set the basePath based on the user's position
      switch (userRegistration.position.toLowerCase()) {
        case 'president':
          basePath = '/president';
          break;
        case 'member':
          basePath = '/member';
          break;

        case 'treasurer':
          basePath = '/president';
          break;

          case 'secretary':
            basePath = '/president';
            break;
        // Add other cases if needed for other positions (e.g., secretary, treasurer, etc.)
        default:
          basePath = '/student'; // Handle other cases or default behavior
          break;
      }
  
      // Navigate to the appropriate path based on the position and club
      navigate(`${basePath}/club/${club.club_id}`, { state: { club, image: club.club_image } });
    } else {
      // Optionally, handle cases where the user is not accepted or doesn't have the right position
      console.log('User is not accepted or does not have the required position');
    }
  };

  return (
    <div className="flex flex-col">
      {location.pathname.startsWith('/admin') && (
        <div className="flex justify-end mb-4">
          <Button
            className="bg-[#AEC90A] text-[#0B0B0B] px-4 py-2 rounded-full font-medium flex items-center"
            onClick={() => navigate('/admin/addclub')}
          >
            <FaPlus className="mr-2" />
            Add New Club
          </Button>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {(clubDetails || []).map((club) => (
          <div
            key={club.club_id}
            className="bg-[#0B0B0B] w-full h-[28rem] rounded-2xl overflow-hidden flex flex-col shadow-lg mb-4 mt-4 custom-3d-shadow custom-card"
            style={{
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)',
            }}
          >
            <div className="h-2/5 overflow-hidden">
              <img
                src={club.club_image}
                alt={club.club_name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 flex flex-col justify-between flex-1">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex gap-4">
                    <div className="reg">
                      <p className="mb-2 tracking-wide text-white">{club.club_name}</p>
                      <div className="flex gap-3">
                        {club.state ? (
                          <>
                            <RiOpenArmLine className="text-[#AEC90A]" size={20} />
                            <span className="text-[#AEC90A]">Registrations are Open</span>
                          </>
                        ) : (
                          <>
                            <RiOpenArmLine className="text-[#5C690A]" size={20} />
                            <span className="text-[#5C690A]">Registrations are Closed</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <IoMdBookmark className="text-[#AEC90A] custom-card" size={30} />
                </div>
                <div className="mb-4">
                  <p className="text-[#F5F5F5]">{club.club_description}</p>
                </div>
              </div>
              <div className="flex items-center justify-end gap-4">
               
                <Button
                  className={`text-[#0B0B0B] px-4 py-2 rounded-3xl font-medium custom-card ${
                    club.state ? 'bg-[#AEC90A]' : 'bg-[#AEC90A80] cursor-not-allowed'
                  }`}
                  onClick={() => handleRegisterClick(club)}
                  disabled={club.state == 'false'}
                >
                  Register
                </Button>
                <Button
className="bg-white text-[#0B0B0B] px-4 py-2 rounded-3xl font-medium custom-card"                  onClick={() => handleExploreClick(club)}
                >
                  Explore
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <RegistrationModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>  
  );
};

export default StudentClubCard;
