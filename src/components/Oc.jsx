import React from 'react';
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { Button } from "@material-tailwind/react";

const TeamSection = ({ title, teamMembers }) => {
    return (
        <div className="w-full  bg-[#0b0b0b] p-5  rounded-md ">
            <h2 className="text-xl text-white mb-4 text-center">{title}</h2>
            <div className="grid grid-cols-4 gap-4">
                {teamMembers.map((member, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <img src={member.userImage} alt={member.userName} className='w-30 h-30 rounded-full p-2' />
                        <p>{member.userName}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const App = () => {
    const designTeam = [
        { userName: 'Alice', userImage: 'https://randomuser.me/api/portraits/women/9.jpg' },
        { userName: 'Bob', userImage: 'https://randomuser.me/api/portraits/men/13.jpg' },
        { userName: 'Charlie', userImage: 'https://randomuser.me/api/portraits/men/19.jpg' },
        { userName: 'Dave', userImage: 'https://randomuser.me/api/portraits/men/29.jpg' },
    ];

    const financeTeam = [
        { userName: 'Eve', userImage: 'https://randomuser.me/api/portraits/women/13.jpg' },
        { userName: 'Frank', userImage: 'https://randomuser.me/api/portraits/men/23.jpg' },
        { userName: 'Grace', userImage: 'https://randomuser.me/api/portraits/men/33.jpg' },
        { userName: 'Hank', userImage: 'https://randomuser.me/api/portraits/men/43.jpg' },
    ];

    const contentTeam = [
        { userName: 'Ivy', userImage: 'https://randomuser.me/api/portraits/women/14.jpg' },
        { userName: 'Jack', userImage: 'https://randomuser.me/api/portraits/men/24.jpg' },
        { userName: 'Kara', userImage: 'https://randomuser.me/api/portraits/men/34.jpg' },
        { userName: 'Liam', userImage: 'https://randomuser.me/api/portraits/men/44.jpg' },
    ];

    const marketingTeam = [
        { userName: 'Mia', userImage: 'https://randomuser.me/api/portraits/women/15.jpg' },
        { userName: 'Noah', userImage: 'https://randomuser.me/api/portraits/men/25.jpg' },
        { userName: 'Olivia', userImage: 'https://randomuser.me/api/portraits/men/35.jpg' },
        { userName: 'Paul', userImage: 'https://randomuser.me/api/portraits/men/45.jpg' },
    ];

    return (
        <div className="min-h-screen bg-neutral-900 text-white p-8 w-full">
            <TeamSection title="Design Team" teamMembers={designTeam} />
            <TeamSection title="Finance Team" teamMembers={financeTeam} />
            <TeamSection title="Content Team" teamMembers={contentTeam} />
            <TeamSection title="Marketing Team" teamMembers={marketingTeam} />
        </div>
    );
};

export default App;
