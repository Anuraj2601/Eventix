import React from 'react';
import { MdDelete } from "react-icons/md";
import ieeeImage from "../assets/clubs/ieee.png";
import rotaractImage from "../assets/clubs/rotaract.png";
import acmImage from "../assets/clubs/acm.png";
import pahasaraImage from "../assets/clubs/pahasara1.png";
import isacaImage from "../assets/clubs/isaca1.png";
import wieImage from "../assets/clubs/wie.png";
const notifications = [
  {
    id: 1,
    image: ieeeImage,
    title: "(IEEE) Institute of Electrical and Electronics Engineers",
    time: "4:45 pm",
    message: "Applied for IEEE Student Chapter Club. Dear student, we received your application. Stay tuned for further updates regarding your interview schedule."
  },
  {
    id: 2,
    image: rotaractImage,
    title: "(Rotaract) Rotaract Club",
    time: "2:30 pm",
    message: "Your membership application for Rotaract Club has been received. We will notify you about the upcoming orientation session."
  },
  {
    id: 3,
    image: acmImage,
    title: "(ACM) Association for Computing Machinery",
    time: "10:00 am",
    message: "Thank you for applying to join ACM. We will review your application and get back to you soon with more information."
  },
  {
    id: 4,
    image: pahasaraImage,
    title: "(Pahasara) Pahasara Club",
    time: "1:15 pm",
    message: "We have received your interest in joining Pahasara Club. Please keep an eye on your email for further details."
  },
  {
    id: 5,
    image: isacaImage,
    title: "(ISACA) Information Systems Audit and Control Association",
    time: "11:30 am",
    message: "Your application for ISACA has been successfully submitted. We will notify you about the next steps soon."
  },
  {
    id: 6,
    image: wieImage,
    title: "(WIE) Women in Engineering",
    time: "3:00 pm",
    message: "Thanks for your application to WIE. We will review your details and send you further instructions."
  },
];

const NotificationCard = ({ image, title, time, message }) => {
  return (
    <div className='bg-[#1E1E1E] p-6 mx-4 my-2 rounded-2xl'>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center gap-4">
          <img src={image} alt="" className='w-12 h-12 rounded-full'/>
          <span className='text-[#FFFFFFCC]'>{title} :</span>
        </div>
        <span className='text-[#FFFFFFCC]'>{time}</span>
      </div>
      <div className="flex items-center justify-between p-4 ml-12">
        <p className='text-white w-4/5'>
          {message}
        </p>
        <button
          className="relative align-middle select-none font-sans font-medium text-center uppercase bg-[#171717] transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-14 max-w-[40px] h-14 max-h-[40px] text-xs text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none rounded-full"
          type="button">
          <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <MdDelete className='text-[#AEC90A99]' size={27}/>
          </span>
        </button>
      </div>
    </div>
  );
}

const NotificationPage = () => {
  return (
    <div className="flex flex-col">
      {notifications.map(notification => (
        <NotificationCard
          key={notification.id}
          image={notification.image}
          title={notification.title}
          time={notification.time}
          message={notification.message}
        />
      ))}
    </div>
  );
}

export default NotificationPage;
