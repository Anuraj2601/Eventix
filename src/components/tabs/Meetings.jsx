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

/*export function Meetings() {
  return (
    
    <div>
     {
     <div className="flex justify-center items-center flex-col p-4 rounded-lg" style={{ backgroundColor: '#1E1E1E' }}>
     </div>
     }
</div>

  );
};*/

/*import React from 'react';

export function Meetings() {
  const events = [
    {
      name: "Regarding next club board elections",
      date: "05.06.2024",
      online: true,
    },
    {
      name: "Regarding next club board elections",
      date: "05.06.2024",
      online: true,
    },
  ];

  return (
    <div className="flex justify-center items-center flex-col p-4 rounded-lg" style={{ backgroundColor: '#1E1E1E' }}>
      {events.map((event, index) => (
        <div key={index} className="w-full h-30 bg-gray-800 rounded-lg p-4 flex items-center mb-4">
          <div className="ml-4">
            <h3 className="flex text-xl text-white">{event.name}</h3>
            <div className="flex justify-between items-center mt-2">
              <span className="text-gray-400">{event.date}</span>
              <div className="flex items-center">
                {event.online && (
                  <>
                    <div style={{ backgroundColor: 'green', width: '10px', height: '10px', marginRight: '5px' }}></div>
                    <p style={{ color: 'white', fontSize: '0.875rem' }}>Online</p>
                  </>
                )}
                {!event.online && (
                  <p style={{ color: 'white', fontSize: '0.875rem' }}>Offline</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}*/
/*import React from 'react';

export function Meetings() {
  const events = [
    {
      name: "Regarding next club board elections",
      date: "05.06.2024",
      online: true,
      joinLink: "https://example.com/join-event1", // Example join link
    },
    {
      name: "Regarding next club board elections",
      date: "05.06.2024",
      online: true,
      joinLink: "https://example.com/join-event2", // Example join link
    },
  ];

  return (
    <div className="flex justify-center items-center flex-col p-4 rounded-lg" style={{ backgroundColor: '#1E1E1E' }}>
      {events.map((event, index) => (
        <div key={index} className="w-full bg-gray-800 rounded-lg p-4 flex items-center mb-4">
          <div className="ml-4">
            <h3 className="text-xl font-semibold text-white">{event.name}</h3>
            <div className="flex justify-between items-center mt-2">
              <span className="text-gray-400">{event.date}</span>
              <div className="flex items-center">
                {event.online && (
                  <>
                    <div style={{ backgroundColor: 'green', width: '10px', height: '10px', marginRight: '5px' }}></div>
                    <p style={{ color: 'white', fontSize: '0.875rem' }}>Online</p>
                    {event.joinLink && (
                      <a href={event.joinLink} className="ml-2 text-white text-sm border border-white px-2 py-1 rounded hover:bg-white hover:text-gray-800">Join</a>
                    )}
                  </>
                )}
                {!event.online && (
                  <p style={{ color: 'white', fontSize: '0.875rem' }}>Offline</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}*/

/*import React from 'react';

export function Meetings() {
  const events = [
    {
      name: "Regarding next club board elections",
      date: "05.06.2024",
      online: true,
      joinLink: "https://example.com/join-event1",
    },
    {
      name: "Regarding next club board elections",
      date: "05.06.2024",
      online: true,
      joinLink: "https://example.com/join-event2",
    },
  ];

  return (
    <div className="flex justify-center items-center flex-col p-4 rounded-lg" style={{ backgroundColor: '#1E1E1E' }}>
      {events.map((event, index) => (
        <div key={index} className="w-full bg-gray-800 rounded-lg p-4 flex items-center mb-4">
          <div className="ml-4">
            <h3 className="text-xl font-semibold text-white">{event.name}</h3>
            <div className="flex justify-between items-center mt-2">
              <span className="text-gray-400">{event.date}</span>
              <div className="flex items-center">
                {event.online && (
                  <>
                    <div style={{ backgroundColor: 'green', width: '10px', height: '10px', marginRight: '5px' }}></div>
                    <p style={{ color: 'white', fontSize: '0.875rem', marginRight: '5px' }}>Online</p>
                    {event.joinLink && (
                      <a href={event.joinLink} className="text-white text-sm border border-white px-2 py-1 rounded hover:bg-white hover:text-gray-800">Join</a>
                    )}
                  </>
                )}
                {!event.online && (
                  <p style={{ color: 'white', fontSize: '0.875rem' }}>Offline</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}*/

/*import React from 'react';

export function Meetings() {
  const events = [
    {
      name: "Regarding next club board elections",
      date: "05.06.2024",
      online: true,
      joinLink: "https://example.com/join-event1",
    },
    {
      name: "Regarding next club board elections",
      date: "05.06.2024",
      online: true,
      joinLink: "https://example.com/join-event2",
    },
  ];

  return (
    <div className="flex justify-center items-center flex-col p-4 rounded-lg" style={{ backgroundColor: '#1E1E1E' }}>
      {events.map((event, index) => (
        <div key={index} className="w-full bg-gray-800 rounded-lg p-4 flex items-center mb-4">
          <div className="ml-4 flex-grow">
            <h3 className="text-xl font-semibold text-white">{event.name}</h3>
            <div className="flex justify-between items-center mt-2">
              <span className="text-gray-400">{event.date}</span>
              <div className="flex items-center">
                {event.online && (
                  <>
                    <div style={{ backgroundColor: 'green', width: '10px', height: '10px', marginRight: '5px' }}></div>
                    <p style={{ color: 'white', fontSize: '0.875rem', marginRight: '5px' }}>Online</p>
                    {event.joinLink && (
                      <a 
                        href={event.joinLink} 
                        className="text-white text-sm border px-2 py-1 rounded" 
                        style={{ backgroundColor: '#5C690A', borderColor: '#5C690A', marginLeft: 'auto' }}
                      >
                        Join
                      </a>
                    )}
                  </>
                )}
                {!event.online && (
                  <p style={{ color: 'white', fontSize: '0.875rem' }}>Offline</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}*/

/*import React from 'react';

export function Meetings() {
  const events = [
    {
      name: "Regarding next club board elections",
      date: "05.06.2024",
      online: true,
      joinLink: "https://example.com/join-event1",
    },
    {
      name: "Regarding next club board elections",
      date: "05.06.2024",
      online: true,
      joinLink: "https://example.com/join-event2",
    },
  ];

  return (
    <div className="flex justify-center items-center flex-col p-4 rounded-lg" style={{ backgroundColor: '#1E1E1E' }}>
      {events.map((event, index) => (
        <div key={index} className="w-full bg-gray-800 rounded-lg p-4 flex flex-col mb-4">
          <div className="ml-4">
            <h3 className="text-xl font-semibold text-white mb-2">{event.name}</h3>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">{event.date}</span>
              <div className="flex items-center">
                {event.online && (
                  <div className="flex items-center">
                    <div style={{ backgroundColor: 'green', width: '10px', height: '10px', marginRight: '5px' }}></div>
                    <p style={{ color: 'white', fontSize: '0.875rem', marginRight: '20px' }}>Online</p>
                  </div>
                )}
                {!event.online && (
                  <p style={{ color: 'white', fontSize: '0.875rem', marginRight: '20px' }}>Offline</p>
                )}
                {event.joinLink && (
                  <a 
                    href={event.joinLink} 
                    className="text-white text-sm border px-2 py-1 rounded" 
                    style={{ backgroundColor: '#5C690A', borderColor: '#5C690A' }}
                  >
                    Join
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

import React from 'react';

export function Meetings() {
  const events = [
    {
      name: "Regarding next club board elections",
      date: "05.06.2024",
      online: true,
      joinLink: "https://example.com/join-event1",
    },
    {
      name: "Planning for Future Club Leadership",
      date: "10.06.2024",
      online: false,
      joinLink: "https://example.com/join-event2",
    },
  ];

  /*return (
    <div className="flex justify-center items-center flex-col p-4 rounded-lg" style={{ backgroundColor: '#1E1E1E' }}>
      {events.map((event, index) => (
        <div key={index} className="w-full rounded-full p-4 flex flex-col mb-4" style={{ backgroundColor: '#171717' }}>
          <div className="ml-4">
            <h3 className="text-md text-white mb-2 ">{event.name}</h3>
            <div className="flex justify-between items-center mt-2">
            <span className="text-gray-400" style={{ color: '#AEC90A' }}>{event.date}</span>
              <div className="flex items-center space-x-4">
                {event.online && (
                  <div className="flex items-center">
                    <div style={{ backgroundColor: '#00DE3E', width: '10px', height: '10px', marginRight: '5px',  borderRadius: '50%' }}></div>
                    

                    <p style={{ color: 'white', fontSize: '0.875rem',marginRight: '350px'}}>online</p>
                  </div>
                )}
                {!event.online && (
                  <div className="flex items-center">
                  <div style={{ backgroundColor: 'red', width: '10px', height: '10px', marginRight: '5px' , borderRadius: '50%' }}></div>
                  <p style={{ color: 'white', fontSize: '0.875rem', marginRight: '335px'  }}>physical</p>
                  </div>
                )}
                {event.joinLink && (
                  <a 
                    href={event.joinLink} 
                    className="text-white text-sm border px-2 py-1 rounded-full" 
                    style={{ backgroundColor: '#5C690A', borderColor: '#5C690A', marginRight: '25px'  }}
                  >
                    JOIN
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );*/
  return (
    <div className="flex justify-center items-center flex-col p-4 rounded-lg" style={{ backgroundColor: '#1E1E1E' }}>
      {events.map((event, index) => (
        <div key={index} className="w-full rounded-full p-4 flex flex-col mb-4" style={{ backgroundColor: '#171717' }}>
          <div className="ml-4">
            <h3 className="text-md text-white mb-2">{event.name}</h3>
            <div className="flex justify-between items-center mt-2">
              <span className="text-gray-400" style={{ color: '#AEC90A' }}>{event.date}</span>
              <div className="flex items-center space-x-4">
                {event.online ? (
                  <div className="flex items-center">
                    <div style={{ backgroundColor: '#00DE3E', width: '10px', height: '10px', marginRight: '5px', borderRadius: '50%' }}></div>
                    <p style={{ color: 'white', fontSize: '0.875rem', marginRight: '400px' }}>Online</p>
                    {event.joinLink && (
                      <a
                        href={event.joinLink}
                        className="text-white text-sm border px-2 py-1 rounded-full"
                        style={{ backgroundColor: '#5C690A', borderColor: '#5C690A' ,width: '70px', height: '30px',marginRight: '40px'}}
                      >
                        Join
                      </a>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center">
                    <div style={{ backgroundColor: 'red', width: '10px', height: '10px', marginRight: '5px', borderRadius: '50%' }}></div>
                    <p style={{ color: 'white', fontSize: '0.875rem', marginRight: '388px' }}>Physical</p>
                    {event.qrLink && (
                      <a
                        href={event.qrLink}
                        className="text-white text-sm border px-2 py-1 rounded-full"
                        style={{ backgroundColor: '#5C690A', borderColor: '#5C690A',width: '70px', height: '30px',marginRight: '40px' }}
                      >
                        Get QR
                      </a>
                    )}
                    {!event.qrLink && (
                      <button
                        className="text-white text-sm border px-2 py-1 rounded-full"
                        style={{ backgroundColor: '#5C690A', borderColor: '#5C690A',width: '70px', height: '30px',marginRight: '40px' }}
                      >
                        Get QR
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
  
}





