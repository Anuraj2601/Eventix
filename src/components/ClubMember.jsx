import React, { useState } from "react";
import {
  Card,
  CardBody,
  Typography,
  Avatar,
  Textarea,
} from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { MdSend } from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";
import { Dialog } from "@material-tailwind/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const ClubMember = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);


  /*const clubs = [
    {
      id: "1",
      name: "IEEE Student Group",
      sname: "ieee",
      image: "../src/assets/clubs/ieee.png",
      
    },
    {
      id: "2",
      name: "ISACA Student Group",
      sname: "isaca",
      image: "../src/assets/clubs/isaca.png",
    },
    {
      id: "3",
      name: "Gavel Club (Public Speaking and Leadership)",
      sname: "gavel",
      image: "../src/assets/clubs/gavel.png",
    },
    {
      id: "4",
      name: "Pahasara Club (Innovation and Creativity)",
      sname: "pahasara",
      image: "../src/assets/clubs/pahasara.png",
    },
    {
      id: "5",
      name: "Rotaract Club of UCSC",
      sname: "rotaract",
      image: "../src/assets/clubs/rotaract.png",
    },
    {
        id: "6",
        name: "Pahasara Club (Innovation and Creativity)",
        sname: "pahasara",
        image: "../src/assets/clubs/pahasara.png",
    },
    {
        id: "7",
        name: "Gavel Club (Public Speaking and Leadership)",
        sname: "gavel",
        image: "../src/assets/clubs/gavel.png",
    },
    {
        id: "8",
        name: "Pahasara Club (Innovation and Creativity)",
        sname: "pahasara",
        image: "../src/assets/clubs/pahasara.png",
    },
      
   
  ];*/

  const clubs = [
    {
      id: "1",
      name: "IEEE Student Group",
      sname: "ieee",
      image: "/src/assets/clubs/ieee.png",
    },
    {
      id: "2",
      name: "ISACA Student Group",
      sname: "isaca",
      image: "/src/assets/clubs/isaca.png",
    },
    {
      id: "3",
      name: "Gavel Club (Public Speaking and Leadership)",
      sname: "gavel",
      image: "/src/assets/clubs/gavel.png",
    },
    {
      id: "4",
      name: "Pahasara Club (Innovation and Creativity)",
      sname: "pahasara",
      image: "/src/assets/clubs/pahasara.png",
    },
    {
      id: "5",
      name: "Rotaract Club of UCSC",
      sname: "rotaract",
      image: "/src/assets/clubs/rotaract.png",
    },
    // Add other clubs similarly
  ];
  


  const getClubDetails = (club) => {

    if(location.pathname === "/member"){
      navigate(`/member/clubs/${club.sname}`, { state: { club } });
    }else{
      navigate(`/clubs/${club.sname}`, { state: { club } });
    }  
    
  };


  return (
    <>
      <Card className="w-full bg-neutral-900">
        <CardBody>
          <div className="">

            {clubs.map((club, index) => (

              <div
                key={index}
                className="flex items-center justify-between p-4 bg-[#1E1E1E] rounded-xl mb-4"

                
              >
                <div className="flex items-center gap-x-3">
                  <Avatar
                    size="sm"
                    src={club.image}
                    alt={club.name}
                    className="border-2 border-white rounded-md w-10 h-10"
                  />
                  <div>
                    <Typography color="white" className="font-medium">
                      {club.name}
                    </Typography>
                  </div>
                </div>
                <div className="flex flex-row gap-4">
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

export default ClubMember;
