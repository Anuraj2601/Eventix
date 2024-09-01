import React from "react";
import { useParams } from "react-router-dom";
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import ElectionNav from "../../components/election/ElectionNav"; // Updated import path

const Election = () => {
  // const { clubName, electionId } = useParams(); // Get parameters from URL
  const { id } = useParams();

  

  return (
    <div className="fixed inset-0 flex">
      <Sidebar className="flex-shrink-0" />
      <div className="flex flex-col flex-1">
        <Navbar className="sticky top-0 z-10 p-4" />
        <div className="bg-neutral-900 flex-1 text-white flex flex-col overflow-hidden">
          {/* <ElectionNav clubName={clubName} electionId={electionId} /> */}
          <ElectionNav electionId={id} />
        </div>
      </div>
    </div>
  );
};

export default Election;
