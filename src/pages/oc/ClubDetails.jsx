import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { Typography } from "@material-tailwind/react";
import PresidentClubNav from '../../components/PresidentClubNav';
import LikeButton from '../../components/LikeButton';
import CustomSwitch from '../../components/Customswitch'; // Ensure correct import path
import { FaCheckCircle, FaUsers } from 'react-icons/fa'; // Import icons for successful events and members

// Image imports
import rotaractImage from '../../assets/clubs/rotaract.png';
import acmImage from '../../assets/clubs/acm.png';
import pahasaraImage from '../../assets/clubs/pahasara1.png';
import isacaImage from '../../assets/clubs/isaca1.png';
import wieImage from '../../assets/clubs/wie.png';
import ieeeImage from '../../assets/clubs/ieee.png';
import msImage from '../../assets/clubs/ms.png';
import wicysImage from '../../assets/clubs/wicys.png';
import rekhaImage from '../../assets/clubs/rekha.png';



const ClubDetails = () => {
  const { name } = useParams();
  const location = useLocation();
  const { club } = location.state || {};

  const [isOpen, setIsOpen] = useState(false); // State for CustomSwitch

  // Find the club details based on the name or the state passed
  const clubDetails = clubs.find(clubItem => clubItem.name.toLowerCase() === name.toLowerCase() || clubItem.name.toLowerCase() === club?.name.toLowerCase()) || club;

  if (!clubDetails) {
    return <div>Club not found</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar className="flex-shrink-0" />
      <div className="flex flex-col flex-1 h-full overflow-y-auto">
        <Navbar className="sticky top-0 z-10 p-4" />
        <div className="bg-neutral-900 text-white flex flex-col flex-1 px-8 py-2 relative">
          <div className="flex items-start mb-6  p-3 shadow-lg rounded-full"  style={{ 
                                                        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' 
                                                      }}>
            <div className="rounded-full overflow-hidden w-24 h-24 flex-shrink-0m custom-card">
              <img
                src={clubDetails.image}
                alt={clubDetails.name}
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
                {clubDetails.name}
              </Typography>
              <div className="flex flex-col flex-1">
                <div className="mb-4">
                  {clubDetails.description.split('\n').map((line, index) => (
                    <Typography key={index} variant="body1" className="text-white">
                      {line}
                    </Typography>
                  ))}
                </div>
                <div className="flex items-center">
                  {/* Like Button */}
                  <LikeButton initialLikes={320} className="mr-2 custom-card" />

                  {/* Successful Events */}
                  <div className="flex items-center mr-6 bg-[#1E1E1E] rounded-full">
                    <FaCheckCircle className="text-[#AEC90A] text-lg" />
                    <Typography variant="body1" className="text-white ml-2 custom-card">
                      10 Successful Events
                    </Typography>
                  </div>

                  {/* Members */}
                  <div className="flex items-center bg-[#1E1E1E] rounded-full">
                    <FaUsers className="text-[#AEC90A] text-lg" />
                    <Typography variant="body1" className="text-white ml-2 custom-card">
                      200 Members Community
                    </Typography>
                  </div>
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
