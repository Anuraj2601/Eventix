import React from 'react'
import { Button } from "@material-tailwind/react";
import { RiOpenArmLine } from "react-icons/ri";
import { IoMdBookmark } from "react-icons/io";

const StudentClubCard = ({club}) => {
  return (
    <div className='bg-[#0B0B0B] p-6 w-2/5 rounded-2xl'>
        <div className="flex items-center justify-between mb-4">
            <div className='flex gap-4'>
                <img src={club.image} alt="" className='w-16 h-16 rounded-md'/>
                <div className="reg">
                    <p className='mb-2 tracking-wide'>{club.club_name}</p>
                    <div className='flex gap-3'>
                        {
                            club.reg_status === 'yes' && (
                            <>
                                <RiOpenArmLine className='text-[#AEC90A]' size={20} />
                                <span className='text-[#AEC90A]'>Registrations are Open</span>
                            </>
                            )
                        }
                        {
                            club.reg_status === 'no' && (
                            <>
                                <RiOpenArmLine className='text-[#5C690A]' size={20} />
                                <span className='text-[#5C690A]'>Registrations are Closed</span>
                            </>
                            )
                        }
                       
                    </div>  
                </div>
            </div>
            
            <IoMdBookmark className='text-[#AEC90A]' size={30}/>

        </div>
        <div className="mb-4">
            <p className='text-[#F5F5F5] '>{club.description}</p>
        </div>
        <div className="flex items-center justify-end gap-4">
            <Button className="bg-white text-[#0B0B0B] px-4 py-2 rounded-3xl font-medium">Ignore</Button>
            <Button className= {`text-[#0B0B0B] px-4 py-2 rounded-3xl font-medium ${club.reg_status === "yes" ? 'bg-[#AEC90A]' : 'bg-[#AEC90A80]'}`} >Register</Button>
        </div>
        
    </div>
  )
}

export default StudentClubCard