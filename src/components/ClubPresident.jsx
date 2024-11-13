import React, { useState, useEffect } from "react";
import { Card, CardBody, Typography, Avatar, Textarea, Dialog } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { MdSend } from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import ClubsService from '../service/ClubsService';
import RegistrationService from '../service/registrationService'; // Adjust the path as needed
import { getUserEmailFromToken } from '../utils/utils'; // Ensure this function is correctly implemented

const ClubPresident = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [clubDetails, setClubDetails] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const userId = getUserEmailFromToken();

  useEffect(() => {
    fetchClubs();
    fetchRegistrations();
  }, [token]);

  const fetchClubs = async () => {
    try {
      const clubs = await ClubsService.getAllClubs(token);
      const clubsArray = clubs.content || [];
      setClubDetails(clubsArray);
    } catch (error) {
      console.error("Failed to fetch clubs", error);
    }
  };

  const fetchRegistrations = async () => {
    try {
      const response = await RegistrationService.getAllRegistrations(token);
      const fetchedRegistrations = response.data || response.content || [];
      setRegistrations(fetchedRegistrations);
    } catch (error) {
      console.error("Error fetching registrations:", error);
    }
  };

  // Filter registrations based on user ID, accepted status, and specified positions
  const validPositions = ["president", "member", "secretary", "treasurer", "oc"];
  const filteredRegistrations = registrations.filter(
    (reg) =>
      reg.email.toLowerCase() === userId.toLowerCase() &&
      reg.accepted === 1 &&
      validPositions.includes(reg.position.toLowerCase())
  );

  // Filter clubs based on the filtered registrations' club IDs
  const filteredClubs = clubDetails.filter((club) =>
    filteredRegistrations.some((reg) => reg.clubId === club.club_id)
  );

  const handleOpen = () => setOpen(!open);

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
        basePath = ''; // Default base path or handle other cases
    }
    navigate(`${basePath}/club/${club.club_id}`, { state: { club, image: club.club_image } });
  };


  return (
    <div>

     

      <Card className="w-full bg-neutral-900">
        <CardBody>
          <div>
            {filteredClubs.length === 0 ? (
              <Typography color="white" className="text-center">No clubs found.</Typography>
            ) : (
              filteredClubs.map((club) => (
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
                      src={club.club_image || 'path/to/default-image.jpg'}
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
              ))
            )}
          </div>
        </CardBody>
      </Card>

      {/* Leave Club Modal */}
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
    </div>
  );
};

export default ClubPresident;
