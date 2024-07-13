import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Card,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { FaPlus } from "react-icons/fa";
import EditDeleteButton from '../EditDeleteButton';
import Customswitch from "../Customswitch";

const ElectionDetails = ({ clubName, electionId }) => {
  const [value, setValue] = useState(false);

  const elections = [
    {
      id: "1",
      desc: "Club Board of 24/25",
      applicationDate: "05.06.2024-09.06.2024",
      votingDate: "10.06.2024-15.06.2024",
    },
    {
      id: "2",
      desc: "Club Board of 23/24",
      applicationDate: "05.06.2024-09.06.2024",
      votingDate: "10.06.2024-15.06.2024",
    },
  ];

  const handleEdit = (id) => {
    // Add your edit handling logic here
  };

  const handleDelete = (id) => {
    // Add your delete handling logic here
  };

  return (
    <>
      <Button
        className="flex items-center gap-2 bg-[#AEC90A] h-10 ml-auto mt-0 pt-0 pb-1 pl-5 pr-5 rounded-2xl text-black font-medium text-sm"
        variant="gradient"
      >
        <FaPlus />
        New Election
      </Button>
      <Card className="w-full bg-neutral-900 mt-4">
        <CardBody>
          <div className="grid grid-cols-6 gap-4 p-1 mb-2 text-white">
            <div className="col-span-2 flex justify-center items-center">
              Election for
            </div>
            <div className="col-span-2 flex justify-center items-center">
              Candidate Applications
            </div>
            <div className="col-span-2 flex justify-center items-center">
              Voting
            </div>
          </div>
          <div>
            {elections.map(({ id, desc, applicationDate, votingDate }) => (
              <div
                key={id}
                className="grid grid-cols-6 gap-4 items-center p-4 bg-[#1E1E1E] rounded-xl mb-2"
              >
                <div className="col-span-2 flex justify-center items-center">
                  <Typography color="white" variant="h6">
                    {desc}
                  </Typography>
                </div>
                <div className="col-span-2 flex justify-center items-center">
                  <Typography className="text-[#AEC90A] inline-block" variant="h6">
                    {applicationDate}
                    <div className="flex gap-4 text-white mt-1">
                      <div>Applications</div>
                      <div>
                        <Customswitch isOn={value} handleToggle={() => setValue(!value)} />
                      </div>
                    </div>
                  </Typography>
                </div>
                <div className="col-span-2 flex justify-center items-center">
                  <Typography className="text-[#AEC90A] inline-block" variant="h6">
                    {votingDate}
                    <div className="flex gap-4 text-white mt-1">
                      <div>Votings</div>
                      <div>
                        <Customswitch isOn={value} handleToggle={() => setValue(!value)} />
                      </div>
                    </div>
                  </Typography>
                </div>
                <div className="col-span-6 flex justify-center items-center gap-2">
                  <EditDeleteButton
                    onEdit={() => handleEdit(id)}
                    onDelete={() => handleDelete(id)}
                  />
                  <Link to={`/club/election`}>
                    <Button variant="gradient" className="bg-[#AEC90A] text-black p-1 inline-block">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default ElectionDetails;
