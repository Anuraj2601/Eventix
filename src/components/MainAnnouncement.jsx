import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";
import AnnouncementService from "../service/AnnouncementService";
import RegistrationService from "../service/registrationService";
import UsersService from "../service/UsersService";
import ClubsService from "../service/ClubsService";

const MainAnnouncement = () => {
    const [selectedFilter, setSelectedFilter] = useState("allAnnouncements");
    const [selectedClub, setSelectedClub] = useState(null);
    const [viewMode, setViewMode] = useState("new");
    const [registeredClubs, setRegisteredClubs] = useState([]);
    const [allAnnouncements, setAllAnnouncements] = useState([]);
    const [filteredAllAnnouncements, setFilteredAllAnnouncements] = useState([]);
    const [clubsAnnouncements, setClubsAnnouncements] = useState([]);

    const formatDate = (dateArray) => {
        const [year, month, day, hour, minute] = dateArray;
        const date = new Date(year, month - 1, day, hour, minute);
        const optionsDate = { year: "numeric", month: "2-digit", day: "2-digit" };
        const optionsTime = { hour: "numeric", minute: "2-digit", hour12: true };
        const formattedDate = date.toLocaleDateString("en-GB", optionsDate);
        const formattedTime = date.toLocaleTimeString("en-US", optionsTime);
        return `${formattedDate} ${formattedTime}`;
    };

    const isRegistered = async () => {
        const token = localStorage.getItem("token");
        const session_id = localStorage.getItem("session_id");

        try {
            const response2 = await UsersService.getUserById(session_id, token);
            if (!response2 || !response2.users || !response2.users.email) {
                console.error("User data or email is missing in response");
                return;
            }
            const currentUserEmail = response2.users.email;

            const response1 = await RegistrationService.getAllRegistrations(token);
            if (!response1 || !response1.content) {
                console.error("Registration data is missing in response");
                return;
            }
            const registeredClubsArray = response1.content.filter(
                (reg) => reg.email === currentUserEmail
            );
            setRegisteredClubs(registeredClubsArray);
        } catch (error) {
            console.log("Error fetching data", error);
        }
    };

    const fetchAllAnnouncements = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await AnnouncementService.getAllAnnouncements(token);
            const AnnouncementsArray = response.content;
            setAllAnnouncements(AnnouncementsArray || []);
        } catch (error) {
            console.log("Error while fetching announcements", error);
        }
    };

    useEffect(() => {
        isRegistered();
        fetchAllAnnouncements();
    }, []);

    const renderContent = () => {
        if (selectedFilter === "clubAnnouncements") {
            if (selectedClub) {
                const club = clubsAnnouncements.find(
                    (club) => club.clubId === selectedClub
                );
                const announcementsToShow =
                    viewMode === "new"
                        ? club.announcements.new
                        : club.announcements.old;

                return (
                    <div className="p-4 rounded-lg relative">
                        <button
                            onClick={() => setSelectedClub(null)}
                            className="absolute top-2 right-4 px-4 py-2 bg-primary text-black rounded font-medium"
                        >
                            Go Back
                        </button>
                        <h2 className="text-xl font-medium mb-10">{club.name}</h2>
                        <div className="grid grid-cols-1 gap-4">
                            {announcementsToShow.length > 0 ? (
                                announcementsToShow.map((announcement) => (
                                    <div
                                        key={announcement.announcement_id}
                                        className="relative p-4 bg-dark-500 rounded-lg flex flex-col"
                                    >
                                        <div>
                                            <p className="text-sm text-primary font-semibold">
                                                {announcement.title}
                                            </p>
                                            <p className="text-sm">{announcement.content}</p>
                                        </div>
                                        <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                                            <span className="mx-2">
                                                {formatDate(announcement.date_posted)}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No {viewMode === "new" ? "new" : "old"} announcements available for this club.</p>
                            )}
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {clubsAnnouncements.map((announcement) => (
                            <div
                                key={announcement.clubId}
                                className="bg-dark-500 p-6 rounded-lg flex flex-col items-center relative border border-transparent hover:border-primary shadow-md transition transform hover:scale-105"
                            >
                                <img
                                    src={announcement.clubDetails.content.club_image}
                                    alt={announcement.clubDetails.content.club_name}
                                    className="h-24 w-24 mb-4 rounded-lg"
                                />
                                <h2 className="text-xl font-medium mb-2">
                                    {announcement.clubDetails.content.club_name}
                                </h2>
                                <p className="text-sm text-primary mb-4">
                                    {announcement.announcementCount} Announcements
                                </p>
                                <div className="flex justify-around w-full mt-4">
                                    <button
                                        className="flex flex-col items-center w-[130px] h-12 bg-dark-400 border rounded-lg border-primary shadow-md transition transform hover:scale-105"
                                        onClick={() => {
                                            setSelectedClub(announcement.clubId);
                                            setViewMode("old");
                                        }}
                                    >
                                        <span className="font-semibold">View Old</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            }
        }
        return null;
    };

    return (
        <div className="min-h-screen flex flex-col lg:flex-row">
            <Sidebar />
            <div className="flex-1">
                <Navbar />
                <div className="p-4">{renderContent()}</div>
            </div>
        </div>
    );
};

export default MainAnnouncement;
