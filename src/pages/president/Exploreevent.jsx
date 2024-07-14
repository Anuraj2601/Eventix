import React from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import {
    Card,
    CardBody,
    Typography,
} from "@material-tailwind/react";
import { useLocation } from 'react-router-dom';
import ElectionNav from '../../components/EventNav'; // Import your ElectionNav component

// Function to generate a random description (placeholder)
const getRandomDescription = () => {
    const descriptions = [
        "Come join us for a day filled with learning and fun! This event aims to bring together students and professionals to explore new ideas and innovations.",
        "Discover the latest innovations in technology and creativity. Our event will showcase groundbreaking projects and connect you with industry leaders.",
        "Explore new opportunities and ideas with industry leaders. This event is designed to inspire and empower students to reach their full potential.",
        "An event designed to inspire and empower students. Join us for insightful talks, hands-on workshops, and networking opportunities.",
        "Connect with like-minded individuals and expand your network. Our event provides a platform for students to meet industry professionals and fellow enthusiasts.",
    ];
    const randomIndex = Math.floor(Math.random() * descriptions.length);
    return descriptions[randomIndex];
};

const ExploreEvent = () => {
    const location = useLocation();
    const { name, image, date, clubName, clubImage } = location.state;
    const description = getRandomDescription(); // Get random description

    return (
        <div className="fixed inset-0 flex">
            <Sidebar className="flex-shrink-0" />
            <div className="flex flex-col flex-1">
                <Navbar className="sticky top-0 z-10 p-4" />
                <div className="bg-neutral-900 text-white flex flex-col flex-1 overflow-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full h-full p-4">
                        {/* Event Card */}
                        <div className="order-2 md:order-1 flex justify-center items-center">
                            <Card className="w-full bg-neutral-900 h-128 relative">
                                <CardBody className="h-full">
                                    <div className="relative h-full flex flex-col justify-center">
                                        <img src={image} alt={name} className="w-full h-72 object-cover rounded-lg mb-4" /> {/* Adjusted width and height */}
                                        <Typography color="white" variant="h3" className="mb-2">
                                            {name}
                                        </Typography>
                                        <Typography color="white" variant="subtitle1" className="mb-2">
                                            On {date}
                                        </Typography>
                                        <div className="absolute top-2 right-2 flex items-center"> {/* Positioned Organised by to top right */}
                                            <Typography color="white" variant="subtitle1" className="mr-2">
                                                Organised by {clubName}
                                            </Typography>
                                            <img src={clubImage} alt={clubName} className="w-8 h-8 rounded-full" />
                                        </div>
                                        <Typography color="white" variant="body1" className="mb-4">
                                            {description}
                                        </Typography>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                        {/* Similar Card Below */}
                        <div className="order-3 md:order-3 flex justify-center items-center">
                            <Card className="w-full bg-neutral-900 h-128 relative">
                                <CardBody className="h-full">
                                    <div className="relative h-full flex flex-col justify-center">
                                        {/* Placeholder Content */}
                                        <Typography color="white" variant="h3" className="mb-2">
                                            Example Event Name
                                        </Typography>
                                        <Typography color="white" variant="subtitle1" className="mb-2">
                                            On January 1, 2025
                                        </Typography>
                                        <div className="absolute top-2 right-2 flex items-center bg-black rounded-lg">
                                            <Typography color="white" variant="subtitle1" className="mr-2 ">
                                                Organised by Example Club
                                            </Typography>
                                            <img src="example-club-image-url" alt="Example Club" className="w-8 h-8 rounded-full" />
                                        </div>
                                        <Typography color="white" variant="body1" className="mb-4">
                                            Example description for the event.
                                        </Typography>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                        {/* ElectionNav */}
                        <div className="order-1 md:order-2 flex justify-center items-center">
                            <ElectionNav className="w-full h-full" /> {/* Render your ElectionNav component here */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExploreEvent;
