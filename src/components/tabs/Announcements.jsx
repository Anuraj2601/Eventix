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

/*export function Announcements() {
  return (
    
    <div>
     {
     <div>
      <h2>Announcements</h2>
      <p>Announcements of Club Member...</p>
     </div>
    }
</div>

  );
};*/

import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Announcements() {
  const navigate = useNavigate();

  const events = [
    {
      name: "The Board elections of term 24/25 will be commenced from period 05.06.2024 - 09.06.2024, all the club members are invited to participate in the voting.",
      
    },
    {
      name: "The Board elections of term 24/25 will be commenced from period 05.06.2024 - 09.06.2024, all the club members are invited to apply as a candidate.",
      joinLink: "/member-election-form",
    },
  ];

  const navigateToForm = (link) => {
    navigate(link);
  };

  return (
    <div className="flex justify-center items-center flex-col p-4 rounded-lg" style={{ backgroundColor: '#1E1E1E' }}>
      {events.map((event, index) => (
        <div key={index} className="w-full rounded-full p-2 flex flex-col mb-4" style={{ backgroundColor: '#171717' }}>
          <div className="ml-4">
            <h3 className="text-md text-white mb-2 ">{event.name}</h3>
            <div className="flex justify-between items-center mt-2">
            
              <div className="flex items-center space-x-4">
                             
               {event.joinLink && (
                  <button
                  onClick={() => navigateToForm(event.joinLink)}
                    className="text-white text-sm border px-4 py-1 rounded-full" 
                   
                    style={{ backgroundColor: '#5C690A', borderColor: '#5C690A', marginLeft: '850px'}}

                  >
                    Apply
                  </button>
                  
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}



