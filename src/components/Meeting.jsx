import React, { useState } from "react";
import { Card, CardBody, Typography, Chip } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import EditDeleteButton from './EditDeleteButton';
import { FaEye } from 'react-icons/fa'; // Import view icon

const Meeting = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  const meetings = [
    {
      id: "1",
      desc: "Regarding next club board election",
      date: "05.06.2024",
      time: "14:00",
      status: "Online",
      audience: "Club Members"
    },
    {
      id: "2",
      desc: "Regarding club membership update",
      date: "08.06.2024",
      time: "15:30",
      status: "Physical",
      audience: "Everyone"
    },
    {
      id: "3",
      desc: "Discussion on upcoming events",
      date: "10.06.2024",
      time: "12:00",
      status: "Online",
      audience: "Club Board"
    },
  ];

  return (
    <>
      <Button
        className="flex items-center gap-2 bg-[#AEC90A] mr-0 mt-2 font-bold rounded-full text-black ml-[950px]"
      >
        New Meeting
      </Button>
      <Card className="w-full bg-neutral-900">
        <CardBody>
          <div className="">
            {meetings.map(({ id, desc, date, time, status, audience }) => (
              <div
                key={id}
                className="flex items-center justify-between p-4 bg-[#1E1E1E] rounded-xl mb-4"
              >
                <div className="flex flex-col w-1/4">
                  <Typography className="text-white font-normal" variant="h6">
                    {desc}
                  </Typography>
                  <div className="flex items-center gap-4 mt-2">
                    <Typography className="text-[#AEC90A] font-normal" variant="h6">
                      Date: {date}
                    </Typography>
                    <Typography className="text-[#AEC90A] font-normal" variant="h6">
                      Time: {time}
                    </Typography>
                  </div>
                </div>
                <div className="flex flex-col w-1/4 items-center">
                  {status === "Online" ? (
                    <Chip
                      variant="ghost"
                      color="green"
                      size="sm"
                      className="font-normal mb-2"
                      value="Online"
                      icon={
                        <span className="mx-auto mt-2 block h-2 w-2 rounded-full bg-[#00DE3E] content-['']" />
                      }
                    />
                  ) : (
                    <Chip
                      variant="ghost"
                      color="red"
                      size="sm"
                      className="font-normal mb-2"
                      value="Physical"
                      icon={
                        <span className="mx-auto mt-2 block h-2 w-2 rounded-full bg-[#FF0000] content-['']" />
                      }
                    />
                  )}
                </div>
                <div className="flex flex-col w-1/4 items-center">
                  <div className="flex items-center gap-2">
                    <FaEye className="text-white" />
                    <Typography className="text-white font-normal">
                      {audience}
                    </Typography>
                  </div>
                </div>
                <div className="flex items-center gap-4 w-1/4 justify-end">
                  <Button
                    color="gray"
                    className="text-gray-400 shadow-black shadow-md"
                    disabled={status !== "Online"}
                  >
                    Join
                  </Button>
                  <div className="flex items-center gap-4">
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
    </>
  );
};

export default Meeting;
