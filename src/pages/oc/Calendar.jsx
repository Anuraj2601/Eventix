import React from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import Calendar from '../../components/Calendar'; // Import the Calendar component

const Calendarpage = () => {
    return (
        <div className="fixed inset-0 flex">
            <Sidebar className="flex-shrink-0" />
            <div className="flex flex-col flex-1">
                <Navbar className="sticky top-0 z-10 p-4" />
                <div className="h-screen bg-neutral-900 text-white flex flex-col">
  <div className="flex-1 overflow-y-auto p-5">
    <Calendar /> {/* Render the Calendar component */}
  </div>
</div>

            </div>
        </div>
    );
}

export default Calendarpage;
