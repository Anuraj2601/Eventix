import React, { useState } from "react";
import { Card, CardBody, Typography, Avatar, Textarea } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { MdSend } from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";
import { Dialog } from "@material-tailwind/react";
import { useLocation, useNavigate } from "react-router-dom";

// Import images with correct paths
import rotaractImage from "../../assets/clubs/rotaract.png";
import acmImage from "../../assets/clubs/acm.png";
import pahasaraImage from "../../assets/clubs/pahasara1.png";
import isacaImage from "../../assets/clubs/isaca1.png";
import wieImage from "../../assets/clubs/wie.png";
import ieeeImage from "../../assets/clubs/ieee.png";
import msImage from "../../assets/clubs/ms.png";
import wicysImage from "../../assets/clubs/wicys.png";
import rekhaImage from "../../assets/clubs/rekha.png";

const ClubSecretary = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen((cur) => !cur);

  const getClubDetails = (club) => {
    // Assuming the ClubDetails page is at the path `/club/:name`
    navigate(`/secretary/club/${club.name}`, { state: { club } });
  };

  const clubs = [
    {
        id: "1",
        name: "Rotaract Club of UCSC",
        sname: "rotract",
        image: rotaractImage,
    },
    {
        id: "2",
        name: "ACM Student Chapter",
        sname: "acm",
        image: acmImage,
    },
    {
        id: "3",
        name: "Pahasara Club (Innovation and Creativity)",
        sname: "pahasara",
        image: pahasaraImage,
    },
    {
        id: "4",
        name: "ISACA Student Group",
        sname: "isaca",
        image: isacaImage,
    },
    {
        id: "5",
        name: "(IEEE WIE) IEEE Women in Engineering",
        sname: "wie",
        image: wieImage,
    },
    {
        id: "6",
        name: "IEEE Student Chapter",
        sname: "ieee",
        image: ieeeImage,
    },
   
  ];

  return (
    <>
      <Card className="w-full bg-neutral-900">
        <CardBody>
          <div>
            {clubs.map((club) => (
              <div
                key={club.id}
                className="flex items-center justify-between p-4 bg-[#1E1E1E] rounded-xl mb-4"
              >
                <div className="flex items-center gap-x-3">
                  <Avatar
                    size="sm"
                    src={club.image}
                    alt={club.name}
                    className="border-2 border-white rounded-md w-20 h-10"
                  />
                  <Typography color="white" className="font-medium">
                    {club.name}
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
                    className="bg-[#AEC90A] pt-1 pb-1 pl-5 pr-5 rounded-2xl text-black font-medium text-sm"
                    onClick={() => getClubDetails(club)}
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
        className="bg-transparent w-screen h-screen bg-opacity-60 opacity-0 backdrop-blur-sm transition-opacity duration-200 flex items-center"
      >
        <Card className="mx-auto w-full max-w-[24rem] p-3">
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
              Why are you Leaving, Let us know your problem?
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

export default ClubSecretary;
