import React from 'react'
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { FaCalendar } from "react-icons/fa6";
import { IoTimeOutline } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { Button } from "@material-tailwind/react";

const Event = () => {
  return (
    <div className='event-container bg-[#0b0b0b] p-5' >
        <div className="event-header">
            <img src="src/assets/dp.png" alt="" />
            <span>Executive Vice Chancellor ; <b>Lori Kletzer</b> </span>
            <div className="header-icons">
                <HiOutlineDotsVertical className='text-[#AEC90A]'/>
                <IoMdClose className='text-[#AEC90A]'/>
            </div>
        </div>
        <div className="event-content">
            <span className='text-[#AEC90A]'>Join Us at the 2025 Career Fair !</span>
            <span className='text-[#AEC90A]'>Dead Line for Registration : 30th of March . 2025  </span>
            <p>Are you ready to take the next step in your career journey? The 2025 Career Fair is the perfect  opportunity for 
            students to explore potential career paths, network with industry professionals, and discover exciting job and 
            internship opportunities ...</p>
            <img src="src/assets/events/madhack.jpg" alt="" />
        </div>
        <div className="event-details">
            <div className="event-date">
                <FaCalendar />
                <span>June 20 of 2025 | Friday</span>
            </div>
            <div className="event-time">
                <IoTimeOutline />
                <span>from 9 am to 4 pm</span>
            </div>
            <div className="event-venue">
                <FaLocationDot />
                <span>UCSC Main entrance</span>
            </div>

        </div>
        <div className="event-footer">
            <div className="footer-contact">
                <div className="footer-telephone">
                    <BsFillTelephoneFill />
                    <span>0217988234</span>
                </div>
                <div className="footer-email">
                    <MdEmail />
                    <span>career25@gmail.com</span>
                </div>
            </div>
            <div className="footer-register">
                <p><u>Why important ?</u></p>
                <Button className="flex items-center gap-2 bg-[#AEC90A]">
                    Read More{" "}
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-5 w-5"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    />
                    </svg>
                </Button>
            </div>
        </div>
        
    </div>
  )
}

export default Event