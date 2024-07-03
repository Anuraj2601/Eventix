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

import React from 'react';
import MadhackImg from '../../assets/events/madhack.png';

export function Event() {
  const events = [
    {
      name: "MadHack 3.0",
      image: MadhackImg,
      date: "05.06.2024",
      link: "https://example.com/join-oc",
      linkText: "Join OC",
    },
    {
      name: "MadHack 3.0",
      image: MadhackImg,
      date: "05.06.2024",
      link: "https://example.com/join-oc",
      linkText: "Join OC",
    },
    {
      name: "MadHack 3.0",
      image: MadhackImg,
      date: "05.06.2024",
      link: "https://example.com/join-oc",
      linkText: "Join OC",
    },
    {
      name: "MadHack 3.0",
      image: MadhackImg,
      date: "05.06.2024",
      link: "https://example.com/join-oc",
      linkText: "Join OC",
    },
  ];

  return (
    <div className="flex justify-center items-center flex-col p-4 rounded-lg" style={{ backgroundColor: '#1E1E1E' }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-screen-lg">
        {events.map((event, index) => (
          <div key={index} className="bg-gray-800 rounded-lg p-4">
            <div className="relative">
            <img src={event.image} alt={event.name} className="w-full h-56 object-cover rounded-lg" />
              <div className="w-10 h-10 absolute bottom-0 right-0 m-2 p-1 rounded-full flex justify-center items-center" style={{ backgroundColor: '#AEC90A', color: '#000' }}>
              <span className="font-extrabold text-lg">➔</span>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-semibold text-white">{event.name}</h3>
              <div className="flex justify-between items-center mt-2">
                <a href={event.link} className="text-md " style={{ color: '#AEC90A' }}>
                  {event.linkText}
                </a>
                <span className="text-gray-400">{event.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
