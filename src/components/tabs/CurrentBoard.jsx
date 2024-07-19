

import React from 'react';

import PresidentImg from '../../assets/members/President.jpg';
import SecretaryImg from '../../assets/members/Secretary.jpg';
import TreasurerImg from '../../assets/members/Treasurer.jpg';

export function CurrentBoard() {
  const members = [
    {
      name: "President",
      image: PresidentImg,
      mname: "Dhanushika Dharmasena",
    },
    {
      name: "Secretary",
      image: SecretaryImg,
      mname: "Dinithi Dinushika",
    },
    {
      name: "Treasurer",
      image: TreasurerImg,
      mname: "Uththara Jayawardana",
    },
  ];

  return (
    <div className="flex justify-center items-center flex-col p-4 rounded-lg" style={{ backgroundColor: '#1E1E1E' }}>
      <p className="text-2xl  text-white mb-4">Board of Term 23/24</p>
      <div className="flex justify-around w-full max-w-screen-lg">
        {members.map((member) => (
          <div key={member.name} className="flex flex-col items-center mx-4">
            <img src={member.image} alt={member.name} className="w-48 h-48 object-cover rounded-full mb-2" />
            <h3 className="text-xl font-semibold" style={{ color: '#AEC90A' }}>{member.name}</h3>
            <p className="text-md text-white">{member.mname}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
