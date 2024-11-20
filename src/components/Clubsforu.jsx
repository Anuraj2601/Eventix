import { HiMiniUserGroup } from "react-icons/hi2";
import { BsCalendar2EventFill } from 'react-icons/bs';
import { GrTechnology } from 'react-icons/gr';
import { RiDiscountPercentFill } from 'react-icons/ri';
import ClubsService from '../service/ClubsService';
import React, { useEffect, useState } from 'react';

const Clubsforu = () => {
    const [clubDetails, setClubDetails] = useState([]);

    useEffect(() => {
        fetchClubs();
    }, []);

    const fetchClubs = async () => {
        try {
            const token = localStorage.getItem('token');
            console.log("Token used:", token); // Debugging token
            const clubs = await ClubsService.getAllClubs(token);
            const clubsArray = clubs.content || [];
            console.log("Clubs fetched:", clubsArray); // Debugging data
            setClubDetails(clubsArray);
        } catch (error) {
            console.error("Failed to fetch clubs", error.response || error.message);
        }
    };

    return (
        <div className="flex flex-col items-center mt-20">
            {/* Title Section */}
            <div className="flex items-center bg-dark-background p-4 rounded-lg">
                <HiMiniUserGroup className="text-primary bg-dark-background rounded-full w-10 h-10 shadow-lg" />
                <span className="text-lg font-normal pl-3 text-primary uppercase">Clubs for you</span>
            </div>

            {/* Horizontal Carousel */}
            <div className="flex overflow-x-auto gap-6 mt-6 px-4">
                {clubDetails.length > 0 ? (
                    clubDetails.map((club) => (
                        <div
                            key={club.club_id}
                            className="bg-dark-400 p-6 rounded-lg shadow-lg flex-none w-72"
                            style={{ minWidth: '280px' }}
                        >
                            <img
                                src={club.club_image}
                                alt={club.club_name}
                                className="w-full h-40 object-cover rounded-lg"
                            />
                            <h2 className="text-white text-lg mt-4">{club.club_name}</h2>
                            <p className="text-sm text-gray-300 mt-2">
                                Opportunities for career advancement through workshops and resources.
                            </p>
                            <div className="flex justify-between mt-4">
                                <button className="bg-primary text-dark-400 font-bold px-4 py-2 rounded">
                                    Join
                                </button>
                                <button className="bg-gray-800 text-white font-bold px-4 py-2 rounded">
                                    View
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-white mt-6">No clubs available to display.</p>
                )}
            </div>

            {/* Career Advancement Section */}
            <div className="bg-dark-400 w-[82vw] h-auto mt-12 p-6 rounded-lg grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="flex items-center text-white bg-dark-background p-4 rounded-lg hover:shadow-xl">
                    <div className="bg-secondary w-12 h-12 rounded-full flex items-center justify-center mr-3">
                        <BsCalendar2EventFill className="text-2xl text-dark-background" />
                    </div>
                    <div>
                        <span className="font-base tracking-wider text-lg ml-4 leading-[30px] text-primary uppercase">
                            Career Development
                        </span>
                        <p className="text-[14px] leading-[30px] tracking-wider ml-4 font-normal">
                            Opportunities for career advancement through workshops.
                        </p>
                    </div>
                </div>

                <div className="flex items-center text-white bg-dark-background p-4 rounded-lg hover:shadow-xl">
                    <div className="bg-secondary w-12 h-12 rounded-full flex items-center justify-center mr-3">
                        <GrTechnology className="text-2xl text-dark-background" />
                    </div>
                    <div>
                        <span className="font-base tracking-wider text-lg ml-4 leading-[30px] text-primary uppercase">
                            Innovation and Research
                        </span>
                        <p className="text-[14px] leading-[30px] tracking-wider ml-4 font-normal">
                            Stay updated with the latest advancements in technology and engineering.
                        </p>
                    </div>
                </div>

                <div className="flex items-center text-white bg-dark-background p-4 rounded-lg hover:shadow-xl">
                    <div className="bg-secondary w-12 h-12 rounded-full flex items-center justify-center mr-3">
                        <RiDiscountPercentFill className="text-3xl text-dark-background" />
                    </div>
                    <div>
                        <span className="font-base tracking-wider text-lg ml-4 leading-[30px] text-primary uppercase">
                            Discounts
                        </span>
                        <p className="text-[14px] leading-[30px] tracking-wider ml-4 font-normal">
                            Reduced fees for IEEE events, publications, and courses.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Clubsforu;
