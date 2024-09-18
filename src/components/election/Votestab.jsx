import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getAllCandidates } from "../../service/candidateService"; // Import the service function

const Votestab = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [candidates, setCandidates] = useState({
    president: [],
    secretary: [],
    treasurer: []
  });

  const [filteredCandidates, setFilteredCandidates] = useState({
    president: [],
    secretary: [],
    treasurer: []
  });

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const data = await getAllCandidates();
        console.log("Fetched candidates:", data);

        if (Array.isArray(data)) {
          // Categorize candidates by position
          const categorizedCandidates = {
            president: data.filter(candidate => candidate.position === "President"),
            secretary: data.filter(candidate => candidate.position === "Secretary"),
            treasurer: data.filter(candidate => candidate.position === "Treasurer")
          };

          setCandidates(categorizedCandidates);
        } else {
          console.error("Fetched data is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };

    fetchCandidates();
  }, []);

  useEffect(() => {
    // Function to filter candidates based on the selected status
    const filterCandidatesByStatus = (candidates, status) =>
      candidates.filter(candidate => candidate.selected === status);

    // Function to sort candidates by votes in descending order
    const sortCandidatesByVotes = (candidates) =>
      candidates.sort((a, b) => b.votes - a.votes);

    setFilteredCandidates({
      president: sortCandidatesByVotes(filterCandidatesByStatus(candidates.president, "selected")),
      secretary: sortCandidatesByVotes(filterCandidatesByStatus(candidates.secretary, "selected")),
      treasurer: sortCandidatesByVotes(filterCandidatesByStatus(candidates.treasurer, "selected"))
    });
  }, [candidates]);

  const handleReleaseResults = () => {
    // Add your logic to release results here
    console.log("Results released to the club");
  };

  const handleCandidateSelection = (position, candidateId) => {
    setCandidates(prev => {
      const updatedCandidates = { ...prev };
      updatedCandidates[position] = updatedCandidates[position].map(candidate =>
        candidate.id === candidateId ? { ...candidate, selected: candidate.selected === "selected" ? "rejected" : "selected" } : candidate
      );
      return updatedCandidates;
    });
  };

  const showInstruction = currentPath === "/oc" || currentPath === "/member";

  return (
    <div className="w-full flex flex-col items-center py-2 px-20 overflow-y-auto">
      <div className="w-full flex justify-end mt-8 pr-4">
        <button
          onClick={handleReleaseResults}
          className="bg-[#AEC90A] hover:bg-[#9AB307] text-black font-bold py-3 px-6 rounded-full shadow-lg transition duration-300"
        >
          Release Results to Club
        </button>
      </div>

      {/* President Position */}
      <div className="relative mb-12 w-full p-5">
        <div className="absolute left-0 z-10 w-full flex justify-center">
          <div className="py-2 px-4 rounded-lg">
            <h2 className="text-3xl text-center text-white">President Position</h2>
          </div>
        </div>

        <div className="relative w-full rounded-xl p-5 mt-8">
          <div className="flex items-center justify-around space-x-2">
            {filteredCandidates.president.map((candidate, index) => (
              <div
                key={candidate.id}
                className="relative flex flex-col items-center space-y-4 p-10 rounded-lg"
                onClick={() => handleCandidateSelection("president", candidate.id)}
              >
                {showInstruction && (
                  <div className="absolute top-4 text-white bg-black px-3 py-1 rounded-full">
                    Click on the image to vote
                  </div>
                )}
                <span className="text-[#AEC90A] text-2xl font-bold absolute top-14 left-6 bg-black px-3 py-1 rounded-full" style={{ 
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' 
                }}>
                  {index + 1}
                </span>
                <img
                  src={candidate.imageUrl } 
                  alt={`Candidate ${candidate.id}`}
                  className="w-56 h-56 rounded-full object-cover border-black border-4 custom-card"
                  style={{ 
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' 
                  }}
                />
                <div className="text-center mt-2">
                  <div className="text-white text-2xl">{candidate.name}</div>
                  {!showInstruction && (
                    <span className="text-[#AEC90A] font-bold text-2xl">{candidate.votes} votes</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Secretary Position */}
      <div className="relative mb-12 w-full p-5">
        <div className="absolute left-0 z-10 w-full flex justify-center">
          <div className="py-2 px-4 rounded-lg">
            <h2 className="text-3xl text-center text-white">Secretary Position</h2>
          </div>
        </div>

        <div className="relative w-full rounded-xl p-5 mt-8">
          <div className="flex items-center justify-around space-x-2">
            {filteredCandidates.secretary.map((candidate, index) => (
              <div
                key={candidate.id}
                className="relative flex flex-col items-center space-y-4 p-10 rounded-lg"
                onClick={() => handleCandidateSelection("secretary", candidate.id)}
              >
                {showInstruction && (
                  <div className="absolute top-4 text-white bg-black px-3 py-1 rounded-full">
                    Click on the image to vote
                  </div>
                )}
                <span className="text-[#AEC90A] text-2xl font-bold absolute top-14 left-6 bg-black px-3 py-1 rounded-full" style={{ 
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' 
                }}>
                  {index + 1}
                </span>
                <img
                  src={candidate.imageUrl } 
                  alt={`Candidate ${candidate.id}`}
                  className="w-56 h-56 rounded-full object-cover border-black border-4 custom-card"
                  style={{ 
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' 
                  }}
                />
                <div className="text-center mt-2">
                  <div className="text-white text-2xl">{candidate.name}</div>
                  {!showInstruction && (
                    <span className="text-[#AEC90A] font-bold text-2xl">{candidate.votes} votes</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Treasurer Position */}
      <div className="relative mb-28 w-full p-5">
        <div className="absolute left-0 z-10 w-full flex justify-center">
          <div className="py-2 px-4 rounded-lg">
            <h2 className="text-3xl text-center text-white">Treasurer Position</h2>
          </div>
        </div>

        <div className="relative w-full rounded-xl p-5 mt-8">
          <div className="flex items-center justify-around space-x-2">
            {filteredCandidates.treasurer.map((candidate, index) => (
              <div
                key={candidate.id}
                className="relative flex flex-col items-center space-y-4 p-10 rounded-lg"
                onClick={() => handleCandidateSelection("treasurer", candidate.id)}
              >
                {showInstruction && (
                  <div className="absolute top-4 text-white bg-black px-3 py-1 rounded-full">
                    Click on the image to vote
                  </div>
                )}
                <span className="text-[#AEC90A] text-2xl font-bold absolute top-14 left-6 bg-black px-3 py-1 rounded-full" style={{ 
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' 
                }}>
                  {index + 1}
                </span>
                <img
                  src={candidate.imageUrl } 
                  alt={`Candidate ${candidate.id}`}
                  className="w-56 h-56 rounded-full object-cover border-black border-4 custom-card"
                  style={{ 
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' 
                  }}
                />
                <div className="text-center mt-2">
                  <div className="text-white text-2xl">{candidate.name}</div>
                  {!showInstruction && (
                    <span className="text-[#AEC90A] font-bold text-2xl">{candidate.votes} votes</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Votestab;
