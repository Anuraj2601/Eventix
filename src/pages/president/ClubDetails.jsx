import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { Typography } from "@material-tailwind/react";
import PresidentClubNav from '../../components/PresidentClubNav';
import LikeButton from '../../components/LikeButton';


const clubs = [
    {
        id: "1",
        name: "Rotaract Club of UCSC",
        reg_status: "yes",
        description: "The Rotaract Club of UCSC, part of Rotary International District 3220, empowers youth to enact positive change locally and globally.",
        image: "../src/assets/clubs/rotaract.png",
        sname: "rotract",
    },
    {
        id: "2",
        name: "ACM Student Chapter",
        reg_status: "no",
        description: "The ACM Student Chapter aims to advance computing as a science and profession. Activities include coding competitions, guest lectures, and career development workshops.",
        image: "../src/assets/clubs/acm.png",
        sname: "acm",
    },
    {
        id: "3",
        name: "Pahasara Club (Innovation and Creativity)",
        reg_status: "yes",
        description: "The Pahasara Club offers a platform for photography enthusiasts to enhance their skills through workshops, photo walks, and exhibitions.",
        image: "../src/assets/clubs/pahasara1.png",
    },
    {
        id: "4",
        name: "ISACA Student Group",
        reg_status: "no",
        description: "The Debate Society aims to improve public speaking and critical thinking skills through regular debates, public speaking workshops, and competitions.",
        image: "../src/assets/clubs/isaca1.png",
    },
    {
        id: "5",
        name: "(IEEE WIE) IEEE Women in Engineering",
        reg_status: "yes",
        description: "The IEEE Women in Engineering (WIE) Student Branch at the University of Colombo School of Computing strives to enhance women’s participation and empowerment in electrical and electronic engineering.",
        image: "../src/assets/clubs/wie.png",
    },
    {
        id: "6",
        name: "IEEE Student Chapter",
        reg_status: "yes",
        description: "The IEEE Student Chapter promotes the advancement of technology. Members can participate in technical seminars, project exhibitions, and networking events.",
        image: "../src/assets/clubs/ieee.png",
    },
    {
        id: "7",
        name: "Mechatronic Society Of UCSC",
        reg_status: "no",
        description: "The Mechatronic Society Of UCSC focuses on sustainability and environmental awareness. Activities include clean-up drives, tree planting, and educational workshops.",
        image: "../src/assets/clubs/ms.png",
    },
    {
        id: "8",
        name: "Women in Cybersecurity",
        reg_status: "no",
        description: "This club is part of the Institute of Electrical and Electronics Engineers (IEEE) and focuses on all aspects of computer science and engineering.",
        image: "../src/assets/clubs/wicys.png",
    },
    {
        id: "9",
        name: "Rekha",
        reg_status: "yes",
        description: "Get the opportunity to learn from industry professionals, prepare for certifications like CISA and CRISC and and network with professionals in the field.",
        image: "../src/assets/clubs/rekha.png",
    },
];

const ClubDetails = () => {
  const { clubName } = useParams();
  const location = useLocation();
  const { club } = location.state || {};
  

  if (!club) {
    return <div>Club not found</div>;
  }

  let clubDetails = {};
  for (const clubItem of clubs) {
    if (clubItem.image === club.image) {
      clubDetails = clubItem;
      break;
    }
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar className="flex-shrink-0" />
      <div className="flex flex-col flex-1 h-full overflow-y-auto">
        <Navbar className="sticky top-0 z-10 p-4" />
        <div className="bg-neutral-900 text-white flex flex-col flex-1 p-6 relative"> {/* Added relative positioning for overlay */}
          <div className="flex items-start mb-6 bg-[#1E1E1E] p-5 shadow-lg rounded-full">
            <div className="rounded-full overflow-hidden w-24 h-24 flex-shrink-0"> {/* Circle container for image with reduced size */}
              <img
                src={club.image}
                alt={club.name}
                className="object-cover w-full h-full"
              />
            </div>               

            <div className="ml-4 flex flex-col justify-center"> {/* Details column */}
              <Typography variant="h5" className="text-white mb-2">
                {club.name}

              </Typography>
              <div className=""> {/* Transparent box with shadow */}
    {clubDetails.description.split('\n').map((line, index) => (
        <Typography key={index} variant="body1" className="text-white">
            {line}
        </Typography>
        
    ))}
   <LikeButton initialLikes={320} className="mt-1" />
</div>
            </div>
            
          </div>
          <PresidentClubNav club={club} />
        </div>
      </div>
    </div>
  );
};

export default ClubDetails;
