import React, { useEffect, useState } from "react";
import { getAllCandidates, updateCandidateSelection } from "../service/candidateService";
import { Card, CardBody, Typography, Avatar, Button } from "@material-tailwind/react";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from 'chart.js';
import EventOcService from '../service/EventOcService';
import UsersService from '../service/UsersService'; // Adjust path if needed
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend);

const Candidates = ({ activeTab }) => {
    const [candidates, setCandidates] = useState([]);
    const [message, setMessage] = useState(""); 
    const [eventOCs, setEventOCs] = useState([]);
    const [userProfiles, setUserProfiles] = useState([]); // Initialize as an array
    const [meetingParticipants, setMeetingParticipants] = useState([]); 
    const [selectedCategory, setSelectedCategory] = useState("President");  // Track the selected category

    const sortedCandidates = candidates.sort((a, b) => a.name.localeCompare(b.name));

    useEffect(() => {
        const fetchUserProfiles = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/users/getAllUsersIncludingCurrent', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (Array.isArray(response.data)) {
                    const profiles = response.data.map((user) => ({
                        user_id: user.id,
                        name: `${user.firstname} ${user.lastname}`,
                        email: user.email,
                        profileImage: user.photoUrl || '',  
                    }));
                    setUserProfiles(profiles);
                } else {
                    setMessage('Error: Response data is not an array');
                }
            } catch (err) {
                setMessage('Error fetching user profiles. Please try again.');
                console.error('Error fetching user profiles:', err);
            }
        };
        fetchUserProfiles();
    }, []);

    useEffect(() => {
        const fetchEventOCs = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await EventOcService.getAllEventOcs(token);
                
                if (response && Array.isArray(response.content)) {
                    setEventOCs(response.content || []);
                } else {
                    console.error("Unexpected response format:", response);
                }
            } catch (error) {
                console.error("Error fetching Event OCs:", error);
            }
        };
        fetchEventOCs();
    }, []);

    const getUserIdForCandidate = (candidate) => {
        if (!candidate.userEmail) return null; 
        
        const matchingProfile = userProfiles.find((profile) => profile.email === candidate.userEmail);
        return matchingProfile ? matchingProfile.user_id : null;
    };

    const getEventNamesForCandidate = (candidate) => {
        if (!candidate.userEmail) return [];
    
        const matchingProfile = userProfiles.find((profile) => profile.email === candidate.userEmail);
        if (!matchingProfile) return [];
    
        const user_id = matchingProfile.user_id; 
        return eventOCs.filter((oc) => oc.user_id === user_id).map((oc) => oc.event_name);
    };

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const data = await getAllCandidates();
                setCandidates(data);
            } catch (error) {
                console.error("Error fetching candidates:", error);
            }
        };
        fetchCandidates();
    }, []);

    useEffect(() => {
        const fetchMeetingParticipants = async () => {
            const promises = sortedCandidates.map(async (candidate) => {
                const userId = getUserIdForCandidate(candidate);
                const clubId = candidate.clubId; 

                if (!userId || !clubId) {
                    return { candidateId: candidate.id, meetingParticipants: [] };
                }

                try {
                    const response = await axios.get(
                        `http://localhost:8080/api/meeting-participants/user/${userId}/club/${clubId}`
                    );
                    return {
                        candidateId: candidate.id,
                        meetingParticipants: response.data,
                    };
                } catch (error) {
                    return { candidateId: candidate.id, meetingParticipants: [] };
                }
            });

            const results = await Promise.all(promises);
            const participantsMap = results.reduce((acc, result) => {
                acc[result.candidateId] = result.meetingParticipants;
                return acc;
            }, {});
            setMeetingParticipants(participantsMap);
        };

        if (sortedCandidates.length > 0) fetchMeetingParticipants();
    }, [sortedCandidates]);

    const filterCandidates = (candidates) => {
        const electionIdFromUrl = window.location.pathname.split('/').pop(); 
        return candidates.filter(candidate => {
            const isSameElection = String(candidate.electionId) === String(electionIdFromUrl);
            return candidate.selected === "selected" && isSameElection;
        });
    };

    const renderPieChart = (performance) => {
        if (typeof performance !== 'number') {
            return <Typography>Invalid performance data</Typography>;
        }
        
        const data = {
            labels: ['Performance'],
            datasets: [{
                data: [performance, 100 - performance],
                backgroundColor: ['#AEC90A', 'black'],
                borderWidth: 1,
            }],
        };

        return (
            <div className="w-36 h-36">
                <Pie data={data} />
            </div>
        );
    };

    const categories = ["President", "Secretary", "Treasurer"];

    const getSelectedCount = (category) => {
        return candidates.filter(candidate =>
            candidate.position.toLowerCase() === category.toLowerCase() &&
            candidate.selected === "selected"
        ).length;
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    return (
        <div className="flex text-white">
            <div className="w-1/4 bg-gray-800 p-4">
                <Typography variant="h5" className="mb-4 text-[#AEC90A]">Positions</Typography>
                {categories.map((category) => (
                    <Button
                        key={category}
                        variant="outlined"
                        color={selectedCategory === category ? "amber" : "gray"}
                        onClick={() => handleCategoryChange(category)}
                        className="w-full mb-2"
                    >
                        {category} 
                    </Button>
                ))}
            </div>

            <div className="w-3/4 p-4">
                {categories.map(category => {
                    const categoryCandidates = candidates.filter(candidate => candidate.position.toLowerCase() === category.toLowerCase());
                    const filteredCandidates = filterCandidates(categoryCandidates);
                    const sortedCandidates = [...filteredCandidates].sort((a, b) => {
                        const aParticipants = meetingParticipants[a.id] || [];
                        const bParticipants = meetingParticipants[b.id] || [];
                        const aAttendance = aParticipants.length > 0
                            ? (aParticipants.filter(participant => participant.attendance === 1).length / aParticipants.length) * 100
                            : 0;
                        const bAttendance = bParticipants.length > 0
                            ? (bParticipants.filter(participant => participant.attendance === 1).length / bParticipants.length) * 100
                            : 0;
                        return bAttendance - aAttendance;
                    });
                    const selectedCount = getSelectedCount(category);

                    if (selectedCategory === category) {
                        return (
                         <div key={category} className="mb-8">
    <Typography variant="h5" className="mb-2">{category}</Typography>
    {sortedCandidates.length > 0 ? (
        <div className="flex flex-col gap-8"> {/* Flex column for vertical stacking with extra gap */}
            {sortedCandidates.map(candidate => {
                const userProfile = userProfiles.find(profile => profile.user_id === candidate.user_id);
                const associatedEvents = getEventNamesForCandidate(candidate);
                const participantDetails = meetingParticipants[candidate.id] || [];

                return (
                    <Card 
                      key={candidate.id} 
                      className="bg-black flex flex-col items-center space-y-4 p-10 rounded-lg custom-card w-1/3 m-2" // m-2 adds margin for spacing
                    >
                        <Avatar
                            src={candidate.imageUrl || `https://source.unsplash.com/random?sig=${candidate.id}`}
                            alt={`Candidate ${candidate.id}`}
                            className="w-36 h-36 rounded-full object-cover border-black border-4"
                            style={{ boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' }}
                        />
                        <CardBody className="flex flex-col items-center text-center">
                            <Typography variant="h5" className="text-white font-bold">{candidate.name || 'No Name'}</Typography>
                            <Typography className="text-gray-300 p-2">{candidate.contribution || 'No contribution available'}</Typography>

                            {/* Render the Pie Chart */}
                            {renderPieChart(participantDetails.length > 0
                                ? (participantDetails.filter(p => p.attendance === 1).length / participantDetails.length) * 100
                                : 0
                            )}
 <Typography variant="body2" className="mt-2 text-white">
    {(
      (participantDetails.filter((participant) => participant.attendance === 1).length /
      participantDetails.length) * 100
    ).toFixed(2)}% club performance
  </Typography>
                            <div className="my-4 mt-8">
                              
                                {associatedEvents.length > 0 ? (
                                  
                                    <ul className="list-disc text-gray-300">
                                        <Typography className="text-white">Has been successful in being part of:</Typography>
                                        {associatedEvents.map((event, idx) => (
                                            <li key={idx}>{event}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <Typography className="text-gray-400"></Typography>
                                )}
                            </div>
                        </CardBody>
                    </Card>
                );
            })}
        </div>
    ) : (
        <Typography>No candidates found for this category.</Typography>
    )}
</div>


                           
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
};

export default Candidates;
