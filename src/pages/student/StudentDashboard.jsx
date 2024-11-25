import React from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import Event from '../../components/Event';
import Upcoming from '../../components/Upcoming';
import Feedback from '../../components/Feedback';

// Import images
import dp from '../../assets/clubs/ieee.png';
import dp1 from '../../assets/clubs/rotaract.png';
import madhackImage from '../../assets/events/flix.jpg';
import hackathonImage from '../../assets/events/rainbow.jpg';
import rekaImage from '../../assets/events/journey.jpg';
import careerfairImage from '../../assets/events/session.jpg';
import dhackImage from '../../assets/events/install.jpg';

import vesakImage from "../../assets/vesak.jpg";
import eidImage from "../../assets/farewell.jpg";
import farewellImage from "../../assets/farewell.jpg";
import esalaImage from "../../assets/esala.jpg";
import posonImage from "../../assets/poson.jpg";
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

  const events = [
    {
      id: "2",
      publisher_name: "John Doe",
      publisher_position: "President of Club IEEE",
      publisher_img: dp1,
      event: "Tech Symposium 2025",
      deadline: "10th of April 2025",
      description: "A symposium showcasing the latest in technology and innovation.",
      date: "25.09.2025",
      time: "10 am",
      venue: "UCSC Mini Auditorium",
      contact: "0217988235",
      email: "techsymposium@ucsc.edu",
      image: hackathonImage,
    },
    {
      id: "1",
      publisher_name: "Lori Kletzer",
      publisher_position: "President of Club Rotaract",
      publisher_img: dp,
      event: "2025 Career Fair",
      deadline: "30th of March 2025",
      description: "Join us for the annual career fair to meet potential employers and learn about job opportunities.",
      date: "20.08.2025",
      time: "9 am",
      venue: "UCSC Mini Auditorium",
      contact: "0217988234",
      email: "career25@gmail.com",
      image: eidImage,
      
    },
   
    {
      id: "3",
      publisher_name: "Jane Smith",
      publisher_position: "President of Club ACM",
      publisher_img: dp,
      event: "Health and Wellness Fair",
      deadline: "15th of May 2025",
      description: "An event focused on promoting health and wellness among students.",
      date: "30.05.2025",
      time: "8 am",
      venue: "UCSC Mini Auditorium",
      contact: "0217988236",
      email: "wellnessfair@ucsc.edu",
      image: rekaImage,
    },
    {
      id: "4",
      publisher_name: "Mark Johnson",
      publisher_position: "President of Club Rotaract",
      publisher_img: dp1,
      event: "Alumni Homecoming 2025",
      deadline: "20th of June 2025",
      description: "Reconnect with fellow alumni and celebrate our university's achievements.",
      date: "30.06.2025",
      time: "8 am",
      venue: "UCSC Mini Auditorium",
      contact: "0217988237",
      email: "homecoming@ucsc.edu",
      image: careerfairImage,
    },
    {
      id: "5",
      publisher_name: "John Doe",
      publisher_position: "President of Club IEEE",
      publisher_img: dp,
      event: "Cultural Festival 2025",
      deadline: "5th of August 2025",
      description: "Celebrate the diversity of our campus with performances, food, and art from different cultures.",
      date: "03.05.2025",
      time: "8 am",
      venue: "UCSC Mini Auditorium",
      contact: "0217988238",
      email: "culturalfest@ucsc.edu",
      image: dhackImage,
    }
  ];

  return (
    <div className="fixed inset-0 flex">
      <Sidebar className="flex-shrink-0" />
      <div className="flex flex-col flex-1">
        <Navbar className="sticky top-0 z-10 p-4" />
        <div className="bg-neutral-900 text-white flex flex-1 overflow-y-auto">
  <div className="w-1/2 px-2 ml-2 overflow-y-auto">
    {events.length === 0 && <div className='text-[#AEC90A]'>No events yet</div>}
    {events.length > 0 && events.map(event => <Event event={event} key={event.id} />)}
  </div>
  <div className="w-2/4 flex flex-col py-1 h-full">
    <div className="mb-4 h-[380px] overflow-y-auto rounded-2xl ">
      <Upcoming />
    </div>
    <div className="flex-1  overflow-y-auto  mb-4" >      <Feedback />

    </div>
  </div>
</div>

        </div>
      </div>
  );
}

export default Dashboard;
