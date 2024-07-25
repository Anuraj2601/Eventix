import { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import physicalMeeting from '../assets/physicalMeeting.png';
import ieee from '../assets/ieee.jpeg';
import isaca from '../assets/isaca.png';
import rotract from '../assets/rotract.jpeg';

const MainMeeting = () => {
    const [selectedFilter, setSelectedFilter] = useState('physical');

    const meetingAnnouncements = [
        { 
            id: 1, 
            title: 'Monthly Strategy Meeting', 
            description: 'Discussing next month’s strategic goals.', 
            date: '2024-08-05', 
            time: '10:00 AM', 
            location: 'S104', 
            postedDate: '2024-07-25', 
            postedTime: '10:00 AM', 
            clubName: 'IEEE Student Chapter', 
            clubImage: ieee
        },
        { 
            id: 2, 
            title: 'Team Building Workshop', 
            description: 'A workshop designed to enhance team collaboration.', 
            date: '2024-08-12', 
            time: '02:00 PM', 
            location: 'W002', 
            postedDate: '2024-07-26', 
            postedTime: '11:00 AM', 
            clubName: 'ISACA', 
            clubImage: isaca,
        },
        { 
            id: 3, 
            title: 'Quarterly Review Meeting', 
            description: 'Reviewing the company’s quarterly performance.', 
            date: '2024-08-20', 
            time: '09:00 AM', 
            location: 'E104', 
            postedDate: '2024-07-27', 
            postedTime: '09:00 AM', 
            clubName: 'ROTRACT', 
            clubImage: rotract
        },
    ];

    const handleGetQRCode = (id) => {
        console.log('Get QR Code for meeting ID:', id);
    };

    const renderContent = () => {
        if (selectedFilter === 'physical') {
            return (
                <div className="flex flex-col items-center">
                    <img src={physicalMeeting} alt="Physical Meeting" className="w-full h-auto mb-6 rounded-lg shadow-lg" />
                </div>
            );
        } else {
            return (
                <div className="flex flex-col items-center">
                    <div className="bg-dark-500 p-4 rounded-lg w-full max-w-md text-center">
                        <h2 className="text-xl font-bold mb-4">Join an Online Meeting</h2>
                        <input
                            type="text"
                            placeholder="Meeting ID"
                            className="bg-neutral-800 p-2 mb-4 rounded w-full text-white"
                        />
                        <button className="px-4 py-2 bg-primary text-black rounded font-medium w-full">
                            Join Meeting
                        </button>
                    </div>
                </div>
            );
        }
    };

    const renderMeetingAnnouncements = () => {
        return (
            <div className="p-4 rounded-lg">
                <h2 className="text-[16px] font-medium mb-4">Upcoming Physical Meetings</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {meetingAnnouncements.map((announcement) => (
                        <div key={announcement.id} className="relative bg-dark-500 rounded-lg flex flex-col items-center p-4 h-80">
                            <div className="flex flex-col items-center mb-6 flex-grow">
                                <img src={announcement.clubImage} alt={announcement.clubName} className="w-12 h-12 rounded-full mb-2" />
                                <p className="text-sm text-primary font-semibold">{announcement.clubName}</p>
                                <p className="text-sm text-center mt-2">
                                    <span className="block font-medium leading-loose">{announcement.title}</span>
                                    {announcement.description}
                                    <span className='block text-[20px] text-primary opacity-100 mt-6'>
                                        {announcement.date} | {announcement.time} | {announcement.location}
                                    </span>
                                </p>
                            </div>
                            <button 
                                onClick={() => handleGetQRCode(announcement.id)} 
                                className="px-4 py-2 bg-primary text-black rounded font-medium mb-10 "
                            >
                                Get QR Code
                            </button>
                            <div className="text-xs text-gray-400 absolute bottom-2 w-full text-right">
                                <span className="mx-0">{announcement.postedDate}</span>
                                <span className="mx-2">{announcement.postedTime}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="fixed inset-0 flex">
            <Sidebar className="flex-shrink-0" />
            <div className="flex flex-col flex-1">
                <Navbar className="sticky top-0 z-10 p-4" />
                <div className="bg-neutral-900 text-white flex flex-col flex-1 overflow-hidden">
                    <div className="p-0 overflow-y-auto">
                        <div className="flex justify-left ml-4 mb-6">
                            <button
                                className={`px-0 py-2 ${selectedFilter === 'physical' ? 'text-primary border-b-2 border-primary' : 'text-white'}`}
                                onClick={() => setSelectedFilter('physical')}
                            >
                                Physical Meeting
                            </button>
                            <button
                                className={`px-4 py-2 ml-4 ${selectedFilter === 'online' ? 'text-primary border-b-2 border-primary' : 'text-white'}`}
                                onClick={() => setSelectedFilter('online')}
                            >
                                Online Meeting
                            </button>
                        </div>
                        {renderContent()}
                        {renderMeetingAnnouncements()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainMeeting;
