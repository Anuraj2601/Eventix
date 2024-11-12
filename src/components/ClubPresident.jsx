import React, { useState, useEffect } from "react";
import { Card, CardBody, Typography, Avatar, Textarea } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { MdSend } from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";
import { Dialog } from "@material-tailwind/react";
import { useNavigate, useLocation } from "react-router-dom";
import ClubsService from '../service/ClubsService';
import RegistrationService from '../service/registrationService';  // Assuming you have a service to fetch registrations

const ClubPresident = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [clubDetails, setClubDetails] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [filteredClubs, setFilteredClubs] = useState([]);

  // Fetch the clubs and registrations data
  useEffect(() => {
    fetchClubs();
    fetchRegistrations();
  }, []);

  // Fetch all clubs
  const fetchClubs = async () => {
    try {
      const token = localStorage.getItem('token');
      const clubs = await ClubsService.getAllClubs(token);
      const clubsArray = clubs.content || [];
      setClubDetails(clubsArray);
    } catch (error) {
      console.error("Failed to fetch clubs", error);
    }
  };

  // Fetch all registrations
  const fetchRegistrations = async () => {
    try {
      const token = localStorage.getItem('token');
      const currentUserId = localStorage.getItem('userId');  // Assuming the user ID is stored in localStorage
      const registrationsData = await RegistrationService.getAllRegistrations(token);
      setRegistrations(registrationsData);
    } catch (error) {
      console.error("Failed to fetch registrations", error);
    }
  };

  // Filter clubs based on the user's session ID and position
  useEffect(() => {
    if (registrations.length > 0 && clubDetails.length > 0) {
      const currentUserId = localStorage.getItem('userId');
      // Filter registrations to match current user's ID and accepted status, with relevant positions
      const filteredRegistrations = registrations.filter(reg =>
        reg.accepted === 1 &&
        reg.user_id === currentUserId && 
        ['president', 'secretary', 'oc'].includes(reg.position)
      );

      // Extract the club IDs from the filtered registrations
      const clubIds = filteredRegistrations.map(reg => reg.club_id);

      // Filter clubs that match the club IDs from the registrations
      const filteredClubs = clubDetails.filter(club => clubIds.includes(club.club_id));
      setFilteredClubs(filteredClubs);  // Only show clubs that the user is a part of in the relevant positions
    }
  }, [registrations, clubDetails]);

  const handleExploreClick = (club) => {
    let basePath;
    switch (true) {
      case location.pathname.startsWith('/president'):
        basePath = '/president';
        break;
      case location.pathname.startsWith('/student'):
        basePath = '/student';
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
        basePath = '';
    }
    navigate(`${basePath}/club/${club.club_id}`, { state: { club, image: club.club_image } });
  };

  const handleOpen = () => setOpen((prevState) => !prevState);

  return (
    <>
      <Card className="w-full bg-neutral-900">
        <CardBody>
          <div>
            {filteredClubs.map((club) => (
              <div
                key={club.club_id}
                className="flex items-center justify-between p-4 bg-[#1E1E1E] rounded-xl mb-4"
                style={{
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)'
                }}
              >
                <div className="flex items-center gap-x-3 custom-3d-shadow">
                  <Avatar
                    size="sm"
                    src={club.club_image || 'path/to/default-image.jpg'}  // Add fallback image
                    alt={club.club_name}
                    className="rounded-md w-20 h-10"
                  />
                  <Typography color="white" className="font-medium">
                    {club.club_name}
                  </Typography>
                </div>
                <div className="flex gap-4">
                  <Button
                    className="bg-white pt-1 pb-1 pl-5 pr-5 rounded-2xl text-black font-medium text-sm"
                    onClick={handleOpen}
                  >
                    Leave
                  </Button>
                  <Button
                    className="bg-[#AEC90A] text-[#0B0B0B] px-4 py-2 rounded-3xl font-medium"
                    onClick={() => handleExploreClick(club)}
                  >
                    Explore
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="fixed inset-0 flex items-center justify-center bg-opacity-60 backdrop-blur-sm transition-opacity duration-200 z-50"
      >
        <Card className="mx-auto w-full max-w-[24rem] p-3 relative">
          <IoIosCloseCircle
            className="absolute text-xl top-1 right-1 cursor-pointer"
            onClick={handleOpen}
          />
          <CardBody className="flex flex-col">
            <Typography
              className="mb-3 font-normal font-[poppins]"
              variant="paragraph"
              color="gray"
            >
              Why are you leaving? Let us know your reason:
            </Typography>
            <div className="relative">
              <Textarea
                size="lg"
                className="h-16 border-2 bg-slate-100"
                placeholder="Type your reason"
                required
              />
              <MdSend className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 cursor-pointer" />
            </div>
          </CardBody>
        </Card>
      </Dialog>
    </>
  );
};

export default ClubPresident;
