import React, { useEffect, useState } from "react";
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
import { FaPlus } from "react-icons/fa6";
import ElectionService from "../../service/ElectionService";

const ElectionDetails = ({ clubName, electionId }) => {
  const [value, setValue] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  // Determine the target path based on the current path
  let targetPath = '';

  if (currentPath.startsWith('/president')) {
    targetPath = '/president/club/election';
  } else if (currentPath.startsWith('/member')) {
    targetPath = '/member/club/election';
  } else if (currentPath.startsWith('/oc')) {
    targetPath = '/oc/club/election';
  } else if (currentPath.startsWith('/secretary')) {
    targetPath = '/secretary/club/election';
  }

  // Check if the current path is either '/oc' or '/member'
  const isOcOrMember = currentPath.startsWith('/oc') || currentPath.startsWith('/member') || currentPath.startsWith('/secretary');
  const isEditable = currentPath.startsWith('/president') ;

  const navigateToForm = (link) => {
    let finalLink = link;

    if (currentPath.startsWith('/oc')) {
        if (link === "/final-candidates") {
            finalLink = "/oc/club/finalists";
        } else if (link === "/voting") {
            finalLink = "/oc/club/voting";
        } else if (link === "/apply") {
            finalLink = "/oc/election/apply";
        }
    } else if (currentPath.startsWith('/member')) {
        if (link === "/final-candidates") {
            finalLink = "/member/club/finalists";
        } else if (link === "/voting") {
            finalLink = "/member/club/voting";
        } else if (link === "/apply") {
            finalLink = "/member/election/apply";
        }
    }
  
    navigate(finalLink);
  };
  

  const events = [
    {
      joinLink1: "/president/club/election/add",     
    },
  ];

  const elections1 = [
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

  const [ elections, setElections] = useState([]);

  const handleEdit = (id) => {
    // Add your edit handling logic here
  };

  const handleDelete = (id) => {
    // Add your delete handling logic here
  };

  useEffect(() => {
    const fetchElections = async () => {
      try{
        const token = localStorage.getItem('token');
        const response = await ElectionService.getAllElections(token);
        const electionsArray = response.content || [];
        setElections(electionsArray);


      }catch(error){
        console.error('Error fetching elections:', error);
      }
    };

    fetchElections();


  }, []);

  const parseCustomDate = (dateString) => {
    if (dateString.length < 6) return 'Invalid date'; 
    //console.log(dateString);
  
    return `${dateString[0]}-${String(dateString[1]).padStart(2, '0')}-${String(dateString[2]).padStart(2, '0')}`;
  };

  return (
    <>
      {isEditable && (
        <Button
          onClick={() => navigateToForm(events[0].joinLink1)}
          className="flex items-center gap-2 bg-[#AEC90A] ml-auto mt-0 rounded-full text-black font-bold"
        >
          <FaPlus size={18} /> New Election
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
            {(elections || []).map((election, index) => (
              <div
                key={election.election_id}
                className={`grid grid-cols-6 gap-1 items-center p-5 bg-[#1E1E1E] rounded-xl mb-2 ${index === 1 ? 'opacity-50' : ''}`}
                style={{ boxShadow: '0 8px 16px rgba(0, 0, 0, 0.8)' }}
              >
                <div className="col-span-2 flex justify-center items-center">
                  <Typography color={index === 1 ? "gray" : "white"} variant="h6">
                    {election.election_name}
                  </Typography>
                </div>
                <div className="col-span-2 flex justify-center items-center">
                  <Typography className={`text-[#AEC90A] inline-block ${index === 1 ? 'text-gray-500' : ''}`} variant="h6">
                    {parseCustomDate(election.appOpens)} - {parseCustomDate(election.appCloses)}
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
                    {parseCustomDate(election.votingOpens)} - {parseCustomDate(election.votingCloses)}
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
                <div className="col-span-6 flex flex-col items-end gap-2 p-5">
                  {isOcOrMember ? (
                    <div className="flex gap-2 mb-4">
                      <Button
                        onClick={() => navigateToForm("/apply")}
                        className="bg-[#AEC90A] text-gray-700 rounded-full"
                      >
                        Apply
                      </Button>
                      <Button
                        onClick={() => navigateToForm("/final-candidates")}
                        className="bg-gray-500 text-gray-700 rounded-full opacity-50"
                      >
                        View Final Candidates
                      </Button>
                      <Button
                        onClick={() => navigateToForm("/voting")}
                        className="bg-gray-500 text-gray-700 rounded-full opacity-50"
                      >
                        Vote
                      </Button>
                    </div>
                  ) : (
                    <>
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
                    </>
                  )}
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
