import React from 'react'
import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar'
import Event from '../../components/Event'

import dp from '../../assets/dp.png';
import dp1 from '../../assets/dp1.png';
import madhackImage from '../../assets/events/madhack.jpg';
import hackathonImage from '../../assets/events/hackathon.png';
import rekaImage from '../../assets/events/reka.jpg';
import careerfairImage from '../../assets/events/careerfair.jpeg';
import dhackImage from '../../assets/events/dhack.jpg';

const Dashboard = () => {

  const events = [
    {
      id: "1",
      publisher_name: "Lori Kletzer",
      publisher_position: "Executive Vice Chancellor",
      publisher_img: dp,
      event: "2025 Career Fair",
      deadline: "30th of March 2025",
      description: "Join us for the annual career fair to meet potential employers and learn about job opportunities.",
      date: "20.08.2025",
      time: "@ 9 am",
      venue: "UCSC Main entrance",
      contact: "0217988234",
      email: "career25@gmail.com",
      image: madhackImage,
    },
    {
      id: "2",
      publisher_name: "John Doe",
      publisher_position: "President, Student Union",
      publisher_img: dp1,
      event: "Tech Symposium 2025",
      deadline: "10th of April 2025",
      description: "A symposium showcasing the latest in technology and innovation.",
      date: "25.09.2025",
      time: "@ 10 am",
      venue: "UCSC Auditorium",
      contact: "0217988235",
      email: "techsymposium@ucsc.edu",
      image: hackathonImage,
    },
    {
      id: "3",
      publisher_name: "Jane Smith",
      publisher_position: "Dean of Students",
      publisher_img: dp,
      event: "Health and Wellness Fair",
      deadline: "15th of May 2025",
      description: "An event focused on promoting health and wellness among students.",
      date: "30.05.2025",
      time: "@ 8 am",
      venue: "UCSC Sports Complex",
      contact: "0217988236",
      email: "wellnessfair@ucsc.edu",
      image: rekaImage,
    },
    {
      id: "4",
      publisher_name: "Mark Johnson",
      publisher_position: "Director of Alumni Relations",
      publisher_img: dp1,
      event: "Alumni Homecoming 2025",
      deadline: "20th of June 2025",
      description: "Reconnect with fellow alumni and celebrate our university's achievements.",
      date: "30.06.2025",
      time: "@ 8 am",
      venue: "UCSC Alumni Hall",
      contact: "0217988237",
      email: "homecoming@ucsc.edu",
      image: careerfairImage,
    },
    {
      id: "5",
      publisher_name: "Emily Brown",
      publisher_position: "Director of Student Activities",
      publisher_img: dp,
      event: "Cultural Festival 2025",
      deadline: "5th of August 2025",
      description: "Celebrate the diversity of our campus with performances, food, and art from different cultures.",
      date: "03.05.2025",
      time: "@ 8 am",
      venue: "UCSC Quad",
      contact: "0217988238",
      email: "culturalfest@ucsc.edu",
      image: dhackImage,
    }
  ];

  return (
    <div className="fixed inset-0 flex">
        <Sidebar className="flex-shrink-0"/>
        <div className="flex flex-col flex-1">
            <Navbar className="sticky top-0 z-10 p-4"/>
            <div className="bg-neutral-900 text-white flex flex-col flex-1 overflow-auto">
                
                  {events.length === 0 && <div className='text-[#AEC90A]'> No events yet</div>}
                  {events.length > 0 && events.map( event => <Event event= {event} key={event.id}/>)}
                
                

                
            </div>

        </div>

    </div>
  )
}

export default Dashboard