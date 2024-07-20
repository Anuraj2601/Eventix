import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import {
    Card,
    CardBody,
    Typography,
} from "@material-tailwind/react";
import { useLocation } from 'react-router-dom';
import EventNav from '../../components/EventNav';
import AnnouncementNav from '../../components/AnnouncementNav';
import gold from "../../assets/gold.png";
import gold1 from "../../assets/gold1.png";
import platinum from "../../assets/platinum.png";
import platinum1 from "../../assets/platinum1.png";
import silver from "../../assets/silver.png";
import CustomSwitch from '../../components/Customswitch';
import RegisterNav from '../../components/RegisterNav';
import { FaHeart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const ExploreEvent = () => {
    const location = useLocation();
    const { name, image, date, clubName, clubImage } = location.state;
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);
    const navigate = useNavigate(); // Hook to navigate programmatically

    useEffect(() => {
        const initialLikes = Math.floor(Math.random() * 100) + 1;
        setLikes(initialLikes);
    }, []);

    const descriptions = [
        "Come join us for a day filled with learning and fun! This event aims to bring together students and professionals to explore new ideas and innovations.",
        "Discover the latest innovations in technology and creativity. Our event will showcase groundbreaking projects and connect you with industry leaders.",
        "Explore new opportunities and ideas with industry leaders. This event is designed to inspire and empower students to reach their full potential.",
        "An event designed to inspire and empower students. Join us for insightful talks, hands-on workshops, and networking opportunities.",
        "Connect with like-minded individuals and expand your network. Our event provides a platform for students to meet industry professionals and fellow enthusiasts.",
    ];

    const getRandomDescription = () => {
        const randomIndex = Math.floor(Math.random() * descriptions.length);
        return descriptions[randomIndex];
    };

    const handleLikeClick = () => {
        if (!liked) {
            setLikes(likes + 1);
            setLiked(true);
        }
    };

    const description = getRandomDescription();

    const eventDetails = {
        name,
        image,
        date,
        clubName,
        clubImage
    };

    // Function to navigate to the Proposal page
    const goToProposal = () => {
        navigate('/proposal', { state: { eventDetails } });
    };

    return (
        <div className="fixed inset-0 flex">
            <Sidebar className="flex-shrink-0" />
            <div className="flex flex-col flex-1">
                <Navbar className="sticky top-0 z-10 p-4" />
                <div className="bg-neutral-900 text-white flex flex-col flex-1 overflow-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full">
                        <div className="order-1 md:order-1 flex justify-center items-center">
                            <Card className="w-full bg-neutral-900 h-128 relative">
                                <CardBody className="h-full">
                                    <div className="relative h-full flex flex-col justify-center">
                                        <img src={image} alt={name} className="w-full h-72 object-cover rounded-lg mb-4" />
                                        <div className="flex items-center justify-between mb-2">
                                            <Typography color="white" variant="h3">
                                                {name}
                                            </Typography>
                                            <div className="flex items-center">
                                                <FaHeart
                                                    onClick={handleLikeClick}
                                                    className={`cursor-pointer mr-2 ${liked ? 'text-red-500' : 'text-white'}`}
                                                    size={24}
                                                />
                                                <Typography color="white" variant="subtitle1">
                                                    {likes}
                                                </Typography>
                                            </div>
                                        </div>
                                        <Typography color="white" variant="subtitle1" className="text-[#AEC90A]">
                                            On {date}
                                        </Typography>
                                        <Typography color="white" variant="subtitle1" className="text-[#AEC90A] mb-2">
                                            Venue - S1O4 hall
                                        </Typography>
                                        <Typography color="white" variant="body1" className="mb-4">
                                            {description} <a href="" className='text-[#AEC90A]' target="_blank" rel="noopener noreferrer">Click here to Register</a>
                                        </Typography>
                                        <div className="order-3 md:order-4 flex justify-center items-center bg-[#1E1E1E]">
                                            <AnnouncementNav />
                                        </div>
                                        <div className="absolute top-2 right-2 flex items-center">
                                            <Typography color="white" variant="subtitle1" className="mr-2">
                                                Organised by {clubName}
                                            </Typography>
                                            <img src={clubImage} alt={clubName} className="w-8 h-8 rounded-full" />
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>

                        <div className="order-3 md:order-2 flex w-full">
                            <EventNav className="w-full h-full" />
                        </div>
                    </div>

                    <div className="flex justify-center items-center p-10">
                        <Card className="w-full bg-neutral-900 h-128 relative bg-[#1E1E1E]">
                            <CardBody className="h-full">
                                <div className="relative h-full flex flex-col justify-center">
                                    <Typography color="white" variant="h3" className="mb-2 text-center p-5">
                                        Sponsors
                                    </Typography>
                                    <div className="flex justify-between mb-4">
                                        <div className="flex flex-col items-center">
                                            <img src={platinum} alt="Platinum Sponsor" className="w-40 h-40 rounded-full border-4 border-platinum mb-2" />
                                            <Typography color="white" variant="subtitle1">
                                                Platinum Sponsor
                                            </Typography>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <img src={platinum1} alt="Platinum Sponsor" className="w-40 h-40 rounded-full border-4 border-platinum mb-2" />
                                            <Typography color="white" variant="subtitle1">
                                                Platinum Sponsor
                                            </Typography>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <img src={gold} alt="Gold Sponsor" className="w-40 h-40 rounded-full border-4 border-gold mb-2" />
                                            <Typography color="white" variant="subtitle1">
                                                Gold Sponsor
                                            </Typography>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <img src={gold1} alt="Gold Sponsor" className="w-40 h-40 rounded-full border-4 border-gold mb-2" />
                                            <Typography color="white" variant="subtitle1">
                                                Gold Sponsor
                                            </Typography>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <img src={silver} alt="Silver Sponsor" className="w-40 h-40 rounded-full border-4 border-silver mb-2" />
                                            <Typography color="white" variant="subtitle1">
                                                Silver Sponsor
                                            </Typography>
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>

                    <div className="w-full p-10">
                        <RegisterNav className="w-full h-96" />
                    </div>

                    {/* Button or link to navigate to Proposal page */}
                    <div className="flex justify-center items-center p-10">
                        <button
                            onClick={goToProposal}
                            className="bg-[#AEC90A] text-white px-4 py-2 rounded-lg"
                        >
                            View Proposal Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExploreEvent;
