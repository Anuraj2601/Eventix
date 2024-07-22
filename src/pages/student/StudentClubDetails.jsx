import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { Typography } from "@material-tailwind/react";
import StudentMiniNav from '../../components/StudentMiniNav';
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

const clubs = [
  {
    id: "1",
    name: "Rotaract Club of UCSC",
    reg_status: "yes",
    description: "The Rotaract Club of UCSC, part of Rotary International District 3220, empowers youth to enact positive change locally and globally.",
    image: rotaractImage,
  },
  {
    id: "2",
    name: "ACM Student Chapter",
    reg_status: "no",
    description: "The ACM Student Chapter aims to advance computing as a science and profession. Activities include coding competitions, guest lectures, and career development workshops.",
    image: acmImage,
  },
  {
    id: "3",
    name: "Pahasara Club (Innovation and Creativity)",
    reg_status: "yes",
    description: "The Pahasara Club offers a platform for photography enthusiasts to enhance their skills through workshops, photo walks, and exhibitions.",
    image: pahasaraImage,
  },
  {
    id: "4",
    name: "ISACA Student Group",
    reg_status: "no",
    description: "The Debate Society aims to improve public speaking and critical thinking skills through regular debates, public speaking workshops, and competitions.",
    image: isacaImage,
  },
  {
    id: "5",
    name: "(IEEE WIE) IEEE Women in Engineering",
    reg_status: "yes",
    description: "The IEEE Women in Engineering (WIE) Student Branch at the University of Colombo School of Computing strives to enhance women’s participation and empowerment in electrical and electronic engineering.",
    image: wieImage,
  },
  {
    id: "6",
    name: "IEEE Student Chapter",
    reg_status: "yes",
    description: "The IEEE Student Chapter promotes the advancement of technology. Members can participate in technical seminars, project exhibitions, and networking events.",
    image: ieeeImage,
  },
  {
    id: "7",
    name: "Mechatronic Society Of UCSC",
    reg_status: "no",
    description: "The Mechatronic Society Of UCSC focuses on sustainability and environmental awareness. Activities include clean-up drives, tree planting, and educational workshops.",
    image: msImage,
  },
  {
    id: "8",
    name: "Women in Cybersecurity",
    reg_status: "no",
    description: "This club is part of the Institute of Electrical and Electronics Engineers (IEEE) and focuses on all aspects of computer science and engineering.",
    image: wicysImage,
  },
  {
    id: "9",
    name: "Rekha",
    reg_status: "yes",
    description: "Get the opportunity to learn from industry professionals, prepare for certifications like CISA and CRISC and and network with professionals in the field.",
    image: rekhaImage,
  },
];

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
        <div className="bg-neutral-900 text-white flex flex-col flex-1 px-8 py-2 relative ">
        <div className="flex items-start mb-6 bg-[#1E1E1E] p-3 shadow-lg rounded-full "  style={{ 
                                                        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' 
                                                      }}>
            <div className="rounded-full overflow-hidden w-24 h-24 flex-shrink-0 custom-card">
              <img
                src={clubDetails.image}
                alt={clubDetails.name}
                className="object-cover flex items-start w-full h-full "
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = fallbackImage; // Fallback image
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
                  <LikeButton initialLikes={320} className="mr-2" />

                  {/* Successful Events */}
                  <div className="flex items-center mr-6 bg-[#1E1E1E] rounded-full">
                    <FaCheckCircle className="text-[#AEC90A] text-lg" />
                    <Typography variant="body1" className="text-white ml-2">
                      10 Successful Events
                    </Typography>
                  </div>

                  {/* Members */}
                  <div className="flex items-center bg-[#1E1E1E] rounded-full">
                    <FaUsers className="text-[#AEC90A] text-lg" />
                    <Typography variant="body1" className="text-white ml-2">
                      200 Members Community
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </div>
        <StudentMiniNav  club={clubDetails}
/>
        </div>
      </div>
    </div>
  );
};

export default ClubDetails;
