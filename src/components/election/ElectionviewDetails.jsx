// C:\wamp64\www\Eventix\src\components\election\ElectionviewDetails.jsx

import React, { useState } from "react";
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import Customswitch from "../Customswitch";

const ElectionviewDetails = ({ clubName, electionId }) => {
  const [value, setValue] = useState(false);

  const elections = [
    {
      id: "1",
      desc: "Club Board of 24/25",
      applicationDate: "05.06.2024-09.06.2024",
      votingDate: "10.06.2024-15.06.2024",
    },
  ];

  return (
    <>
      <Card className="w-full bg-neutral-900 mt-4">
        <CardBody>
          {elections.map(({ id, desc, applicationDate, votingDate }) => (
            <div key={id} className="p-4 bg-[#1E1E1E] rounded-xl mb-4">
              <Typography className="text-center text-[#AEC90A] p-5" variant="h5">
                {desc}
              </Typography>
              <div className="flex items-center justify-between mt-4">
                <Typography className="text-[#AEC90A]" variant="h6">
                  Application Open Duration:
                </Typography>
                <Typography className="text-white" variant="h6">
                  {applicationDate}
                </Typography>
                <Customswitch isOn={value} handleToggle={() => setValue(!value)} />
              </div>
              <div className="flex items-center justify-between mt-4">
                <Typography className="text-[#AEC90A]" variant="h6">
                  Voting Open Duration:
                </Typography>
                <Typography className="text-white" variant="h6">
                  {votingDate}
                </Typography>
                <Customswitch isOn={value} handleToggle={() => setValue(!value)} />
              </div>
              <div className="flex items-center justify-end mt-4 gap-4">
                <Button variant="gradient" className="bg-[#AEC90A] text-black p-1">
                  <FaRegEdit className="w-6 h-6" />
                </Button>
                <Button variant="gradient" className="bg-[#FF4B4B] text-black p-1">
                  <FaTrashAlt className="w-6 h-6" />
                </Button>
              </div>
            </div>
          ))}
        </CardBody>
      </Card>
    </>
  );
};

export default ElectionviewDetails;
