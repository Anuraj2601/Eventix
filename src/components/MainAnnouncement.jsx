import { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const MainAnnouncement = () => {
    const [selectedFilter, setSelectedFilter] = useState('clubAnnouncements');
    const [selectedClub, setSelectedClub] = useState(null);
    const [viewMode, setViewMode] = useState('new');

    const clubAnnouncements = [
        {
            id: 1,
            name: 'IEEE Student Group',
            image: '../assets/ieee.jpeg',
            totalAnnouncements: 38,
            oldAnnouncements: 30,
            newAnnouncements: 8,
            announcements: [
                { id: 1, title: 'Tech Talk on AI', description: 'Join us for a tech talk on Artificial Intelligence and its impact on future technologies.', type: 'Event', date: '2024-08-01', time: '10:00 AM', location: 'S104', postedDate: '2024-07-25', postedTime: '10:00 AM' },
                { id: 2, title: 'IEEE General Meeting', description: 'Monthly general meeting to discuss upcoming projects and events.', type: 'Meeting', date: '2024-08-05', time: '02:00 PM', location: 'S202', postedDate: '2024-07-26', postedTime: '02:00 PM' },
                { id: 3, title: 'New Workshop on IoT', description: 'Hands-on workshop on Internet of Things and smart devices.', type: 'Event', date: '2024-08-10', time: '09:00 AM', location: '4th floor', postedDate: '2024-07-27', postedTime: '09:00 AM' },
                { id: 4, title: 'Fundraising Drive', description: 'Help us raise funds for our next big project. Your support matters!', type: 'Update', date: '2024-08-15', time: '01:00 PM', location: 'S104', postedDate: '2024-07-28', postedTime: '01:00 PM' },
                { id: 5, title: 'Weekly Coding Challenge', description: 'Participate in our weekly coding challenges and win exciting prizes.', type: 'Event', date: '2024-08-20', time: '03:00 PM', location: 'E401', postedDate: '2024-07-29', postedTime: '03:00 PM' },
                { id: 6, title: 'IEEE Club Elections', description: 'Vote for the new club officers in our annual elections.', type: 'Meeting', date: '2024-08-25', time: '12:00 PM', location: 'W002', postedDate: '2024-07-30', postedTime: '12:00 PM' },
                { id: 7, title: 'Networking Event', description: 'Connect with industry professionals and fellow students at our networking event.', type: 'Event', date: '2024-08-30', time: '06:00 PM', location: 'S203', postedDate: '2024-07-31', postedTime: '06:00 PM' },
                { id: 8, title: 'Guest Lecture Series', description: 'Attend our guest lecture series featuring prominent speakers in tech.', type: 'Event', date: '2024-09-02', time: '05:00 PM', location: 'Auditorium', postedDate: '2024-08-01', postedTime: '05:00 PM' },
            ],
        },
        {
            id: 2,
            name: 'ISACA',
            image: '/assets/isaca.png',
            totalAnnouncements: 22,
            oldAnnouncements: 20,
            newAnnouncements: 2,
            announcements: [
                { id: 1, title: 'Cybersecurity Workshop', description: 'Workshop on the latest trends and practices in cybersecurity.', type: 'Event', date: '2024-08-02', time: '11:00 AM' ,location: 'S203'},
                { id: 2, title: 'Monthly Security Meeting', description: 'Discuss recent security threats and solutions in our monthly meeting.', type: 'Meeting', date: '2024-08-07', time: '03:00 PM',location: 'S203' },
                { id: 3, title: 'New Data Privacy Policy', description: 'Update on new data privacy regulations and compliance.', type: 'Update', date: '2024-08-12', time: '10:00 AM' ,location: 'Auditorium'},
                { id: 4, title: 'ISACA Certification Seminar', description: 'Seminar on ISACA certification and career advancement.', type: 'Event', date: '2024-08-17', time: '02:00 PM',location: 'Auditorium' },
                { id: 5, title: 'Annual Security Conference', description: 'Join us for our annual conference on cybersecurity and industry trends.', type: 'Event', date: '2024-08-22', time: '09:00 AM',location: 'Auditorium' },
                { id: 6, title: 'ISACA Community Outreach', description: 'Participate in community outreach programs and help raise awareness.', type: 'Update', date: '2024-08-28', time: '01:00 PM', location: 'Auditorium'},
            ],
        },
        {
            id: 3,
            name: 'Rotract',
            image: '/assets/rotract.jpeg',
            totalAnnouncements: 15,
            oldAnnouncements: 10,
            newAnnouncements: 5,
            announcements: [
                { id: 1, title: 'Volunteering Opportunity', description: 'Volunteer for various community service projects organized by Rotract.', type: 'Event', date: '2024-08-03', time: '10:00 AM' ,location: 'S203'},
                { id: 2, title: 'Rotract Club Meeting', description: 'Monthly meeting to plan and discuss upcoming events.', type: 'Meeting', date: '2024-08-08', time: '02:00 PM' ,location: 'S203'},
                { id: 3, title: 'Charity Fundraiser', description: 'Help raise funds for charity through various events and activities.', type: 'Event', date: '2024-08-13', time: '12:00 PM',location: 'S203' },
                { id: 4, title: 'Guest Speaker Event', description: 'Attend a talk by a guest speaker on community service and leadership.', type: 'Event', date: '2024-08-18', time: '05:00 PM',location: 'S203' },
                { id: 5, title: 'Rotract Social Event', description: 'Join us for a social gathering to meet new members and have fun.', type: 'Event', date: '2024-08-23', time: '07:00 PM',location: 'S203' },
            ],
        }
    ];

    const unionAnnouncements = [
        {
            announcements: [
                { id: 1, title: 'Union Meeting', description: 'Monthly meeting for all union members.', type: 'Meeting', date: '2024-08-05', time: '04:00 PM', location: 'Conference Room A', postedDate: '2024-07-25', postedTime: '04:00 PM' },
                { id: 2, title: 'Community Outreach Program', description: 'Participate in our community outreach program.', type: 'Event', date: '2024-08-12', time: '01:00 PM', location: 'Community Center', postedDate: '2024-07-26', postedTime: '01:00 PM' },
                { id: 3, title: 'Community Outreach Program', description: 'Participate in our community outreach program.', type: 'Event', date: '2024-08-12', time: '01:00 PM', location: 'Community Center', postedDate: '2024-07-26', postedTime: '01:00 PM' },

            ],
        },
    ];

    const renderContent = () => {
        if (selectedFilter === 'clubAnnouncements') {
            if (selectedClub) {
                const club = clubAnnouncements.find(club => club.id === selectedClub);
                const announcementsToShow = viewMode === 'new' ? club.announcements.slice(-club.newAnnouncements) : club.announcements.slice(0, club.oldAnnouncements);
                return (
                    <div className="p-4 rounded-lg relative ">
                        <button
                            onClick={() => setSelectedClub(null)}
                            className="absolute top-2 right-4 px-4 py-2 bg-primary text-black rounded font-medium"
                        >
                            Go Back
                        </button>
                        <h2 className="text-xl font-medium mb-10">{club.name} </h2>
                        <div className="grid grid-cols-1 gap-4">
                            {announcementsToShow.map((announcement) => (
                                <div key={announcement.id} className="relative p-4 bg-dark-500 rounded-lg flex flex-col">
                                    <div>
                                        <p className="text-sm text-primary font-semibold">{announcement.title}</p>
                                        <p className="text-sm">{announcement.description} <span className='ml-5 text-primary opacity-60'>{announcement.date} | {announcement.time} | {announcement.location}</span></p>
                                    </div>
                                    <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                                        <span className="mx-2">{announcement.postedDate}</span>
                                        <span className="mx-2">{announcement.postedTime}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {clubAnnouncements.map((club) => (
                            <div key={club.id} className="bg-dark-500 p-6 rounded-lg flex flex-col items-center relative border border-transparent hover:border-primary">
                                <img src={club.image} alt={club.name} className="h-24 w-24 mb-4 border border-primary" />
                                <h2 className="text-xl font-medium mb-2">{club.name}</h2>
                                <p className="text-sm text-primary mb-4">{club.totalAnnouncements} Announcements</p>
                                <div className="flex justify-around w-full mt-4">
                                    <button
                                        className="flex flex-col items-center ml-6 w-[130px] h-12 bg-dark-400 border rounded-[15px] border-primary relative transform transition-transform hover:scale-105 cursor-pointer"
                                        onClick={() => {
                                            setSelectedClub(club.id);
                                            setViewMode('old');
                                        }}
                                    >
                                        <span className="text-[16px] font-medium mt-3 mr-12 ">Old</span>
                                        <span className="text-xl font-medium absolute right-1 top-[2px] w-10 h-10 flex items-center justify-center ">
                                            {club.oldAnnouncements}
                                        </span>
                                    </button>
                                    <button
                                        className="flex flex-col items-center w-[130px] mr-6 h-12 bg-primary text-dark-500 rounded-[15px] relative transform transition-transform hover:scale-105 cursor-pointer"
                                        onClick={() => {
                                            setSelectedClub(club.id);
                                            setViewMode('new');
                                        }}
                                    >
                                        <span className="text-[16px] font-semibold mt-3 mr-12">New</span>
                                        <span className="text-xl font-medium absolute right-1 top-1 w-10 h-10 flex items-center bg-dark-500 text-primary justify-center rounded-full border border-black">
                                            {club.newAnnouncements}
                                        </span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            }
        } else if (selectedFilter === 'unionAnnouncements') {
            return (
                <div className="relative p-4 rounded-lg h-[70vh]">
                    <button
                        onClick={() => setSelectedFilter('clubAnnouncements')}
                        className="absolute top-[200px] right-5 px-4 py-2 bg-primary text-black rounded font-medium"
                    >
                        Go Back
                    </button>
                    <div className="grid grid-cols-1 gap-4">
                        {unionAnnouncements.map((union) => (
                            <div key={union.id} className="mb-6">
                                <div className="grid grid-cols-1 gap-4">
                                    {union.announcements.map((announcement) => (
                                        <div key={announcement.id} className="relative p-4 bg-dark-500 rounded-lg flex flex-col">
                                            <div>
                                                <p className="text-sm text-primary font-semibold">{announcement.title}</p>
                                                <p className="text-sm">{announcement.description} <span className='ml-5 text-primary opacity-60'>{announcement.date} | {announcement.time} | {announcement.location}</span></p>
                                            </div>
                                            <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                                                <span className="mx-2">{announcement.postedDate}</span>
                                                <span className="mx-2">{announcement.postedTime}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
    };

    return (
        <div className="fixed inset-0 flex">
            <Sidebar className="flex-shrink-0" />
            <div className="flex flex-col flex-1">
                <Navbar className="sticky top-0 z-10 p-4" />
                <div className="bg-neutral-900 text-white flex flex-col flex-1 overflow-hidden">
                    <div className="p-6 overflow-y-auto relative">
                        <div className="flex space-x-4 mb-4">
                            <button
                                className={`px-4 py-2 ${selectedFilter === 'clubAnnouncements' ? 'text-primary border-b-2 border-primary' : 'text-white'}`}
                                onClick={() => setSelectedFilter('clubAnnouncements')}
                            >
                                Club Announcements
                            </button>
                            <button
                                className={`px-4 py-2 ${selectedFilter === 'unionAnnouncements' ? 'text-primary border-b-2 border-primary' : 'text-white'}`}
                                onClick={() => setSelectedFilter('unionAnnouncements')}
                            >
                                Union Announcements
                            </button>
                        </div>
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainAnnouncement;
