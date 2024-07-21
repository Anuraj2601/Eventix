import React from 'react'
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { FaCalendar } from "react-icons/fa6";
import { IoTimeOutline } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { MdPhone } from "react-icons/md";
import { Button } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';

const Event = ({event}) => {
    const navigate = useNavigate();

    const handleRegister = () =>{
        navigate(`/eventregister/${event.event}`);
    }

  return (
    <div className="flex items-center justify-center mt-8 mb-4">
        <div className='bg-[#0b0b0b] p-5 w-3/4 rounded-md' >
            <div className="flex flex-row items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <img src={event.publisher_img} alt="" className='w-11 h-11 rounded-full border-2 border-[#AEC90A]' />
                    <span>{event.publisher_position} ; <b>{event.publisher_name}</b> </span>
                </div>
                <div className="flex items-center gap-4">
                    <HiOutlineDotsVertical className='text-[#AEC90A]' size={30}/>
                    <IoMdClose className='text-[#AEC90A]' size={30}/>
                </div>
            </div>
            <div className="flex flex-col gap-5 mb-8">
                <span className='text-[#AEC90A]'>Join Us at the {event.event}</span>
                <span className='text-[#AEC90A]'>Dead Line for Registration : {event.deadline}  </span>
                <p>Are you ready to take the next step in your career journey? The 2025 Career Fair is the perfect  opportunity for 
                students to explore potential career paths, network with industry professionals, and discover exciting job and 
                internship opportunities ...</p>
                <img src={event.image} alt="" className=' object-cover w-auto h-96 mt-3' />
            </div>
            <div className="flex gap-10 mb-8">
                <div className="flex items-center justify-center border-2 border-[#AEC90A] p-4 gap-3 w-1/3">
                    <FaCalendar className='text-[#AEC90A]' size={30}/>
                    <span>{event.date}</span>
                </div>
                <div className="flex items-center justify-center border-2 border-[#AEC90A] p-4 gap-3 w-1/3">
                    <IoTimeOutline className='text-[#AEC90A]' size={30}/>
                    <span>{event.time}</span>
                </div>
                <div className="flex items-center justify-center border-2 border-[#AEC90A] p-4 gap-3 w-1/3">
                    <FaLocationDot className='text-[#AEC90A]' size={30}/>
                    <span>{event.venue}</span>
                </div>

            </div>
            <div className="flex items-center justify-between mt-11">
                <div className="flex gap-6">
                    <div className="flex items-center justify-center gap-2">
                        <MdPhone  className='text-[#AEC90A]' size={20}/>
                        <span>{event.contact}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <MdEmail className='text-[#AEC90A]' size={20}/>
                        <span>{event.email}</span>
                    </div>
                </div>
                <div className="flex items-center justify-center gap-8">
                    <p className='text-[#AEC90A]'><u className='text-[#AEC90A]'>Why important ?</u></p>
                    <Button className="flex items-center gap-2 bg-[#AEC90A] py-2 px-4 rounded-3xl font-medium text-[#0b0b0b]" onClick={handleRegister}>
                        Register{" "}
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

    </div>
  
  )
}

export default Event