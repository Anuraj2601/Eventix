import React from 'react'
import { Button } from "@material-tailwind/react";
import { RiOpenArmLine } from "react-icons/ri";
import { IoMdBookmark } from "react-icons/io";

import isacaImage from "../assets/clubs/isaca1.png";
import wieImage from "../assets/clubs/wie.png";


const ignoredClubs = [
    
    {
      id: "4",
      name: "ISACA Student Group",
      sname: "isaca",
      description: "The Debate Society aims to improve public speaking and critical thinking skills through regular debates, public speaking workshops, and competitions.",
      image: isacaImage,
    },
    {
      id: "5",
      name: "(IEEE WIE) IEEE Women in Engineering",
      sname: "wie",
      description: "The IEEE Women in Engineering (WIE) Student Branch at the University of Colombo School of Computing strives to enhance women’s participation and empowerment in electrical and electronic engineering.",
      image: wieImage,
    },
  ];

// Import your images

const IgnoredClub = () => {
  return (

    <div className='flex flex-wrap items-center justify-center gap-10'>
        {ignoredClubs.map((club, index) => (
            <div key={index} className='bg-[#0B0B0B] p-6 w-2/5 rounded-2xl'>
            <div className="flex items-center justify-between mb-4">
                <div className='flex gap-4 items-center justify-center'>
                    <img src={club.image || exampleClubImage} alt="" className='w-16 h-16 rounded-md'/>
                    <p className='mb-2 tracking-wide text-white font-semibold'>{club.name}</p>
                    {/* <div className="reg">
                        <p className='mb-2 tracking-wide text-white'>{club.club_name}</p>
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
                    </div> */}
                </div>
                
                <IoMdBookmark className='text-[#AEC90A]' size={30}/>

            </div>
            <div className="mb-4">
                <p className='text-[#F5F5F5] '>{club.description}</p>
            </div>
            <div className="flex items-center justify-end gap-4">
                <Button className= "text-[#0B0B0B] px-4 py-2 rounded-3xl font-medium bg-primary">UNDO</Button>
            </div>
            </div>

        ))}
        
    </div>
  )
}

export default IgnoredClub
