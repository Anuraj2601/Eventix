
/*import React from 'react'

const EventDetails = () => {
  return (
    <div>
      
    </div>
  )
}

export default EventDetails*/

import React from 'react';
import { useLocation } from 'react-router-dom';


export function EventDetail() {
  const location = useLocation();
  const event = location.state?.event;

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div className="flex justify-center items-center flex-col p-4 rounded-lg" style={{ backgroundColor: '#1E1E1E' }}>
      <img src={event.image} alt={event.name} className="w-full h-56 object-cover rounded-lg" />
      <h3 className="text-xl font-semibold text-white mt-4">{event.name}</h3>
      <p className="text-gray-400 mt-2">{event.date}</p>
      <a href={event.link} className="text-md mt-2" style={{ color: '#AEC90A' }}>
        {event.linkText}
      </a>
     
    </div>
  );
}





