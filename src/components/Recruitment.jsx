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

        const updates = {
            accepted: 1,
            position: 'Member',
            ...updatedRegistration, // Add all existing registration data
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
            accepted: 0, // Set 'accepted' to 0
            position: 'Rejected', // Set 'position' to 'Rejected'
            ...updatedRegistration, // Add all existing registration data
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
            <table className="min-w-full bg-black text-white rounded-xl">
                <thead>
                    <tr>
                        <th className="py-2 px-4">Registration ID</th>
                        <th className="py-2 px-4">Email</th>
                        <th className="py-2 px-4">Team</th>
                        <th className="py-2 px-4">Interview Slot</th>
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
                                <td className="py-2 px-4">{new Date(reg.interviewSlot).toLocaleString()}</td>
                                <td className="py-2 px-4">{reg.reason}</td>
                                <td className="py-2 px-4">
                                    {selectedId === reg.registrationId ? (
                                        <>
                                            <button
                                                onClick={() => handleSelect(reg.registrationId)}
                                                className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 mr-2"
                                            >
                                                Select
                                            </button>
                                            <button
                                                onClick={() => handleReject(reg.registrationId)}
                                                className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                                            >
                                                Reject
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            onClick={() => handleSelect(reg.registrationId)}
                                            className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600"
                                        >
                                            Select
                                        </button>
                                    )}
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
