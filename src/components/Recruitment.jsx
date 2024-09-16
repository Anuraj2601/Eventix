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
                console.log('Registrations data:', response);

                // Assuming the actual registrations are in the 'content' property
                setRegistrations(response.content || []);
            } catch (err) {
                console.error('Error fetching registrations:', err);
                setError('Error fetching registrations. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchRegistrations();
    }, [token]);

    const handleSelect = (id) => {
        setSelectedId(id);
    };

    const handleUpdate = async (id) => {
        try {
            const updates = {
                accepted: 1,
                position: 'Member',
            };

            await RegistrationService.updateRegistration(id, updates, token);
            setRegistrations((prev) =>
                prev.map((reg) =>
                    reg.id === id ? { ...reg, accepted: 1, position: 'Member' } : reg
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

    return (
        <div>
            <table className="min-w-full bg-black color-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Email</th>
                        <th className="py-2 px-4 border-b">Club ID</th>
                        <th className="py-2 px-4 border-b">Team</th>
                        <th className="py-2 px-4 border-b">Interview Slot</th>
                        <th className="py-2 px-4 border-b">Reason</th>
                        <th className="py-2 px-4 border-b">Accepted</th>
                        <th className="py-2 px-4 border-b">Position</th>
                        <th className="py-2 px-4 border-b">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {registrations.length > 0 ? (
                        registrations.map((reg) => (
                            <tr key={reg.id} className={selectedId === reg.id ? 'bg-gray-100' : ''}>
                                <td className="py-2 px-4 border-b">{reg.email}</td>
                                <td className="py-2 px-4 border-b">{reg.clubId}</td>
                                <td className="py-2 px-4 border-b">{reg.team}</td>
                                <td className="py-2 px-4 border-b">{reg.interviewSlot}</td>
                                <td className="py-2 px-4 border-b">{reg.reason}</td>
                                <td className="py-2 px-4 border-b">{reg.accepted ? 'Yes' : 'No'}</td>
                                <td className="py-2 px-4 border-b">{reg.position}</td>
                                <td className="py-2 px-4 border-b">
                                    {selectedId === reg.id ? (
                                        <button
                                            onClick={() => handleUpdate(reg.id)}
                                            className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600"
                                        >
                                            Update
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleSelect(reg.id)}
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
                            <td colSpan="8" className="py-2 px-4 text-center">No records found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Recruitment;
