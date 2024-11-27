import React, { useEffect, useState } from "react";
import axios from 'axios';
import ClubsService from '../service/ClubsService';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import physicalMeeting from '../assets/physicalMeeting02.png';
import onlineMeeting from '../assets/onlineMeeting.png';
import RegistrationService from '../service/registrationService'; // Adjust the path as needed
import { getUserEmailFromToken, getUserIdFromToken } from '../utils/utils';
import { useNavigate } from "react-router-dom";
import MeetingService from "../service/MeetingService";

const MeetingsList = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clubs, setClubs] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('physical');
  const [qrCodeDialogVisible, setQrCodeDialogVisible] = useState(false);
  const [sendingQRCode, setSendingQRCode] = useState({});
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState('');
  const token = localStorage.getItem('token') || '';
  const userId = getUserIdFromToken();
  const userEmail = getUserEmailFromToken();
  const navigate = useNavigate();

  // Fetch functions
  const fetchClubs = async () => {
    try {
      const clubs = await ClubsService.getAllClubs(token);
      setClubs(clubs.content || []);
    } catch (error) {
      console.error("Failed to fetch clubs", error);
    }
  };

  const fetchMeetings = async () => {
    try {
      const response = await axios.get('http://localhost:8080/president/getAllMeetings', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const allMeetings = response.data.content || [];

      // Filter out finished meetings
      const currentDate = new Date();
      const upcomingMeetings = allMeetings.filter((meeting) => {
        const meetingDate = new Date(
          meeting.date[0],     // Year
          meeting.date[1] - 1, // Month (0-indexed)
          meeting.date[2],     // Day
          meeting.time[0],     // Hour
          meeting.time[1]      // Minute
        );
        return meetingDate > currentDate; // Only include upcoming meetings
      });

      setMeetings(upcomingMeetings);
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
    }
  }, [token]);

  // Format helpers
  const formatDate = (dateArray) => {
    const [year, month, day] = dateArray;
    return `${day}th of ${month}-${year}`;
  };

  const formatTime = (timeArray) => {
    const [hour, minute] = timeArray;
    return `${hour}:${minute < 10 ? `0${minute}` : minute}`;
  };

  const getClubDetailsById = (clubId) => {
    return clubs.find(c => c.club_id === clubId) || {};
  };

  // QR Code API call
  const sendQRCodeEmail = async (meetingId) => {
    // Set the sending state for the specific meeting
    setSendingQRCode((prevState) => ({
      ...prevState,
      [meetingId]: true, // Mark as sending QR code for this meeting
    }));
  
    setEmailSent(false);
    setEmailError('');
  
    try {
      const response = await MeetingService.sendQrCode(meetingId, userEmail, token);
  
      if (response.status === 200) {
        setEmailSent(true);
        setQrCodeDialogVisible(true);
      }
    } catch (error) {
      console.error("Error sending QR code:", error);
      setEmailError('Failed to send QR code. Please try again later.');
    } finally {
      // Reset the sending state for the specific meeting
      setSendingQRCode((prevState) => ({
        ...prevState,
        [meetingId]: false,
      }));
    }
  };
  
  const renderMeetingSections = () => {
    // Filter meetings based on the selected type
    const meetingsByType = meetings.filter(
      (meeting) => meeting.meeting_type === selectedFilter.toUpperCase()
    );

    return (
      <div className="p-4 rounded-lg mb-20 mx-4">
        {/* Tab section */}
        <div className="flex space-x-4 mb-6">
          <button
            className={`px-4 py-2 rounded ${selectedFilter === 'physical' ? 'text-primary border-b-2 border-primary' : 'text-white'}`}
            onClick={() => setSelectedFilter('physical')}
          >
            Physical Meetings
          </button>
          <button
            className={`px-4 py-2 rounded ${selectedFilter === 'online' ? 'text-primary border-b-2 border-primary' : 'text-white'}`}
            onClick={() => setSelectedFilter('online')}
          >
            Online Meetings
          </button>
        </div>

        {/* Display corresponding image */}
        <img
          src={selectedFilter === 'physical' ? physicalMeeting : onlineMeeting}
          alt={selectedFilter === 'physical' ? "Physical Meeting" : "Online Meeting"}
          className="w-full h-auto mb-6 shadow-lg"
        />

        {/* Upcoming Meetings */}
        <h2 className="text-xl font-semibold flex items-center p-5">
          <span>Upcoming Club Meetings</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {meetingsByType.map((meeting) => {
            const club = getClubDetailsById(meeting.club_id);
            return (
              <div key={meeting.meeting_id} className="relative bg-dark-500 rounded-lg p-4 h-80 shadow-lg">
                <div className="flex flex-col items-center mb-6 flex-grow">
                  <img src={club.club_image || "https://via.placeholder.com/150"} alt={club.club_name || "Unknown Club"} className="w-24 h-24 rounded-full mb-2" />
                  <p className="text-sm text-primary font-semibold">{club.club_name || "Unknown Club"}</p>
                  <p className="text-sm text-center mt-2">
                    <span className="block font-medium">{meeting.meeting_name}</span>
                    <span className='block text-[20px] text-primary opacity-100 mt-6'>
                      {formatDate(meeting.date)} at {formatTime(meeting.time)}
                    </span>
                  </p>
                </div>
                <div className="flex space-x-2 mb-10 w-full">
  {meeting.meeting_type === 'PHYSICAL' ? (
    <button
      onClick={() => sendQRCodeEmail(meeting.meeting_id)}
      className={`px-4 py-2 w-full ${
        sendingQRCode[meeting.meeting_id] ? 'bg-gray-500' : 'bg-primary'
      } text-black rounded font-medium`}
      disabled={sendingQRCode[meeting.meeting_id]} // Disable only the clicked button
    >
      {sendingQRCode[meeting.meeting_id] ? 'Sending...' : 'Click here to Receive QR code'}
    </button>
  ) : (
    <button
      onClick={() => navigate(`/president/meeting/${meeting.meeting_id}`)}
      className="px-4 py-2 w-full bg-primary text-black rounded font-medium"
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
      <Sidebar className="flex-shrink-0" />
      <div className="flex flex-col flex-1 bg-white overflow-auto">
        <Navbar />
        <div className="bg-neutral-900 text-white flex flex-col flex-1 overflow-auto">
          {loading ? <div>Loading...</div> : renderMeetingSections()}

          {/* QR Code Dialog */}
          {qrCodeDialogVisible && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg">
              {emailSent ? (
                <p className="text-lg text-black">The QR code has been sent to your email.</p>
              ) : (
                <p className="text-lg text-red-500">{emailError}</p>
              )}
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
