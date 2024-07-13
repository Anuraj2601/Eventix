import React from 'react';
import { Button } from "@material-tailwind/react";
import { RiOpenArmLine } from "react-icons/ri";
import { IoMdBookmark } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const PresidentClubCard = ({ club }) => {
    const navigate = useNavigate();

    const handleRegisterClick = () => {
        navigate(`/clubregister/${club.club_name}`);
    }

    const handleExploreClick = () => {
        navigate(`/club/${club.sname}`, { state: { club } });
    }

    return (
        <div className='bg-[#0B0B0B] w-96 h-[28rem] rounded-2xl overflow-hidden flex flex-col shadow-lg'>
            <div className="h-2/5 overflow-hidden">
                <img src={club.image} alt={club.club_name} className='w-full h-full object-cover' />
            </div>
            <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <div className='flex gap-4'>
                            <div className="reg">
                                <p className='mb-2 tracking-wide text-white'>{club.club_name}</p>
                                <div className='flex gap-3'>
                                    {
                                        club.reg_status === 'yes' ? (
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
                        <IoMdBookmark className='text-[#AEC90A]' size={30} />
                    </div>
                    <div className="mb-4">
                        <p className='text-[#F5F5F5]'>{club.description}</p>
                    </div>
                </div>
                <div className="flex items-center justify-end gap-4">
                    <Button className="bg-white text-[#0B0B0B] px-4 py-2 rounded-3xl font-medium">Ignore</Button>
                    <Button
                        className={`text-[#0B0B0B] px-4 py-2 rounded-3xl font-medium ${club.reg_status === "yes" ? 'bg-[#AEC90A]' : 'bg-[#AEC90A80] cursor-not-allowed'}`}
                        onClick={handleRegisterClick}
                        disabled={club.reg_status !== "yes"}
                    >
                        Register
                    </Button>
                    <Button className="bg-[#AEC90A] text-[#0B0B0B] px-4 py-2 rounded-3xl font-medium" onClick={handleExploreClick}>Explore</Button>
                </div>
            </div>
        </div>
    );
}

export default PresidentClubCard;
