import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Modal from "react-modal";
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { getAllCandidates,incrementVotes } from "../service/candidateService";
import { addVoter } from "../service/VoterService";  // Importing the service
import { getUserIdFromToken } from '../utils/utils';


// Ensure you set the modal app element (usually the root element of your app)
Modal.setAppElement('#root');

const Voting = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false); // New state for error modal
  const [isThankYouModalOpen, setIsThankYouModalOpen] = useState(false);
  const [isNoCandidatesModalOpen, setIsNoCandidatesModalOpen] = useState(false);  // New state for the no candidates modal

  const electionIdFromUrl = currentPath.split('/').pop(); // Extract the last part of the URL (electionId)

  const [candidates, setCandidates] = useState({
    president: [],
    secretary: [],
    treasurer: []
  });

  const [selectedCandidates, setSelectedCandidates] = useState({
    president: null,
    secretary: null,
    treasurer: null
  });

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const data = await getAllCandidates();
        console.log("Fetched candidates:", data);

        if (Array.isArray(data)) {
          const categorizedCandidates = {
            president: data.filter(candidate => candidate.position === "President" && String(candidate.electionId) === String(electionIdFromUrl)),
            secretary: data.filter(candidate => candidate.position === "Secretary" && String(candidate.electionId) === String(electionIdFromUrl)),
            treasurer: data.filter(candidate => candidate.position === "Treasurer" && String(candidate.electionId) === String(electionIdFromUrl))
          };

          setCandidates(categorizedCandidates);
          if (categorizedCandidates.president.length === 0 && categorizedCandidates.secretary.length === 0 && categorizedCandidates.treasurer.length === 0) {
            setIsNoCandidatesModalOpen(true);
          }
        } else {
          console.error("Fetched data is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };

    fetchCandidates();
  }, []);

  const handleVote = (position, candidateId) => {
    setSelectedCandidates(prev => ({
      ...prev,
      [position]: candidateId
    }));
  };

  const handleCompleteVoting = async () => {
    if (
      selectedCandidates.president &&
      selectedCandidates.secretary &&
      selectedCandidates.treasurer
    ) {
      try {
        const candidateIds = [
          selectedCandidates.president,
          selectedCandidates.secretary,
          selectedCandidates.treasurer
        ];
  
        // Call the service to increment votes
        await incrementVotes(candidateIds);
        console.log("Voting completed and votes incremented");

        const userId = getUserIdFromToken();
        if (!electionIdFromUrl) throw new Error("Election ID is missing.");
  
        await addVoter({
          electionId: electionIdFromUrl,
          userId
        });
  
        // Show success modal with the same design
        setIsThankYouModalOpen(true); // Reuse the modal state to show the success message
        setTimeout(() => {
          setIsModalOpen(false); // Close the modal after 3 seconds
          window.history.back(); // Navigate back to the previous page
        }, 3000);
      } catch (error) {
        console.error("Error completing voting:", error);
        // Optionally, show an error modal or message
      }
    } else {
      setIsErrorModalOpen(true); // Show the error modal if not all candidates are selected
    }
  };
  

  const showInstruction = currentPath === "/oc" || currentPath === "/member";

  const getSelectedCandidate = (position) => {
    return candidates[position].find(candidate => candidate.id === selectedCandidates[position]);
  };

  return (
    <div className="flex h-screen">
      <Sidebar className="flex-shrink-0" />
      <div className="flex-1 flex flex-col">
        <Navbar className="sticky top-0 z-10 bg-neutral-900 text-white " />
        <div className="flex h-screen bg-neutral-900 p-1 text-white overflow-y-auto">
          <div className="w-full flex flex-col items-center py-2 px-20 overflow-y-auto">
              {/* Modal for No Candidates */}
              <Modal
              isOpen={isNoCandidatesModalOpen}
              onRequestClose={() => setIsNoCandidatesModalOpen(false)}
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
            >
              <div className="bg-white p-6 rounded-lg max-w-md w-full text-center">
                <h2 className="text-2xl font-bold mb-4">Selection Process Not Completed</h2>
                <p className="mb-4">The selection process hasn't completed yet. Please wait to start voting.</p>
                <button
onClick={() => {
  setIsNoCandidatesModalOpen(false);
  window.history.go(-1); // Navigate one step back in the history
}}                  className="bg-[#AEC90A] hover:bg-[#9AB307] text-black font-bold py-2 px-4 rounded-full transition duration-300"
                >
                  OK
                </button>
              </div>
            </Modal>
            <Modal
              isOpen={isModalOpen}
              onRequestClose={() => setIsModalOpen(false)}
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
            >
              <div className="bg-white p-6 rounded-lg max-w-md w-full text-center">
                <h2 className="text-2xl font-bold mb-4">Voting Instructions</h2>
                <p className="mb-4">Click on the image of the candidate you want to vote for. You must select one candidate from each position to complete the voting process.</p>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-[#AEC90A] hover:bg-[#9AB307] text-black font-bold py-2 px-4 rounded-full transition duration-300"
                >
                  OK
                </button>
              </div>
            </Modal>

            <Modal
              isOpen={isErrorModalOpen}
              onRequestClose={() => setIsErrorModalOpen(false)}
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
            >
              <div className="bg-white p-6 rounded-lg max-w-md w-full text-center">
                <h2 className="text-2xl font-bold mb-4">Incomplete Voting</h2>
                <p className="mb-4">Please select one candidate from each position before completing the voting process.</p>
                <button
                  onClick={() => setIsErrorModalOpen(false)}
                  className="bg-[#AEC90A] hover:bg-[#9AB307] text-black font-bold py-2 px-4 rounded-full transition duration-300"
                >
                  OK
                </button>
              </div>
            </Modal>

            <Modal
  isOpen={isThankYouModalOpen}
  onRequestClose={() => setIsThankYouModalOpen(false)}
  className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
>
  <div className="bg-white p-6 rounded-lg max-w-md w-full text-center">
    <h2 className="text-2xl font-bold mb-4">Thank you for voting!</h2>
    <p className="mb-4">We have successfully saved your votes!</p>
    <button
      onClick={() => setIsThankYouModalOpen(false)}
      className="bg-[#AEC90A] hover:bg-[#9AB307] text-black font-bold py-2 px-4 rounded-full transition duration-300"
    >
      OK
    </button>
  </div>
</Modal>

            {/* President Position */}
            <div className="relative mb-12 w-full p-5">
              <div className="absolute left-0  w-full flex justify-center">
                <div className="py-2 px-4 rounded-lg">
                  <h2 className="text-3xl text-center">President Position</h2>
                </div>
              </div>

              <div className="relative w-full rounded-xl p-5 mt-8">
                <div className="flex items-center justify-around space-x-2">
                {candidates.president
  .filter(candidate => candidate.selected === 'selected') // Add this filter condition
  .map(candidate => (
                    <div
                      key={candidate.id}
                      className={`relative flex flex-col items-center space-y-4 p-10 rounded-lg ${selectedCandidates.president === candidate.id ? 'border-[#AEC90A] border-4' : ''}`}
                      onClick={() => handleVote("president", candidate.id)}
                    >
                      {showInstruction && (
                        <div className="absolute top-4 text-white bg-black px-3 py-1 rounded-full">
                          Click on the image to vote
                        </div>
                      )}
                     
                      <img
                        src={candidate.imageUrl}
                        alt={`Candidate ${candidate.id}`}
                        className="w-56 h-56 rounded-full object-cover border-black border-4 custom-card"
                        style={{ 
                          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' 
                        }}
                      />
                      <div className="text-center mt-2">
  <div className="text-white text-2xl font-bold">{candidate.id}</div>
  <div className="text-white text-2xl font-bold">{candidate.name}</div>

  <div className="text-gray-300 text-lg font-light">{candidate.contribution}</div>
</div>

                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Secretary Position */}
            <div className="relative mb-12 w-full p-5">
              <div className="absolute left-0  w-full flex justify-center">
                <div className="py-2 px-4 rounded-lg">
                  <h2 className="text-3xl text-center">Secretary Position</h2>
                </div>
              </div>

              <div className="relative w-full rounded-xl p-5 mt-8">
                <div className="flex items-center justify-around space-x-2">
                  {candidates.secretary.filter(candidate => candidate.selected === 'selected') // Add this filter condition
  .map(candidate => (
                    <div
                      key={candidate.id}
                      className={`relative flex flex-col items-center space-y-4 p-10 rounded-lg ${selectedCandidates.secretary === candidate.id ? 'border-[#AEC90A] border-4' : ''}`}
                      onClick={() => handleVote("secretary", candidate.id)}
                    >
                      {showInstruction && (
                        <div className="absolute top-4 text-white bg-black px-3 py-1 rounded-full">
                          Click on the image to vote
                        </div>
                      )}
                     
                      <img
                        src={candidate.imageUrl}
                        alt={`Candidate ${candidate.id}`}
                        className="w-56 h-56 rounded-full object-cover border-black border-4 custom-card"
                        style={{ 
                          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' 
                        }}
                      />
                     <div className="text-center mt-2">
  <div className="text-white text-2xl font-bold">{candidate.name}</div>

  <div className="text-gray-300 text-lg font-light">{candidate.contribution}</div>
</div>

                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Treasurer Position */}
            <div className="relative mb-28 w-full p-5">
              <div className="absolute left-0  w-full flex justify-center">
                <div className="py-2 px-4 rounded-lg">
                  <h2 className="text-3xl text-center">Treasurer Position</h2>
                </div>
              </div>

              <div className="relative w-full rounded-xl p-5 mt-8">
                <div className="flex items-center justify-around space-x-2">
                  {candidates.treasurer.filter(candidate => candidate.selected === 'selected') // Add this filter condition
  .map(candidate => (
                    <div
                      key={candidate.id}
                      className={`relative flex flex-col items-center space-y-4 p-10 rounded-lg ${selectedCandidates.treasurer === candidate.id ? 'border-[#AEC90A] border-4' : ''}`}
                      onClick={() => handleVote("treasurer", candidate.id)}
                    >
                      {showInstruction && (
                        <div className="absolute top-4 text-white bg-black px-3 py-1 rounded-full">
                          Click on the image to vote
                        </div>
                      )}
                    
                      <img
                        src={candidate.imageUrl}
                        className="w-56 h-56 rounded-full object-cover border-black border-4 custom-card"
                        style={{ 
                          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' 
                        }}
                      />
                     <div className="text-center mt-2">
  <div className="text-white text-2xl font-bold">{candidate.name}</div>  <div className="text-white text-2xl font-bold">{candidate.id}</div>

  <div className="text-gray-300 text-lg font-light">{candidate.contribution}</div>
</div>

                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <button
              onClick={handleCompleteVoting}
              className="bg-[#AEC90A] hover:bg-[#9AB307] text-black font-bold py-2 px-4 rounded-full mt-6 mb-40"
            >
              Complete Voting
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Voting;
