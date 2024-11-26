import React, { useEffect, useState } from "react";
import axios from 'axios';
import ClubsService from '../service/ClubsService';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import physicalMeeting from '../assets/physicalMeeting02.png';
import onlineMeeting from '../assets/onlineMeeting.png';
import RegistrationService from '../service/registrationService'; // Adjust the path as needed
import { getUserIdFromToken } from '../utils/utils';

const MeetingsList = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clubs, setClubs] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [qrCodeDialogVisible, setQrCodeDialogVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('physical'); // Physical/Online filter
  const token = localStorage.getItem('token') || '';
  const userId = getUserIdFromToken();

  const fetchClubs = async () => {
    try {
      const clubs = await ClubsService.getAllClubs(token);
      setClubs(clubs.content || []);
    } catch (error) {
      console.error("Failed to fetch clubs", error);
    }
  };

  const fetchRegistrations = async () => {
    try {
      const response = await RegistrationService.getAllRegistrations(token);
      setRegistrations(response.data || response.content || []);
    } catch (error) {
      console.error("Error fetching registrations:", error);
    }
  };

  const fetchMeetings = async () => {
    try {
      const response = await axios.get('http://localhost:8080/president/getAllMeetings', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMeetings(response.data.content || []);
    } catch (err) {
      console.error('Error fetching meetings:', err);
      setError('Failed to fetch meetings. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchMeetings();
      fetchClubs();
      fetchRegistrations();
    }
  }, [token]);

  const formatDate = (dateArray) => {
    const [year, month, day] = dateArray;
    return `${day}th of ${month}-${year}`;
  };

  const formatTime = (timeArray) => {
    const [hour, minute] = timeArray;
    return `${hour}:${minute < 10 ? `0${minute}` : minute}`;
  };

  const getClubDetailsById = (clubId) => clubs.find((club) => club.club_id === clubId) || null;

  const isJoinButtonEnabled = (meetingDate, meetingTime) => {
    const currentTime = new Date();
    const meetingDateTime = new Date(meetingDate);
    meetingDateTime.setHours(meetingTime[0], meetingTime[1]);
    return meetingDateTime - currentTime <= 60 * 60 * 1000 && meetingDateTime > currentTime;
  };

  const filterFutureMeetings = (meetings) => {
    const currentDate = new Date();
    return meetings.filter((meeting) => {
      const meetingDate = new Date(meeting.date);
      meetingDate.setHours(meeting.time[0], meeting.time[1]);
      return meetingDate >= currentDate;
    });
  };

  const filterMeetingsByParticipantType = (meetings) => {
    return meetings.filter((meeting) => {
      const { participant_type, club_id } = meeting;
      if (participant_type === 'EVERYONE') return true;

      const userRegistration = registrations.find(
        (reg) => reg.clubId === club_id && reg.userId === userId && reg.accepted === 1
      );
      if (!userRegistration) return false;

      const { position } = userRegistration;
      if (participant_type === 'CLUB_MEMBERS') {
        return ['president', 'member', 'secretary', 'treasurer'].includes(position.toLowerCase());
      }
      if (participant_type === 'CLUB_BOARD') {
        return ['president', 'treasurer', 'secretary'].includes(position.toLowerCase());
      }
      return false;
    });
  };

  const renderMeetingSections = () => {
    const futureMeetings = filterFutureMeetings(meetings);
    const allowedMeetings = filterMeetingsByParticipantType(futureMeetings);
    const meetingsByType = allowedMeetings.filter(
      (meeting) => meeting.meeting_type === selectedFilter.toUpperCase()
    );

    return (
      <div className="p-4 rounded-lg mb-20 mx-4">
        <div className="flex space-x-4 mb-6">
          <button
            className={`px-4 py-2 rounded ${
              selectedFilter === 'physical' ? 'text-primary border-b-2 border-primary' : 'text-white'
            }`}
            onClick={() => setSelectedFilter('physical')}
          >
            Physical Meetings
          </button>
          <button
            className={`px-4 py-2 rounded ${
              selectedFilter === 'online' ? 'text-primary border-b-2 border-primary' : 'text-white'
            }`}
            onClick={() => setSelectedFilter('online')}
          >
            Online Meetings
          </button>
        </div>
        <img
          src={selectedFilter === 'physical' ? physicalMeeting : onlineMeeting}
          alt={selectedFilter === 'physical' ? "Physical Meeting" : "Online Meeting"}
          className="w-full h-auto mb-6 shadow-lg"
        />
        <h2 className="text-xl font-semibold flex items-center p-5">Upcoming Club Meetings</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {meetingsByType.map((meeting) => {
            const club = getClubDetailsById(meeting.club_id);
            const clubImage = club ? club.club_image : "https://via.placeholder.com/150";
            const clubName = club ? club.club_name : "Unknown Club";
            return (
              <div
                key={meeting.meeting_id}
                className="relative bg-dark-500 rounded-lg flex flex-col items-center p-4 h-80"
                style={{
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)',
                }}
              >
                <img src={clubImage} alt={clubName} className="w-24 h-24 rounded-full mb-2" />
                <p className="text-sm text-primary font-semibold">{clubName}</p>
                <p className="text-sm text-center mt-2">
                  <span className="block font-medium">{meeting.meeting_name}</span>
                  <span className="block text-[20px] text-primary opacity-100 mt-6">
                    {formatDate(meeting.date)} at {formatTime(meeting.time)}
                  </span>
                  <span className="block text-xs text-gray-400">
                    {new Date(meeting.date).toLocaleString('en-us', { weekday: 'long' })}
                  </span>
                </p>
                <div className="flex space-x-2 mb-10 w-full">
                  {meeting.meeting_type === 'PHYSICAL' ? (
                    <button
                      onClick={() => setQrCodeDialogVisible(true)}
                      className="px-4 py-2 w-full bg-primary text-black rounded font-medium"
                    >
                      Click here to Receive QR code
                    </button>
                  ) : (
                    <button
                      onClick={() => window.open(meeting.meeting_link, "_blank")}
                      className={`px-4 py-2 w-full ${
                        isJoinButtonEnabled(meeting.date, meeting.time)
                          ? 'bg-primary text-sec'
                          : 'bg-gray-500 cursor-not-allowed'
                      } rounded font-medium`}
                      disabled={!isJoinButtonEnabled(meeting.date, meeting.time)}
                    >
                      Join Meeting
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 flex">
      <Sidebar />
      <div className="flex flex-col flex-1 bg-white overflow-auto">
        <Navbar />
        <div className="bg-neutral-900 text-white flex flex-col flex-1 overflow-auto">
          {loading ? <div>Loading...</div> : renderMeetingSections()}
          {qrCodeDialogVisible && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg">
              <p className="text-lg text-black">You will receive the QR code to your student email in a while.</p>
              <button
                onClick={() => setQrCodeDialogVisible(false)}
                className="mt-4 px-4 py-2 bg-primary text-white rounded"
              >
                OK
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MeetingsList;
