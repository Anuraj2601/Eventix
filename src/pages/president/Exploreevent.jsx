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

const ExploreEvent = () => {
    const location = useLocation();
    const { name, image, date, clubName, clubImage } = location.state;

    return (
        <div className="fixed inset-0 flex">
            <Sidebar className="flex-shrink-0" />
            <div className="flex flex-col flex-1">
                <Navbar className="sticky top-0 z-10 p-4" />
                <div className="bg-neutral-900 text-white flex flex-col flex-1 overflow-auto ">
                    <div className="grid grid-cols-1  gap-2 w-full max-w-screen-lg mx-auto">
                        <div className="order-2 md:order-1">
                            <Card className="w-full bg-neutral-900">
                                <CardBody>
                                    <div className="relative">
                                        <img src={image} alt={name} className="w-full h-48 md:h-full object-cover rounded-lg" />
                                        <div className="flex items-center mt-2">
                                            <Typography color="white" variant="subtitle1" className="mr-2">
                                                Organised by {clubName}
                                            </Typography>
                                            <img src={clubImage} alt={clubName} className="w-8 h-8 rounded-full" />
                                        </div>
                                        <div className="flex flex-col mt-4">
                                            <Typography color="white" variant="h3" className="mb-2">
                                                {name}
                                            </Typography>
                                            <Typography color="white" variant="subtitle1" className="mb-1">
                                                Date: {date}
                                            </Typography>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                        <div className="order-1 md:order-2">
                            <ElectionNav /> {/* Render your ElectionNav component here */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExploreEvent;
