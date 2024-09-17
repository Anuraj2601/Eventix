import React, { useEffect, useState } from 'react';
import UsersService from '../service/UsersService'; // Adjust path if needed

const UserProfileDisplay = ({ email }) => {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                console.log(`Fetching profile for email: ${email}`);
                const response = await UsersService.getUserProfileByEmail(email);
                console.log(`Profile data for ${email}:`, response);
                setProfile(response);
            } catch (err) {
                console.error(`Error fetching profile for ${email}:`, err);
                setError(err.message || 'Error fetching user profile. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        if (email) {
            fetchProfile();
        }
    }, [email]);

    if (loading) return <p>Loading profile for {email}...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;
    if (!profile) return <p>No profile found for {email}</p>;

    return (
        <div className="flex items-center p-4 border rounded-lg shadow-md bg-white">
            <img
                src={profile.photoUrl}
                alt={`${profile.firstname}'s profile`}
                className="w-16 h-16 rounded-full object-cover mr-4"
            />
            <div>
                <h2 className="text-lg font-semibold">{`${profile.firstname} ${profile.lastname}`}</h2>
                <p className="text-sm text-gray-600">{profile.email}</p>
            </div>
        </div>
    );
};

export default UserProfileDisplay;
