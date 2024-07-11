import React from 'react'
import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar'

const StudentNotifications = () => {
  return (
    <>
      <div className="fixed inset-0 flex">
        <Sidebar className="flex-shrink-0"/>
        <div className="flex flex-col flex-1">
          <Navbar className="sticky top-0 z-10 p-4"/>
          <div className="bg-neutral-900 text-white flex flex-col flex-1 overflow-auto">
            <p className='text-lime-400'>notifications</p>

          </div>

        </div>

      </div>

    </>
  )
}

export default StudentNotifications