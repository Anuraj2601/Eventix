import React from 'react';
import ieeeImg from '../assets/clubs/ieee.png';
import rotaractImg from '../assets/clubs/rotaract.png';
import acmImg from '../assets/clubs/acm.png';
import isacaImg from '../assets/clubs/isaca1.png';
import wieImg from '../assets/clubs/wie.png';
import msImg from '../assets/clubs/ms.png';
import wicysImg from '../assets/clubs/wicys.png';
import rekhaImg from '../assets/clubs/rekha.png';
import pahasaraImg from '../assets/clubs/pahasara1.png';

// Event images
import ieee1 from '../assets/events/madhack.png';
import ieee2 from '../assets/events/reid.jpg';
import ieee3 from '../assets/events/intro.jpg';
import ieee4 from '../assets/events/ieeeday.jpg';
import ieee5 from '../assets/events/revol.jpg';
import ieee6 from '../assets/events/reid2.jpg';

const upcomingItems = [
  { id: 1, name: "IEEE Event", image: ieee1 },
  { id: 2, name: "Rotaract Meeting", image: rotaractImg },
  { id: 3, name: "ACM Hackathon", image: acmImg },
  { id: 4, name: "ISACA Seminar", image: isacaImg },
  { id: 5, name: "WIE Conference", image: wieImg },
  { id: 6, name: "Microsoft Workshop", image: msImg },
  { id: 7, name: "WiCyS Webinar", image: wicysImg },
  { id: 8, name: "Rekha Event", image: rekhaImg },
  { id: 9, name: "Pahasara Exhibition", image: pahasaraImg }
];

const Upcoming = () => {
  return (
    <div className="bg-[#0b0b0b] p-5 rounded-md" style={{ 
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' 
    }}>
      <h2 className="text-[#AEC90A] text-lg font-bold mb-4">Upcoming Events</h2>
      <div className="space-y-4">
        {upcomingItems.map(item => (
          <div key={item.id} className="flex items-center gap-4 p-3 bg-neutral-800 rounded-md">
            <img src={item.image} alt={item.name} className="w-16 h-16 rounded-full" />
            <div>
              <h3 className="text-white">{item.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Upcoming;
