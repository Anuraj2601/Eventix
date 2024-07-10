import React from 'react'
import { useParams, useLocation, Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { HiArrowRightCircle } from "react-icons/hi2";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import ClubNav from '../../components/ClubNav';

const StudentClubDetails = () => {
    const { clubName } = useParams();
    const location = useLocation();
    console.log(location);
    const { club } = location.state || {};

    if (!club) {
        return <div>Club not found</div>;
    }

  return (
    <div className="fixed inset-0 flex">
        <Sidebar className="flex-shrink-0" />
        <div className="flex flex-col flex-1">
            <Navbar className="sticky top-0 z-10 p-4" />
            <div className="bg-neutral-900 flex-1 text-white flex flex-col overflow-hidden p-6">
            <div className="flex items-center mb-6">
                <img
                src= {`../${club.image}`}
                alt={club.name}
                className="object-cover rounded-lg mr-4"
                style={{ width: '68px', height: '68px' }}
                />
                <Typography variant="h5" className="text-[#AEC90A]">
                {club.name}
                </Typography>
            </div>
            {/* <ClubNav /> */}
            </div>
        </div>
    </div>
  )
}

export default StudentClubDetails
