import React, { useEffect, useState } from 'react';
import RegistrationService from '../service/registrationService'; // Adjust the path as needed
import UsersService from '../service/UsersService'; // Adjust path if needed

const Recruitment = () => {
    const [registrations, setRegistrations] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [userProfiles, setUserProfiles] = useState({});

    function formatDate(dateString) {
        try {
            // Check if dateString is a Date object or array
            if (Array.isArray(dateString)) {
                // If it's an array, construct a new Date object directly
                const [year, month, day, hours, minutes, seconds] = dateString;
                const dateObj = new Date(year, month - 1, day, hours, minutes, seconds);
                return dateObj.toLocaleString();
            } else if (typeof dateString === 'string') {
                // If it's a string, ensure it can be parsed
                return new Date(dateString.replace(' ', 'T').split('.')[0]).toLocaleString();
            } else if (dateString instanceof Date) {
                // If it's already a Date object, format it directly
                return dateString.toLocaleString();
            } else {
                // Handle any unexpected format
                console.warn('Unexpected date format:', dateString);
                return 'Invalid date';
            }
        } catch (error) {
            console.error('Error parsing date:', error, '\nOriginal date string:', dateString);
            return 'Invalid date';
        }
    }
    
    
    
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
    
    
    const handleSelect = async (id) => {
        const updatedRegistration = registrations.find((reg) => reg.registrationId === id);

        if (!updatedRegistration) {
            console.error('Registration not found for ID:', id);
            return;
        }

        const updates = {
            accepted: 1,
            position: 'Member',
            registrationId: updatedRegistration.registrationId,
            email: updatedRegistration.email,
            clubId: updatedRegistration.clubId,
            team: updatedRegistration.team,
            interviewSlot: updatedRegistration.interviewSlot,
            reason: updatedRegistration.reason
        };

        console.log('Updating registration with ID:', id);
        console.log('Data being submitted for update:', updates);

        try {
            const response = await RegistrationService.updateRegistration(id, updates, token);
            console.log('Update response:', response);

            setRegistrations((prev) =>
                prev.map((reg) =>
                    reg.registrationId === id ? { ...reg, accepted: 1, position: 'Member' } : reg
                )
            );
            setSelectedId(id);
        } catch (err) {
            console.error('Error updating registration:', err);
            setError('Error updating registration. Please try again.');
        }
    };

    const handleReject = async (id) => {
        const updatedRegistration = registrations.find((reg) => reg.registrationId === id);

        if (!updatedRegistration) {
            console.error('Registration not found for ID:', id);
            return;
        }

        const updates = {
            accepted: 0,
            position: 'Rejected',
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
    const clubIdFromUrl = window.location.pathname.split('/').pop(); // Extract the last part of the URL

    console.log('Extracted Club ID from URL:', clubIdFromUrl); // Log the extracted Club ID
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    const filteredRegistrations = registrations.filter(
        (reg) => reg.accepted === 0 && reg.position === 'student'&& String(reg.clubId) === String(clubIdFromUrl)
    );

    return (
        <div>
            {filteredRegistrations.length > 0 ? (
                filteredRegistrations.map((reg) => {
                    // Log createdAt for each registration item
                    console.log("Registration Created At:", reg.createdAt);
                    
                    return (
                        <div
                            key={reg.registrationId}
                            className="bg-black text-white rounded-xl p-4 mb-4 flex flex-col"
                        >
                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                <div className="flex flex-col items-center w-full sm:w-1/4">
                                    {userProfiles[reg.email] ? (
                                        <>
                                            <img
                                                src={userProfiles[reg.email].profileImage || '/default-profile.png'}
                                                alt={`${userProfiles[reg.email].name}'s profile`}
                                                className="w-28 h-28 rounded-full object-cover mb-2"
                                            />
                                            <span>{userProfiles[reg.email].name || 'Unknown'}</span>
                                        </>
                                    ) : (
                                        <span>Loading...</span>
                                    )}
                                </div>
    
                                <div className="flex flex-col w-full sm:w-2/4 text-left">
                                    <p><strong>ID:</strong> {reg.registrationId}</p>
                                    <p><strong>Email:</strong> {reg.email}</p>
                                    <p><strong>Team:</strong> {reg.team}</p>
                                    <p><strong>How can they make a change:</strong> {reg.reason}</p>
                                    <p><strong>Regsitered at:</strong> {
                                        reg.createdAt
                                            ? formatDate(reg.createdAt)
                                            : 'N/A'
                                    }</p>
                                </div>
    
                                <div className="flex flex-col items-center justify-center w-full sm:w-1/4 space-y-2">
                                    <button
                                        onClick={() => handleSelect(reg.registrationId)}
                                        className="flex items-center p-2 text-[#AEC90A] border-2 border-[#AEC90A] text-lg rounded-full hover:text-white hover:border-white"
                                    >
                                        Select
                                    </button>
                                    <button
                                        onClick={() => handleReject(reg.registrationId)}
                                        className="flex items-center p-2 text-red-500 border-2 border-red-500 text-lg rounded-full hover:text-white hover:border-white"
                                    >
                                        Reject
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })
            ) : (
                <div className="py-2 px-4 text-center">No records found</div>
            )}
        </div>
    );
    
};

export default Recruitment;
