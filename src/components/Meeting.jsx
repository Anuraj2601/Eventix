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
import { Dialog, Input, Chip } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import EditDeleteButton from './EditDeleteButton';

const Meeting = () => {
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
      desc: "Regarding next club board meeting",
      date: "05.06.2024",
      status: "Online",
    },
    {
      id: "2",
      desc: "Regarding next club board meeting",
      date: "05.06.2024",
      status: "Physical",
    },
    {
      id: "3",
      desc: "Regarding next club board meeting",
      date: "05.06.2024",
      status: "Online",
    },
  ];

  const handleEdit = (id) => {
    console.log(`Edit meeting with id: ${id}`);
    // Your edit logic here
  };

  const handleDelete = (id) => {
    console.log(`Delete meeting with id: ${id}`);
    // Your delete logic here
  };

  return (
    <>
      <Button
        className="flex items-center gap-2 bg-[#AEC90A] h-10 mr-0 mt-2 ml-[950px] pt-1 pb-1 pl-5 pr-5 rounded-2xl text-black font-medium text-sm"
        variant="gradient"
      >
        <FaPlus />
        New Meeting
      </Button>
      <Card className="w-full bg-neutral-900">
        <CardBody>
          <div className="">
            {meetings.map(({ id, desc, date, status }, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-[#1E1E1E] rounded-xl mb-4"
              >
                <div className="flex items-center text-[16px] gap-x-72">
                  <div>
                    <Typography className="text-white font-normal " variant="h6">
                      {desc}
                    </Typography>
                  </div>
                  <div>
                    <Typography className="text-white font-normal" variant="h6">
                      {date}
                    </Typography>
                  </div>
                  <div>
                    <Typography className="text-white" variant="h6">
                      {status === "Online" ? (
                        <Chip
                          variant="ghost"
                          color="green"
                          size="sm"
                          className="font-normal"
                          value="Online"
                          icon={
                            <span className="mx-auto mt-2 block h-2 w-2 rounded-full bg-[#00DE3E] content-['']" />
                          }
                        />
                      ) : (
                        <Chip
                          variant="ghost"
                          className="font-normal"
                          color="red"
                          size="sm"
                          value="Physical"
                          icon={
                            <span className="mx-auto mt-2 block h-2 w-2 rounded-full bg-[#FF0000] content-['']" />
                          }
                        />
                      )}
                    </Typography>
                  </div>
                </div>
                <div className="flex flex-row gap-4">
                  <EditDeleteButton
                    onEdit={() => handleEdit(id)}
                    onDelete={() => handleDelete(id)}
                  />
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
          </CardBody>
        </Card>
      </Dialog>
    </>
  );
};

export default Meeting;
