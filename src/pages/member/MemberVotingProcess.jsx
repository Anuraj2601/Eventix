import React from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import VotingCard from "./MemberVotingCard";
import PresidentImage from "/src/assets/candidates/President.jpg";
import President1Image from "/src/assets/candidates/President1.jpg";
import SecretaryImage from "/src/assets/candidates/Secretary.jpg";
import Secretary1Image from "/src/assets/candidates/Secretary1.jpg";
import TreasurerImage from "/src/assets/candidates/Treasurer.jpg";
import Treasurer1Image from "/src/assets/candidates/Treasurer1.jpg";

const MemberVotingProcess = () => {
  const handleVote = (position) => {
    alert(`Voted for ${position}`);
  };

  const presidentCandidates = [
    { name: "Dhanushika", image: PresidentImage },
    { name: "Cusherah", image: President1Image },
    { name: "Dhanushika", image: PresidentImage },
    { name: "Cusherah", image: President1Image }
  ];
  const secretaryCandidates = [
    { name: "Dinithi", image: SecretaryImage },
    { name: "Uththara", image: Secretary1Image },
    { name: "Dinithi", image: SecretaryImage },
    { name: "Uththara", image: Secretary1Image }
  ];
  const treasurerCandidates = [
    { name: "Uththara", image: TreasurerImage },
    { name: "Dhanushika", image: Treasurer1Image },
    { name: "Uththara", image: TreasurerImage },
    { name: "Dhanushika", image: Treasurer1Image },
  ];

  return (
    <>
      <div className="fixed inset-0 flex">
        <Sidebar className="flex-shrink-0" />
        <div className="flex flex-col flex-1">
          <Navbar className="sticky top-0 z-10 p-4" />
          <div className="bg-neutral-900 text-white flex flex-col flex-1 overflow-auto items-center">
            <div className="flex flex-col items-center w-full max-w-3xl space-y-8 mt-10">
              <VotingCard
                title="President"
                candidates={presidentCandidates}
                onVote={() => handleVote("President")}
              />
              <VotingCard
                title="Secretary"
                candidates={secretaryCandidates}
                onVote={() => handleVote("Secretary")}
              />
              <VotingCard
                title="Treasurer"
                candidates={treasurerCandidates}
                onVote={() => handleVote("Treasurer")}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MemberVotingProcess;
