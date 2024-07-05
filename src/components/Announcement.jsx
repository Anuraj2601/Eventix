import React, { useState } from "react";
import {
  Card,
  CardBody,
  Typography,
  Avatar,
  Textarea,
  Badge,
} from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { MdSend } from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";
// import LeaveModal from './LeaveModal';
import { Dialog, Input } from "@material-tailwind/react";
import {Chip} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";

const Announcement = () => {
  const navigator = useNavigate();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  const getClubDetails = (sname) => {
    navigator(`/club/${sname}`);

    /* history.push(`/club/${sname}`, { name, image }); */

    //console.log(name);
  };

  const meetings = [
    {
      id: "1",
      desc: "The Board elections of term 24/25 will be commenced from period   05.06.2024 - 09.06.2024, all the club members are invited to participate in the voting",
      date: "05.06.2024",
      
    },
    {
      id: "2",
      desc: "The Board elections of term 24/25 will be commenced from period   05.06.2024 - 09.06.2024, all the club members are invited to participate in the voting",
      date: "05.06.2024",
      
    },
    
  ];

  return (
    <>
    <Button
        className="flex items-center gap-2 bg-[#AEC90A] h-10 mr-0 mt-2 ml-[950px] pt-1 pb-1 pl-5 pr-5 rounded-2xl text-black font-medium text-sm" variant="gradient"
        
      >
        <FaPlus />
        New Announcement
      </Button>
      <Card className="w-full bg-neutral-900">
        <CardBody>
          <div className="">
            {meetings.map(({ desc, date }, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-[#1E1E1E] rounded-xl mb-4"
              >
                <div className="flex items-center gap-x-40">
                  {/* <Avatar size="sm" src={image} alt={name} className='border-2 border-white rounded-md w-10 h-10'/> */}
                  <div>
                    <Typography color="blue-gray" variant="h6">
                      {desc}
                    </Typography>
                  </div>
                  <div>
                    <Typography className="text-[#AEC90A]" variant="h6">
                      {date}
                    </Typography>
                  </div>
                 
                </div>
                <div className="flex flex-row gap-4">
                 {/*  <Button
                    className="bg-white pt-1 pb-1 pl-5 pr-5 rounded-2xl text-black font-medium text-sm"
                    onClick={handleOpen}
                  >
                    Leave
                  </Button> */}
                 {/*  <Button
                    className="bg-[#AEC90A] pt-1 pb-1 pl-5 pr-5 rounded-2xl text-black font-medium text-sm"
                    onClick={() => getClubDetails(sname)}
                  >
                    {status == 'Online' ? 'Join' : 'GetQR' }
                  </Button> */}

                  {/* {console.log(isModalOpen)} */}
                </div>
              </div>
            ))}
          </div>
          {/* {open && <LeaveModal open={open} handleOpen={handleOpen}/>} */}
          {/* <LeaveModal open={open} handleOpen={handleOpen}>
                  fancy modal
                </LeaveModal> */}
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
              Why are you Leaving, Let us know your problem ?
            </Typography>

            <div className="relative">
              <Textarea
                size="lg"
                className="h-16 border-2 bg-slate-100"
                placeholder="Type your reason"
                /* variant="label-hidden" */ required
              />
              <MdSend className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 cursor-pointer" />
            </div>

            {/* <Input label="Type your reason" size="lg" className='relative'/>
              <MdSend className='absolute '/> */}
          </CardBody>
        </Card>
      </Dialog>
    </>
  );
};

export default Announcement;
