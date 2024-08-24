import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Modal from "react-modal";
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

// Ensure you set the modal app element (usually the root element of your app)
Modal.setAppElement('#root');

const Voting = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [selectedCandidates, setSelectedCandidates] = useState({
    president: null,
    vicePresident: null,
    treasurer: null
  });

  const handleReleaseResults = () => {
    // Add your logic to release results here
    console.log("Results released to the club");
  };

  const handleVote = (position, candidateId) => {
    setSelectedCandidates(prev => ({
      ...prev,
      [position]: candidateId
    }));
  };

  const handleCompleteVoting = () => {
    if (
      selectedCandidates.president &&
      selectedCandidates.vicePresident &&
      selectedCandidates.treasurer
    ) {
      // Logic for completing voting
      console.log("Voting completed");
    } else {
      alert("Please select one candidate from each position before completing voting.");
    }
  };

  // Example data for candidates (same as in Votestab)
  const candidates = {
    president: [
      { id: 1, name: "John Doe", image: "https://randomuser.me/api/portraits/men/1.jpg" },
      { id: 2, name: "Jane Smith", image: "https://randomuser.me/api/portraits/women/2.jpg" },
      { id: 3, name: "Michael Brown", image: "https://randomuser.me/api/portraits/men/3.jpg" },
    ],
    vicePresident: [
      { id: 4, name: "Emily Johnson", image: "https://randomuser.me/api/portraits/women/10.jpg" },
      { id: 5, name: "David Lee", image: "https://randomuser.me/api/portraits/men/5.jpg" },
      { id: 6, name: "Sarah Williams", image: "https://randomuser.me/api/portraits/women/11.jpg" },
    ],
    treasurer: [
      { id: 7, name: "Matthew Wilson", image: "https://randomuser.me/api/portraits/men/7.jpg" },
      { id: 8, name: "Jessica Garcia", image: "https://randomuser.me/api/portraits/women/8.jpg" },
      { id: 9, name: "Daniel Martinez", image: "https://randomuser.me/api/portraits/men/9.jpg" },
    ],
  };

  return (
    <div className="flex h-screen">
      <Sidebar className="flex-shrink-0" />
      <div className="flex-1 flex flex-col">
        <Navbar className="sticky top-0 z-10 bg-neutral-900 text-white " />
        <div className="flex h-screen bg-neutral-900 p-1 text-white overflow-y-auto">
    <div className="w-full flex flex-col items-center py-2 px-20 overflow-y-auto">
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70"
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

      {/* President Position */}
      <div className="relative mb-12 w-full p-5">
        <div className="absolute left-0 z-10 w-full flex justify-center ">
          <div className="py-2 px-4 rounded-lg ">
            <h2 className="text-3xl text-center">President Position</h2>
          </div>
        </div>

        <div className="relative w-full rounded-xl p-5 mt-8">
          <div className="flex items-center justify-around space-x-2">
            {candidates.president.map((candidate, index) => (
              <div
                key={candidate.id}
                onClick={() => handleVote("president", candidate.id)}
                className={`relative flex flex-col items-center space-y-4 p-10 rounded-lg cursor-pointer ${selectedCandidates.president === candidate.id ? 'border-4 border-[#AEC90A]' : ''}`}
              >
                <span className="text-[#AEC90A] text-2xl font-bold absolute top-14 left-6 bg-black px-3 py-1 rounded-full" style={{ 
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' 
                }}>
                  {index + 1}
                </span>
                <img
                  src={candidate.image}
                  alt={`Candidate ${candidate.id}`}
                  className="w-56 h-56 rounded-full object-cover border-black border-4 custom-card"
                  style={{ 
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' 
                  }}
                />
                <div className="text-center mt-2">
                  <div className="text-white text-2xl">{candidate.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Vice President Position */}
      <div className="relative mb-12 w-full p-5">
        <div className="absolute left-0 z-10 w-full flex justify-center ">
          <div className="py-2 px-4 rounded-lg ">
            <h2 className="text-3xl text-center">Vice President Position</h2>
          </div>
        </div>

        <div className="relative w-full rounded-xl p-5 mt-8">
          <div className="flex items-center justify-around space-x-2">
            {candidates.vicePresident.map((candidate, index) => (
              <div
                key={candidate.id}
                onClick={() => handleVote("vicePresident", candidate.id)}
                className={`relative flex flex-col items-center space-y-4 p-10 rounded-lg cursor-pointer ${selectedCandidates.vicePresident === candidate.id ? 'border-4 border-[#AEC90A]' : ''}`}
              >
                <span className="text-[#AEC90A] text-2xl font-bold absolute top-14 left-6 bg-black px-3 py-1 rounded-full" style={{ 
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' 
                }}>
                  {index + 1}
                </span>
                <img
                  src={candidate.image}
                  alt={`Candidate ${candidate.id}`}
                  className="w-56 h-56 rounded-full object-cover border-black border-4 custom-card"
                  style={{ 
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' 
                  }}
                />
                <div className="text-center mt-2">
                  <div className="text-white text-2xl">{candidate.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Treasurer Position */}
      <div className="relative mb-28 w-full p-5">
        <div className="absolute left-0 z-10 w-full flex justify-center ">
          <div className="py-2 px-4 rounded-lg ">
            <h2 className="text-3xl text-center">Treasurer Position</h2>
          </div>
        </div>

        <div className="relative w-full rounded-xl p-5 mt-8">
          <div className="flex items-center justify-around space-x-2">
            {candidates.treasurer.map((candidate, index) => (
              <div
                key={candidate.id}
                onClick={() => handleVote("treasurer", candidate.id)}
                className={`relative flex flex-col items-center space-y-4 p-10 rounded-lg cursor-pointer ${selectedCandidates.treasurer === candidate.id ? 'border-4 border-[#AEC90A]' : ''}`}
              >
                <span className="text-[#AEC90A] text-2xl font-bold absolute top-14 left-6 bg-black px-3 py-1 rounded-full" style={{ 
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' 
                }}>
                  {index + 1}
                </span>
                <img
                  src={candidate.image}
                  alt={`Candidate ${candidate.id}`}
                  className="w-56 h-56 rounded-full object-cover border-black border-4 custom-card"
                  style={{ 
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' 
                  }}
                />
                <div className="text-center mt-2">
                  <div className="text-white text-2xl">{candidate.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full flex justify-center mb-12 space-x-6">
        <button
          onClick={handleCompleteVoting}
          className="bg-[#AEC90A] hover:bg-[#9AB307] text-black font-bold py-2 px-4 rounded-full transition duration-300"
        >
          Complete Voting
        </button>
        
      </div>
    </div> </div>
    </div> </div>
    
  );
};

export default Voting;
