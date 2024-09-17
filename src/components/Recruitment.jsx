import React, { useEffect, useState } from 'react';
import RegistrationService from '../service/registrationService'; // Adjust the path as needed

const Recruitment = () => {
    const [registrations, setRegistrations] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || '');

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

    const handleSelect = async (id) => {
        const updatedRegistration = registrations.find((reg) => reg.registrationId === id);
    
        if (!updatedRegistration) {
            console.error('Registration not found for ID:', id);
            return;
        }
    
        // Prepare the update data
        const updates = {
            accepted: 1, // Set accepted to 1
            position: 'Member', // Set position to Member
            // Only include fields that need to be updated
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
    
            // Update the local state
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
    
        // Prepare the update data with only necessary fields
        const updates = {
            accepted: 0, // Set 'accepted' to 0
            position: 'Rejected', // Set 'position' to 'Rejected'
            // Include only fields that need to be updated
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
    
            // Update the local state to reflect the rejection
            setRegistrations((prev) =>
                prev.map((reg) =>
                    reg.registrationId === id ? { ...reg, accepted: 0, position: 'Rejected' } : reg
                )
            );
            setSelectedId(null); // Deselect after update
        } catch (err) {
            console.error('Error updating registration:', err);
            setError('Error updating registration. Please try again.');
        }
    };
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    // Filter registrations to include only those with accepted value 0 and position value 'student'
    const filteredRegistrations = registrations.filter(
        (reg) => reg.accepted === 0 && reg.position === 'student'
    );

    return (
        <div>
            <table className="min-w-full bg-black text-white rounded-xl text-center">
                <thead>
                    <tr>
                        <th className="py-2 px-4">ID</th>
                        <th className="py-2 px-4">Email</th>
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
                                <td className="py-2 px-4">{reg.email}</td>
                                <td className="py-2 px-4">{reg.team}</td>
                                <td className="py-2 px-4">{reg.reason}</td>
                                <td className="py-2 px-4">
      <button
        onClick={() => handleSelect(reg.registrationId)}
        className="flex items-center p-2 text-[#AEC90A] border-2 border-[#AEC90A] text-lg rounded-full border border-[#AEC90A] hover:text-white hover:border-white custom-card"
        >
        Select
      </button>
      <button
        onClick={() => handleReject(reg.registrationId)}
        className="flex items-center p-2 text-red border-2 border-red text-lg rounded-full border border-[#AEC90A] hover:text-white hover:border-white custom-card"
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
