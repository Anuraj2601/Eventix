import React, { useEffect, useState } from 'react';
import EventFeedbackService from '../service/EventFeedbackService';
import axios from 'axios';

// Helper function to format the date
const convertDateToReadableFormat = (dateArray) => {
  const [year, month, day] = dateArray;
  const date = new Date(year, month - 1, day);
  const dayOfMonth = date.getDate();
  const monthName = date.toLocaleString('default', { month: 'long' });
  const yearFull = date.getFullYear();

  const getDaySuffix = (day) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  return `${dayOfMonth}${getDaySuffix(dayOfMonth)} ${monthName} ${yearFull}`;
};

const FeedbackList = ({ clubId, event }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [userProfiles, setUserProfiles] = useState([]);
  const [message, setMessage] = useState('');

  // Fetch user profiles
  useEffect(() => {
    const fetchUserProfiles = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/users/getAllUsersIncludingCurrent', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (Array.isArray(response.data)) {
          const profiles = response.data.map((user) => ({
            user_id: user.id,
            name: `${user.firstname} ${user.lastname}`,
            email: user.email,
            profileImage: user.photoUrl || 'https://via.placeholder.com/150',
          }));
          setUserProfiles(profiles);
        } else {
          setMessage('Error: Response data is not an array');
        }
      } catch (err) {
        setMessage('Error fetching user profiles. Please try again.');
        console.error('Error fetching user profiles:', err);
      }
    };

    fetchUserProfiles();
  }, []);

  // Fetch event feedbacks
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await EventFeedbackService.getAllEventFeedbacks(token);

        if (response && response.content) {
          // Filter feedbacks by event_id and club_id
          const filteredFeedbacks = response.content.filter(
            (feedback) => feedback.event_id === event.event_id && feedback.club_id === clubId
          );
          setFeedbacks(filteredFeedbacks);
        } else {
          setMessage('No feedbacks found.');
        }
      } catch (err) {
        setMessage('Error fetching feedbacks.');
        console.error('Error fetching feedbacks:', err);
      }
    };

    fetchFeedbacks();
  }, [clubId, event]);

  // Get user profile image by user ID
  const getUserProfile = (user_id) => {
    return userProfiles.find((profile) => profile.user_id === user_id);
  };

  return (
    <div className="flex flex-wrap justify-center gap-4 py-2">
      {feedbacks.length > 0 ? (
        feedbacks.map((feedback) => {
          const userProfile = getUserProfile(feedback.user_id);
          return (
            <div
              key={feedback.e_feedback_id}
              className="max-w-sm p-4 bg-gray-400 bg-opacity-20 rounded-lg shadow-lg"
              style={{
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)',
              }}
            >
              <div className="flex items-center mb-4">
                <img
                  src={userProfile?.profileImage}
                  alt={userProfile?.name || 'User'}
                  className="w-24 h-24 rounded-full"
                />
                <div className="ml-3">
                  <h3 className="text-lg font-bold text-black">
                    {userProfile?.name || 'Unknown User'}
                  </h3>
                  <p className="text-sm font-semibold text-black">{userProfile?.email}</p>
                </div>
              </div>
              <p className="mb-2 text-white font-semibold">{feedback.feedback}</p>
              <p className="text-sm text-gray-500">
                Posted on: {convertDateToReadableFormat(feedback.date_posted)}
              </p>
            </div>
          );
        })
      ) : (
        <p className="text-gray-700">{message || 'No feedbacks available.'}</p>
      )}
    </div>
  );
};

export default FeedbackList;
