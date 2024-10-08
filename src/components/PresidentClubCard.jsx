import React from 'react';
import { Button } from "@material-tailwind/react";
import { RiOpenArmLine } from "react-icons/ri";
import { IoMdBookmark } from "react-icons/io";
import { useNavigate, useLocation } from 'react-router-dom';

// Import images directly from the assets folder
import rotaractImage from '../assets/clubs/rotaract.png';
import acmImage from '../assets/clubs/acm.png';
import pahasaraImage from '../assets/clubs/pahasara1.png';
import isacaImage from '../assets/clubs/isaca1.png';
import wieImage from '../assets/clubs/wie.png';
import ieeeImage from '../assets/clubs/ieee.png';
import msImage from '../assets/clubs/ms.png';
import wicysImage from '../assets/clubs/wicys.png';
import rekhaImage from '../assets/clubs/rekha.png';

const PresidentClubCard = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const clubs = [
        {
            id: "6",
            name: "IEEE Student Chapter",
            reg_status: "yes",
            description: "The IEEE Student Chapter promotes the advancement of technology. Members can participate in technical seminars, project exhibitions, and networking events.",
            image: ieeeImage,
            sname: "ieee",
        },
        {
            id: "1",
            name: "Rotaract Club of UCSC",
            reg_status: "yes",
            description: "The Rotaract Club of UCSC, part of Rotary International District 3220, empowers youth to enact positive change locally and globally.",
            image: rotaractImage,
            sname: "rotaract",
        },
        {
            id: "2",
            name: "ACM Student Chapter",
            reg_status: "no",
            description: "The ACM Student Chapter aims to advance computing as a science and profession. Activities include coding competitions, guest lectures, and career development workshops.",
            image: acmImage,
            sname: "acm",
        },
        {
            id: "4",
            name: "ISACA Student Group",
            reg_status: "no",
            description: "The Debate Society aims to improve public speaking and critical thinking skills through regular debates, public speaking workshops, and competitions.",
            image: isacaImage,
            sname: "isaca",
        },
        {
            id: "5",
            name: "(IEEE WIE) IEEE Women in Engineering",
            reg_status: "yes",
            description: "The IEEE Women in Engineering (WIE) Student Branch at the University of Colombo School of Computing strives to enhance women’s participation and empowerment in electrical and electronic engineering.",
            image: wieImage,
            sname: "wie",
        },
        
        {
            id: "7",
            name: "Mechatronic Society Of UCSC",
            reg_status: "no",
            description: "The Mechatronic Society Of UCSC focuses on sustainability and environmental awareness. Activities include clean-up drives, tree planting, and educational workshops.",
            image: msImage,
            sname: "ms",
        },
        {
            id: "8",
            name: "Women in Cybersecurity",
            reg_status: "no",
            description: "This club is part of the Institute of Electrical and Electronics Engineers (IEEE) and focuses on all aspects of computer science and engineering.",
            image: wicysImage,
            sname: "wicys",
        },
        {
            id: "9",
            name: "Rekha",
            reg_status: "yes",
            description: "Get the opportunity to learn from industry professionals, prepare for certifications like CISA and CRISC, and network with professionals in the field.",
            image: rekhaImage,
            sname: "rekha",
        },
        {
            id: "3",
            name: "Pahasara Club (Innovation and Creativity)",
            reg_status: "yes",
            description: "The Pahasara Club offers a platform for photography enthusiasts to enhance their skills through workshops, photo walks, and exhibitions.",
            image: pahasaraImage,
            sname: "pahasara",
        },
    ];

    const handleRegisterClick = (club) => {
        navigate(`/clubregister/${club.sname}`);
    };

    const handleExploreClick = (club) => {
        let basePath;
        switch (true) {
            case location.pathname.startsWith('/president'):
                basePath = '/president';
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
        navigate(`${basePath}/club/${club.sname}`, { state: { club, image: club.image } });
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {clubs.map((club) => (
                <div key={club.id} className='bg-[#0B0B0B] w-full h-[28rem] rounded-2xl overflow-hidden flex flex-col shadow-lg mb-4 mt-4 custom-3d-shadow custom-card' style={{ 
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' 
                  }}>
                    <div className="h-2/5 overflow-hidden">
                        <img src={club.image} alt={club.name} className='w-full h-full object-cover' />
                    </div>
                    <div className="p-4 flex flex-col justify-between flex-1">
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <div className='flex gap-4'>
                                    <div className="reg">
                                        <p className='mb-2 tracking-wide text-white'>{club.name}</p>
                                        <div className='flex gap-3'>
                                            {
                                                club.reg_status === 'yes' ? (
                                                    <>
                                                        <RiOpenArmLine className='text-[#AEC90A] custom-card' size={20} />
                                                        <span className='text-[#AEC90A]'>Registrations are Open</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <RiOpenArmLine className='text-[#5C690A] custom-card' size={20} />
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
                                <p className='text-[#F5F5F5]'>{club.description}</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-end gap-4">
                            <Button className="bg-white text-[#0B0B0B] px-4 py-2 rounded-3xl font-medium custom-card">Ignore</Button>
                            <Button
                                className={`text-[#0B0B0B] px-4 py-2 rounded-3xl font-medium custom-card ${club.reg_status === "yes" ? 'bg-[#AEC90A]' : 'bg-[#AEC90A80] cursor-not-allowed'}`}
                                onClick={() => handleRegisterClick(club)}
                                disabled={club.reg_status !== "yes"}
                            >
                                Register
                            </Button>
                            <Button className="bg-[#AEC90A] text-[#0B0B0B] px-4 py-2 rounded-3xl font-medium custom-card" onClick={() => handleExploreClick(club)}>Explore</Button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default PresidentClubCard;
