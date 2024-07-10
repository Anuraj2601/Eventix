import React from 'react';
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

const CardDefault = ({ club }) => {
  return (
    <Card className="bg-black" style={{ width: '23rem' }}>
      <CardHeader color="blue-gray" className="relative h-40">
        <img
          src={club.image}
          alt={club.name}
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" className="mb-2 text-[#AEC90A] flex items-center">
          Registrations are open
          <a href="#register-link" className="ml-4 h-auto w-9">
            <HiArrowRightCircle className="text-2xl" />
          </a>
        </Typography>
        <Typography className="text-white">
          Get the opportunity to learn from industry professionals, prepare
          for certifications like CISA and CRISC and network with
          professionals in the field.
        </Typography>
      </CardBody>
      <CardFooter className="pt-0 flex justify-between">
        <a href="#explore-link">
          <Button variant="gradient" className="bg-[#AEC90A] text-black p-1">
            Explore
          </Button>
        </a>
        <Link 
          to={{
            pathname: `/club/election`,
            state: { club }
          }}
        >
          <Button variant="gradient" className="bg-[#AEC90A] text-black p-1">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

const MultipleCards = () => {
  const clubs = Array.from({ length: 8 }).map((_, index) => ({
    name: `Club ${index + 1}`,
    image: `../../src/assets/club${index + 1}.png`
  }));

  return (
    <div className="flex flex-wrap gap-8">
      {clubs.map((club, index) => (
        <CardDefault key={index} club={club} />
      ))}
    </div>
  );
};

const ClubDetails = () => {
  const { clubName } = useParams();
  const location = useLocation();
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
              src={club.image}
              alt={club.name}
              className="object-cover rounded-lg mr-4"
              style={{ width: '68px', height: '68px' }}
            />
            <Typography variant="h5" className="text-[#AEC90A]">
              {club.name}
            </Typography>
          </div>
          <ClubNav />
        </div>
      </div>
    </div>
  );
};

export default ClubDetails;
