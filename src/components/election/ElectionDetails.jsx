import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from 'react-router-dom';
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

const ElectionDetails = ({ club }) => {
  const [value, setValue] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const [elections, setElections] = useState({ upcoming: [], past: [] });

  const { id } = useParams();

  const handleViewDetails = (election_id) => {
    let targetPath = '';

    if (currentPath.startsWith('/president')) {
      targetPath = `/president/club/election/${election_id}`;
    } else if (currentPath.startsWith('/member')) {
      targetPath = '/member/club/election';
    } else if (currentPath.startsWith('/oc')) {
      targetPath = '/oc/club/election';
    } else if (currentPath.startsWith('/secretary')) {
      targetPath = '/secretary/club/election';
    }

    navigate(targetPath, { state: { club } });
  }

  const isOcOrMember = currentPath.startsWith('/oc') || currentPath.startsWith('/member') || currentPath.startsWith('/secretary');
  const isEditable = currentPath.startsWith('/president');

  const openElectionForm = (electionId) => {
    navigate(`/president/club/election/add`, { state: { club } });
  };

  
  

  const openvotingform = (electionId) => {
    navigate(`/member/club/election/voting/${electionId}`, { state: { club } });
  };

  const openapplyform = (electionId) => {
    navigate(`/member/club/election/apply/${electionId}`, { state: { club } });
  };

  const viewfinalists = (electionId) => {
    navigate(`/member/club/election/finalists/${electionId}`, { state: { club } });
  };

  const handleEdit = (id) => {
    navigate(`/president/club/election/edit/${id}`, { state: { club } });
  };

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this Election?"
      );

      const token = localStorage.getItem("token");
      if (confirmDelete) {
        await ElectionService.deleteElection(id, token);
        setElections(prevElections => ({
          upcoming: prevElections.upcoming.filter(election => election.election_id !== id),
          past: prevElections.past.filter(election => election.election_id !== id)
        }));
      }
    } catch (error) {
      console.error("Error fetching elections:", error);
    }
  };

  useEffect(() => {
    const fetchElections = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await ElectionService.getAllElections(token);
        const electionsArray = response.content.filter(election => election.club_id === club.club_id) || [];
  
        const now = new Date();  // Current date and time
        const upcomingElections = [];
        const pastElections = [];
  
        electionsArray.forEach(election => {
          // If votingCloses is an array, convert it to a valid Date object
          let votingCloseDate;
          if (Array.isArray(election.votingCloses)) {
            // Create a new Date from the array: [year, month, day, hour, minute]
            votingCloseDate = new Date(election.votingCloses[0], election.votingCloses[1] - 1, election.votingCloses[2], election.votingCloses[3], election.votingCloses[4]);
          } else {
            // Fallback in case it's not an array but still a valid date string
            votingCloseDate = new Date(election.votingCloses);
          }
  
          // Log the date for debugging
          console.log('Election Voting Closes:', election.votingCloses);
          console.log('Voting Close Date:', votingCloseDate);
          console.log('Current Date:', now);
  
          // Ensure the votingCloseDate is a valid date
          if (isNaN(votingCloseDate)) {
            console.error('Invalid votingCloseDate:', election.votingCloses);
            return;
          }
  
          // Compare votingCloses with current date (now) to determine if it's upcoming or past
          if (votingCloseDate > now) {
            upcomingElections.push(election);
          } else {
            pastElections.push(election);
          }
        });
  
        // Sort upcoming elections (earliest to latest)
        upcomingElections.sort((a, b) => new Date(a.votingCloses) - new Date(b.votingCloses));
  
        // Sort past elections (latest to earliest)
        pastElections.sort((a, b) => new Date(b.votingCloses) - new Date(a.votingCloses));
  
        // Update state with upcoming and past elections
        setElections({ upcoming: upcomingElections, past: pastElections });
      } catch (error) {
        console.error('Error fetching elections:', error);
      }
    };
  
    fetchElections();
  }, [club.club_id]);
  
  

  const fromUTC = (dateArray) => {
    const date = new Date(Date.UTC(dateArray[0], dateArray[1] - 1, dateArray[2], dateArray[3], dateArray[4]));
    const offset = date.getTimezoneOffset() * 60000;
    const localDate = new Date(date.getTime() - offset);
    return `${localDate.getFullYear()}-${String(localDate.getMonth() + 1).padStart(2, '0')}-${String(localDate.getDate()).padStart(2, '0')}`;
  };

  return (
    <>
      {isEditable && (
        <Button
          onClick={openElectionForm}
          className="flex items-center gap-2 bg-[#AEC90A] ml-auto mt-0 rounded-full text-black font-bold"
        >
          <FaPlus size={18} /> New Election
        </Button>
      )}

      <Card className="w-full bg-neutral-900 mt-4">
        <CardBody>
          <Typography variant="h5" color="white" className="mb-4">
            Upcoming Elections
          </Typography>
          {elections.upcoming.map(election => (
            <ElectionCard
              key={election.election_id}
              election={election}
              isOcOrMember={isOcOrMember}
              isEditable={isEditable}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              handleViewDetails={handleViewDetails}
              fromUTC={fromUTC}
              viewfinalists={viewfinalists}
              openvotingform={openvotingform}
              openapplyform={openapplyform}

              openElectionForm={openElectionForm}
            />
          ))}

          <Typography variant="h5" color="white" className="mb-4 mt-8">
            Past Elections
          </Typography>
          {elections.past.map(election => (
            <ElectionCard
              key={election.election_id}
              election={election}
              isOcOrMember={isOcOrMember}
              isEditable={isEditable}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              handleViewDetails={handleViewDetails}
              fromUTC={fromUTC}
              viewfinalists={viewfinalists}
              openvotingform={openvotingform}
              openapplyform={openapplyform}

              openElectionForm={openElectionForm}
              isPastElection
            />
          ))}
        </CardBody>
      </Card>
    </>
  );
};

const ElectionCard = ({ election, isOcOrMember, isEditable, handleEdit, handleDelete, handleViewDetails, fromUTC, viewfinalists, openvotingform, openapplyform, openElectionForm, isPastElection }) => (
  <div
    className={`grid grid-cols-6 gap-1 items-center p-5 bg-[#1E1E1E] rounded-xl mb-2 ${isPastElection ? 'opacity-50' : ''}`}
    style={{ boxShadow: '0 8px 16px rgba(0, 0, 0, 0.8)' }}
  >
    <div className="col-span-2 flex justify-center items-center">
      <Typography color={isPastElection ? "gray" : "white"} variant="h6">
        {election.election_name}
      </Typography>
    </div>
    <div className="col-span-2 flex justify-center items-center">
      <Typography className={`text-[#AEC90A] inline-block ${isPastElection ? 'text-gray-500' : ''}`} variant="h6">
        {fromUTC(election.appOpens)} - {fromUTC(election.appCloses)}
      </Typography>
    </div>
    <div className="col-span-1 flex justify-center items-center">
      <Typography className={`text-[#AEC90A] inline-block ${isPastElection ? 'text-gray-500' : ''}`} variant="h6">
        {fromUTC(election.votingOpens)} - {fromUTC(election.votingCloses)}
      </Typography>
    </div>
    <div className="col-span-6 flex flex-col items-end gap-2 p-5">
      {isOcOrMember ? (
        <div className="flex gap-2 mb-4">
          <Button onClick={() => openapplyform(election.election_id)} className="bg-[#AEC90A] text-gray-700 rounded-full">
            Apply
          </Button>
          <Button onClick={() => viewfinalists(election.election_id)} className="bg-gray-500 text-gray-700 rounded-full opacity-50">
            View Final Candidates
          </Button>
          <Button onClick={() => openvotingform(election.election_id)} className={`rounded-full ${election.is_voting_closed ? "bg-gray-500 text-gray-700 opacity-50" : "bg-[#AEC90A] text-black"}`} disabled={election.is_voting_closed === 1}>
            Vote
          </Button>

          <Button onClick={() => openvotingform(election.election_id)} className={`rounded-full ${election.is_voting_closed ? "bg-gray-500 text-gray-700 opacity-50" : "bg-[#AEC90A] text-black"}`} disabled={election.is_voting_closed === 1}>
            View Winners
          </Button>
        </div>
      ) : (
        <>
          {isEditable && (
            <EditDeleteButton
              onEdit={() => handleEdit(election.election_id)}
              onDelete={() => handleDelete(election.election_id)}
              disabled={election.is_voting_closed === 1}
            />
          )}
          <Button onClick={() => handleViewDetails(election.election_id)} className="bg-[#AEC90A] text-gray-700 rounded-full mt-2">
            View Details
          </Button>
        </>
      )}
    </div>
  </div>
);

export default ElectionDetails;
