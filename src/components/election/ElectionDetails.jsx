import React, { useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import {
  Card,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import EditDeleteButton from '../EditDeleteButton';
import Customswitch from "../Customswitch";
import { useNavigate } from 'react-router-dom';

const ElectionDetails = ({ clubName, electionId }) => {
  const [value, setValue] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  // Determine the target path based on the current path
  let targetPath = '';

if (location.pathname.startsWith('/president')) {
  targetPath = '/president/club/election';
} else if (location.pathname.startsWith('/member')) {
  targetPath = '/member/club/election';
} else if (location.pathname.startsWith('/oc')) {
  targetPath = '/oc/club/election';
} else if (location.pathname.startsWith('/secretary')) {
  targetPath = '/secretary/club/election';
}


  // Check if the current path is either '/president' or '/secretary'
  const isEditable = currentPath.startsWith('/president') || currentPath.startsWith('/secretary');

  const navigate = useNavigate();

  const events = [
    {
      joinLink1: "/president/club/election/add",     
    },
  ];

  const navigateToForm = (link) => {
    navigate(link);
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
      desc: "Club Board of 23/24",
      applicationDate: "05.06.2024-09.06.2024",
      votingDate: "10.06.2023-15.06.2023",
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
      {isEditable && (
        <Button
          onClick={() => navigateToForm(events[0].joinLink1)}
          className="flex items-center gap-2 bg-[#AEC90A] ml-auto mt-0 rounded-full text-black font-bold ml-[950px]"
        >
          New Election
        </Button>
      )}
      <Card className="w-full bg-neutral-900 mt-4">
        <CardBody>
          <div className="grid grid-cols-6 gap-2 p-1 mb-2 text-white">
            <div className="col-span-2 flex justify-center items-center">
              Election for
            </div>
            <div className="col-span-2 flex justify-center items-center">
              Candidate Applications open
            </div>
            <div className="col-span-1 flex justify-center items-center">
              Votings open
            </div>
          </div>
          <div>
            {elections.map(({ id, desc, applicationDate, votingDate }, index) => (
              <div
                key={id}
                className={`grid grid-cols-6 gap-1 items-center p-5 bg-[#1E1E1E] rounded-xl mb-2 ${index === 1 ? 'opacity-50' : ''}`}  
                style={{ boxShadow: '0 8px 16px rgba(0, 0, 0, 0.8)' }}
              >
                <div className="col-span-2 flex justify-center items-center">
                  <Typography color={index === 1 ? "gray" : "white"} variant="h6">
                    {desc}
                  </Typography>
                </div>
                <div className="col-span-2 flex justify-center items-center">
                  <Typography className={`text-[#AEC90A] inline-block ${index === 1 ? 'text-gray-500' : ''}`} variant="h6">
                    {applicationDate}
                    {isEditable && (
                      <div className={`flex gap-1 text-white mt-1 ${index === 1 ? 'opacity-50' : ''}`}>
                        <div className="whitespace-nowrap">Applications</div>
                        <div>
                          <Customswitch isOn={value} handleToggle={() => setValue(!value)} disabled={index === 1} />
                        </div>
                      </div>
                    )}
                  </Typography>
                </div>
                <div className="col-span-1 flex justify-center items-center">
                  <Typography className={`text-[#AEC90A] inline-block ${index === 1 ? 'text-gray-500' : ''}`} variant="h6">
                    {votingDate}
                    {isEditable && (
                      <div className={`flex gap-1 text-white mt-1 ${index === 1 ? 'opacity-50' : ''}`}>
                        <div className="whitespace-nowrap">Votings</div>
                        <div>
                          <Customswitch isOn={value} handleToggle={() => setValue(!value)} disabled={index === 1} />
                        </div>
                      </div>
                    )}
                  </Typography>
                </div>
                <div className="col-span-6 flex justify-end items-center gap-2 p-5">
                  {isEditable && (
                    <EditDeleteButton
                      onEdit={() => handleEdit(id)}
                      onDelete={() => handleDelete(id)}
                      disabled={index === 1}
                    />
                  )}
                <Link to={targetPath}>
  <Button variant="gradient" className="bg-[#AEC90A] rounded-full text-black p-2 inline-block">
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
