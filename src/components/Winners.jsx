import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getAllCandidates,
  getElectionReleased,
} from "../service/candidateService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const Votestab = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const electionIdFromUrl = currentPath.split("/").pop();

  const [candidates, setCandidates] = useState({
    president: [],
    secretary: [],
    treasurer: [],
  });

  const [filteredCandidates, setFilteredCandidates] = useState({
    president: [],
    secretary: [],
    treasurer: [],
  });

  const [releasedStatus, setReleasedStatus] = useState(0);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const fetchReleasedStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        const releasedData = await getElectionReleased(electionIdFromUrl, token);
        setReleasedStatus(releasedData.content ? 1 : 0);
        if (!releasedData.content) {
          setShowDialog(true);
        }
      } catch (error) {
        console.error("Error fetching released status:", error);
      }
    };

    fetchReleasedStatus();
  }, [electionIdFromUrl]);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const data = await getAllCandidates();
        if (Array.isArray(data)) {
          const categorizedCandidates = {
            president: data.filter(
              (candidate) =>
                candidate.position === "President" &&
                String(candidate.electionId) === String(electionIdFromUrl)
            ),
            secretary: data.filter(
              (candidate) =>
                candidate.position === "Secretary" &&
                String(candidate.electionId) === String(electionIdFromUrl)
            ),
            treasurer: data.filter(
              (candidate) =>
                candidate.position === "Treasurer" &&
                String(candidate.electionId) === String(electionIdFromUrl)
            ),
          };

          setCandidates(categorizedCandidates);
        } else {
          console.error("Fetched data is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };

    if (releasedStatus === 1) {
      fetchCandidates();
    }
  }, [releasedStatus]);

  useEffect(() => {
    const filterCandidatesByStatus = (candidates, status) =>
      candidates.filter((candidate) => candidate.selected === status);

    const sortCandidatesByVotes = (candidates) =>
      candidates.sort((a, b) => b.votes - a.votes);

    setFilteredCandidates({
      president: sortCandidatesByVotes(
        filterCandidatesByStatus(candidates.president, "selected")
      ),
      secretary: sortCandidatesByVotes(
        filterCandidatesByStatus(candidates.secretary, "selected")
      ),
      treasurer: sortCandidatesByVotes(
        filterCandidatesByStatus(candidates.treasurer, "selected")
      ),
    });
  }, [candidates]);

  const handleDialogClose = () => {
    setShowDialog(false);
    navigate(-1);
  };

  const renderPositionSection = (title, candidates) => (
    <div className="relative mb-12 w-full p-5">         

      <div className="absolute left-0 z-10 w-full flex justify-center">
        <div className="py-2 px-4 rounded-lg">
          <h2 className="text-3xl text-center text-white">{title} </h2>
        </div>
      </div>
      <div className="relative w-full rounded-xl p-5 mt-8">
        <div className="flex items-center justify-around space-x-2">
          {candidates.map((candidate, index) => (
            <div
              key={candidate.id}
              className={`relative flex flex-col items-center space-y-4 p-10 rounded-lg ${
                index === 0
                  ? "border-4 border-gold glow-winner"
                  : "border-black"
              }`}
            >
              <span className="text-[#AEC90A] text-2xl font-bold absolute top-14 left-6 bg-black px-3 py-1 rounded-full">
                {index + 1}
              </span>
              <img
                src={candidate.imageUrl}
                alt={`Candidate ${candidate.id}`}
                className={`w-56 h-56 rounded-full object-cover ${
                  index === 0 ? "border-4 border-gold shadow-lg" : ""
                }`}
              />
              <div className="text-center mt-2">
                <div className="text-white text-2xl">{candidate.name}</div>
                <span className="text-[#AEC90A] font-bold text-2xl">
                  {candidate.votes} votes
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 flex">
      <Sidebar className="flex-shrink-0" />
      <div className="flex flex-col flex-1">
        <Navbar className="sticky top-0 z-10 p-4" />
        <div className="bg-black bg-opacity-90 text-white flex-col md:p-20 overflow-y-auto min-h-screen">
          <p className="text-3xl text-[#AEC90A] text-center ">The Winners</p>
          {showDialog && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
              <div className="bg-gray-800 text-white p-6 rounded-lg text-center shadow-xl">
                <h2 className="text-2xl font-bold">Election Results Not Released</h2>
                <p className="mt-4">Sorry, election results are not released yet.</p>
                <button
                  onClick={handleDialogClose}
                  className="mt-6 px-6 py-2 bg-[#AEC90A] text-black font-bold rounded-full"
                >
                  Okay
                </button>
              </div>
            </div>
          )}

          {!showDialog && releasedStatus === 1 && (
            <>
              {renderPositionSection("President Position", filteredCandidates.president)}
              {renderPositionSection("Secretary Position", filteredCandidates.secretary)}
              {renderPositionSection("Treasurer Position", filteredCandidates.treasurer)}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Votestab;
