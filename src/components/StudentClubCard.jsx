import React from 'react'
import { Button } from "@material-tailwind/react";
import { RiOpenArmLine } from "react-icons/ri";
import { IoMdBookmark } from "react-icons/io";

const StudentClubCard = () => {
  return (
    <div className='bg-[#0B0B0B] p-6 w-2/5 rounded-2xl'>
        <div className="flex items-center justify-between mb-4">
            <div className='flex gap-4'>
                <img src="src/assets/clubs/csa.jpeg" alt="" className='w-16 h-16 rounded-md'/>
                <div className="reg">
                    <p className='mb-2 tracking-wide'>(CSA) Student Chapter</p>
                    <div className='flex gap-3'>
                        <RiOpenArmLine className='text-[#AEC90A]' size={20}/>
                        <span className='text-[#AEC90A]'>Registrations are Open</span>
                    </div>  
                </div>
            </div>
            
            <IoMdBookmark className='text-[#AEC90A]' size={30}/>

        </div>
        <div className="mb-4">
            <p className='text-[#F5F5F5] '>Get the opportunity to learn from industry professionals, prepare
            for certifications like CISA and CRISC and and network with 
            professionals in the field.</p>
        </div>
        <div className="flex items-center justify-end gap-4">
            <Button className="bg-white text-[#0B0B0B] px-4 py-2 rounded-3xl font-medium">Ignore</Button>
            <Button className="bg-[#AEC90A] text-[#0B0B0B] px-4 py-2 rounded-3xl font-medium">Register</Button>
        </div>
        
    </div>
  )
}

export default StudentClubCard