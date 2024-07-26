import React from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import {
    Card,
    CardBody,
    Typography,
} from "@material-tailwind/react";
import { useLocation } from 'react-router-dom';
import EventNav from '../../components/EventNav'; // Import your ElectionNav component
import AnnouncementNav from '../../components/AnnouncementNav'; // Import your AnnouncementNav component
import gold from "../../assets/gold.png"; // Importing gold image
import platinum from "../../assets/platinum.png"; // Importing platinum image
import silver from "../../assets/silver.png"; // Importing silver image


const ExploreMemberEvent = () => {
    const location = useLocation();
    const { name, image, date, clubName, clubImage } = location.state;

    // Sample description data
    const descriptions = [
        "Come join us for a day filled with learning and fun! This event aims to bring together students and professionals to explore new ideas and innovations.",
        "Discover the latest innovations in technology and creativity. Our event will showcase groundbreaking projects and connect you with industry leaders.",
        "Explore new opportunities and ideas with industry leaders. This event is designed to inspire and empower students to reach their full potential.",
        "An event designed to inspire and empower students. Join us for insightful talks, hands-on workshops, and networking opportunities.",
        "Connect with like-minded individuals and expand your network. Our event provides a platform for students to meet industry professionals and fellow enthusiasts.",
    ];

    // Function to generate a random description
    const getRandomDescription = () => {
        const randomIndex = Math.floor(Math.random() * descriptions.length);
        return descriptions[randomIndex];
    };

    const description = getRandomDescription(); // Get random description

    return (
        <div className="fixed inset-0 flex">
            <Sidebar className="flex-shrink-0" />
            <div className="flex flex-col flex-1">
                <Navbar className="sticky top-0 z-10 p-4" />
                <div className="bg-neutral-900 text-white flex flex-col flex-1 overflow-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2  w-full h-full "> {/* Reduced gap from 4 to 2 */}
                        {/* Event Card */}
                        <div className="order-1 md:order-1 flex justify-center items-center">
                            <Card className="w-full bg-neutral-900 h-128 relative ">
                                <CardBody className="h-full">
                                    <div className="relative h-full flex flex-col justify-center">
                                        <img src={image} alt={name} className="w-full h-72 object-cover rounded-lg mb-4 " />
                                        <Typography color="white" variant="h3" className="mb-2">
                                            {name}
                                        </Typography>
                                        <Typography color="white" variant="subtitle1" className="mb-2">
                                            On {date}
                                        </Typography>
                                        <Typography color="white" variant="body1" className="mb-4">
                                            {description}  <a href="" className='text-[#AEC90A] ' target="_blank" rel="noopener noreferrer">Click here to Register</a>
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
                        
                        {/* Sponsors Card */}
                        <div className="order-2 md:order-3 flex justify-center items-center">
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
                                                <img src={gold} alt="Gold Sponsor" className="w-40 h-40 rounded-full border-4 border-gold mb-2" />
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
                        
                        {/* EventNav */}
                        <div className="order-3 md:order-2 flex h-full w-full ">
                            <EventNav className="w-full h-full" />
                        </div>
                        
                        {/* AnnouncementNav */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExploreMemberEvent;
