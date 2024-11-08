import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { Typography } from "@material-tailwind/react";
import PresidentClubNav from '../../components/PresidentClubNav';
import LikeButton from '../../components/LikeButton';
import ClubToggle from '../../components/ClubToggle'; // Ensure correct import path
import { FaCheckCircle, FaUsers } from 'react-icons/fa'; // Import icons for successful events and members
import ClubsService from '../../service/ClubsService';

const ClubDetails = () => {
  const { id } = useParams(); // Extract club ID from URL
  const location = useLocation();
  const { club } = location.state || {};
  const getRandomLikes = () => Math.floor(Math.random() * (500 - 100 + 1)) + 100; // Random between 100 and 500
  const getRandomEvents = () => Math.floor(Math.random() * (11 - 5 + 1)) + 5; // Random between 5 and 20
  const getRandomMembers = () => Math.floor(Math.random() * (120 - 100 + 1)) + 100; // Random between 100 and 500
  
  const [clubDetails, setClubDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registrationState, setRegistrationState] = useState(null); // State for registration status
  const [isPresidentView, setIsPresidentView] = useState(false); // State for URL check

  useEffect(() => {
    fetchClubDetails(id);

    // Check if the URL contains 'president'
    if (location.pathname.includes('president')) {
      setIsPresidentView(true);
    }
  }, [id, location.pathname]);

  const fetchClubDetails = async (clubId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await ClubsService.getClubById(clubId, token);
      setClubDetails(response.content);
      setRegistrationState(response.content.registrationState); // Set initial registration state
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch club details", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!clubDetails) {
    return <div>Club not found</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar className="flex-shrink-0" />
      <div className="flex flex-col flex-1 h-full overflow-y-auto">
        <Navbar className="sticky top-0 z-10 p-4" />
        <div className="bg-neutral-900 text-white flex flex-col flex-1 px-8 py-2 relative">
          <div className="flex items-start mb-6 p-3 shadow-lg rounded-full"
            style={{ 
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' 
            }}>
            <div className="rounded-full overflow-hidden w-24 h-24 flex-shrink-0 custom-card">
              <img
                src={clubDetails.club_image}
                alt={clubDetails.club_name}
                className="object-cover w-full h-full"
                onError={(e) => {
                  e.target.onerror = null;
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

                  {isPresidentView && (
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
          <PresidentClubNav club={clubDetails} />
        </div>
      </div>
    </div>
  );
};

export default ClubDetails;
