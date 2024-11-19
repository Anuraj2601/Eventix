import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllCandidates } from "../service/candidateService";
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Card, CardBody, Typography, Avatar } from "@material-tailwind/react";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from 'chart.js';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

ChartJS.register(ArcElement, Tooltip, Legend);

const Finalists = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const electionIdFromUrl = currentPath.split('/').pop();

  const [candidates, setCandidates] = useState({
    president: [],
    secretary: [],
    treasurer: []
  });

  const [activeTab, setActiveTab] = useState("president");
  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const data = await getAllCandidates();
        console.log("Fetched candidates:", data);

        if (Array.isArray(data)) {
          const categorizedCandidates = {
            president: data.filter(candidate => candidate.position === "President" && candidate.selected === "selected" && String(candidate.electionId) === String(electionIdFromUrl)),
            secretary: data.filter(candidate => candidate.position === "Secretary" && candidate.selected === "selected" && String(candidate.electionId) === String(electionIdFromUrl)),
            treasurer: data.filter(candidate => candidate.position === "Treasurer" && candidate.selected === "selected" && String(candidate.electionId) === String(electionIdFromUrl))
          };

          setCandidates(categorizedCandidates);

          // Modal logic: Check if there are no accepted candidates
          const acceptedCandidates = [
            ...categorizedCandidates.president,
            ...categorizedCandidates.secretary,
            ...categorizedCandidates.treasurer
          ];

          if (acceptedCandidates.length === 0) {
            setModalMessage("Sorry, the selection process isn't completed yet.");
            setOpenModal(true);
          } else if (acceptedCandidates.length === 1) {
            setModalMessage("One candidate has been selected. Proceeding...");
            setOpenModal(true);
          }
        } else {
          console.error("Fetched data is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };

    fetchCandidates();
  }, [electionIdFromUrl]);

  const handleCloseModal = () => {
    setOpenModal(false);
    navigate(-1); // Navigate back to the previous page
  };

  const renderOCList = (ocList) => {
    let parsedOCList = [];
    try {
        parsedOCList = typeof ocList === 'string' ? JSON.parse(ocList) : ocList;
    } catch (error) {
        console.error("Error parsing OC data:", error);
        return <Typography>Invalid OC data format</Typography>;
    }

    if (!Array.isArray(parsedOCList) || parsedOCList.length === 0) {
        return <Typography>No OC data available</Typography>;
    }
    return (
        <div className="ml-auto text-right">
            <ul className="list-disc list-inside text-left">
                {parsedOCList.map((event, index) => (
                    <li key={index} className="text-white">
                        {event}
                    </li>
                ))}
            </ul>
        </div>
    );
  };

  const renderPieChart = (performance) => {
    const data = {
        labels: ['Club Performance'],
        datasets: [{
            data: [performance, 100 - performance],
            backgroundColor: ['#AEC90A', 'black'],
            borderWidth: 1,
        }],
    };

    return (
      <div className="w-36 h-36 flex flex-col items-center">
        <Pie data={data} />
        <Typography variant="body2" className="mt-2 text-white ">
            {performance}%
        </Typography>
      </div>
    );
  };

  const renderCandidates = (candidatesList) => (
    <div className="flex flex-wrap justify-between">
      {candidatesList.map(candidate => (
        <Card 
          key={candidate.id} 
          className=" bg-black flex flex-col items-center space-x-4 p-10 rounded-lg custom-card w-1/3 space-2" // m-2 adds margin for spacing
          >
          <Avatar
            src={candidate.imageUrl}
            alt={`Candidate ${candidate.id}`}
            className="w-36 h-36 rounded-full object-cover border-black border-4"
            style={{ boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' }}
          />
          <CardBody className="flex flex-col items-center text-center">
            <Typography variant="h5" className="text-white font-bold">{candidate.name}</Typography>
            <Typography className="text-gray-300 p-2">{candidate.contribution}</Typography>
  
            {/* Render the Pie Chart */}
            {renderPieChart(candidate.performance)} 
  
            <div className="my-4 mt-8"> {/* Add margin for spacing */}
              <Typography className="text-white">Has been successful in being part of:</Typography>
              {renderOCList(candidate.oc)}
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="flex h-screen">
      <Sidebar className="flex-shrink-0" />
      <div className="flex-1 flex flex-col">
        <Navbar className="sticky top-0 z-10 bg-neutral-900 text-white" />
        <div className="flex h-screen bg-neutral-900 p-1 text-white overflow-y-auto">
          <div className="flex w-full">
            {/* Vertical Tabs */}
            <div className="w-1/6 p-4 text-white">
              <Typography variant="h5" className="mb-4 text-center">
                Positions
              </Typography>
              <ul>
                {["president", "secretary", "treasurer"].map(position => (
                  <li
                    key={position}
                    className={`cursor-pointer mb-2 p-2 rounded-lg ${activeTab === position ? 'bg-[#AEC90A] text-black' : 'hover:bg-gray-700'}`}
                    onClick={() => setActiveTab(position)}
                  >
                    {position.charAt(0).toUpperCase() + position.slice(1)}
                  </li>
                ))}
              </ul>
            </div>

            {/* Candidates Display */}
            <div className="w-3/4 bg-neutral-900">
              <div className="relative mb-12 w-full ">
                <div className="absolute z-10 w-full flex justify-center mb-16">
                  <div className="py-2 px-4 rounded-lg -mt-20">
                    <h2 className="text-3xl text-center">{`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Position`}</h2>
                  </div>
                </div>
                <div className="relative w-full rounded-xl mt-40 ">
                  {renderCandidates(candidates[activeTab])}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Notice</DialogTitle>
        <DialogContent>
          <Typography>{modalMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <button onClick={handleCloseModal} className="bg-[#AEC90A] text-white px-4 py-2 rounded-md">OK</button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Finalists;
