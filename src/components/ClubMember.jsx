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
    /*{
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
    },*/
    {
      id: "1",
      name: "Rotaract Club of UCSC",
      reg_status: "yes",
      description: "The Rotaract Club of UCSC, part of Rotary International District 3220, empowers youth to enact positive change locally and globally.",
      image: "/src/assets/clubs/rotaract.png",
      sname: "rotract",
  },
  {
      id: "2",
      name: "ACM Student Chapter",
      reg_status: "no",
      description: "The ACM Student Chapter aims to advance computing as a science and profession. Activities include coding competitions, guest lectures, and career development workshops.",
      image: "/src/assets/clubs/acm.png",
      sname: "acm",
  },
  {
      id: "3",
      name: "Pahasara Club (Innovation and Creativity)",
      reg_status: "yes",
      description: "The Pahasara Club offers a platform for photography enthusiasts to enhance their skills through workshops, photo walks, and exhibitions.",
      image: "/src/assets/clubs/pahasara1.png",
  },
  {
      id: "4",
      name: "ISACA Student Group",
      reg_status: "no",
      description: "The Debate Society aims to improve public speaking and critical thinking skills through regular debates, public speaking workshops, and competitions.",
      image: "/src/assets/clubs/isaca1.png",
  },
  {
      id: "5",
      name: "(IEEE WIE) IEEE Women in Engineering",
      reg_status: "yes",
      description: "The IEEE Women in Engineering (WIE) Student Branch at the University of Colombo School of Computing strives to enhance women’s participation and empowerment in electrical and electronic engineering.",
      image: "/src/assets/clubs/wie.png",
  },
  {
      id: "6",
      name: "IEEE Student Chapter",
      reg_status: "yes",
      description: "The IEEE Student Chapter promotes the advancement of technology. Members can participate in technical seminars, project exhibitions, and networking events.",
      image: "/src/assets/clubs/ieee.png",
  },
  {
      id: "7",
      name: "Mechatronic Society Of UCSC",
      reg_status: "no",
      description: "The Mechatronic Society Of UCSC focuses on sustainability and environmental awareness. Activities include clean-up drives, tree planting, and educational workshops.",
      image: "/src/assets/clubs/ms.png",
  },
  {
      id: "8",
      name: "Women in Cybersecurity",
      reg_status: "no",
      description: "This club is part of the Institute of Electrical and Electronics Engineers (IEEE) and focuses on all aspects of computer science and engineering.",
      image: "/src/assets/clubs/wicys.png",
  },
  {
      id: "9",
      name: "Rekha",
      reg_status: "yes",
      description: "Get the opportunity to learn from industry professionals, prepare for certifications like CISA and CRISC and and network with professionals in the field.",
      image: "/src/assets/clubs/rekha.png",
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
