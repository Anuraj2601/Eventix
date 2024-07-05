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

import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";

const ElectionDetails = () => {
    
 
  const navigator = useNavigate();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  const getClubDetails = (sname) => {
    navigator(`/club/${sname}`);

    /* history.push(`/club/${sname}`, { name, image }); */

    //console.log(name);
  };

  const elections = [
    {
      id: "1",
      desc: "Club Board of 24/25",
      applicationDate: "05.06.2024-09.06.2024",
      votingDate: "10.06.2024-15.06.2024",
    },
    {
      id: "2",
      desc: "Club Board of 24/25",
      applicationDate: "05.06.2024-09.06.2024",
      votingDate: "10.06.2024-15.06.2024",
    },
  ];

  return (
    <>
      <Button
        className="flex items-center gap-2 bg-[#AEC90A] h-10 mr-0 mt-0 ml-[950px] pt-0 pb-1 pl-5 pr-5 rounded-2xl text-black font-medium text-sm"
        variant="gradient"
      >
        <FaPlus />
        New Election
      </Button>
      <Card className="w-full bg-neutral-900">
        <CardBody>
        <div className="flex items-center justify-between p-1 mb-2">
            <div className="flex items-center gap-[310px]">
              <div></div>
              <div>Applications</div>
              <div>Voting</div>
              <div></div>
             
            </div>
          </div>
          <div className="">
            {elections.map(({ desc, applicationDate, votingDate }, index) => (
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
                      {applicationDate}
                    </Typography>
                  </div>
                  <div>
                    <Typography className="text-[#AEC90A]" variant="h6">
                      {votingDate}
                    </Typography>
                  </div>
                  <div>
                    <Typography className="text-[#AEC90A]" variant="h6">
                      <a href="" className="px-3">
                        <FaRegEdit className="text-[#AEC90A] hover:text-white inline-block w-6 h-6"></FaRegEdit>
                        {/* Meeting */}
                      </a>
                    </Typography>
                  </div>
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
    </>
  );
};

export default ElectionDetails;


