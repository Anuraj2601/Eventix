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

    

    useEffect(() => {
        const fetchUserProfiles = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/users/getAllUsersIncludingCurrent', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                // Check if the response data is an array
                if (Array.isArray(response.data)) {
                    // Map the response data to create user profiles
                    const profiles = response.data.map((user) => ({
                        user_id: user.id,
                        name: `${user.firstname} ${user.lastname}`,
                        email: user.email,
                        profileImage: user.photoUrl || '',  // Use a default if no image
                    }));

                    // Set the fetched user profiles to the state
                    setUserProfiles(profiles);
                } else {
                    setMessage('Error: Response data is not an array');
                }
            } catch (err) {
                setMessage('Error fetching user profiles. Please try again.');
                console.error('Error fetching user profiles:', err);
            }
        };

        // Fetch the profiles when the component mounts
        fetchUserProfiles();
    }, []);


    useEffect(() => {
        const fetchEventOCs = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await EventOcService.getAllEventOcs(token);
                
                console.log("Fetched Event OCs Response:", response); // Log the entire response object
                
                // Check if the response contains the expected data (e.g., response.content)
                if (response && Array.isArray(response.content)) {
                    console.log("Fetched Event OCs:", response.content); // Log the actual event OCs
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
    

    

    const getEventNamesForCandidate = (candidate) => {
        if (!candidate.userEmail) return []; // Return empty array if no email
    
        // Find matching profile based on email
        const matchingProfile = userProfiles.find(
            (profile) => profile.email === candidate.userEmail
        );
    
        if (!matchingProfile) return []; // If no matching profile, return empty array
    
        // Filter event OCs by the found user_id
        return eventOCs
            .filter((oc) => oc.user_id === matchingProfile.user_id) // Filter event OCs by user_id
            .map((oc) => oc.event_name); // Return only the event names
    };
    
    
    
    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const data = await getAllCandidates();
                console.log("Fetched candidates:", data);
                if (Array.isArray(data)) {
                    data.forEach(candidate => {
                        console.log(`Candidate ID: ${candidate.id}`);
                        console.log(`Name: ${candidate.name}`);
                        console.log(`Performance: ${candidate.performance}`);
                    });
                } else {
                    console.error("Fetched data is not an array:", data);
                }
                setCandidates(data);
            } catch (error) {
                console.error("Error fetching candidates:", error);
            }
        };
        fetchCandidates();
    }, []);

    useEffect(() => {
        const fetchMeetingParticipants = async () => {
            const promises = candidates.map(async (candidate) => {
                const events = getEventNamesForCandidate(candidate);
                const userId = candidate.user_id;
                const clubId = candidate.clubId;
                
                try {
                    const response = await axios.get(
                        `http://localhost:8080/api/meeting-participants/user/${userId}/club/${clubId}`
                    );
                    return {
                        candidate,
                        meetingParticipants: response.data,
                        events
                    };
                } catch (error) {
                    console.error('Error fetching meeting participants:', error);
                    return null;
                }
            });
            
            const results = await Promise.all(promises);
            const filteredResults = results.filter(result => result !== null);
            setMeetingParticipants(filteredResults);
        };

        fetchMeetingParticipants();
    }, [candidates, userProfiles, eventOCs]);

    const filterCandidates = (candidates) => {
        const electionIdFromUrl = window.location.pathname.split('/').pop(); // Extract the last part of the URL (electionId)
    
        return candidates.filter(candidate => {
            // Check if the candidate's electionId matches the one from the URL
            const isSameElection = String(candidate.electionId) === String(electionIdFromUrl);
    
            // Apply the activeTab filtering and ensure the candidate is part of the current election
            switch (activeTab) {
                case "Applicants":
                    return candidate.selected === "applied" && isSameElection;
                case "Selected":
                    return candidate.selected === "selected" && isSameElection;
                case "Rejected":
                    return candidate.selected === "rejected" && isSameElection;
                default:
                    return isSameElection; // If no tab is selected, return all candidates for the election
            }
        });
    };
    

    const handleSelect = async (id) => {
        try {
            const status = "selected";
            await updateCandidateSelection(id, status);
            setCandidates(candidates.map(candidate =>
                candidate.id === id ? { ...candidate, selected: status } : candidate
            ));
            setMessage(`Candidate updated to ${status}.`);
            setTimeout(() => setMessage(""), 3000);
        } catch (error) {
            setMessage("Error updating candidate.");
        }
    };

    const handleReject = async (id) => {
        try {
            const status = "rejected";
            await updateCandidateSelection(id, status);
            setCandidates(candidates.map(candidate =>
                candidate.id === id ? { ...candidate, selected: status } : candidate
            ));
            setMessage(`Candidate updated to ${status}.`);
            setTimeout(() => setMessage(""), 3000);
        } catch (error) {
            setMessage("Error updating candidate.");
        }
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
          <div className="w-36 h-36"> {/* Adjust width and height here */} 
              <Pie data={data} />
          </div>
      );
  };

    const categories = ["President", "Secretary", "Treasurer"];

    // Function to get the count of selected candidates per category
    const getSelectedCount = (category) => {
        return candidates.filter(candidate =>
            candidate.position.toLowerCase() === category.toLowerCase() &&
            candidate.selected === "selected"
        ).length;
    };

    return (
      <div className="text-white">
          {message && (
              <div className="bg-black text-[#AEC90A] p-4 mb-4">
                  <Typography>{message}</Typography>
              </div>
          )}


          {categories.map(category => {
              const categoryCandidates = candidates.filter(candidate => candidate.position.toLowerCase() === category.toLowerCase());
              const filteredCandidates = filterCandidates(categoryCandidates);

              // Sort candidates by performance in descending order
              const sortedCandidates = [...filteredCandidates].sort((a, b) => b.performance - a.performance);
              
              // Get the number of selected candidates for the current category
              const selectedCount = getSelectedCount(category);

              return (
                  <div key={category} className="mb-8">
                      <Typography variant="h5" className="mb-2">
                          {category}
                      </Typography>
                       <tbody>
          {meetingParticipants.length > 0 ? (
            meetingParticipants.map(({ candidate, meetingParticipants, events }) => (
              <tr key={candidate.id}>
                <td className="px-4 py-2">
                  <div className="flex items-start gap-4">
                    <Avatar
                      className="w-16 h-16 rounded-full"
                      src={candidate.imageUrl || `https://source.unsplash.com/random?sig=${candidate.id}`}
                    />
                    <Typography variant="h6">{candidate.name || 'No Name'}</Typography>
                  </div>
                </td>
                <td className="px-4 py-2">{candidate.clubId}</td>
                <td className="px-4 py-2">
                  {events.length > 0 ? events.join(', ') : 'No Events'}
                </td>
                <td className="px-4 py-2">
                  {meetingParticipants.length > 0
                    ? meetingParticipants[0].attendance === 1
                      ? 'Present'
                      : 'Absent'
                    : 'N/A'}
                </td>
                <td className="px-4 py-2">
                  {meetingParticipants.length > 0 ? meetingParticipants[0].qrCodeUser : 'No QR Code'}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-4 py-2 text-center">Loading...</td>
            </tr>
          )}
        </tbody>
                      {sortedCandidates.length > 0 ? (
                            sortedCandidates.map(candidate => {
                                // Find the matching user profile for this candidate
                                const userProfile = userProfiles.find(profile => profile.user_id === candidate.user_id);
                                const associatedEvents = getEventNamesForCandidate(candidate); // Store the event names result
            
                                
                                return (
                            
                              <Card key={candidate.id} className="mb-4 bg-black text-white">
                                  <CardBody>
                                      <div className="flex items-start gap-4">
                                          {/* Image on the Left */}
                                          <div className="flex-shrink-0 w-1/6">
                                              <Avatar className="w-40 h-40 rounded-full" src={candidate.imageUrl || `https://source.unsplash.com/random?sig=${candidate.id}`} />
                                          </div>
                                          {/* Details in the Middle */}
                                          <div className="flex-grow flex flex-col gap-4 w-1/3">
                                              <Typography variant="h6">{candidate.name || 'No Name'}</Typography>
                                              <Typography variant="h6">{candidate.clubId || 'No Name'}</Typography>

                                              <Typography variant="h6">{candidate.userEmail || 'No Name'}</Typography>
                                              <Typography variant="h6">Position they Applied for : {candidate.position }</Typography>


                                              <Typography variant="body2">How can they make a change? {candidate.contribution}</Typography>
                                          </div>
                                          {associatedEvents.length > 0 && (
                                        <>
                                            <p className="mb-4"><strong>Associated Events:</strong></p>
                                            <ul className="list-disc list-inside text-[#AEC90A] font-bold">
                                                {associatedEvents.map((eventName, index) => (
                                                    <li key={index}>{eventName}</li>
                                                ))}
                                            </ul>
                                        </>
                                    )}

                                          {/* Pie Chart on the Right */}
                                          <div className="flex-shrink-0 w-1/6 flex flex-col items-center">
                                              {renderPieChart(candidate.performance)}
                                              <Typography variant="body2" className="mt-2">
                                                  {candidate.performance}%
                                              </Typography>                                              

                                          </div>
                                      </div>
                                      {/* Buttons at the Bottom Right Corner */}
                                      {/* Buttons at the Bottom Right Corner */}
<div className="mt-4 flex justify-end gap-2">
    {candidate.selected === "selected" ? (
        <Button
        className="bg-red-500 hover:bg-[#9AB307] text-black font-bold py-2 px-4 rounded-full transition duration-300"
        onClick={() => handleReject(candidate.id)}
        >
            Reject
        </Button>
    ) : candidate.selected === "rejected" ? (
        <Button
            className="bg-[#AEC90A] hover:bg-[#9AB307] text-black font-bold py-2 px-4 rounded-full transition duration-300"
            onClick={() => handleSelect(candidate.id)}
            disabled={selectedCount >= 3}
        >
            Select
        </Button>
    ) : (
        <>
            <Button
                className="bg-[#AEC90A] hover:bg-[#9AB307] text-black font-bold py-2 px-4 rounded-full transition duration-300"
                onClick={() => handleSelect(candidate.id)}
                disabled={selectedCount >= 3}
            >
                Select
            </Button>
            <Button
                className="bg-red hover:bg-[#9AB307] text-black font-bold py-2 px-4 rounded-full transition duration-300"
                onClick={() => handleReject(candidate.id)}
            >
                Reject
            </Button>
        </>
    )}
</div>

                                  </CardBody>
                              </Card>
                          );
                        })
                    ) : (
                          <Typography>No candidates for {category}.</Typography>
                          )}
                          </div>
                      );
                  })}
              </div>
          );
      };

export default Candidates;
