import React, { useEffect, useState } from 'react';
import { Button } from "@material-tailwind/react";
import { RiOpenArmLine } from "react-icons/ri";
import { IoMdBookmark } from "react-icons/io";
import { FaPlus } from "react-icons/fa"; // Import the plus icon
import { useNavigate, useLocation } from 'react-router-dom';


// Import images
import ieeeImg from '../assets/clubs/ieee.png';
import rotaractImg from '../assets/clubs/rotaract.png';
import acmImg from '../assets/clubs/acm.png';
import isacaImg from '../assets/clubs/isaca1.png';
import wieImg from '../assets/clubs/wie.png';
import msImg from '../assets/clubs/ms.png';
import wicysImg from '../assets/clubs/wicys.png';
import rekhaImg from '../assets/clubs/rekha.png';
import pahasaraImg from '../assets/clubs/pahasara1.png';
import ClubsService from '../service/ClubsService';

const StudentClubCard = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Get the current location
    

  const [clubDetails, setClubDetails] = useState([]);

  useEffect(() => {
    fetchClubs();
  }, []);

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

const handleRegisterClick = (club) => {
    let basePath;
    // Determine the base path from the current location
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
    // Navigate to the club registration page with the club ID appended
    navigate(`${basePath}/clubregister/${club.club_id}`);
};

    const handleExploreClick = (club) => {
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
        navigate(`${basePath}/club/${club.club_id}`, { state: { club, image: club.club_image } });
        
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
                    <div key={club.club_id} className='bg-[#0B0B0B] w-full h-[28rem] rounded-2xl overflow-hidden flex flex-col shadow-lg mb-4 mt-4 custom-3d-shadow custom-card' style={{ 
                        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' 
                    }}>
                        <div className="h-2/5 overflow-hidden">
                            <img src={club.club_image} alt={club.club_name} className='w-full h-full object-cover' />
                        </div>
                        <div className="p-4 flex flex-col justify-between flex-1">
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <div className='flex gap-4'>
                                        <div className="reg">
                                            <p className='mb-2 tracking-wide text-white'>{club.club_name}</p>
                                            <div className='flex gap-3'>
                                                {
                                                    club.state ? (
                                                        <>
                                                            <RiOpenArmLine className='text-[#AEC90A]' size={20} />
                                                            <span className='text-[#AEC90A]'>Registrations are Open</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <RiOpenArmLine className='text-[#5C690A]' size={20} />
                                                            <span className='text-[#5C690A]'>Registrations are Closed</span>
                                                        </>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <IoMdBookmark className='text-[#AEC90A] custom-card' size={30} />
                                </div>
                                <div className="mb-4">
                                    <p className='text-[#F5F5F5]'>{club.club_description}</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-end gap-4">
                                <Button className="bg-white text-[#0B0B0B] px-4 py-2 rounded-3xl font-medium custom-card">Ignore</Button>
                                <Button
                                    className={`text-[#0B0B0B] px-4 py-2 rounded-3xl font-medium custom-card ${club.state ? 'bg-[#AEC90A]' : 'bg-[#AEC90A80] cursor-not-allowed'}`}
                                    onClick={() => handleRegisterClick(club)}
                                    disabled={club.state == "false"}
                                >
                                    Register
                                </Button>
                                <Button className="bg-[#AEC90A] text-[#0B0B0B] px-4 py-2 rounded-3xl font-medium custom-card" onClick={() => handleExploreClick(club)}>Explore</Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudentClubCard;
