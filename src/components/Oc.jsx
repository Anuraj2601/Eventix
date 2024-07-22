import React, { useState } from 'react';
import { Button } from "@material-tailwind/react";
import Modal from "react-modal";
import { FaTimes } from 'react-icons/fa'; // Import the white cross icon


const TeamSection = ({ title, teamMembers, onRemove, onAddNewClick }) => {
    return (
        <div className="w-full p-5 rounded-md overflow-auto">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl text-white">{title}</h2>
                <Button className="bg-[#AEC90A] text-black rounded-full" onClick={onAddNewClick}>Add member</Button>
            </div>
            <div className="grid grid-cols-4 gap-4 overflow-auto">
                {teamMembers.map((member, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <img src={member.userImage} alt={member.userName} className='w-30 h-30 rounded-full p-2' />
                        <p className="text-white">{member.userName}</p>
                        <Button
                            className="text-red-500 mt-2"
                            onClick={() => onRemove(index, title)}
                        >
                            Remove
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const App = () => {
    const [teams, setTeams] = useState({
        "Team Design": [
            { userName: 'Alice', userImage: 'https://randomuser.me/api/portraits/women/9.jpg' },
            { userName: 'Bob', userImage: 'https://randomuser.me/api/portraits/men/13.jpg' },
            { userName: 'Charlie', userImage: 'https://randomuser.me/api/portraits/men/19.jpg' },
            { userName: 'Dave', userImage: 'https://randomuser.me/api/portraits/men/29.jpg' },
        ],
        "Team Finance": [
            { userName: 'Eve', userImage: 'https://randomuser.me/api/portraits/women/13.jpg' },
            { userName: 'Frank', userImage: 'https://randomuser.me/api/portraits/men/23.jpg' },
            { userName: 'Grace', userImage: 'https://randomuser.me/api/portraits/men/33.jpg' },
            { userName: 'Hank', userImage: 'https://randomuser.me/api/portraits/men/43.jpg' },
        ],
        "Team Content": [
            { userName: 'Ivy', userImage: 'https://randomuser.me/api/portraits/women/14.jpg' },
            { userName: 'Jack', userImage: 'https://randomuser.me/api/portraits/men/24.jpg' },
            { userName: 'Kara', userImage: 'https://randomuser.me/api/portraits/men/34.jpg' },
            { userName: 'Liam', userImage: 'https://randomuser.me/api/portraits/men/44.jpg' },
        ],
        "Team Marketing": [
            { userName: 'Mia', userImage: 'https://randomuser.me/api/portraits/women/15.jpg' },
            { userName: 'Noah', userImage: 'https://randomuser.me/api/portraits/men/25.jpg' },
            { userName: 'Olivia', userImage: 'https://randomuser.me/api/portraits/men/35.jpg' },
            { userName: 'Paul', userImage: 'https://randomuser.me/api/portraits/men/45.jpg' },
        ],
    });

    const clubMembers = {
        "Team Design": [
            { userName: 'Quinn', userImage: 'https://randomuser.me/api/portraits/women/16.jpg' },
            { userName: 'Ryan', userImage: 'https://randomuser.me/api/portraits/men/26.jpg' },
            { userName: 'Sophia', userImage: 'https://randomuser.me/api/portraits/women/36.jpg' },
            { userName: 'Thomas', userImage: 'https://randomuser.me/api/portraits/men/46.jpg' },
            { userName: 'Uma', userImage: 'https://randomuser.me/api/portraits/women/47.jpg' },
            { userName: 'Victor', userImage: 'https://randomuser.me/api/portraits/men/48.jpg' },
        ],
        "Team Finance": [
            { userName: 'Will', userImage: 'https://randomuser.me/api/portraits/men/49.jpg' },
            { userName: 'Xena', userImage: 'https://randomuser.me/api/portraits/women/50.jpg' },
            { userName: 'Yara', userImage: 'https://randomuser.me/api/portraits/women/51.jpg' },
            { userName: 'Zane', userImage: 'https://randomuser.me/api/portraits/men/52.jpg' },
            { userName: 'Ava', userImage: 'https://randomuser.me/api/portraits/women/53.jpg' },
            { userName: 'Ben', userImage: 'https://randomuser.me/api/portraits/men/54.jpg' },
        ],
        "Team Content": [
            { userName: 'Cora', userImage: 'https://randomuser.me/api/portraits/women/55.jpg' },
            { userName: 'Dylan', userImage: 'https://randomuser.me/api/portraits/men/56.jpg' },
            { userName: 'Ella', userImage: 'https://randomuser.me/api/portraits/women/57.jpg' },
            { userName: 'Finn', userImage: 'https://randomuser.me/api/portraits/men/58.jpg' },
            { userName: 'Gina', userImage: 'https://randomuser.me/api/portraits/women/59.jpg' },
            { userName: 'Harry', userImage: 'https://randomuser.me/api/portraits/men/60.jpg' },
        ],
        "Team Marketing": [
            { userName: 'Isla', userImage: 'https://randomuser.me/api/portraits/women/61.jpg' },
            { userName: 'Jake', userImage: 'https://randomuser.me/api/portraits/men/62.jpg' },
            { userName: 'Kara', userImage: 'https://randomuser.me/api/portraits/women/63.jpg' },
            { userName: 'Leo', userImage: 'https://randomuser.me/api/portraits/men/64.jpg' },
            { userName: 'Mona', userImage: 'https://randomuser.me/api/portraits/women/65.jpg' },
            { userName: 'Nate', userImage: 'https://randomuser.me/api/portraits/men/66.jpg' },
        ],
    };

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentTeam, setCurrentTeam] = useState('');
    const [addedMembers, setAddedMembers] = useState([]);
    const [availableMembers, setAvailableMembers] = useState([]);

    const handleRemove = (index, teamName) => {
        const newTeams = { ...teams };
        newTeams[teamName].splice(index, 1);
        setTeams(newTeams);
    };

    const handleAddNewClick = (teamName) => {
        setCurrentTeam(teamName);
        const currentMembers = teams[teamName];
        const availableMembers = clubMembers[teamName].filter(
            (member) => !currentMembers.some((m) => m.userName === member.userName)
        );
        setAddedMembers(currentMembers);
        setAvailableMembers(availableMembers);
        setModalIsOpen(true);
    };

    const handleAddMember = (member, teamName) => {
        const newTeams = { ...teams };
        newTeams[teamName].push(member);
        setTeams(newTeams);

        const newAvailableMembers = availableMembers.filter((m) => m.userName !== member.userName);
        setAvailableMembers(newAvailableMembers);
    };

    return (
        <div className="bg-neutral-900 text-white p-2 w-full">
            <div className="w-full bg-[#0b0b0b] p-5 rounded-md overflow-auto">
                {Object.keys(teams).map((teamName) => (
                    <TeamSection
                        key={teamName}
                        title={teamName}
                        teamMembers={teams[teamName]}
                        onRemove={handleRemove}
                        onAddNewClick={() => handleAddNewClick(teamName)}
                    />
                ))}
            </div>
            <Modal
    isOpen={modalIsOpen}
    onRequestClose={() => setModalIsOpen(false)}
    contentLabel={`Add New Member to ${currentTeam}`}
    className="fixed inset-0 bg-black p-10 w-full md:w-1/2 mx-auto my-10 rounded-lg overflow-y-auto"
                overlayClassName="fixed inset-0 bg-black opacity-90"
>
    <h2 className="text-2xl text-white mb-4 text-center p-10">
        {`Add New Member to ${currentTeam}`}
    </h2> {/* Centered heading */}
    
    <div className="mb-4">
    <button
                        className="absolute top-2 right-2 text-white "
                        onClick={() => setModalIsOpen(false)}
                    >
                        <FaTimes size={20} />
                    </button>
        <h3 className="text-xl text-white mb-2 ">Added Members</h3> {/* Centered subheading */}
        <div className="grid grid-cols-4"> {/* Reduced gap between members */}
            {addedMembers.map((member, index) => (
                <div key={index} className="flex flex-col items-center">
                    <img
                        src={member.userImage}
                        alt={member.userName}
                        className="w-30 h-30 rounded-full p-2" // Adjusted image size
                    />
                    <p className="text-white text-center">{member.userName}</p> {/* Centered text */}
                </div>
            ))}
        </div>
    </div>
    
    <div>
        <h3 className="text-xl text-white mb-2 ">Available Members</h3> {/* Centered subheading */}
        <div className="grid grid-cols-4 gap-1"> {/* Reduced gap between members */}
            {availableMembers.map((member, index) => (
                <div key={index} className="flex flex-col items-center">
                    <img
                        src={member.userImage}
                        alt={member.userName}
                        className="w-30 h-30 rounded-full p-2" // Adjusted image size
                    />
                    <p className="text-white text-center">{member.userName}</p> {/* Centered text */}
                    <Button
                        className="bg-[#AEC90A] text-black mt-2 rounded-full"
                        onClick={() => handleAddMember(member, currentTeam)}
                    >
                        Add
                    </Button>
                </div>
            ))}
        </div>
    </div>
    
    
</Modal>



        </div>
    );
};

export default App;
