import { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import physicalMeeting from '../assets/physicalMeeting02.png';
import onlineMeeting from '../assets/onlineMeeting.png';
import ieee from '../assets/ieee.jpeg';
import isaca from '../assets/isaca.png';
import rotract from '../assets/rotract.jpeg';

const MainMeeting = () => {
    const [selectedFilter, setSelectedFilter] = useState('physical');
    const [showPopup, setShowPopup] = useState(false);
    const [currentMeeting, setCurrentMeeting] = useState(null);
    const [reason, setReason] = useState('');

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
            description: 'A workshop to enhance team collaboration.', 
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

    const unionAnnouncements = [
        { 
            id: 1, 
            title: 'Union General Meeting', 
            description: 'Annual general meeting for all union members.', 
            date: '2024-09-01', 
            time: '03:00 PM', 
            location: 'Main Hall', 
            postedDate: '2024-07-25', 
            postedTime: '10:00 AM'
        },
        { 
            id: 2, 
            title: 'Union Budget Review', 
            description: 'Review of the annual budget and allocation.', 
            date: '2024-09-10', 
            time: '01:00 PM', 
            location: 'Conference Room A', 
            postedDate: '2024-07-26', 
            postedTime: '11:00 AM'
        },
        { 
            id: 3, 
            title: 'Union Leadership Summit', 
            description: 'Meeting of union leaders to discuss future strategies.', 
            date: '2024-09-15', 
            time: '09:00 AM', 
            location: 'Main Hall', 
            postedDate: '2024-07-27', 
            postedTime: '09:00 AM'
        },
        { 
            id: 4, 
            title: 'Union Member Engagement Event', 
            description: 'Event to engage with union members and discuss ongoing projects.', 
            date: '2024-09-20', 
            time: '02:00 PM', 
            location: 'Event Center', 
            postedDate: '2024-07-28', 
            postedTime: '10:00 AM'
        },
    ];

    const handleDeclineMeeting = (id) => {
        const meeting = meetingAnnouncements.find((announcement) => announcement.id === id);
        setCurrentMeeting(meeting);
        setShowPopup(true);
    };

    const handlePopupClose = () => {
        setShowPopup(false);
        setReason('');
        setCurrentMeeting(null);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        console.log('Reason:', reason);
        handlePopupClose();
    };

    const handleJoinMeeting = (id) => {
        console.log('Join Meeting:', id);
    };

    const renderContent = () => {
        if (selectedFilter === 'physical') {
            return (
                <div className="flex flex-col items-center">
                    <img src={physicalMeeting} alt="Physical Meeting" className="w-full h-auto mb-6 shadow-lg" />
                </div>
            );
        } else {
            return (
                <div className="flex flex-col items-center">
                    <img src={onlineMeeting} alt="Online Meeting" className="w-full h-auto mb-6 shadow-lg" />
                </div>
            );
        }
    };

    const renderMeetingAnnouncements = () => {
        const announcementsToShow = selectedFilter === 'online' ? meetingAnnouncements.slice(0, 2) : meetingAnnouncements;
        return (
            <div className="p-4 rounded-lg mb-20 mx-4">
                <h2 className="text-[16px] font-medium mb-4">Upcoming CLUB Meetings</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {announcementsToShow.map((announcement) => (
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
                            
                            {selectedFilter === 'physical' ? (
                                <div className="flex space-x-2 mb-10 w-full">
                                    <button 
                                        onClick={() => handleDeclineMeeting(announcement.id)} 
                                        className="px-4 py-2 w-1/2 bg-dark-400 text-primary rounded font-medium hover:bg-dark-300 hover:scale-105 transition-transform duration-200"
                                    >
                                        Decline
                                    </button>
                                    <button 
                                        onClick={() => handleJoinMeeting(announcement.id)} 
                                        className="px-4 py-2 w-1/2 bg-primary text-dark-500 rounded font-semibold hover:bg-primary-dark hover:scale-105 transition-transform duration-200"
                                    >
                                        Get QR Code
                                    </button>
                                </div>
                            ) : (
                                <div className="flex space-x-2 mb-10 w-full">
                                    <button 
                                        onClick={() => handleJoinMeeting(announcement.id)} 
                                        className="px-4 py-2 w-full bg-primary text-dark-500 rounded font-semibold hover:bg-primary-dark hover:scale-105 transition-transform duration-200"
                                    >
                                        Join Meeting
                                    </button>
                                </div>
                            )}
        
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

    const renderUnionAnnouncements = () => {
        const announcementsToShow = selectedFilter === 'online' ? unionAnnouncements.slice(0, 3) : unionAnnouncements;
        return (
            <div className="p-4 rounded-lg mb-10 mx-4">
                <h2 className="text-[16px] font-medium mb-4">Upcoming UNION Meetings</h2>
                {announcementsToShow.map((announcement) => (
                    <div key={announcement.id} className="relative bg-dark-500 rounded-lg flex items-center p-4 mb-4 w-full h-[100px]">
                        <div className="flex flex-col justify-between flex-grow">
                            <div>
                                <p className="text-sm mt-2">
                                    <span className="block font-medium text-[14px] leading-loose">
                                        {announcement.title} | <span className="font-normal text-[14px] leading-loose text-white opacity-50">{announcement.description}</span>
                                    </span>
                                    <span className='block text-[15px] text-primary opacity-100 mt-1'>
                                        {announcement.date} | {announcement.time} | {announcement.location}
                                    </span>
                                </p>
                            </div>
                            <div className="text-xs text-white opacity-50 mt-2">
                                <span>{announcement.postedDate}</span>
                                <span className="mx-2">{announcement.postedTime}</span>
                            </div>
                        </div>
                        <div className="flex-none ml-4 flex space-x-2">
                            {selectedFilter === 'physical' ? (
                                <>
                                    <button 
                                        onClick={() => handleDeclineMeeting(announcement.id)} 
                                        className="px-4 py-2 bg-dark-400 text-primary rounded font-medium w-[150px] hover:scale-105 transition-transform duration-200"
                                    >
                                        Decline
                                    </button>
                                    <button 
                                        onClick={() => handleJoinMeeting(announcement.id)} 
                                        className="px-4 py-2 bg-primary text-dark-500 rounded font-semibold w-[150px] hover:bg-primary-dark hover:scale-105 transition-transform duration-200"
                                    >
                                        Get QR Code
                                    </button>
                                </>
                            ) : (
                                <button 
                                    onClick={() => handleJoinMeeting(announcement.id)} 
                                    className="px-4 py-2 bg-primary text-dark-500 rounded font-semibold w-[150px] hover:bg-primary-dark hover:scale-105 transition-transform duration-200"
                                >
                                    Join Meeting
                                </button>
                            )}
                        </div>
                    </div>
                ))}
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
                        {renderUnionAnnouncements()}
                        
                        
                        {showPopup && (
                            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                                <div className="bg-white p-6 rounded-lg w-1/2 max-w-lg relative">
                                    <h2 className="text-lg font-semibold mb-4 text-black">Can't Attend the Meeting</h2>
                                    <p className="mb-4 text-black">Please provide a reason for not attending the meeting:</p>
                                    <form onSubmit={handleFormSubmit}>
                                        <textarea 
                                            value={reason}
                                            onChange={(e) => setReason(e.target.value)}
                                            rows="4"
                                            className="w-full p-2 border border-gray-300 rounded mb-4"
                                            placeholder="Enter your reason here..."
                                        />
                                        <div className="flex justify-end space-x-2">
                                            <button 
                                                type="button" 
                                                onClick={handlePopupClose} 
                                                className="px-4 py-2 bg-dark-400 w-1/3 text-white rounded hover:bg-dark-500 hover:scale-105 transition-transform duration-200"
                                            >
                                                Cancel
                                            </button>
                                            <button 
                                                type="submit" 
                                                className="px-4 py-2 font-medium bg-primary text-dark-400 w-1/3 rounded hover:scale-105 transition-transform duration-200"
                                            >
                                                Send
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainMeeting;
