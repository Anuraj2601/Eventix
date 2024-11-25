import React, { useState, useEffect } from 'react';
import RegistrationService from '../service/registrationService'; // Adjust the path as needed
import UsersService from '../service/UsersService'; // Adjust path if needed

const Board = () => {
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

    if (registrations.length) {
      fetchUserProfiles();
    }
  }, [registrations]);

  const clubIdFromUrl = window.location.pathname.split('/').pop();
  const filteredRegistrations = registrations.filter(
    (reg) =>
      reg.accepted === 1 &&
      ['President', 'president', 'Secretary', 'secretary', 'Treasurer', 'treasurer'].includes(reg.position) &&
      String(reg.clubId) === String(clubIdFromUrl)
  );

  const president = filteredRegistrations.find((reg) => reg.position.toLowerCase() === 'president');
  const secretary = filteredRegistrations.find((reg) => reg.position.toLowerCase() === 'secretary');
  const treasurer = filteredRegistrations.find((reg) => reg.position.toLowerCase() === 'treasurer');

 

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  return (
    <div className="flex flex-col justify-center items-center h-full overflow-auto rounded-2xl">
      <div className="text-[#AEC90A]  font-bold text-3xl mt-2">Board of Current Term </div>
      <div className="flex justify-center gap-16 p-10">
        {/* President Card */}
        {president && (
          <div
            className="flex flex-col items-center p-5 bg-black rounded-2xl custom-card text-center"
            style={{
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)',
            }}
          >
            <img
              src={userProfiles[president.email]?.profileImage || '/default-profile.png'}
              alt={`${userProfiles[president.email]?.name || 'Unknown'}'s profile`}
              className="w-48 h-48 object-cover rounded-full p-2 custom-card"
            />
            <div className="mt-2">
              <div className="text-lg font-medium text-[#AEC90A]">President</div>
              <div className="text-white text-lg">{userProfiles[president.email]?.name || 'Unknown'}</div>
              <p className="text-gray-300 mt-2">
                "As President, my mission is to guide the club toward achieving its vision and fostering a spirit of collaboration. I aim to ensure that every member has an opportunity to contribute and grow, while driving meaningful initiatives that will positively impact our community"
              </p>
            </div>
          </div>
        )}
  
        {/* Secretary Card */}
        {secretary && (
          <div
            className="flex flex-col items-center p-5 bg-black rounded-2xl custom-card text-center"
            style={{
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)',
            }}
          >
            <img
              src={userProfiles[secretary.email]?.profileImage || '/default-profile.png'}
              alt={`${userProfiles[secretary.email]?.name || 'Unknown'}'s profile`}
              className="w-48 h-48 object-cover rounded-full p-2 custom-card"
            />
            <div className="mt-2">
              <div className="text-lg font-medium text-[#AEC90A]">Secretary</div>
              <div className="text-white text-lg">{userProfiles[secretary.email]?.name || 'Unknown'}</div>
              <p className="text-gray-300 mt-2">
                "As Secretary, my focus is on maintaining clear and organized communication within the club. I strive to keep records accurate and accessible, facilitating smooth operations and ensuring that all important information is readily available for all members."
              </p>
            </div>
          </div>
        )}
  
        {/* Treasurer Card */}
        {treasurer && (
          <div
            className="flex flex-col items-center p-5 bg-black rounded-2xl custom-card text-center"
            style={{
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)',
            }}
          >
            <img
              src={userProfiles[treasurer.email]?.profileImage || '/default-profile.png'}
              alt={`${userProfiles[treasurer.email]?.name || 'Unknown'}'s profile`}
              className="w-48 h-48 object-cover rounded-full p-2 custom-card"
            />
            <div className="mt-2">
              <div className="text-lg font-medium text-[#AEC90A]">Treasurer</div>
              <div className="text-white text-lg">{userProfiles[treasurer.email]?.name || 'Unknown'}</div>
              <p className="text-gray-300 mt-2">
              "As Treasurer, my responsibility is to manage the club’s financial resources effectively. I aim to ensure transparency in budgeting, track expenses, and identify ways to fund our initiatives while maintaining a sustainable and responsible financial outlook."              </p>
            </div>
          </div>
        )}
      </div>
      {filteredRegistrations.length === 0 && <p className="text-center w-full">No records found</p>}
    </div>
  );
};

export default Board;
