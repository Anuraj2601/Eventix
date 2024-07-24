import React, { useState } from "react";
import { Card, CardBody, Typography, Avatar, Textarea } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { MdSend } from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";
import { Dialog } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

import rotaractImage from '../assets/clubs/rotaract.png';
import acmImage from '../assets/clubs/acm.png';
import pahasaraImage from '../assets/clubs/pahasara1.png';
import isacaImage from '../assets/clubs/isaca1.png';
import wieImage from '../assets/clubs/wie.png';
import ieeeImage from '../assets/clubs/ieee.png';
import msImage from '../assets/clubs/ms.png';
import wicysImage from '../assets/clubs/wicys.png';
import rekhaImage from '../assets/clubs/rekha.png';


const ClubPresident = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen((cur) => !cur);

  const getClubDetails = (club)  => {
    let basePath;
    switch (true) {
        case location.pathname.startsWith('/president'):
            basePath = '/president';
            break;
        case location.pathname.startsWith('/oc'):
            basePath = '/oc';
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
    navigate(`${basePath}/club/${club.sname}`, { state: { club, image: club.image } });
};

  const clubs = [
    {
      id: "6",
      name: "IEEE Student Chapter",
      reg_status: "yes",
      description: "The IEEE Student Chapter promotes the advancement of technology. Members can participate in technical seminars, project exhibitions, and networking events.",
      image: ieeeImage,
      sname: "ieee",
  },
    {
        id: "1",
        name: "Rotaract Club of UCSC",
        reg_status: "yes",
        description: "The Rotaract Club of UCSC, part of Rotary International District 3220, empowers youth to enact positive change locally and globally.",
        image: rotaractImage,
        sname: "rotract",
    },
    {
        id: "2",
        name: "ACM Student Chapter",
        reg_status: "yes",
        description: "The ACM Student Chapter aims to advance computing as a science and profession. Activities include coding competitions, guest lectures, and career development workshops.",
        image: acmImage,
        sname: "acm",
    },
    {
        id: "3",
        name: "Pahasara Club (Innovation and Creativity)",
        reg_status: "yes",
        description: "The Pahasara Club offers a platform for photography enthusiasts to enhance their skills through workshops, photo walks, and exhibitions.",
        image: pahasaraImage,
        sname: "pahasara",
    },
    {
        id: "4",
        name: "ISACA Student Group",
        reg_status: "yes",
        description: "The Debate Society aims to improve public speaking and critical thinking skills through regular debates, public speaking workshops, and competitions.",
        image: isacaImage,
        sname: "isaca",
    },
    {
        id: "5",
        name: "(IEEE WIE) IEEE Women in Engineering",
        reg_status: "yes",
        description: "The IEEE Women in Engineering (WIE) Student Branch at the University of Colombo School of Computing strives to enhance women’s participation and empowerment in electrical and electronic engineering.",
        image: wieImage,
        sname: "wie",
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
                className="flex items-center justify-between p-4 bg-[#1E1E1E] rounded-xl mb-4 " style={{ 
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' 
                }}
              >
                <div className="flex items-center gap-x-3 custom-3d-shadow">
                  <Avatar
                    size="sm"
                    src={club.image}
                    alt={club.name}
                    className=" rounded-md w-20 h-10 custom-card" style={{ 
                      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' 
                    }}
                  />
                  <Typography color="white" className="font-medium">
                    {club.name}
                  </Typography>
                </div>
                <div className="flex gap-4">
                  <Button
                    className="bg-white pt-1 pb-1 pl-5 pr-5 rounded-2xl text-black font-medium text-sm custom-card"
                    onClick={handleOpen}
                  >
                    Leave
                  </Button>
                  <Button
                    className={` custom-card pt-1 pb-1 pl-5 pr-5 rounded-2xl font-medium text-sm ${club.reg_status === 'yes' ? 'bg-[#AEC90A] text-black' : 'bg-[#AEC90A80] text-[#1E1E1E] cursor-not-allowed'}`}
                    onClick={() => getClubDetails(club)}
                    disabled={club.reg_status !== 'yes'}
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
