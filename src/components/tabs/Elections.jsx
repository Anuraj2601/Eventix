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

export function Elections() {
  const events = [
    {
      name: "Club Board of term 24/26",
      date: "05.06.2024",
      joinLink1: "https://example.com/join-event1",
      joinLink2: "https://example.com/join-event2",
    },
    
  ];

  return (
    <div className="flex justify-center items-center flex-col p-4 rounded-lg" style={{ backgroundColor: '#1E1E1E' }}>
      {events.map((event, index) => (
        <div key={index} className="w-full rounded-full p-2 flex flex-col mb-4" style={{ backgroundColor: '#171717' }}>
          <div className="ml-4">
            <h3 className="text-md text-white mb-2 ">{event.name}</h3>
            <div className="flex justify-between items-center mt-2">
            
            <span className="text-gray-400" style={{ color: '#FFFFFF' }}>Deadline : <span style={{ color: '#AEC90A' }}>{event.date}</span></span>

              <div className="flex items-center space-x-4">
              {event.joinLink1 && (
                  <a 
                    href={event.joinLink1} 
                    className="text-black text-sm border px-7 py-1 rounded-full" 
                    style={{ backgroundColor: '#5C690A', borderColor: '#5C690A', marginRight: '80px' , marginBottom: '10px'  }}
                  >
                    Apply
                  </a>
                  
                )}
               
                {event.joinLink2 && (
                  <a 
                    href={event.joinLink2} 
                    className="text-black text-sm border px-4 py-1 rounded-full" 
                    style={{ backgroundColor: '#FFFFFF', borderColor: 'rgba(92, 105, 10, 0.23)', marginRight: '70px', marginBottom: '10px'  }}

                  >
                    VOTE
                  </a>
                  
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}*/





// src/components/Elections.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Elections() {
  const navigate = useNavigate();

  const events = [
    {
      name: "Club Board of term 24/26",
      date: "05.06.2024",
      joinLink1: "/member-election-form",
      joinLink2: "https://example.com/join-event2",
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
              <span className="text-gray-400" style={{ color: '#FFFFFF' }}>Deadline : <span style={{ color: '#AEC90A' }}>{event.date}</span></span>
              <div className="flex items-center space-x-4">
                {event.joinLink1 && (
                  <button 
                    onClick={() => navigateToForm(event.joinLink1)}
                    className="text-black text-sm border px-7 py-1 rounded-full" 
                    style={{ backgroundColor: '#5C690A', borderColor: '#5C690A', marginRight: '80px' , marginBottom: '10px'  }}
                  >
                    Apply
                  </button>
                )}
                {event.joinLink2 && (
                  <a 
                    href={event.joinLink2} 
                    className="text-black text-sm border px-4 py-1 rounded-full" 
                    style={{ backgroundColor: '#FFFFFF', borderColor: 'rgba(92, 105, 10, 0.23)', marginRight: '70px', marginBottom: '10px'  }}
                  >
                    VOTE
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}







