import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import ieeeImage from '../assets/clubs/ieee.png';
import isacaImage from '../assets/clubs/isaca1.png';
import rotaractImage from '../assets/clubs/rotaract.png';
import { useLocation } from 'react-router-dom';
import AnnouncementService from '../service/AnnouncementService';
import RegistrationService from '../service/registrationService';
import UsersService from '../service/UsersService';
import ClubsService from '../service/ClubsService';
import { useNavigate } from "react-router-dom";

const MainAnnouncement = () => {
    const [selectedFilter, setSelectedFilter] = useState('allAnnouncements');
    const [selectedClub, setSelectedClub] = useState(null);
    const [viewMode, setViewMode] = useState('new');
    const isAdminPath = location.pathname.startsWith('/admin');
    const navigate = useNavigate();

    const [registeredClubs, setRegisteredClubs] = useState([]);
    const [AllAnnouncements, setAllAnnouncements] = useState([]);
    const [filteredAllAnnouncements, setFilteredAllAnnouncements] = useState([]);
    const [UnionAnnouncements, setUnionAnnouncements] = useState([]);
    const [ClubsAnnouncements, setClubsAnnouncements] = useState([]);

    let unionClubId;

   

 
    
    const formatDate = (dateArray) => {
        
        const [year, month, day, hour, minute] = dateArray;
        
        
        const date = new Date(year, month - 1, day, hour, minute);
        
        // Format options for date and time
        const optionsDate = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const optionsTime = { hour: 'numeric', minute: '2-digit', hour12: true };
    
        // Use toLocaleDateString and toLocaleTimeString for formatting
        const formattedDate = date.toLocaleDateString('en-GB', optionsDate); // yyyy-mm-dd format
        const formattedTime = date.toLocaleTimeString('en-US', optionsTime); // hh:mm AM/PM format
    
        return `${formattedDate} ${formattedTime}`;
    };

    const isRegistered = async () => {
        const token = localStorage.getItem('token');
        const session_id = localStorage.getItem('session_id');

        try{
            const response2 = await UsersService.getUserById(session_id, token);

            // Ensure the response has the user email
            if (!response2 || !response2.users || !response2.users.email) {
                console.error('User data or email is missing in response');
                return;
            }
            const currentUserEmail = response2.users.email;
         
            const response1 = await RegistrationService.getAllRegistrations(token);

            // Ensure the response has the registrations content
            if (!response1 || !response1.content) {
                console.error('Registration data is missing in response');
                return;
            }
            //console.log("is registered", response1);
            const registeredClubsArray = response1.content.filter(reg => reg.email === currentUserEmail);
            console.log("registered clubs array", registeredClubsArray);
            setRegisteredClubs(registeredClubsArray);

        }catch(error){
            console.log("Error fetching data", error);
        }
        

    }

    const getUnionClubId = async () => {
        const token = localStorage.getItem('token');
        try{
            const response3 = await ClubsService.getAllClubs(token);
            //console.log("all clubs",response3)
            const unionClub = response3.content.filter(club => club.club_name.toLowerCase().includes("union") );
            if (unionClub.length > 0) {
                unionClubId = unionClub[0].club_id;
                console.log("union club id", unionClubId);
                return unionClubId;  

            } else {
                console.log("No club found with 'union' in the name");
                return null;  // In case no union club is found
            }
            

        }catch(error){
            console.log("Error while fetching club details", error)
        }
    }

    // Helper function to determine if an announcement is new (e.g., within the last 7 days)
    const isNewAnnouncement = (announcementDateArray) => {
        const currentDate = new Date();

        // Convert the array [year, month, day, hours, minutes, seconds, milliseconds] into a Date object
        // Note: JavaScript Date months are zero-indexed, so we need to subtract 1 from the month.
        const announcementDateObj = new Date(
            announcementDateArray[0],    // Year
            announcementDateArray[1] - 1, // Month (subtract 1 since months are zero-indexed)
            announcementDateArray[2],    // Day
            announcementDateArray[3],    // Hour
            announcementDateArray[4],    // Minute
            announcementDateArray[5],    // Second
            announcementDateArray[6]     // Millisecond
        );

        const diffInTime = currentDate - announcementDateObj;
        const diffInDays = diffInTime / (1000 * 3600 * 24); // Convert milliseconds to days

        // If the announcement was made in the last 7 days, consider it new
        return diffInDays <= 7;
    };


    const fetchAllAnnouncements = async () => {
       
        const token = localStorage.getItem('token');
        try {
            const response = await AnnouncementService.getAllAnnouncements(token);
            console.log("fetch all announcements", response);
            const AnnouncementsArray = response.content;

            // Await the result of getUnionClubId()
            const unionClubId = await getUnionClubId();
            if (unionClubId) {
                // Filter announcements for the union club
                const unionAnnouncementsArray = AnnouncementsArray.filter(announcement => announcement.club_id == unionClubId);
                console.log("union announcements:", unionAnnouncementsArray);

                setUnionAnnouncements(unionAnnouncementsArray);
            } else {
                console.log("No union club announcements found");
            }

           
            
            setAllAnnouncements(AnnouncementsArray || []);
        } catch (error) {
            console.log("Error while fetching announcements", error);
        }

    }

    useEffect(() => {
        isRegistered();
        fetchAllAnnouncements();
    }, []);

   

    useEffect(() => {
        const fetchAnnouncementsAndClubDetails = async () => {
            if (registeredClubs.length > 0 || AllAnnouncements.length > 0) {
                const token = localStorage.getItem('token');
    
                // Combine public announcements and those that match the user's registered clubs
                const matchingAnnouncements = AllAnnouncements.filter(announcement =>
                    announcement.type === 'PUBLIC' || // Public announcements
                    registeredClubs.some(club => club.clubId === announcement.club_id) // Announcements relevant to the user's clubs
                );


             
    
                //setFilteredAllAnnouncements(matchingAnnouncements);
                console.log("Filtered Announcements", matchingAnnouncements);

                // Fetch club details for each unique club in the filtered announcements
                const uniqueClubIds = [...new Set(matchingAnnouncements.map(announcement => announcement.club_id))];
                
                const clubDetailsMap = {};
                for (let clubId of uniqueClubIds) {
                    const clubDetails = await ClubsService.getClubById(clubId, token);
                    clubDetailsMap[clubId] = clubDetails; // Store club details by clubId
                }

                // Combine the announcements with their respective club details
                const announcementsWithClubDetails = matchingAnnouncements.map(announcement => ({
                    ...announcement,
                    clubDetails: clubDetailsMap[announcement.club_id] // Add club details to each announcement
                }));

                setFilteredAllAnnouncements(announcementsWithClubDetails); // Set the updated list
                console.log("Filtered Announcements with club details", announcementsWithClubDetails);




    
                // Group announcements by club_id and categorize them as 'new' or 'old'
                const groupedAnnouncementsByClubId = matchingAnnouncements.reduce((acc, announcement) => {
                    const clubId = announcement.club_id;
    
                    // Initialize the club group if not already present
                    if (!acc[clubId]) {
                        acc[clubId] = { new: [], old: [] };
                    }
    
                    // Check if the announcement is new or old
                    if (isNewAnnouncement(announcement.date_posted)) {
                        acc[clubId].new.push(announcement);
                    } else {
                        acc[clubId].old.push(announcement);
                    }
    
                    return acc;
                }, {});
    
                console.log("Grouped announcements by club_id with new/old:", groupedAnnouncementsByClubId);
    
             

                const clubsWithAnnouncements = Object.keys(groupedAnnouncementsByClubId).map(clubId => {
                    const clubDetails = clubDetailsMap[clubId]; // Reuse fetched club details
                    const announcementsForClub = groupedAnnouncementsByClubId[clubId];
    
                    // Calculate the total count of announcements (new + old)
                    const announcementCount = announcementsForClub.new.length + announcementsForClub.old.length;
    
                    return {
                        clubId,
                        clubDetails,
                        announcements: announcementsForClub,
                        announcementCount
                    };
                });

    
                console.log("Clubs with announcements:", clubsWithAnnouncements);
                setClubsAnnouncements(clubsWithAnnouncements);
            }
        };
    
        // Call the async function inside useEffect
        fetchAnnouncementsAndClubDetails();
    }, [registeredClubs, AllAnnouncements]);
    
        

    
    const renderContent = () => {
        if (selectedFilter === 'clubAnnouncements') {
            if (selectedClub) {
                const club = ClubsAnnouncements.find(club => club.clubId === selectedClub);
                //const announcementsToShow = viewMode === 'new' ? club.announcements.slice(-club.newAnnouncements) : club.announcements.slice(0, club.oldAnnouncements);
                const announcementsToShow = viewMode === 'new' 
                    ? club.announcements.new  // Show new announcements
                    : club.announcements.old; // Show old announcements
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
                           
                            {announcementsToShow.length > 0 ? (
                                announcementsToShow.map((announcement) => (
                                    <div key={announcement.announcement_id} className="relative p-4 bg-dark-500 rounded-lg flex flex-col">
                                        <div>
                                            <p className="text-sm text-primary font-semibold">{announcement.title}</p>
                                            <p className="text-sm">{announcement.content} 
                                                {/* <span className='ml-5 text-primary opacity-60'>{announcement.date} | {announcement.time} | {announcement.location}</span> */}
                                            </p>
                                        </div>
                                        <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                                            <span className="mx-2">{formatDate(announcement.date_posted)}</span>
                                            {/* <span className="mx-2">{announcement.postedTime}</span> */}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No {viewMode === 'new' ? 'new' : 'old'} announcements available for this club.</p>
                            )}
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {ClubsAnnouncements.map((announcement) => (
                            <div key={announcement.clubId} className="bg-dark-500 p-6 rounded-lg flex flex-col items-center relative border border-transparent hover:border-primary" style={{ 
                                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' 
                              }}          >
                                <img src={announcement.clubDetails.content.club_image} alt={announcement.clubDetails.content.club_name} className="h-24 w-24 mb-4 rounded-lg" />
                                <h2 className="text-xl font-medium mb-2">{announcement.clubDetails.content.club_name}</h2>
                                <p className="text-sm text-primary mb-4">{announcement.announcementCount} Announcements</p>
                                <div className="flex justify-around w-full mt-4">
                                    <button
                                        className="flex flex-col items-center ml-6 w-[130px] h-12 bg-dark-400 border rounded-[15px] border-primary relative transform transition-transform hover:scale-105 cursor-pointer"
                                        onClick={() => {
                                            setSelectedClub(announcement.clubId);
                                            setViewMode('old');
                                        }} style={{ 
                                            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' 
                                          }}          
                                    >
                                        <span className="text-[16px] font-medium mt-3 mr-12 ">Old</span>
                                        <span className="text-xl font-medium absolute right-1 top-[2px] w-10 h-10 flex items-center justify-center ">
                                            {announcement.announcements.old.length}
                                        </span>
                                    </button>
                                    <button
                                        className="flex flex-col items-center w-[130px] mr-6 h-12 bg-primary text-dark-500 rounded-[15px] relative transform transition-transform hover:scale-105 cursor-pointer"
                                        onClick={() => {
                                            setSelectedClub(announcement.clubId);
                                            setViewMode('new');
                                        }} style={{ 
                                            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' 
                                          }}          
                                    >
                                        <span className="text-[16px] font-semibold mt-3 mr-12">New</span>
                                        <span className="text-xl font-medium absolute right-1 top-1 w-10 h-10 flex items-center bg-dark-500 text-primary justify-center rounded-full border border-black">
                                            {announcement.announcements.new.length}
                                            
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
                   
                    <div  className="grid grid-cols-1 gap-4">
                    {isAdminPath && (

                    <div className="flex space-x-4 absolute top-2 right-4">
        <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-primary text-black rounded font-medium"
        >
            Add New
        </button>
       
    </div> )}
                        {UnionAnnouncements.map((announcement) => (
                            <div  >
                                <div className="grid grid-cols-1 gap-4 mt-2">
                               
                                   
                                         
                                        <div key={announcement.announcement_id} className="relative p-4 bg-dark-500 rounded-lg flex flex-col" style={{ 
                                            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' 
                                          }}          >
                                            
                                            <div>
                                                <p className="text-sm text-primary font-semibold">{announcement.title}</p>
                                                {/* <p className="text-sm">{announcement.content} <span className='ml-5 text-primary opacity-60'>{announcement.date} | {announcement.time} | {announcement.location}</span></p> */}
                                                <p className="text-sm">{announcement.content} </p>
                                            </div>
                                            <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                                                <span className="mx-2">{formatDate(announcement.date_posted) }</span>
                                                {/* <span className="mx-2">{announcement.postedTime}</span> */}
                                            </div>
                                        </div>
                                    
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }else if (selectedFilter === 'allAnnouncements') {
            return (
                <div className="p-4 rounded-lg">
                <h2 className="text-xl font-medium mb-4"></h2>
                <div className="grid grid-cols-1 gap-4">
                    {filteredAllAnnouncements.map((announcement) => (
                        <div key={announcement.announcement_id} className="relative mb-4 p-4 bg-dark-400 rounded-lg flex items-center" style={{ 
                            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' 
                          }}          >
                            {announcement.clubDetails.content.club_image && (
                                <img src={announcement.clubDetails.content.club_image} alt={announcement.clubDetails.content.club_name} className="w-16 h-16 rounded-full mr-4" />
                            )}
                            <div className="flex-1">
                                <p className="text-sm text-primary font-semibold">{announcement.title}</p>
                                {/* <p className="text-sm text-neutral-400">{announcement.type}</p> */}
                                <p className="text-sm text-neutral-400">{announcement.content}</p>
                                <p className="text-sm text-neutral-400">{formatDate(announcement.date_posted) }</p>
                                {/* {announcement.location && <p className="text-sm text-neutral-400">Location: {announcement.location}</p>} */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            );
        }
        return null;
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
                                className={`px-4 py-2 ${selectedFilter === 'allAnnouncements' ? 'text-primary border-b-2 border-primary' : 'text-white'}`}
                                onClick={() => setSelectedFilter('allAnnouncements')}
                            >
                                All Announcements
                            </button>
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

