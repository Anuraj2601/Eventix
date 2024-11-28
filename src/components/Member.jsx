import React, { useEffect, useState } from 'react';
import RegistrationService from '../service/registrationService'; // Adjust the path as needed
import UsersService from '../service/UsersService'; // Adjust path if needed
import EventOcService from '../service/EventOcService';

const Member = () => {
    const [registrations, setRegistrations] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [userProfiles, setUserProfiles] = useState({});
    const [eventOCs, setEventOCs] = useState([]);

    useEffect(() => {
      const fetchEventOCs = async () => {
          try {
              const token = localStorage.getItem('token');
              const response = await EventOcService.getAllEventOcs(token);
              console.log("Fetched Event OCs:", response.content); // Check API response
              setEventOCs(response.content || []);
          } catch (error) {
              console.error("Error fetching Event OCs:", error);
          }
      };
      fetchEventOCs();
  }, []);

  const getMatchingEventNames = (emailOrUserId) => {
    console.log("Filtering for email or userId:", emailOrUserId);

    // Check if the input is an email or userId
    let userId;
    
    if (typeof emailOrUserId === 'string') {
        // If it's an email, map to userId
        userId = userProfiles[emailOrUserId]?.id; // Assuming 'userProfiles' contains the mapping of email to userId
        if (!userId) {
            console.log("User not found for email:", emailOrUserId);
            return []; // Return an empty array if no userId is found
        }
    } else {
        // If it's directly a userId, use it as is
        userId = emailOrUserId;
    }

    console.log("UserId for filtering:", userId);
  
    // Filter eventOCs based on matching userId
    const matchingEventOCs = eventOCs.filter(oc => oc.user_id === userId);
    
    // Extract event names from the filtered eventOCs
    const eventNames = matchingEventOCs.map(oc => oc.event_name);
  
    console.log("Matching OCs for User ID:", userId, matchingEventOCs);
  
    // Return the event names of the matching OCs
    return eventNames;
};

  


  

    useEffect(() => {
        const fetchRegistrations = async () => {
            if (!token) {
                setError('No token found');
                setLoading(false);
                return;
            }

            try {
                console.log('Fetching registrations with token:', token);
                const response = await RegistrationService.getAllRegistrations(token);
                console.log('API Response:', response);

                if (response.data) {
                    setRegistrations(response.data);
                } else if (response.content) {
                    setRegistrations(response.content);
                } else {
                    setError('Unexpected response format');
                }
            } catch (err) {
                console.error('Error fetching registrations:', err);
                setError('Error fetching registrations. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchRegistrations();
    }, [token]);

    useEffect(() => {
        const fetchUserProfiles = async () => {
            try {
                const profilePromises = registrations.map(async (reg) => {
                    if (reg.email && !userProfiles[reg.email]) {
                        try {
                            const response = await UsersService.getUserProfileByEmail(reg.email);
                            return { email: reg.email, name: response.name, profileImage: response.profileImage };
                        } catch (err) {
                            console.error('Error fetching profile:', err);
                            return { email: reg.email, name: 'Unknown', profileImage: '' }; // Handle the case where fetching profile fails
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

        if (registrations.length) {
            fetchUserProfiles();
        }
    }, [registrations]);

    

    const handleReject = async (id) => {
        const updatedRegistration = registrations.find((reg) => reg.registrationId === id);

        if (!updatedRegistration) {
            console.error('Registration not found for ID:', id);
            return;
        }

        const updates = {
            accepted: 0,
            position: 'Removed',
            registrationId: updatedRegistration.registrationId,
            email: updatedRegistration.email,
            clubId: updatedRegistration.clubId,
            team: updatedRegistration.team,
            interviewSlot: updatedRegistration.interviewSlot,
            reason: updatedRegistration.reason
        };

        console.log('Rejecting registration with ID:', id);
        console.log('Data being submitted for update:', updates);

        try {
            const response = await RegistrationService.updateRegistration(id, updates, token);
            console.log('Update response:', response);

            setRegistrations((prev) =>
                prev.map((reg) =>
                    reg.registrationId === id ? { ...reg, accepted: 0, position: 'Rejected' } : reg
                )
            );
            setSelectedId(null);
        } catch (err) {
            console.error('Error updating registration:', err);
            setError('Error updating registration. Please try again.');
        }
    };

    const isPresidentView = window.location.href.includes('president');
    const clubIdFromUrl = window.location.pathname.split('/').pop(); // Extract the last part of the URL

    console.log('Extracted Club ID from URL:', clubIdFromUrl); // Log the extracted Club ID

    // Filter registrations based on club ID
    const filteredRegistrations = registrations.filter(
        (reg) => reg.accepted === 1 && reg.position === 'member'&& String(reg.clubId) === String(clubIdFromUrl)
    );
    console.log('Filtered Registrations:', filteredRegistrations); // Log filtered registrations

    const leftMembers = registrations.filter(
        (reg) => reg.accepted === 0 && reg.position.toLowerCase().includes('left') && String(reg.clubId) === String(clubIdFromUrl)
    );

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div>
          <div className="flex flex-wrap gap-4">
            {filteredRegistrations.length > 0 ? (
              filteredRegistrations.map((reg) => (
                <div key={reg.registrationId} className="flex justify-center gap-3 p-3 text-white">
                  <div className="flex flex-col items-center p-2 bg-black rounded-2xl custom-card text-center"  style={{
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)"
              }}>
                    {/* Image Section */}
                    <div style={{ boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' }}>
                      <img
                        src={userProfiles[reg.email]?.profileImage || '/default-profile.png'}
                        alt={`${userProfiles[reg.email]?.name || 'Unknown'}'s profile`}
                        className="w-48 h-48 object-cover rounded-full p-2 custom-card"
                      />
                    </div>
                    {/* Details Section */}
                    <div className="w-full h-1/2 p-4 flex flex-col text-center">
                      <h3 className="text-xl font-semibold mb-2">{userProfiles[reg.email]?.name || 'Unknown'}</h3>
                      <p className="mb-2"><strong>Team:</strong> {reg.team}</p>
                      <p className="mb-4"><strong>Email:</strong> {reg.email}</p>
<p className="mb-4">
                    <strong>Associated Events:</strong>
                  </p>
                  <ul className="list-disc list-inside">
  {getMatchingEventNames(reg.userId).map((eventName, index) => (
    <li key={index}>{eventName}</li>
  ))}
</ul>
                     {isPresidentView && (
                        <div className="flex justify-end">
                          <button
                            onClick={() => handleReject(reg.registrationId)}
                            className="w-1/2 border border-red-500 text-red-500 rounded-full hover:bg-red-600 hover:text-white text-sm border-opacity-50"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center w-full">No records found</p>
            )}
          </div>
      
          {/* Left Members Section */}
          {leftMembers.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold text-cr text-white mb-4 mt-20">Left Members</h2>
              <div className="flex flex-wrap gap-4">
                {leftMembers.map((reg) => (
                  <div key={reg.registrationId} className="flex justify-center gap-3 p-3 text-white">
                    <div className="flex flex-col items-center p-2 bg-black  rounded-2xl custom-card text-center">
                      {/* Image Section */}
                      <div style={{ boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' }}>
                        <img
                          src={userProfiles[reg.email]?.profileImage || '/default-profile.png'}
                          alt={`${userProfiles[reg.email]?.name || 'Unknown'}'s profile`}
                          className="w-48 h-48 object-cover rounded-full p-2 custom-card"
                        />
                      </div>
                      {/* Details Section */}
                      <div className="w-full h-1/2 p-4 flex flex-col text-center">
                        <h3 className="text-xl font-semibold mb-2">{userProfiles[reg.email]?.name || 'Unknown'}</h3>
                        <p className="mb-2"><strong>Team:</strong> {reg.team}</p>
                        <p className="mb-4"><strong>Email:</strong> {reg.email}</p>
                        <p className="text-red-500"><strong>Reason for Leaving:</strong> {reg.reason} 😞</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      );
      
};

export default Member;
