import React, { useState } from "react";
import {
  Card,
  CardBody,
  Typography,
  Textarea,
  Button,
  Dialog,
} from "@material-tailwind/react";
import { MdSend } from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import EditDeleteButton from './EditDeleteButton';
import { FaEye } from "react-icons/fa";

const Announcement = () => {
  const navigator = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  const getClubDetails = (sname) => {
    navigator(`/club/${sname}`);
  };

  const meetings = [
    {
      id: "1",
      desc: "The Board elections of term 24/25 will be commenced from period 05.06.2024 - 09.06.2024. All the club members are invited to participate in the voting.",
      date: "05.06.2024",
      to: "Club Members",
    },
    {
      id: "2",
      desc: "Join us for our annual club picnic on 12.08.2024 at Central Park. Don't miss out on the fun activities and delicious food!",
      date: "12.08.2024",
      to: "Everyone",
    },
    {
      id: "3",
      desc: "Attention members: Our next club meeting will be held on 18.07.2024. Please mark your calendars and be on time!",
      date: "18.07.2024",
      to: "Board",
    },
    {
      id: "4",
      desc: "Exciting news! We're launching a new mentorship program. Stay tuned for more details on how you can participate.",
      date: "Coming soon",
      to: "Club Members",
    },
  ];

  return (
    <>
      <Button
        className="flex items-center gap-2 bg-[#AEC90A] ml-auto mt-0 rounded-full text-black font-bold ml-[950px]"
      >
        New Announcement
      </Button>
      <Card className="w-full bg-neutral-900">
        <CardBody>
          <div>
            {meetings.map(({ desc, date, to, id }, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-[#1E1E1E] rounded-xl mb-4"
              >
                <div className="flex flex-col w-full">
                  <div className="flex flex-col mb-2">
                    <Typography color="white" variant="h6">
                      {desc.split('\n').map((line, i) => (
                        <React.Fragment key={i}>
                          {line}
                          <br />
                        </React.Fragment>
                      ))}
                    </Typography>
                  </div>
                  <div className="flex items-center justify-between">
                    <Typography className="text-[#AEC90A]" variant="h6">
                      {date}
                    </Typography>
                    <div className="flex items-center">
                      <FaEye className="text-[#AEC90A] mr-2" />
                      <Typography className="text-white">{to}</Typography>
                    </div>
                    <EditDeleteButton
                      onEdit={() => handleEdit(id)}
                      onDelete={() => handleDelete(id)}
                    />
                  </div>
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
              Why are you Leaving? Let us know your problem.
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

export default Announcement;
