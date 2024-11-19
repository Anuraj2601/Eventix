import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { Typography } from "@material-tailwind/react";
import StudentMiniNav from '../../components/StudentMiniNav';
import LikeButton from '../../components/LikeButton';
import CustomSwitch from '../../components/Customswitch'; // Ensure correct import path
import { FaCheckCircle, FaUsers } from 'react-icons/fa'; // Import icons for successful events and members
import ClubToggle from '../../components/ClubToggle'; // Ensure correct import path
import PresidentClubNav from '../../components/PresidentClubNav';



import ClubsService from '../../service/ClubsService';




const ClubDetails = () => {
  
  const { id } = useParams();
  const location = useLocation();
  const { club } = location.state || {};

  const getRandomLikes = () => Math.floor(Math.random() * (500 - 100 + 1)) + 100; // Random between 100 and 500
  const getRandomEvents = () => Math.floor(Math.random() * (11 - 5 + 1)) + 5; // Random between 5 and 20
  const getRandomMembers = () => Math.floor(Math.random() * (120 - 100 + 1)) + 100; // Random between 100 and 500
  const [clubDetails, setClubDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPresidentView, setIsPresidentView] = useState(false); // State for URL check

  
  useEffect(() => {
    fetchClubDetails(id);
  
    // Check if the URL contains any of the specified roles
    if (
      location.pathname.includes('president') ||
      location.pathname.includes('treasurer') ||
      location.pathname.includes('secretary') ||
      location.pathname.includes('oc') ||
      location.pathname.includes('member')
    ) {
      setIsPresidentView(true);  // Set isPresidentView to true for any matching role
    } else {
      setIsPresidentView(false); // Reset isPresidentView if no role matches
    }
  }, [id, location.pathname]);
  

  const fetchClubDetails = async (clubId) => {
    try {
        const token = localStorage.getItem('token');
        const clubs = await ClubsService.getClubById(clubId, token);
        //const clubsArray = clubs.content || [];
        setClubDetails(club);
        setLoading(false); 
    } catch (error) {
        console.error("Failed to fetch clubs", error);
        setLoading(false);
    }
};

  const [isOpen, setIsOpen] = useState(false); // State for CustomSwitch
  if (loading) {
    return <div>Loading...</div>;
  }

  // Find the club details based on the name or the state passed
  //const clubDetails = clubsD.find(clubItem => clubItem.id === id) || club;

  if (!clubDetails) {
    return <div>Club not found</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar className="flex-shrink-0" />
      <div className="flex flex-col flex-1 h-full overflow-y-auto">
        <Navbar className="sticky top-0 z-10 p-4" />
        <div className="bg-neutral-900 text-white flex flex-col flex-1 px-8 py-2 relative">
          <div className="flex items-start mb-6 p-3 shadow-lg rounded-full"  style={{ 
                                                        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' 
                                                      }}>
            <div className="rounded-full overflow-hidden w-24 h-24 flex-shrink-0m custom-card">
              <img
                src={clubDetails.club_image}
                alt={clubDetails.club_name}
                className="object-cover flex items-start w-full h-full "
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = fallbackImage; // Fallback image
                }}
                 style={{ 
                                                        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' 
                                                      }}
              />
            </div>
            <div className="ml-4 flex flex-col flex-1">
              <Typography variant="h5" className="text-white mb-2">
                {clubDetails.club_name}
              </Typography>
              <div className="flex flex-col flex-1">
                <div className="mb-4">
                  {clubDetails.club_description.split('\n').map((line, index) => (
                    <Typography key={index} variant="body1" className="text-white">
                      {line}
                    </Typography>
                  ))}
                </div>
                <div className="flex items-center mb-4">
                <LikeButton initialLikes={getRandomLikes()} className="mr-2 custom-card" />

{/* Successful Events with random count */}
<div className="flex items-center mr-6 bg-[#1E1E1E] rounded-full">
  <FaCheckCircle className="text-[#AEC90A] text-lg" />
  <Typography variant="body1" className="text-white ml-2 custom-card">
    {getRandomEvents()} Successful Events
  </Typography>
</div>

{/* Members Community with random count */}
<div className="flex items-center mr-6 bg-[#1E1E1E] rounded-full">
  <FaUsers className="text-[#AEC90A] text-lg" />
  <Typography variant="body1" className="text-white ml-2 custom-card">
    {getRandomMembers()} Members Community
  </Typography>
</div>
{location.pathname.includes('president') && (
  <div className="flex items-center ml-4">
    <Typography variant="body1" className="text-white mr-2">
      Recruitment
    </Typography>
    <ClubToggle clubId={id} /> {/* Pass the club ID to ClubToggle */}
  </div>
)}

                </div>
              </div>
            </div>
          </div>
          {isPresidentView ? (
  <PresidentClubNav club={clubDetails} />
) : (
  <StudentMiniNav club={clubDetails} />
)}

        </div>
      </div>
    </div>
  );
};

export default ClubDetails;
