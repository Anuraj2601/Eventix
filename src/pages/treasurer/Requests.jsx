import React from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import Requests from '../../components/Requests';

const ExploreClub = () => {
    return (
        <div className="fixed inset-0 flex">
            <Sidebar className="flex-shrink-0" />
            <div className="flex flex-col flex-1">
                <Navbar className="sticky top-0 z-10 p-4" />
                <div className="bg-neutral-900 text-white flex flex-col flex-1 overflow-hidden">
                    {/* Directly display the Requests component */}
                    <div className="overflow-y-auto px-10">
                        <Requests />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExploreClub;
