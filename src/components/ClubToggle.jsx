import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ClubToggle = ({ clubId }) => {
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:8080/clubs/getClub/${clubId}`)
            .then(response => {
                const club = response.data.content;
                console.log('Fetched club state:', club.state); // Log fetched state
                setIsActive(club.state);
            })
            .catch(error => {
                console.error("There was an error fetching the club state!", error);
            });
    }, [clubId]);

    const handleToggle = () => {
        console.log('Toggle clicked. Current state:', isActive); // Log current state
        axios.patch(`http://localhost:8080/clubs/${clubId}/state`, 
            { state: !isActive }, // Send state in the request body
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        .then(() => {
            setIsActive(prevState => !prevState);
            console.log('Updated state to:', !isActive); // Log new state
        })
        .catch(error => {
            console.error("There was an error updating the club state!", error);
        });
    };
    

    return (
        <button
            onClick={handleToggle}
            className={`w-16 h-8 rounded-full flex items-center p-1 cursor-pointer ${isActive ? 'bg-[#AEC90A]' : 'bg-gray-400'}`}
        >
            <div
                className={`w-7 h-7 bg-white rounded-full shadow-md transform transition-transform ${isActive ? 'translate-x-8' : 'translate-x-0'}`}
            />
        </button>
    );
};

export default ClubToggle;
