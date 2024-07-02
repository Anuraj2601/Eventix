import React from 'react'
import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar'
import Event from '../../components/Event'

const StudentDashboard = () => {
  return (
    <div className="fixed inset-0 flex">
        <Sidebar className="flex-shrink-0"/>
        <div className="flex flex-col flex-1">
            <Navbar className="sticky top-0 z-10 p-4"/>
            <div className="bg-neutral-900 text-white flex flex-col flex-1 overflow-auto">
                <Event/>
            </div>

        </div>

    </div>
  )
}

export default StudentDashboard