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


const MeetingsList = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clubs, setClubs] = useState([]);
  const [disabledButtons, setDisabledButtons] = useState(new Set());
  const [popupVisible, setPopupVisible] = useState(null);
  const [qrCodeDialogVisible, setQrCodeDialogVisible] = useState(false);
  const [sendingQRCode, setSendingQRCode] = useState({});
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [popupMeetingId, setPopupMeetingId] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('physical'); // State for selected filter (Physical/Online)
  const token = localStorage.getItem('token') || '';
  const [registrations, setRegistrations] = useState([]);
  const userId = getUserIdFromToken();
  const userEmail = getUserEmailFromToken();

  const fetchClubs = async () => {
    try {
      const clubs = await ClubsService.getAllClubs(token);
      const clubsArray = clubs.content || [];
      setClubs(clubsArray);
    } catch (error) {
      console.error("Failed to fetch clubs", error);
    }
  };
  const fetchRegistrations = async () => {
    try {
      const response = await RegistrationService.getAllRegistrations(token);
      const fetchedRegistrations = response.data || response.content || [];
      setRegistrations(fetchedRegistrations);
  
      // Logs here may not show updated state yet
      console.log('Registrations:', registrations); // Might log the previous state
    } catch (error) {
      console.error("Error fetching registrations:", error);
    }
  };
  

  const validPositions = ["president", "member", "secretary", "treasurer", "oc"];
  const filteredRegistrations = registrations.filter(
    (reg) =>
      reg.email === userId &&
      reg.accepted === 1 &&
      validPositions.includes(reg.position.toLowerCase())
  );

  const fetchMeetings = async () => {
    try {
      const response = await axios.get('http://localhost:8080/president/getAllMeetings', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data && response.data.content) {
        setMeetings(response.data.content);
      } else {
        setError('No meetings data available.');
      }
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

  const getClubDetailsById = (clubId) => {
    const club = clubs.find(c => c.club_id === clubId);
    
    if (!club) {
      console.error(`Club with ID ${clubId} not found.`);
    }
    
    return club;
  };
  

  const isJoinButtonEnabled = (meetingDate, meetingTime) => {
    const currentTime = new Date();
    const meetingDateTime = new Date(meetingDate);
    meetingDateTime.setHours(meetingTime[0], meetingTime[1]);

    // Enable Join button only if meeting is within the next hour
    return meetingDateTime - currentTime <= 60 * 60 * 1000 && meetingDateTime > currentTime;
  };

  const navigate = useNavigate();

  const handleJoinMeetingClick = async (meetingId) => {

    try {
      const response = await axios.post(
        `http://localhost:8080/president/sendMeetingCode/${meetingId}`,
        { email: userEmail },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        console.log("Meeting code sent successfully");
      }
    } catch (error) {
      console.error("Error sending Meeting code:", error);
    }
    navigate(`/president/meeting/${meetingId}`);
  };

  const filterFutureMeetings = (meetings) => {
    const currentDate = new Date();
    console.log('Current Date:', currentDate); // Debugging line
  
    const filteredMeetings = meetings.filter(meeting => {
      const meetingDate = new Date(meeting.date);
      const [hour, minute] = meeting.time;
      meetingDate.setHours(hour, minute);
      console.log('Meeting Date:', meetingDate); // Debugging line
  
      return meetingDate >= currentDate;
    });
  
    console.log('Filtered Meetings:', filteredMeetings); // Debugging line
    return filteredMeetings;
  };
  
  const filterMeetingsByParticipantType = (meetings) => {
    console.log('User ID:', userId);
    console.log('Registrations:', registrations); // Debugging line

    return meetings.filter((meeting) => {
      const { participant_type, club_id } = meeting;

      console.log('Checking meeting:', meeting.meeting_name, 'Participant Type:', participant_type);

      if (participant_type === 'EVERYONE') {
        console.log('Meeting allowed for everyone:', meeting.meeting_name);
        return true;
      }

      const userRegistration = registrations.find(
        (reg) => reg.clubId === club_id && reg.userId === userId && reg.accepted === 1
      );
      
      console.log('User Registration for Club:', club_id, userRegistration); // Debugging line

      if (!userRegistration) {
        console.log('No valid registration found for user in club:', club_id);
        return false;
      }

      const { position } = userRegistration;

      if (participant_type === 'CLUB_MEMBERS') {
        const validPositions = ['president', 'member', 'secretary', 'treasurer'];
        if (validPositions.includes(position.toLowerCase())) {
          console.log('User is allowed as club member with position:', position);
          return true;
        }
        console.log('User not allowed for CLUB_MEMBERS meeting with position:', position);
        return false;
      }

      if (participant_type === 'CLUB_BOARD') {
        const validBoardPositions = ['president', 'treasurer', 'secretary'];
        if (validBoardPositions.includes(position.toLowerCase())) {
          console.log('User is allowed as club board member with position:', position);
          return true;
        }
        console.log('User not allowed for CLUB_BOARD meeting with position:', position);
        return false;
      }

      // Default deny if none of the conditions match
      console.log('Default deny for meeting:', meeting.meeting_name);
      return false;
    });
};

  // QR Code API call
  const sendQRCodeEmail = async (meetingId) => {
    setSendingQRCode((prevState) => ({
      ...prevState,
      [meetingId]: true, // Mark as sending QR code for this meeting
    }));
  
    // Simulate the sending process (replace this with actual email sending logic)
    setTimeout(() => {
      setSendingQRCode((prevState) => ({
        ...prevState,
        [meetingId]: false, // Reset after sending
      }));
    }, 2000);
    setEmailSent(false);
    setEmailError('');

    try {
      const response = await axios.post(
        `http://localhost:8080/president/sendQrCode/${meetingId}`,
        { email: userEmail },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        setEmailSent(true);
        setQrCodeDialogVisible(true);
      }
    } catch (error) {
      console.error("Error sending QR code:", error);
      setEmailError('Failed to send QR code. Please try again later.');
    } finally {
      setSendingQRCode(false);
    }
  };





  const renderMeetingSections = () => {
    // Filter meetings by participant type "EVERYONE" and only future meetings
   // Step 1: Filter future meetings first
  const futureMeetings = filterFutureMeetings(meetings);

  // Step 2: Filter meetings based on participant type from the future meetings
  const allowedMeetings = filterMeetingsByParticipantType(futureMeetings);

  // Step 3: Further filter by meeting type (physical or online)
  const meetingsByType = allowedMeetings.filter(
    (meeting) => meeting.meeting_type === selectedFilter.toUpperCase()
  );

    return (
      <div className="p-4 rounded-lg mb-20 mx-4">
        {/* Tab section */}
        <div className="flex space-x-4 mb-6">
          <button
            className={`px-4 py-2 rounded ${selectedFilter === 'physical' ?  'text-primary border-b-2 border-primary' : 'text-white'}`}
            onClick={() => setSelectedFilter('physical')}
          >
            Physical Meetings
          </button>
          <button
            className={`px-4 py-2 rounded ${selectedFilter === 'online' ?  'text-primary border-b-2 border-primary' : 'text-white'}`}
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

        {/* Upcoming Club Meetings Section */}
        <h2 className="text-xl font-semibold flex items-center p-5">
          <span>Upcoming Club Meetings</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {meetingsByType.map((announcement) => {
            const club = getClubDetailsById(announcement.club_id);
            const clubImage = club ? club.club_image : "https://via.placeholder.com/150";
            const clubName = club ? club.club_name : "Unknown Club";
            return (
              <div key={announcement.meeting_id} className="relative bg-dark-500 rounded-lg flex flex-col items-center p-4 h-80"  style={{
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)',
              }}>
                <div className="flex flex-col items-center mb-6 flex-grow">
                  <img src={clubImage} alt={clubName} className="w-24 h-24 rounded-full mb-2" />
                  <p className="text-sm text-primary font-semibold">{clubName}</p>
                  <p className="text-sm text-center mt-2">
                    <span className="block font-medium">{announcement.meeting_name}</span>
                    <span className='block text-[20px] text-primary opacity-100 mt-6'>
                      {formatDate(announcement.date)} at {formatTime(announcement.time)}
                    </span>
                    <span className="block text-xs text-gray-400">{new Date(announcement.date).toLocaleString('en-us', { weekday: 'long' })}</span>
                  </p>
                </div>
                <div className="flex space-x-2 mb-10 w-full">
                  {announcement.meeting_type === 'PHYSICAL' ? (
                     <button
                     onClick={() => sendQRCodeEmail(announcement.meeting_id)}
                     className={`px-4 py-2 w-full ${sendingQRCode[announcement.meeting_id] ? 'bg-gray-500' : 'bg-primary'} text-black rounded font-medium`}
                     disabled={sendingQRCode[announcement.meeting_id]}
                   >
                     {sendingQRCode[announcement.meeting_id] ? 'Sending...' : 'Click here to Receive QR code'}
                   </button>
                  ) : (
                    <button
                    onClick={() => handleJoinMeetingClick(announcement.meeting_id)}
                      className={`px-4 py-2 w-full ${isJoinButtonEnabled(announcement.date, announcement.time) ? 'bg-primary text-sec' : 'bg-gray-500 cursor-not-allowed'} rounded font-medium`}
                      disabled={!isJoinButtonEnabled(announcement.date, announcement.time)}
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

          {/* QR Code Dialog for Physical Meetings */}
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
