// C:\wamp64\www\Eventix\src\components\election\Votestab.jsx

import React from "react";

const Votestab = () => {
  // Example data for candidates
  const candidates = [
    {
      id: 1,
      votes: 75,
      name: "John Doe",
      image: "https://randomuser.me/api/portraits/men/1.jpg", // Example image URL
    },
    {
      id: 2,
      votes: 60,
      name: "Jane Smith",
      image: "https://randomuser.me/api/portraits/women/2.jpg", // Example image URL
    },
    {
      id: 3,
      votes: 45,
      name: "Michael Brown",
      image: "https://randomuser.me/api/portraits/men/3.jpg", // Example image URL
    },
    // Vice President candidates
    {
      id: 4,
      votes: 70,
      name: "Emily Johnson",
      image: "https://randomuser.me/api/portraits/women/4.jpg", // New image URL for Emily Johnson
    },
    {
      id: 5,
      votes: 55,
      name: "David Lee",
      image: "https://randomuser.me/api/portraits/men/5.jpg", // Example image URL
    },
    {
      id: 6,
      votes: 40,
      name: "Sarah Williams",
      image: "https://randomuser.me/api/portraits/women/6.jpg", // New image URL for Sarah Williams
    },
    // Treasurer candidates
    {
      id: 7,
      votes: 65,
      name: "Matthew Wilson",
      image: "https://randomuser.me/api/portraits/men/7.jpg", // Example image URL
    },
    {
      id: 8,
      votes: 50,
      name: "Jessica Garcia",
      image: "https://randomuser.me/api/portraits/women/8.jpg", // Example image URL
    },
    {
      id: 9,
      votes: 35,
      name: "Daniel Martinez",
      image: "https://randomuser.me/api/portraits/men/9.jpg", // Example image URL
    },
  ];

  // Update images for Sarah Williams and Emily Johnson
  candidates.find(candidate => candidate.name === "Emily Johnson").image = "https://randomuser.me/api/portraits/women/10.jpg"; // New image URL for Emily Johnson
  candidates.find(candidate => candidate.name === "Sarah Williams").image = "https://randomuser.me/api/portraits/women/11.jpg"; // New image URL for Sarah Williams

  // Filter candidates for each position
  const presidentCandidates = candidates.slice(0, 3);
  const vicePresidentCandidates = candidates.slice(3, 6);
  const treasurerCandidates = candidates.slice(6, 9);

  return (
    <div className="flex flex-col items-center p-5">
      {/* President Position */}
      <h2 className="text-3xl text-white mb-4 p-5">President Position</h2>
      <div className="flex items-center space-x-20">
        {presidentCandidates.map((candidate, index) => (
          <div key={candidate.id} className="relative">
            <div className="relative">
              <span className="text-[#AEC90A] text-4xl font-bold absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2">
                {index + 1}
              </span>
              <img
                src={candidate.image} // Use candidate's image URL
                alt={`Candidate ${candidate.id}`}
                className="w-48 h-48 rounded-full object-cover border-[#AEC90A] border-4 p-5"
              />
            </div>
            <div className="text-center mt-2">
              <div className="text-white">{candidate.name}</div>
              <span className="text-[#AEC90A] font-bold">{candidate.votes} votes</span>
            </div>
          </div>
        ))}
      </div>

      {/* Vice President Position */}
      <h2 className="text-3xl text-white my-8 p-5">Secretary Position</h2>
      <div className="flex items-center space-x-20">
        {vicePresidentCandidates.map((candidate, index) => (
          <div key={candidate.id} className="relative">
            <div className="relative">
              <span className="text-[#AEC90A] text-4xl font-bold absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2">
                {index + 1}
              </span>
              <img
                src={candidate.image} // Use candidate's image URL
                alt={`Candidate ${candidate.id}`}
                className="w-48 h-48 rounded-full object-cover border-[#AEC90A] border-4 p-5"
              />
            </div>
            <div className="text-center mt-2">
              <div className="text-white">{candidate.name}</div>
              <span className="text-[#AEC90A] font-bold">{candidate.votes} votes</span>
            </div>
          </div>
        ))}
      </div>

      {/* Treasurer Position */}
      <h2 className="text-3xl text-white my-8 p-5">Treasurer Position</h2>
      <div className="flex items-center space-x-20">
        {treasurerCandidates.map((candidate, index) => (
          <div key={candidate.id} className="relative">
            <div className="relative">
              <span className="text-[#AEC90A] text-4xl font-bold absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2">
                {index + 1}
              </span>
              <img
                src={candidate.image} // Use candidate's image URL
                alt={`Candidate ${candidate.id}`}
                className="w-48 h-48 rounded-full object-cover border-[#AEC90A] border-4 p-5"
              />
            </div>
            <div className="text-center mt-2">
              <div className="text-white">{candidate.name}</div>
              <span className="text-[#AEC90A] font-bold">{candidate.votes} votes</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Votestab;
