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
            <table className="min-w-full bg-black text-white rounded-xl text-center">
                <thead>
                    <tr>
                        <th className="py-2 px-4">ID</th>
                        
                        <th className="py-2 px-4">Profile</th> {/* Added Profile Column */}<th className="py-2 px-4">Email</th>
                        <th className="py-2 px-4">Team</th>
                        <th className="py-2 px-4">Reason</th>
                        <th className="py-2 px-4">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredRegistrations.length > 0 ? (
                        filteredRegistrations.map((reg) => (
                            <tr key={reg.registrationId} className={selectedId === reg.registrationId ? 'bg-gray-100' : ''}>
                                <td className="py-2 px-4">{reg.registrationId}</td>
                                
                                <td className="py-2 px-4 flex items-center">
    {userProfiles[reg.email] ? (
        <>
            <img
                src={userProfiles[reg.email].profileImage || '/default-profile.png'}
                alt={`${userProfiles[reg.email].name}'s profile`}
                className="w-28 h-28 rounded-full object-cover mr-2"
            />
            <span>{userProfiles[reg.email].name || 'Unknown'}</span>
        </>
    ) : (
        <span>Loading...</span>
    )}
</td>
<td className="py-2 px-4">{reg.email}</td>
                                <td className="py-2 px-4">{reg.team}</td>
                                <td className="py-2 px-4">{reg.reason}</td>
                                <td className="py-2 px-4">
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
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="py-2 px-4 text-center">No records found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Recruitment;
