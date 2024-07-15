
/*export function Members() {
  return (
    
    <div>
     {
     <div>
      <h2>Members</h2>
      <p>Members of the Club...</p>
     </div>
     }
</div>

  );
};*/

/*import React from 'react'

const CurrentBoard = () => {
  return (
    <div>
      <h2>Current Board</h2>
      <p>Details about the current board members...</p>
    </div>
  )
}

export default CurrentBoard*/

import { Carousel } from "@material-tailwind/react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";

import { IconButton } from "@material-tailwind/react";

/*export function Elections() {
  return (
    
    <div>
     {
     <div>
      <h2>Elections</h2>
      <p>Elections of Club Member...</p>
     </div>
    }
</div>

  );
};*/

/*import React from 'react';

export function Members() {
  

  return (
    <div className="flex justify-center items-center flex-col p-4 rounded-lg" style={{ backgroundColor: '#1E1E1E' }}>
      
    </div>
  );
}*/

/*import React from 'react';

export function Members() {
  // Example data for demonstration
  const members = [
    { id: 1, name: 'John Doe', joined: '2023-01-15', ocParticipation: 'Yes', attendance: '80%' },
    { id: 2, name: 'Jane Smith', joined: '2023-02-20', ocParticipation: 'No', attendance: '95%' },
    { id: 3, name: 'Michael Brown', joined: '2023-03-10', ocParticipation: 'Yes', attendance: '70%' },
  ];

  return (
    <div className="flex justify-center items-center flex-col p-4 rounded-lg" style={{ backgroundColor: '#1E1E1E' }}>
      <table className="table-auto">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Joined</th>
            <th className="px-4 py-2">OC Participation</th>
            <th className="px-4 py-2">Attendance</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id} className="bg-gray-700 text-white">
              <td className="border px-4 py-2">{member.name}</td>
              <td className="border px-4 py-2">{member.joined}</td>
              <td className="border px-4 py-2">{member.ocParticipation}</td>
              <td className="border px-4 py-2">{member.attendance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}*/

import React from 'react';
import presidentImage from '../../assets/members/President.jpg';

export function Members() {
  
  const members = [
    { id: 1, name: 'John Doe', joined: '2023-01-15', ocParticipation: '60%', attendance: '80%' },
    { id: 2, name: 'Jane Smith', joined: '2023-02-20', ocParticipation: 'No', attendance: '95%' },
    { id: 3, name: 'Michael Brown', joined: '2023-03-10', ocParticipation: '50%', attendance: '70%' },
  ];

  return (
    <div className="flex justify-center items-center flex-col p-4 rounded-lg" style={{ backgroundColor: '#1E1E1E' }}>
      <table className="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="text-white"style={{ backgroundColor: '#272727' }}>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Joined</th>
            <th className="px-4 py-2">OC Participation</th>
            <th className="px-4 py-2">Attendance</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id} className=" text-white" style={{ backgroundColor: '#272727' }}>
              <td className="border px-4 py-2 flex items-center">
                <img src={presidentImage} alt={member.name} className="h-8 w-8 rounded-full mr-2" /> {/* Use imported image */}
                {member.name}
              </td>
              <td className="border px-4 py-2">{member.joined}</td>
              <td className="border px-4 py-2">{member.ocParticipation}</td>
              <td className="border px-4 py-2">{member.attendance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}






