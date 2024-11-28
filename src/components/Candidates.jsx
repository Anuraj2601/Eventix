import React, { useEffect, useState } from "react";
import { getAllCandidates, updateCandidateSelection } from "../service/candidateService";
import { Card, CardBody, Typography, Avatar, Button } from "@material-tailwind/react";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from 'chart.js';
import EventOcService from '../service/EventOcService';
import UsersService from '../service/UsersService'; // Adjust path if needed


ChartJS.register(ArcElement, Tooltip, Legend);

const Candidates = ({ activeTab }) => {
    const [candidates, setCandidates] = useState([]);
    const [message, setMessage] = useState(""); 
    const [eventOCs, setEventOCs] = useState([]);
    const [userProfiles, setUserProfiles] = useState({});


    useEffect(() => {
        const fetchUserProfiles = async () => {
            try {
                const profilePromises = candidates.map(async (reg) => {
                    if (reg.email && !userProfiles[reg.email]) {
                        try {
                            const response = await UsersService.getUserProfileByEmail(reg.email);
                            return { email: reg.email, name: response.name, profileImage: response.profileImage };
                        } catch (err) {
                            console.error('Error fetching profile:', err);
                            return { email: reg.email, name: 'Unknown', profileImage: '' }; 
                        }
                    }
                });
    
                const profilesArray = await Promise.all(profilePromises);
                const profiles = profilesArray.reduce((acc, profile) => {
                    if (profile) {
                        acc[profile.email] = profile;
                    }
                    return acc;
                }, {});
    
                setUserProfiles((prevProfiles) => ({ ...prevProfiles, ...profiles }));
            } catch (err) {
                setError('Error fetching user profiles. Please try again.');
            }
        };
    
        if (candidates.length) {
            fetchUserProfiles();
        }
    }, [candidates]);
    


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
    

    

    const getMatchingEventNames = (candidate) => {
        console.log("Candidate OC:", candidate.oc); // Log the candidate's OC field to see its contents
        if (!Array.isArray(eventOCs)) return []; // Safeguard check
        if (!candidate.oc) return [];
    
        // Filtering eventOCs based on matching oc_id and returning the event names
        return eventOCs
            .filter(event => candidate.oc.includes(event.oc_id)) // Filter by oc_id
            .map(event => event.event_name); // Map to return event names
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
              <div className="bg-black text-yellow-500 p-4 mb-4">
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
                      {sortedCandidates.length > 0 ? (
                          sortedCandidates.map(candidate => (
                              <Card key={candidate.id} className="mb-4 bg-black text-white">
                                  <CardBody>
                                      <div className="flex items-start gap-4">
                                          {/* Image on the Left */}
                                          <div className="flex-shrink-0 w-1/6">
                                              <Avatar className="w-40 h-40" src={candidate.imageUrl || `https://source.unsplash.com/random?sig=${candidate.id}`} />
                                          </div>
                                          {/* Details in the Middle */}
                                          <div className="flex-grow flex flex-col gap-4 w-1/3">
                                              <Typography variant="h6">{candidate.name || 'No Name'}</Typography>
                                              <p>User ID: {candidate.user_id}</p> 
                                              <Typography variant="body2">Position applied for: {candidate.position}</Typography>
                                              <Typography variant="body2">How can they make a change? {candidate.contribution}</Typography>
                                          </div>
                                          {getMatchingEventNames(candidate).length > 0 && (
                        <>
                            <p className="mb-4"><strong>Associated Events:</strong></p>
                            <ul className="list-disc list-inside">
                                {getMatchingEventNames(candidate).map((eventName, eventIndex) => (
                                    <li key={eventIndex}>{eventName}</li>
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
                          ))
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
