import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Elections() {
  const navigate = useNavigate();

  const events = [
    {
      name: "Club Board of term 24/26",
      date: "05.06.2024",
      joinLink1: "/member-election-form",
      joinLink2: "/member-voting",
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
                    className="text-black text-md border px-7 py-1 rounded-full" 
                    style={{ backgroundColor: '#AEC90A', borderColor: '#AEC90A', marginRight: '80px' , marginBottom: '10px',  fontSize: '17px'  }}
                  >
                    <strong>Apply</strong>
                  </button>
                )}
                {event.joinLink2 && (
                  <button 
                    onClick={() => navigateToForm(event.joinLink2)} 
                    className="text-black text-md border px-4 py-1 rounded-full" 
                    style={{ backgroundColor: '#FFFFFF', borderColor: 'rgba(92, 105, 10, 0.23)', marginRight: '70px', marginBottom: '10px' , fontSize: '17px' }}
                  >
                    <strong>Vote</strong>
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







