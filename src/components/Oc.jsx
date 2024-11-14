import React, { useEffect, useState } from 'react';
import { Button } from "@material-tailwind/react";
import Modal from "react-modal";
import { FaTimes } from 'react-icons/fa'; // Import the white cross icon
import { useLocation } from 'react-router-dom'; // Import useLocation hook
import RegistrationService from '../service/registrationService';
import UsersService from '../service/UsersService';
import EventOcService from '../service/EventOcService';

const TeamSection = ({ title, teamMembers, onRemove, onAddNewClick, showAddButton }) => {
    return (
        <div className="w-full p-5 rounded-md overflow-auto">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl text-white">{title}</h2>
                {showAddButton && (
                    <Button className="bg-[#AEC90A] text-black rounded-full custom-card" onClick={onAddNewClick}>
                        Add member
                    </Button>
                )}
            </div>
            <div className="grid grid-cols-4 gap-4 overflow-auto">
                {teamMembers.map((member, index) => (
                    <div key={index} className="flex flex-col items-center custom-card">
                        <img src={member.memberImage} alt={member.memberName} className='w-30 h-30 rounded-full p-2' />
                        <p className="text-white">{member.memberName}</p>
                        {showAddButton && (
                            <Button
                                className="text-red-500 mt-2 custom-card"
                                onClick={() => onRemove(member.oc_id, title, index)}
                            >
                                Remove
                            </Button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

const App = ({clubId, event}) => {
    // const [teams, setTeams] = useState({
    //     "Team Design": [
    //         { userName: 'Alice', userImage: 'https://randomuser.me/api/portraits/women/9.jpg' },
    //         { userName: 'Bob', userImage: 'https://randomuser.me/api/portraits/men/13.jpg' },
    //         { userName: 'Charlie', userImage: 'https://randomuser.me/api/portraits/men/19.jpg' },
    //         { userName: 'Dave', userImage: 'https://randomuser.me/api/portraits/men/29.jpg' },
    //     ],
    //     "Team Finance": [
    //         { userName: 'Eve', userImage: 'https://randomuser.me/api/portraits/women/13.jpg' },
    //         { userName: 'Frank', userImage: 'https://randomuser.me/api/portraits/men/23.jpg' },
    //         { userName: 'Grace', userImage: 'https://randomuser.me/api/portraits/men/33.jpg' },
    //         { userName: 'Hank', userImage: 'https://randomuser.me/api/portraits/men/43.jpg' },
    //     ],
    //     "Team Content": [
    //         { userName: 'Ivy', userImage: 'https://randomuser.me/api/portraits/women/14.jpg' },
    //         { userName: 'Jack', userImage: 'https://randomuser.me/api/portraits/men/24.jpg' },
    //         { userName: 'Kara', userImage: 'https://randomuser.me/api/portraits/men/34.jpg' },
    //         { userName: 'Liam', userImage: 'https://randomuser.me/api/portraits/men/44.jpg' },
    //     ],
    //     "Team Marketing": [
    //         { userName: 'Mia', userImage: 'https://randomuser.me/api/portraits/women/15.jpg' },
    //         { userName: 'Noah', userImage: 'https://randomuser.me/api/portraits/men/25.jpg' },
    //         { userName: 'Olivia', userImage: 'https://randomuser.me/api/portraits/men/35.jpg' },
    //         { userName: 'Paul', userImage: 'https://randomuser.me/api/portraits/men/45.jpg' },
    //     ],
    // });


    

    // const clubMembers = {
    //     "Team Design": [
    //         { userName: 'Quinn', userImage: 'https://randomuser.me/api/portraits/women/16.jpg' },
    //         { userName: 'Ryan', userImage: 'https://randomuser.me/api/portraits/men/26.jpg' },
    //         { userName: 'Sophia', userImage: 'https://randomuser.me/api/portraits/women/36.jpg' },
    //         { userName: 'Thomas', userImage: 'https://randomuser.me/api/portraits/men/46.jpg' },
    //         { userName: 'Uma', userImage: 'https://randomuser.me/api/portraits/women/47.jpg' },
    //         { userName: 'Victor', userImage: 'https://randomuser.me/api/portraits/men/48.jpg' },
    //     ],
    //     "Team Finance": [
    //         { userName: 'Will', userImage: 'https://randomuser.me/api/portraits/men/49.jpg' },
    //         { userName: 'Xena', userImage: 'https://randomuser.me/api/portraits/women/50.jpg' },
    //         { userName: 'Yara', userImage: 'https://randomuser.me/api/portraits/women/51.jpg' },
    //         { userName: 'Zane', userImage: 'https://randomuser.me/api/portraits/men/52.jpg' },
    //         { userName: 'Ava', userImage: 'https://randomuser.me/api/portraits/women/53.jpg' },
    //         { userName: 'Ben', userImage: 'https://randomuser.me/api/portraits/men/54.jpg' },
    //     ],
    //     "Team Content": [
    //         { userName: 'Cora', userImage: 'https://randomuser.me/api/portraits/women/55.jpg' },
    //         { userName: 'Dylan', userImage: 'https://randomuser.me/api/portraits/men/56.jpg' },
    //         { userName: 'Ella', userImage: 'https://randomuser.me/api/portraits/women/57.jpg' },
    //         { userName: 'Finn', userImage: 'https://randomuser.me/api/portraits/men/58.jpg' },
    //         { userName: 'Gina', userImage: 'https://randomuser.me/api/portraits/women/59.jpg' },
    //         { userName: 'Harry', userImage: 'https://randomuser.me/api/portraits/men/60.jpg' },
    //     ],
    //     "Team Marketing": [
    //         { userName: 'Isla', userImage: 'https://randomuser.me/api/portraits/women/61.jpg' },
    //         { userName: 'Jake', userImage: 'https://randomuser.me/api/portraits/men/62.jpg' },
    //         { userName: 'Kara', userImage: 'https://randomuser.me/api/portraits/women/63.jpg' },
    //         { userName: 'Leo', userImage: 'https://randomuser.me/api/portraits/men/64.jpg' },
    //         { userName: 'Mona', userImage: 'https://randomuser.me/api/portraits/women/65.jpg' },
    //         { userName: 'Nate', userImage: 'https://randomuser.me/api/portraits/men/66.jpg' },
    //     ],
    // };

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentTeam, setCurrentTeam] = useState('');
    const [addedMembers, setAddedMembers] = useState([]);
    const [availableMembers, setAvailableMembers] = useState([]);

    const [allClubMembers, setAllClubMembers] = useState([]);
    const [currentOcMembers, setCurrentOcMembers] = useState([]);

    const location = useLocation(); // Get the current path

    //console.log("club id in OC", clubId);
    //console.log("event in OC", event);

    // Function to check if the path starts with one of the specified paths
    const isMatchingPage = () => {
        const paths = ['/president', '/secretary'];
        return paths.some(path => location.pathname.startsWith(path));
    };

    const handleRemove = async (oc_id, teamName, memberIndex) => {

        const token = localStorage.getItem('token'); 

        try{
            const response1 = await EventOcService.removeEventOC(oc_id, token);

            alert('Event OC removed successfully');
            console.log('Event OC removed:', response1);


        }catch(error){
            console.error("Error removing Event Oc:", error);
            return;

        }

        // const newTeams = { ...teams };
        // newTeams[teamName].splice(index, 1);
        // setTeams(newTeams);

        const newTeams = { ...teams };
        const removedMember = newTeams[teamName][memberIndex];

        newTeams[teamName].splice(memberIndex, 1);
        setTeams(newTeams);
    
      
        
    };

    // const handleAddNewClick = (teamName) => {
    //     setCurrentTeam(teamName);
    //     const currentMembers = teams[teamName];
    //     const availableMembers = clubMembers[teamName].filter(
    //         (member) => !currentMembers.some((m) => m.userName === member.userName)
    //     );
    //     setAddedMembers(currentMembers);
    //     setAvailableMembers(availableMembers);
    //     setModalIsOpen(true);
    // };

    const handleAddNewClick = (teamName) => {
        setCurrentTeam(teamName);
        const currentMembers = teams[teamName];
        const availableMembers = allClubMembers[teamName].filter(
            (member) => !currentMembers.some((m) => m.memberName === member.memberName)
        );
        //const availableMembers = allClubMembers[teamName]
        console.log("Availble members", availableMembers);
        setAddedMembers(currentMembers);
        setAvailableMembers(availableMembers);
        setModalIsOpen(true);
    };

    // const handleAddMember = (member, teamName) => {

    //     const newTeams = { ...teams };
    //     newTeams[teamName].push(member);
    //     setTeams(newTeams);

    //     const newAvailableMembers = availableMembers.filter((m) => m.userName !== member.userName);
    //     setAvailableMembers(newAvailableMembers);
    // };

    const handleAddMember = async (member, teamName) => {

        const token = localStorage.getItem('token'); 

        try{

            const response = await EventOcService.saveEventOc(
                member.memberName,
                member.team,
                event.name,
                false,
                event.event_id,
                member.userId,
                token
            );

            
            alert('Event OC added successfully');
            console.log('Event OC added:', response);
            //navigate(-1);


        }catch(err){

            console.error("Error adding Event Oc:", err);
            
            // const errorMessages = err.response ? err.response.data.errors : { global: err.message };
            // setErrors(errorMessages);
            // setTimeout(() => setErrors({}), 5000);

        }


        const newTeams = { ...teams };
        newTeams[teamName].push(member);
        setTeams(newTeams);

        const newAvailableMembers = availableMembers.filter((m) => m.memberName !== member.memberName);
        setAvailableMembers(newAvailableMembers);
    };

    const allTeams = ["Design Team", "Marketing Team", "Finance Team", "Program Team"];

    useEffect(() => {

        const fetchOCMembers = async () => {
            try{
                const token = localStorage.getItem('token');
                const response = await EventOcService.getAllEventOcs(token) ;
                //console.log("oc array", response);
                const ocArray = response.content.filter(oc => oc.event_id === event.event_id && oc._removed == false) || [];
                console.log("oc array", ocArray);

                // Map through ocArray to fetch user details for each user
                const detailedOCMembers = await Promise.all(
                    ocArray.map(async oc => {
                        const userResponse = await UsersService.getUserById(oc.user_id, token);
                        //console.log("user details in oc",userResponse);
                        return { 
                            ...oc, 
                            memberName: userResponse.users.firstname, 
                            memberImage: userResponse.users.photoUrl
                            
                        };
                    })
                );

                //console.log("detailed members ", detailedMembers);

                // Group members by team
                const categorizedOCMembers = detailedOCMembers.reduce((acc, member) => {
                    const team = member.team || "No Team"; 
                    if (!acc[team]) {
                        acc[team] = [];
                    }
                    acc[team].push(member);
                    return acc;
                }, {});

                // Ensure all teams are present, even if they have no members
                allTeams.forEach((team) => {
                    if (!categorizedOCMembers[team]) {
                        categorizedOCMembers[team] = [];
                    }
                });


                console.log("Categorized OC members by team", categorizedOCMembers);
                setCurrentOcMembers(categorizedOCMembers);
                
    
            }catch(error){
                console.error("Error fetching event OCs", error);
            }

        }

        fetchOCMembers();

      
    }, [modalIsOpen])
    

    useEffect(() => {

        const fetchMembers = async () => {
            try{
                const token = localStorage.getItem('token');
                const response = await RegistrationService.getAllRegistrations(token) ;
                //console.log("response array", response);
                const regArray = response.content.filter(reg => reg.clubId === clubId && reg.accepted == 1) || [];
                //console.log("reg array", regArray);

               

                // Map through regArray to fetch user details for each user
                const detailedMembers = await Promise.all(
                    regArray.map(async reg => {
                        const userResponse = await UsersService.getUserById(reg.userId, token);
                        //console.log("user details in oc",userResponse);
                        return { 
                            ...reg, 
                            memberName: userResponse.users.firstname, 
                            memberImage: userResponse.users.photoUrl
                            
                        };
                    })
                );

                //console.log("detailed members ", detailedMembers);

                // Group members by team
                const categorizedMembers = detailedMembers.reduce((acc, member) => {
                    const team = member.team || "No Team"; 
                    if (!acc[team]) {
                        acc[team] = [];
                    }
                    acc[team].push(member);
                    return acc;
                }, {});

                console.log("Categorized members by team", categorizedMembers);
                setAllClubMembers(categorizedMembers);
                
    
            }catch(error){
                console.error("Error fetching registrations", error);
            }

        }

        fetchMembers();

      
    }, [modalIsOpen])

    const [teams, setTeams] = useState([]);

    useEffect(() => {
        setTeams(currentOcMembers);
    }, [currentOcMembers]);
    

    return (
        <div className="bg-neutral-900 text-white p-2 w-full">
            <div className="w-full bg-[#1A1A1A] rounded-md p-2"                   style={{ boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' }}
>
                <h2 className="text-2xl font-bold mb-4"></h2>
                {Object.keys(teams).map((teamName, index) => (
                    <TeamSection
                        key={index}
                        title={teamName}
                        teamMembers={teams[teamName]}
                        onRemove={handleRemove}
                        onAddNewClick={() => handleAddNewClick(teamName)}
                        showAddButton={isMatchingPage()} // Show button based on URL path
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
                        className="absolute top-2 right-2 text-white  custom-card "
                        onClick={() => setModalIsOpen(false)}
                    >
                        <FaTimes size={20} />
                    </button>
        <h3 className="text-xl text-white mb-2 ">Added Members</h3> {/* Centered subheading */}
        <div className="grid grid-cols-4"> {/* Reduced gap between members */}
            {addedMembers.map((member, index) => (
                <div key={index} className="flex flex-col items-center  custom-card">
                    <img
                        src={member.memberImage}
                        alt={member.memberName}
                        className="w-30 h-30 rounded-full p-2" // Adjusted image size
                    />
                    <p className="text-white text-center">{member.memberName}</p> {/* Centered text */}
                </div>
            ))}
        </div>
    </div>
    
    <div>
        <h3 className="text-xl text-white mb-2 ">Available Members</h3> {/* Centered subheading */}
        <div className="grid grid-cols-4 gap-1"> {/* Reduced gap between members */}
            {availableMembers.map((member, index) => (
                <div key={index} className="flex flex-col items-center  custom-card">
                    <img
                        src={member.memberImage}
                        alt={member.memberName}
                        className="w-30 h-30 rounded-full p-2" // Adjusted image size
                    />
                    <p className="text-white text-center">{member.memberName}</p> {/* Centered text */}
                    <Button type='submit'
                        className="bg-[#AEC90A] text-black mt-2 rounded-full  custom-card"
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
