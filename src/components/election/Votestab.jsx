import React from "react";

const Votestab = () => {
  const handleReleaseResults = () => {
    // Add your logic to release results here
    console.log("Results released to the club");
  };

  // Example data for candidates
  const presidentCandidates = [
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
  ];

  const vicePresidentCandidates = [
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
  ];

  const treasurerCandidates = [
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
        <div className="absolute  left-0 z-10 w-full flex justify-center ">
          <div className=" py-2 px-4 rounded-lg ">
            <h2 className="text-3xl text- text-center ">President Position</h2>
          </div>
        </div>

        <div className="relative w-full  rounded-xl p-5 mt-8">
          <div className="flex items-center justify-around space-x-2">
            {presidentCandidates.map((candidate, index) => (
              <div
                key={candidate.id}
                className="relative flex flex-col items-center space-y-4 p-10 rounded-lg"
                >
                <span className="text-[#AEC90A] text-2xl font-bold absolute top-14 left-6 bg-black px-3 py-1 rounded-full">
                  {index + 1}
                </span>
                <img
                  src={candidate.image}
                  alt={`Candidate ${candidate.id}`}
                  className="w-56 h-56 rounded-full object-cover border-black border-4 "
                />
                <div className="text-center mt-2">
                  <div className="text-white">{candidate.name}</div>
                  <span className="text-[#AEC90A] font-bold">{candidate.votes} votes</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Vice President Position */}
      <div className="relative mb-12 w-full p-5">
        <div className="absolute  left-0 z-10 w-full flex justify-center ">
          <div className=" py-2 px-4 rounded-lg ">
            <h2 className="text-3xl text- text-center ">Vice President Position</h2>
          </div>
        </div>

        <div className="relative w-full rounded-xl p-5 mt-8">
          <div className="flex items-center justify-around space-x-2">
            {vicePresidentCandidates.map((candidate, index) => (
               <div
               key={candidate.id}
               className="relative flex flex-col items-center space-y-4 p-10 rounded-lg"
              >
                <span className="text-[#AEC90A] text-2xl font-bold absolute top-14 left-6 bg-black px-3 py-1 rounded-full">
                  {index + 1}
                </span>
                <img
                  src={candidate.image}
                  alt={`Candidate ${candidate.id}`}
                  className="w-56 h-56 rounded-full object-cover border-black border-4 custom-3d-shadow relative"
                />
                <div className="text-center mt-2">
                  <div className="text-white">{candidate.name}</div>
                  <span className="text-[#AEC90A] font-bold">{candidate.votes} votes</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Treasurer Position */}
      <div className="relative mb-28 w-full p-5">
        <div className="absolute  left-0 z-10 w-full flex justify-center ">
          <div className=" py-2 px-4 rounded-lg ">
            <h2 className="text-3xl text- text-center">Treasurer Position</h2>
          </div>
        </div>

        <div className="relative w-full rounded-xl p-5 mt-8">
          <div className="flex items-center justify-around space-x-2">
            {treasurerCandidates.map((candidate, index) => (
              <div
                key={candidate.id}
                className="relative flex flex-col items-center space-y-4 p-10 rounded-lg"
              >
                <span className="text-[#AEC90A] text-2xl font-bold absolute top-14 left-6 bg-black px-3 py-1 rounded-full">
                  {index + 1}
                </span>
                <img
                  src={candidate.image}
                  alt={`Candidate ${candidate.id}`}
                  className="w-56 h-56 rounded-full object-cover border-black border-4 "
                />
                <div className="text-center mt-2">
                  <div className="text-white">{candidate.name}</div>
                  <span className="text-[#AEC90A] font-bold">{candidate.votes} votes</span>
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
