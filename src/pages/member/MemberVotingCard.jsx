// import React from "react";

// const MemberVotingCard = ({ title, candidates, onVote }) => {
//   return (
//     <div className="bg-neutral-800 rounded-lg p-6 w-full">
//       <p className="text-xl text-white mb-4 text-center">
//         {/* Select <span className="text-[#AEC90A]">one</span> candidate for the {title} position */}
//         Select <span className="text-[#AEC90A]">one</span> candidate for the <span className="text-[#AEC90A]">{title}</span> position
//       </p>
//       <div className="flex justify-center space-x-4">
//         {candidates.map((candidate, index) => (
//           <div key={index} className="flex flex-col items-center">
//             <button className="rounded-full overflow-hidden mb-2" style={{ width: "170px", height: "170px" }}>
//               <img src={candidate.image} alt={candidate.name} className="object-cover w-full h-full" />
//             </button>
//             <p className="text-sm text-white">{candidate.name}</p>
//           </div>
//         ))}
//       </div>
//       <div className="flex justify-center mt-4">
//         <button onClick={onVote} className="bg-[#AEC90A] px-4 py-2 rounded-3xl font-medium text-[#0B0B0B]">
//           Submit
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MemberVotingCard;
import React, { useState } from "react";

const MemberVotingCard = ({ title, candidates, onVote }) => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const handleSelect = (index) => {
    setSelectedCandidate(index);
  };

  return (
    <div className="bg-neutral-800 rounded-lg p-6 w-full">
      <p className="text-xl text-white mb-4 text-center">
        Select <span className="text-[#AEC90A]">one</span> candidate for the <span className="text-[#AEC90A]">{title}</span> position
      </p>
      <div className="flex justify-center space-x-4">
        {candidates.map((candidate, index) => (
          <div key={index} className="flex flex-col items-center">
            <button
              onClick={() => handleSelect(index)}
              className={`rounded-full overflow-hidden mb-2 ${selectedCandidate === index ? 'ring-4 ring-[#AEC90A]' : ''}`}
              style={{ width: "170px", height: "170px" }}
            >
              <img src={candidate.image} alt={candidate.name} className="object-cover w-full h-full" />
            </button>
            <p className="text-sm text-white">{candidate.name}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button onClick={() => onVote(selectedCandidate)} className="bg-[#AEC90A] px-4 py-2 rounded-3xl font-medium text-[#0B0B0B]">
          Submit
        </button>
      </div>
    </div>
  );
};

export default MemberVotingCard;

