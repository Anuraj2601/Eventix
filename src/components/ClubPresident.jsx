import React, { useState } from "react";
import { Card, CardBody, Typography, Avatar, Textarea } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { MdSend } from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";
import { Dialog } from "@material-tailwind/react";
import { useLocation, useNavigate } from "react-router-dom";

const ClubPresident = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen((cur) => !cur);

  

  const getClubDetails = (club) => {
    const basePath = location.pathname.includes("/president") ? "/club" : "/club";
    navigate(`${basePath}/${club.sname}`, { state: { club } });
  };

  const clubs = [
    {
        id: "1",
        name: "Rotaract Club of UCSC",
        sname: "rotract",
        image: "../src/assets/clubs/rotaract.png",
    },
    {
        id: "2",
        name: "ACM Student Chapter",
        sname: "acm",
        image: "../src/assets/clubs/acm.png",
    },
    {
        id: "3",
        name: "Pahasara Club (Innovation and Creativity)",
        sname: "pahasara",
        image: "../src/assets/clubs/pahasara1.png",
    },
    {
        id: "4",
        name: "ISACA Student Group",
        sname: "isaca",
        image: "../src/assets/clubs/isaca1.png",
    },
    {
        id: "5",
        name: "(IEEE WIE) IEEE Women in Engineering",
        sname: "wie",
        image: "../src/assets/clubs/wie.png",
    },
    {
        id: "6",
        name: "IEEE Student Chapter",
        sname: "ieee",
        image: "../src/assets/clubs/ieee.png",
    },
    {
        id: "7",
        name: "Mechatronic Society Of UCSC",
        sname: "ms",
        image: "../src/assets/clubs/ms.png",
    },
    {
        id: "8",
        name: "Women in Cybersecurity",
        sname: "wicys",
        image: "../src/assets/clubs/wicys.png",
    },

    {
        id: "9",
        name: "Rekha",
        sname: "rekha",
        image: "../src/assets/clubs/rekha.png",
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

export default ClubPresident;
