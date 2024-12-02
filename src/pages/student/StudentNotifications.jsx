import React from 'react'
import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar'
import NotificationCard from '../../components/NotificationCard'
import { BsFillBellFill } from "react-icons/bs";

const StudentNotifications = () => {
  return (
    <>
      <div className="fixed inset-0 flex">
        <Sidebar className="flex-shrink-0"/>
        <div className="flex flex-col flex-1">
          <Navbar className="sticky top-0 z-10 p-4"/>
          <div className="bg-neutral-900 text-white flex flex-col flex-1 overflow-auto p-5">
            <div className="flex items-center gap-4 m-6">
              <BsFillBellFill className='text-[#AEC90A]' size={25}/>
              <span className='text-[#AEC90A]'>notifications</span>
            </div>
            {/* <div>Mark all as read</div> */}
            
            <NotificationCard/>
          </div>

        </div>

      </div>

    </>
  )
}

export default StudentNotifications