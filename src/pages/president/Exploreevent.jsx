import React from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import {
    Card,
    CardBody,
    Typography,
} from "@material-tailwind/react";
import { useLocation } from 'react-router-dom';

const ExploreEvent = () => {
    const location = useLocation();
    const { name, image, date, clubName, clubImage } = location.state;

    return (
        <div className="fixed inset-0 flex">
            <Sidebar className="flex-shrink-0" />
            <div className="flex flex-col flex-1">
                <Navbar className="sticky top-0 z-10 p-4" />
                <div className="bg-neutral-900 text-white flex flex-col flex-1 overflow-auto">
                    <div className="flex justify-center items-center flex-col p-4 rounded-lg" >
                        <Card className="w-96 max-w-screen-lg bg-neutral-900">
                            <CardBody>
                                <div className="relative">
                                    <img src={clubImage} alt={clubName} className="w-full h-72 object-cover rounded-lg mb-4" />
                                    <Typography color="white" variant="h3" className="mb-4">
                                        {clubName}
                                    </Typography>
                                    <img src={image} alt={name} className="w-full h-72 object-cover rounded-lg" />
                                </div>
                                <div className="mt-4">
                                    <Typography color="white" variant="h3" className="mb-2">
                                        {name}
                                    </Typography>
                                    <Typography color="white" variant="subtitle1" className="mb-1">
                                        Date: {date}
                                    </Typography>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExploreEvent;
