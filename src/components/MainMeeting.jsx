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
    const [reason, setReason] = useState('');
    const [currentMeetingId, setCurrentMeetingId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [declinedMeetings, setDeclinedMeetings] = useState(new Set());
    const [showDeclinedModal, setShowDeclinedModal] = useState(false);
    const [popupVisible, setPopupVisible] = useState(null);
    const [disabledButtons, setDisabledButtons] = useState(new Set());
    

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
            id: 10,
            title: 'Union General Meeting',
            description: 'Annual general meeting for all union members.',
            date: '2024-09-01',
            time: '03:00 PM',
            location: 'Main Hall',
            postedDate: '2024-07-25',
            postedTime: '10:00 AM'
        },
        {
            id: 20,
            title: 'Union Budget Review',
            description: 'Review of the annual budget and allocation.',
            date: '2024-09-10',
            time: '01:00 PM',
            location: 'Conference Room A',
            postedDate: '2024-07-26',
            postedTime: '11:00 AM'
        },
        {
            id: 30,
            title: 'Union Leadership Summit',
            description: 'Meeting of union leaders to discuss future strategies.',
            date: '2024-09-15',
            time: '09:00 AM',
            location: 'Main Hall',
            postedDate: '2024-07-27',
            postedTime: '09:00 AM'
        },
        {
            id: 40,
            title: 'Union Member Engagement Event',
            description: 'Event to engage with union members and discuss ongoing projects.',
            date: '2024-09-20',
            time: '02:00 PM',
            location: 'Event Center',
            postedDate: '2024-07-28',
            postedTime: '10:00 AM'
        },
    ];
    const handleGetQRCode = (id) => {
        setPopupVisible(id);
        setTimeout(() => {
            setPopupVisible(null);
            setDisabledButtons((prev) => new Set(prev).add(id));
        }, 5000);
    };

    const handleJoinMeeting = (id) => {
        console.log('Join Meeting for meeting ID:', id);
    };

    const handleDeclineMeeting = (id) => {
        setCurrentMeetingId(id);
        setShowPopup(true);
    };

    const handlePopupClose = () => {
        setShowPopup(false);
        setReason('');
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            console.log('Reason for declining meeting ID', currentMeetingId, ':', reason);
            setDeclinedMeetings(prev => new Set(prev).add(currentMeetingId));
            handlePopupClose();
            setIsLoading(false);
        }, 1500);
    };

    const handleReRequest = (id) => {
        console.log('Re-request meeting ID:', id);
    };

    const renderContent = () => {
        return (
            <div className="relative flex flex-col items-center">
                <img
                    src={selectedFilter === 'physical' ? physicalMeeting : onlineMeeting}
                    alt={selectedFilter === 'physical' ? "Physical Meeting" : "Online Meeting"}
                    className="w-full h-auto mb-6 shadow-lg"
                />
                {selectedFilter === 'physical' && (
                    <>
                        <button
                            onClick={() => setShowDeclinedModal(true)}
                            className="absolute top-4 right-4 bg-[#DDFF00] font-medium text-dark-500 px-4 py-2 rounded-md shadow-md"
                        >
                            Declined ({declinedMeetings.size})
                        </button>

                        <div className="absolute left-4 top-16 bg-black bg-opacity-75 p-6 rounded-lg text-white w-1/3 h-[400px]">
                            <h2 className="text-lg font-semibold mb-4">Create Meeting</h2>
                            <form className="space-y-4">
                                <div>
                                    <label className="block text-sm mb-2">Topic</label>
                                    <input
                                        type="text"
                                        className="w-full p-4 rounded-md bg-dark-500 border border-gray-600 text-white text-lg"
                                        placeholder="Enter meeting topic"
                                    />
                                </div>
                                <div className="flex space-x-4">
                                    <div className="flex-1">
                                        <label className="block text-sm mb-2">Date</label>
                                        <input
                                            type="date"
                                            className="w-full p-2 rounded-md bg-dark-500 border border-gray-600 text-white"
                                            style={{ color: 'white', caretColor: 'white' }}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-sm mb-2">Time</label>
                                        <input
                                            type="time"
                                            className="w-full p-2 rounded-md bg-dark-500 border border-gray-600 text-white"
                                            style={{ color: 'white', caretColor: 'white' }}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm mb-2">For who</label>
                                    <select className="w-full p-2 rounded-md bg-dark-500 border border-gray-600 text-white">
                                        <option>Board</option>
                                        <option>OC</option>
                                        <option>Club Members</option>
                                    </select>
                                </div>
                                <button type="submit" className="w-full bg-[#DDFF00] text-dark-500 font-medium py-2 rounded-md">Create Meeting</button>
                            </form>
                        </div>
                    </>
                )}

            </div>
        );
    };



    const renderMeetingAnnouncements = () => {
       

        const handleGetQRCode = (id) => {
            setPopupVisible(id);
            setTimeout(() => {
                setPopupVisible(null);
                setDisabledButtons((prev) => new Set(prev).add(id));
            }, 5000);
        };

        const handleCancelPopup = (id) => {
            setPopupVisible(null);
            setDisabledButtons((prev) => new Set(prev).add(id));
        };

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
                                        className={`px-4 py-2 w-1/2 ${declinedMeetings.has(announcement.id) ? 'bg-dark-500 cursor-not-allowed border border-red-600 text-red-500' : 'bg-dark-400 text-primary'} rounded font-medium hover:scale-105 transition-transform duration-200`}
                                        disabled={declinedMeetings.has(announcement.id)}
                                    >
                                        {declinedMeetings.has(announcement.id) ? 'Declined' : 'Decline'}
                                    </button>
                                    <button
                                        onClick={() => handleGetQRCode(announcement.id)}
                                        className={`px-4 py-2 w-1/2 ${disabledButtons.has(announcement.id) ? 'bg-dark-500 cursor-not-allowed opacity-50 text-primary border border-secondary' : 'bg-primary text-sec'} rounded font-semibold hover:bg-primary-dark hover:scale-105 transition-transform duration-200 text-dark-400`}
                                        disabled={disabledButtons.has(announcement.id)}
                                    >
                                        {disabledButtons.has(announcement.id) ? 'QR Code Sent' : 'Get QR Code'}
                                    </button>
                                </div>
                            ) : (
                                <div className="flex space-x-2 mb-10 w-full">
                                    <button
                                        onClick={() => handleJoinMeeting(announcement.id)}
                                        className="px-4 py-2 w-full cursor-not-allowed text-white opacity-50 rounded font-medium bg-dark-400 hover:bg-primary-dark hover:scale-105 transition-transform duration-200"
                                    >
                                        Join Meeting
                                    </button>
                                </div>
                            )}

                            <div className="text-xs text-gray-400 absolute bottom-2 w-full text-right">
                                <span className="mx-0">{announcement.postedDate}</span>
                                <span className="mx-2">{announcement.postedTime}</span>
                            </div>

                            {popupVisible === announcement.id && (
                                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                                    <div className="bg-white p-6 rounded-lg w-[450px] h-[200px] flex flex-col items-center justify-center">
                                        <p className="text-dark-400 mb-4 font-medium">Wait a minute, your QR code will be sent to you as a notification.</p>
                                        <button onClick={() => handleCancelPopup(announcement.id)} className="bg-dark-400 text-white px-4 py-2 w-[400px] rounded">
                                            No need
                                        </button>
                                        <div className="mb-4 text-primary font-medium animate-blink mt-6">Loading...</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    <style>{`
        @keyframes blink {
            0% { opacity: 1; }
            50% { opacity: 0; }
            100% { opacity: 1; }
        }
    
        .animate-blink {
            animation: blink 1.5s infinite;
            text-align: center;
        }
    `}</style>



    const renderUnionAnnouncements = () => {
        const handleGetQRCode = (id) => {
            setPopupVisible(id);
            setTimeout(() => {
                setPopupVisible(null);
            }, 5000);
        };

        const handleCancelPopup = (id) => {
            setPopupVisible(null);
        };

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
                                        className={`px-4 py-2 ${declinedMeetings.has(announcement.id) ? 'bg-dark-500 cursor-not-allowed border border-red-600 text-red-500' : 'bg-dark-400 text-primary'} rounded font-medium w-[150px] hover:scale-105 transition-transform duration-200`}
                                        disabled={declinedMeetings.has(announcement.id)}
                                    >
                                        {declinedMeetings.has(announcement.id) ? 'Declined' : 'Decline'}
                                    </button>
                                    <button
                                        onClick={() => handleGetQRCode(announcement.id)}
                                        className={`px-4 py-2 ${popupVisible === announcement.id ? 'bg-dark-500 cursor-not-allowed opacity-50 text-primary border border-secondary' : 'bg-primary text-sec'} rounded font-semibold w-[150px] hover:bg-primary-dark hover:scale-105 transition-transform duration-200 text-dark-400`}
                                        disabled={popupVisible === announcement.id}
                                    >
                                        {popupVisible === announcement.id ? 'QR Code Sent' : 'Get QR Code'}
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => handleJoinMeeting(announcement.id)}
                                    className="px-4 py-2 bg-dark-400 cursor-not-allowed text-white opacity-50 rounded font-medium w-[150px] hover:bg-primary-dark hover:scale-105 transition-transform duration-200"
                                >
                                    Join Meeting
                                </button>
                            )}
                        </div>
                        {popupVisible === announcement.id && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                <div className="bg-white p-6 rounded-lg w-[450px] h-[200px] flex flex-col items-center justify-center">
                                    <p className="text-dark-400 mb-4 font-medium">Wait a minute, your QR code will be sent to you as a notification.</p>

                                    <button onClick={() => handleCancelPopup(announcement.id)} className="bg-dark-400 text-white px-4 py-2 w-[400px] rounded">
                                        No need
                                    </button>
                                    <div className="mb-4 text-primary font-medium animate-blink mt-6">Loading...</div>
                                </div>
                            </div>
                        )}
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
                    <div className="p-0 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
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
                    </div>
                </div>
            </div>

            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-1/2 max-w-lg relative">
                        <h2 className="text-lg font-semibold mb-4 text-black">Can{"'"}t Attend the Meeting ?!</h2>
                        <p className="mb-4 text-black">Please provide a valid reason for not attending the meeting</p>
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
                    {isLoading && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <div className="text-[#DDFF00] text-sm font-semibold animate-pulse">Loading...</div>
                        </div>
                    )}
                </div>
            )}

            {showDeclinedModal && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-1/2 max-w-lg relative">
                        <div className="absolute top-2 right-2 cursor-pointer" onClick={() => setShowDeclinedModal(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600 hover:text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <h2 className="text-lg font-semibold mb-4 text-black">Declined Meetings</h2>
                        <ul>
                            {[...declinedMeetings].map((id) => {
                                const meeting = [...meetingAnnouncements, ...unionAnnouncements].find((announcement) => announcement.id === id);
                                return meeting ? (
                                    <li key={id} className="mb-5 w-[460px] rounded-md text-dark-500 font-medium h-[60px] px-2 py-6 flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">{meeting.title}</p>
                                            <p>{meeting.date} | {meeting.time} | {meeting.location}</p>
                                        </div>
                                        <button
                                            onClick={() => handleReRequest(id)}
                                            className="px-4 py-2 bg-primary text-dark-500 rounded hover:bg-primary-dark transition-transform duration-200"
                                        >
                                            Re-request
                                        </button>
                                    </li>
                                ) : null;
                            })}
                        </ul>
                    </div>
                </div>
            )}

        </div>
    );
};

export default MainMeeting;
