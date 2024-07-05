import React from 'react'
import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar'
import { useParams } from 'react-router-dom'
import { Badge, Button } from "@material-tailwind/react";
import ClubRegistrationForm from '../../components/ClubRegistrationForm';

const ClubRegistration = () => {

    const {name} = useParams();
    //console.log(name);

  return (
    <div className='fixed inset-0 flex'>
        <Sidebar className="flex-shrink-0"/>
        <div className='flex flex-col flex-1'>
            <Navbar className="sticky top-0 z-10 p-4"/>
            <div className='bg-neutral-900 text-white flex flex-col flex-1 overflow-auto'>
                <div className='flex mx-5 my-6 relative'>
                    <Badge placement='top-end' className='w-4 h-4 rounded-full bg-[#AEC90A] absolute -top-1 -right-1'>
                        <Button className='bg-neutral-900 border-2 border-[#AEC90A] font-medium py-2 px-4 rounded-xl'>{name}</Button>
                    </Badge>
                  
                </div>
                <div>
                    <ClubRegistrationForm/>
                </div>
                
            </div>

        </div>

    </div>
  )
}

export default ClubRegistration