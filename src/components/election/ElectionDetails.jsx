import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Card,
  CardBody,
  Typography,
  Switch,
  Button,
} from "@material-tailwind/react";
import { FaPlus, FaRegEdit } from "react-icons/fa";

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
      desc: "Club Board of 24/25",
      applicationDate: "05.06.2024-09.06.2024",
      votingDate: "10.06.2024-15.06.2024",
    },
  ];

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
          <div className="flex items-center justify-between p-1 mb-2 text-white">
            <div className="flex items-center gap-[310px]">
              <div></div>
              <div>Applications</div>
              <div>Voting</div>
              <div></div>
            </div>
          </div>
          <div>
            {elections.map(({ id, desc, applicationDate, votingDate }) => (
              <div
                key={id}
                className="flex items-center justify-between p-4 bg-[#1E1E1E] rounded-xl mb-4"
              >
                <div className="flex items-center gap-x-40">
                  <div>
                    <Typography color="white" variant="h6">
                      {desc}
                    </Typography>
                  </div>
                  <div>
                    <Typography className="text-[#AEC90A]" variant="h6">
                      {applicationDate}
                    </Typography>
                    <Typography className="flex gap-4 text-white" variant="h6">
                      <div>Candidate</div>
                      <div>
                        <Switch
                          isOn={value}
                          handleToggle={() => setValue(!value)}
                        />
                      </div>
                    </Typography>
                  </div>
                  <div>
                    <Typography className="text-[#AEC90A]" variant="h6">
                      {votingDate}
                    </Typography>
                    <Typography className="text-white" variant="h6">
                      Voting
                    </Typography>
                  </div>
                  <div className="flex items-center gap-2">
                    <Typography className="text-[#AEC90A]" variant="h6">
                      <FaRegEdit className="text-[#AEC90A] hover:text-white inline-block w-6 h-6" />
                    </Typography>
                    <Link
                      to={`/club/election`} // Navigate dynamically based on URL
                    >
                      <Button
                        variant="gradient"
                        className="bg-[#AEC90A] text-black p-1"
                      >
                        View Details
                      </Button>
                    </Link>
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

export default ElectionDetails;
