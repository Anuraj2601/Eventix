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
      image: "https://randomuser.me/api/portraits/women/10.jpg", // New image URL for Emily Johnson
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
      image: "https://randomuser.me/api/portraits/women/11.jpg", // New image URL for Sarah Williams
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

  // Filter candidates for each position
  const presidentCandidates = candidates.slice(0, 3);
  const vicePresidentCandidates = candidates.slice(3, 6);
  const treasurerCandidates = candidates.slice(6, 9);

  return (
    <div className="w-full flex flex-col items-center p-5">
      {/* President Position */}
      <div className="relative mb-12 w-full">
        <div className="absolute top-0 left-0 w-full z-10">
          <div className="bg-black py-2 px-4 rounded-lg">
            <h2 className="text-3xl text-[#AEC90A] text-center">
              President Position
            </h2>
          </div>
        </div>
        <div className="relative w-full border border-[#AEC90A] rounded-xl p-5 mt-8">
          <div className="flex items-center justify-around space-x-16">
            {presidentCandidates.map((candidate, index) => (
              <div
                key={candidate.id}
                className="relative flex flex-col items-center space-y-4"
              >
                <span className="text-[#AEC90A] text-2xl font-bold absolute -top-4 left-4 bg-black px-3 py-1 rounded-full">
                  {index + 1}
                </span>
                <img
                  src={candidate.image} // Use candidate's image URL
                  alt={`Candidate ${candidate.id}`}
                  className="w-48 h-48 rounded-full object-cover border-[#AEC90A] border-4 p-1"
                />
                <div className="text-center mt-2">
                  <div className="text-white">{candidate.name}</div>
                  <span className="text-[#AEC90A] font-bold">
                    {candidate.votes} votes
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Vice President Position */}
      <div className="relative mb-12 w-full">
        <div className="absolute top-0 left-0 w-full z-10">
          <div className="bg-black py-2 px-4 rounded-lg">
            <h2 className="text-3xl text-[#AEC90A] text-center">
              Vice President Position
            </h2>
          </div>
        </div>
        <div className="relative w-full border border-[#AEC90A] rounded-xl p-5 mt-8">
          <div className="flex items-center justify-around space-x-16">
            {vicePresidentCandidates.map((candidate, index) => (
              <div
                key={candidate.id}
                className="relative flex flex-col items-center space-y-4"
              >
                <span className="text-[#AEC90A] text-2xl font-bold absolute -top-4 left-4 bg-black px-3 py-1 rounded-full">
                  {index + 1}
                </span>
                <img
                  src={candidate.image} // Use candidate's image URL
                  alt={`Candidate ${candidate.id}`}
                  className="w-48 h-48 rounded-full object-cover border-[#AEC90A] border-4 p-1"
                />
                <div className="text-center mt-2">
                  <div className="text-white">{candidate.name}</div>
                  <span className="text-[#AEC90A] font-bold">
                    {candidate.votes} votes
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Treasurer Position */}
      <div className="relative mb-12 w-full">
        <div className="absolute top-0 left-0 w-full z-10">
          <div className="bg-black py-2 px-4 rounded-lg">
            <h2 className="text-3xl text-[#AEC90A] text-center">
              Treasurer Position
            </h2>
          </div>
        </div>
        <div className="relative w-full border border-[#AEC90A] rounded-xl p-5 mt-8">
          <div className="flex items-center justify-around space-x-16">
            {treasurerCandidates.map((candidate, index) => (
              <div
                key={candidate.id}
                className="relative flex flex-col items-center space-y-4"
              >
                <span className="text-[#AEC90A] text-2xl font-bold absolute -top-4 left-4 bg-black px-3 py-1 rounded-full">
                  {index + 1}
                </span>
                <img
                  src={candidate.image} // Use candidate's image URL
                  alt={`Candidate ${candidate.id}`}
                  className="w-48 h-48 rounded-full object-cover border-[#AEC90A] border-4 p-1"
                />
                <div className="text-center mt-2">
                  <div className="text-white">{candidate.name}</div>
                  <span className="text-[#AEC90A] font-bold">
                    {candidate.votes} votes
                  </span>
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
