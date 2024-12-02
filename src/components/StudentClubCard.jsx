import React, { useEffect, useState } from 'react';
import { Button } from "@material-tailwind/react"; // Update this import
import { RiOpenArmLine } from "react-icons/ri";
import { IoMdBookmark } from "react-icons/io";
import { FaPlus } from "react-icons/fa"; // Import the plus icon
import { useNavigate, useLocation } from 'react-router-dom';
import RegistrationModal from './RegistrationModal';
import RegistrationService from '../service/registrationService'; // Adjust the path as needed
import { getUserEmailFromToken } from '../utils/utils'; // Ensure this function is correctly implemented
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { format, differenceInMonths } from 'date-fns'; // For date formatting and comparison
import axios from 'axios';
import { getUserIdFromToken } from '../utils/utils';
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
  const [dialogMessage, setDialogMessage] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [UserProfiles, setUserProfiles] = useState([]); // State to store all user profiles
  const [userRole, setUserRole] = useState('');
  const userrId = getUserIdFromToken();

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/users/getAllUsersIncludingCurrent', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        const fetchedUsers = response.data.map((user) => ({
          image: user.photoUrl || 'default-image-url.jpg',
          name: `${user.firstname} ${user.lastname}`,
          id: user.id,
          email: user.email,
          role: user.role, // Assuming role is part of the response
        }));
        setUserProfiles(fetchedUsers);

        // Set userRole based on the current user's ID
        const currentUser = fetchedUsers.find(user => user.id === userrId);
        if (currentUser) {
          setUserRole(currentUser.role);
        }
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, [userrId]);

  
  useEffect(() => {
    fetchClubs();
    fetchRegistrations();
  }, [token]);


  function formatDate(dateString) {
    try {
        // Check if dateString is a Date object or array
        if (Array.isArray(dateString)) {
            // If it's an array, construct a new Date object directly
            const [year, month, day, hours, minutes, seconds] = dateString;
            return new Date(year, month - 1, day, hours, minutes, seconds);
        } else if (typeof dateString === 'string') {
            // If it's a string, ensure it can be parsed
            return new Date(dateString.replace(' ', 'T').split('.')[0]);
        } else if (dateString instanceof Date) {
            // If it's already a Date object, return it directly
            return dateString;
        } else {
            // Handle any unexpected format
            console.warn('Unexpected date format:', dateString);
            return null; // Return null in case of an invalid date
        }
    } catch (error) {
        console.error('Error parsing date:', error, '\nOriginal date string:', dateString);
        return null; // Return null in case of an error
    }
}

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
    const userRegistration = registrations.find(
        (reg) => reg.clubId === club.club_id && reg.email.toLowerCase() === userId.toLowerCase()
    );
  
    // Condition 1: User is already a part of the club with accepted position
    if (userRegistration && userRegistration.accepted === 1 && 
        ["president", "member", "secretary", "treasurer", "oc"].includes(userRegistration.position.toLowerCase())) {
        setDialogMessage("You are already a part of this club.");
        setIsDialogOpen(true);
        return;
    }
  
    // Condition 2: User has a rejected application or not selected in the last 6 months
    if (userRegistration && userRegistration.accepted === 0) {
        const registrationDate = formatDate(userRegistration.createdAt); // Use the updated formatDate function
        const currentDate = new Date();
        const monthsSinceRegistration = differenceInMonths(currentDate, registrationDate);
  
        if (monthsSinceRegistration < 6 || new Date(userRegistration.date).toDateString() === new Date().toDateString()) {
            // Show rejection message based on position
            if (userRegistration.position.toLowerCase() === 'student') {
                setDialogMessage("Unfortunately, you have already applied. Please wait for the next recruitment opportunity.");
            } else if (userRegistration.position.toLowerCase() === 'rejected') {
                setDialogMessage("Unfortunately, you have already applied. Please wait for the next recruitment to apply again.");
            } else if (userRegistration.position.toLowerCase() === 'removed') {
                setDialogMessage("Unfortunately, you were removed by the club and cannot reapply.");
            }
            setIsDialogOpen(true);
            return;
        }
    }
  
    // If no record matches the conditions above, allow the user to register
    const event = {
        club_id: club.club_id,
        club_name: club.club_name,
    };
    setSelectedEvent(event);
    setIsModalOpen(true);
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
 {(['admin', 'treasurer'].includes(userRole.toLowerCase()) ) && (        <div className="flex justify-end mb-4">
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
        <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}  className="bg-black bg-opacity-60"> 
  <DialogContent>
    <p>{dialogMessage}</p>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setIsDialogOpen(false)} color="black"  className="text-black bg-[#AEC90A]" >
      OK
    </Button>
  </DialogActions>
</Dialog>

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
