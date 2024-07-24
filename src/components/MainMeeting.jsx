import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const MainMeeting = () => {
    return (
        <div className="fixed inset-0 flex">
            <Sidebar className="flex-shrink-0" />
            <div className="flex flex-col flex-1">
                <Navbar className="sticky top-0 z-10 p-4" />
                <div className="bg-neutral-900 text-white flex flex-col flex-1 overflow-hidden">
                    <div className="p-6 overflow-y-auto">
                         {/* main  meetings content */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainMeeting;
