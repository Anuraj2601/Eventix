import { HiMiniUserGroup } from "react-icons/hi2";
import { FaHeart } from "react-icons/fa"; // For the heart icon
import ClubsService from '../service/ClubsService';
import React, { useEffect, useState, useRef } from 'react';

const Clubsforu = () => {
    const [clubDetails, setClubDetails] = useState([]);

    useEffect(() => {
        fetchClubs();
    }, []);

    const fetchClubs = async () => {
        try {
            const clubs = await ClubsService.getAllClubslanding();
            setClubDetails(clubs.content || []);
        } catch (error) {
            console.error("Failed to fetch clubs:", error);
            if (error.response) {
                console.error("Server response:", error.response.data);
            }
        }
    };

    const scrollRef = useRef(null); // Reference for scrolling

    // Function to handle horizontal scrolling
    const handleScroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = direction === "left" ? -300 : 300;
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    return (
        <div className="flex flex-col items-center w-full">
            {/* Title Section */}
            <div className="flex items-center bg-dark-background p-4 rounded-lg">
                <HiMiniUserGroup className="text-primary bg-dark-background rounded-full w-10 h-10 shadow-lg" />
                <span className="text-lg font-normal pl-3 text-primary uppercase">Clubs for You</span>
            </div>

            {/* Horizontal Carousel */}
            <div
                className="relative bg-dark-500 w-full mt-8"
                style={{
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)",
                }}
            >
                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto gap-6 px-8 scrollbar-hide scroll-smooth"
                >
                    {clubDetails.slice(0, 6).map((club) => (
                        <div
                            key={club.club_id}
                            className="bg-dark-700 p-6 rounded-lg shadow-lg flex-none w-96 custom-card transform transition duration-300 hover:scale-105 hover:border-2 hover:border-white"
                            style={{ minWidth: "280px" }}
                        >
                            <img
                                src={club.club_image}
                                alt={club.club_name}
                                className="w-full h-40 object-cover relative rounded-lg"
                                style={{
                                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)",
                                }}
                            />
                            <h2 className="text-white text-lg mt-4">{club.club_name}</h2>
                            <p className="text-sm text-gray-300 mt-2">
                                {club.club_description || "An amazing club for your interests!"}
                            </p>
                            <div className="flex justify-between items-center mt-4">
                                <div className="flex items-center text-gray-300">
                                    <FaHeart className="text-red-500 mr-2" />
                                    <span>{Math.floor(Math.random() * 100) + 1} Likes</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Navigation Buttons */}
                <button
                    onClick={() => handleScroll("left")}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-dark-background text-3xl text-[#AEC90A] p-2 rounded-full shadow-lg hover:bg-primary hover:text-dark-background"
                >
                    {"<"}
                </button>
                <button
                    onClick={() => handleScroll("right")}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-dark-background text-3xl text-[#AEC90A] p-2 rounded-full shadow-lg hover:bg-primary hover:text-dark-background"
                >
                    {">"}
                </button>
            </div>
        </div>
    );
};

export default Clubsforu;
