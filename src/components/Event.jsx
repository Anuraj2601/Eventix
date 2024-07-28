import React, { useState } from 'react';
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { FaCalendar, FaLocationDot } from "react-icons/fa6";
import { IoTimeOutline } from "react-icons/io5";
import { Button } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
import LikeButton from './LikeButton'; // Assuming LikeButton component is in the same directory

const Event = ({ event, isLastPost }) => {
    const navigate = useNavigate();
    const [showFullDescription, setShowFullDescription] = useState(false);

    const handleRegister = () => {
        if (event.registerLink) {
            navigate(event.registerLink);
        }
    };

    const handleApply = () => {
        if (event.applyLink) {
            navigate(event.applyLink);
        }
    };

    const handleToggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    return (
        <div className="relative flex items-center justify-start mr-2 mt-2 mb-8 px-10">
            <div className='bg-[#0b0b0b] p-5 w-full rounded-md' style={{ 
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' 
            }}>
                <div className="flex flex-row items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <img src={event.publisher_img} alt="" className='w-11 h-11 rounded-full border-2 border-[#AEC90A]' />
                        <div>
                            <span>{event.publisher_position}</span>
                            <br />
                            <b>{event.publisher_name}</b>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <HiOutlineDotsVertical className='text-[#AEC90A]' size={30} />
                        <IoMdClose className='text-[#AEC90A]' size={30} />
                    </div>
                </div>
                <div className="relative">
                    <img src={event.image} alt="" className='object-cover w-full h-96' />
                    {(event.date || event.time || event.venue) && (
                        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-black bg-opacity-80 p-4 text-white">
                            <div className="flex items-center gap-4">
                                {event.date && (
                                    <div className="flex items-center gap-2">
                                        <FaCalendar className='text-[#AEC90A]' size={20} />
                                        <span>{event.date}</span>
                                    </div>
                                )}
                                {event.time && (
                                    <div className="flex items-center gap-2">
                                        <IoTimeOutline className='text-[#AEC90A]' size={20} />
                                        <span>{event.time}</span>
                                    </div>
                                )}
                                {event.venue && (
                                    <div className="flex items-center gap-2">
                                        <FaLocationDot className='text-[#AEC90A]' size={20} />
                                        <span>{event.venue}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex flex-col gap-5 mt-1">
                    <p className={`overflow-hidden ${showFullDescription ? 'whitespace-normal' : 'whitespace-nowrap overflow-ellipsis'}`}>
                        {event.description}
                    </p>
                    {event.description.length > 100 && !showFullDescription && (
                        <button onClick={handleToggleDescription} className='text-[#AEC90A] underline'>
                            See more
                        </button>
                    )}
                </div>
                <div className="flex items-center justify-between mt-3">
                    <div>
                        {!isLastPost && event.registerLink ? (
                            <Button className="flex justify-end bg-[#AEC90A] py-2 px-4 rounded-3xl font-bold text-[#0b0b0b]" onClick={handleRegister}>
                                Apply{" "}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="h-5 w-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                                    />
                                </svg>
                            </Button>
                        ) : event.applyLink ? (
                            <Button className="flex justify-end bg-[#AEC90A] py-2 px-4 rounded-3xl font-bold text-[#0b0b0b]" onClick={handleApply}>
                                Apply{" "}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="h-5 w-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                                    />
                                </svg>
                            </Button>
                        ) : null}
                    </div>
                    <div className='flex items-center gap-3'>
                        <LikeButton />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Event;
