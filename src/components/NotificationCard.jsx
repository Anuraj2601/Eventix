import React from 'react'
import { MdDelete } from "react-icons/md";
import csa from '../assets/clubs/csa.jpeg';

const NotificationCard = () => {
  return (
    <div className='bg-[#1E1E1E] p-6 mx-4 my-2 rounded-2xl'>
        <div className="flex items-center justify-between">
            <div className="flex items-center justify-center gap-4">
              <img src={csa} alt="" className='w-12 h-12 rounded-full'/>
              <span className='text-[#FFFFFFCC]'>(CSA) Student Chapter :</span>
            </div>
           
            <span className='text-[#FFFFFFCC]'>4.45 pm</span>

        </div>
        <div className="flex items-center justify-between p-4 ml-12">
            <p className='text-white w-4/5'>
                “Applied for CSA Student Chapter Club on Design team” Dear student , We got your Response stay active
                with our frequent mails and notifications. we will let you know about Interview Date and Time.         
            </p>
            
            <button
            className="relative align-middle select-none font-sans font-medium text-center uppercase bg-[#171717] transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-14 max-w-[40px] h-14 max-h-[40px] text-xs text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none rounded-full"
            type="button">
            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"><MdDelete className='text-[#AEC90A99]'size={27}/></span></button>


        </div>

    </div>
  )
}

export default NotificationCard