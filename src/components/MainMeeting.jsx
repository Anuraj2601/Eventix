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
import EventMeetingService from "../service/EventMeetingService";
import QRScanner from './QrScanner'; // Adjust the path as needed

import QRCode from "qrcode"; // Importing the QRCode library

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
  const [participants, setParticipants] = useState([]);
  const [loadingParticipants, setLoadingParticipants] = useState(false);
  const [selectedMeetingId, setSelectedMeetingId] = useState(null);
  const [eventMeetings, setEventMeetings] = useState([]);
  const [filteredParticipants, setFilteredParticipants] = useState([]);
  const [qrCodeData, setQrCodeData] = useState(null);  // State to store the QR code data
  const [meetingName, setMeetingName] = useState('');
  const [meetingId, setMeetingId] = useState(null);

  useEffect(() => {
    if (!loadingParticipants && selectedMeetingId) {
      // Filter participants based on the selected meeting and user ID
      const filteredParticipants = participants.filter(
        (participant) => participant.meetingId === selectedMeetingId && participant.userId === userId
      );

      // Generate QR codes for each filtered participant
      filteredParticipants.forEach((participant) => {
        const qrCodeData = participant.qrCodeUser; // Data to generate QR code
        handleGenerateQrCode(qrCodeData, participant.participantId);
      });
    }
  }, [loadingParticipants, selectedMeetingId, participants, userId]);


  const [qrCodeDataUrls, setQrCodeDataUrls] = useState({}); // State to store QR codes

  // Function to generate and store QR code data URL
  const handleGenerateQrCode = (qrCodeData, participantId) => {
    QRCode.toDataURL(qrCodeData, { type: 'png' }, (err, url) => {
      if (err) {
        console.error("Error generating QR code:", err);
      } else {
        setQrCodeDataUrls((prevState) => ({
          ...prevState,
          [participantId]: url, // Save the QR code for the specific participant
        }));
      }
    });
  };
  
  const fetchEventMeetings = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await EventMeetingService.getAllEventMeetings(token);
      //console.log("Event meetings", response);
      const eventMeetingsArray = response.content || [];
      console.log("event Meetings array", eventMeetingsArray);

    
      setEventMeetings(eventMeetingsArray); 

      
    } catch (error) {
      console.error("Error fetching meetings", error);
    }
  };
  const isMeetingToday = (date) => {
    const today = new Date();
    const meetingDate = new Date(date[2], date[1] - 1, date[0]); // assuming date is [day, month, year]
    return today.toDateString() === meetingDate.toDateString();
  };

  const isTimeClose = (time) => {
    const now = new Date();
    const meetingTime = new Date();
    meetingTime.setHours(time[0], time[1], 0, 0); // assuming time is [hour, minute]
    
    // Check if the meeting is within 30 minutes from now
    const diffMinutes = (meetingTime - now) / (1000 * 60);
    return diffMinutes <= 30 && diffMinutes >= 0; // Meeting is within 30 minutes
  };

  const fetchParticipants = async (meetingId) => {
    setLoadingParticipants(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/api/meeting-participants/meeting/${meetingId}`
      );
      console.log("API Response for Participants:", response.data); // Log full response
      setParticipants(response.data || []);
    } catch (err) {
      console.error("Error fetching participants:", err);
      setError("Failed to fetch participants. Please try again later.");
    } finally {
      setLoadingParticipants(false);
    }
  };
  
  const handleMeetingClick = (meetingId, meetingName) => {
    setSelectedMeetingId(meetingId);
    setMeetingName(meetingName);
    fetchParticipants(meetingId);
    // Filter participants based on selected meetingId and userId
    const filteredParticipants = participants.filter(
      (participant) => participant.meetingId === meetingId && participant.userId === userId
    );

    // Collect QR code data from filtered participants
    const qrCodeData = filteredParticipants.map((participant) => ({
      qrCodeUser: participant.qrCodeUser,
    }));

    setQrCodeData(qrCodeData);

    // Prepare API payload with dynamic email and filtered QR code data
    const payload = {
      email: userEmail, // Current user email
      meetingName: meetingName,
      userId: String(userId), // Ensure userId is passed as string
      qrCodeData: qrCodeData.filter((data) => data.qrCodeUser).map((data) => data.qrCodeUser).join(',') // Filter out any null/undefined values before joining
    };

    // Log for debugging
    console.log("Payload for API:", payload);

    // Send data to API
    setSendingQRCode((prev) => ({ ...prev, [meetingId]: 'fetching' }));
    fetch(`http://localhost:8080/president/sendQrCode/${meetingId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('API Response:', data);
        setSendingQRCode((prev) => ({ ...prev, [meetingId]: 'Fetched Successfully' }));
      })
      .catch((error) => {
        console.error('API Error:', error);
        setSendingQRCode((prev) => ({ ...prev, [meetingId]: 'Error Fetching QR Code' }));
      });
  };

  const tableColumns = [
    { label: 'Meeting ID', value: meetingId },
    { label: 'Meeting Name', value: meetingName },
    { label: 'User Email', value: userEmail },
    { label: 'User ID', value: userId },
    { label: 'QR Code Data', value: qrCodeData }, // Join QR Code data if it's an array
  ];


  
  const sendQRCodeEmail = async (meetingId, meetingName, userId, qrCodeData) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/president/sendQrCode/${meetingId}`,
        {
          email: userEmail,
          meetingName,
          userId,
          qrCodeData, // Send the QR code data (participantId and qrCodeUser)
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      if (response.status === 200) {
        console.log('QR code sent successfully!');
      }
    } catch (error) {
      console.error('Error sending QR code email:', error);
      setEmailError('Error while sending QR code via email.');
    }
  };
  

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

  const validBoardPositions = ['president', 'treasurer', 'secretary'];

  const isUserEligibleForClubBoard = () => {
    console.log("Checking user eligibility for CLUB_BOARD...");
  
    const eligible = registrations.some((reg) => {
      const isEligible = 
        reg.userId === userId && 
        validBoardPositions.includes(reg.position.toLowerCase()) &&
        reg.accepted === 1;
  
      // Log the condition checks for each registration
      console.log(
        `Checking registration for user ${reg.userId}:`,
        `Position: ${reg.position}, Accepted: ${reg.accepted}`,
        `Eligible: ${isEligible}`
      );
  
      return isEligible;
    });
  
    // Log the result of the eligibility check
    console.log("Is user eligible for CLUB_BOARD:", eligible);
    return eligible;
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
      fetchEventMeetings();

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
    const apiUrl = `http://localhost:8080/api/meeting-participants/attendance`;
        try {
          const response = await fetch(
            `${apiUrl}?userId=${userId}&meetingId=${meetingId}&attendanceStatus=1`,
            { method: "PATCH" }
          );

          if (response.ok) {
            const data = await response.text();
            console.log("Response from server:", data);
            setSuccessMessage("Attendance marked successfully!"); // Update the success message
          } else {
            setSuccessMessage("Failed to mark attendance. Please try again."); // Error handling
          }
        } catch (error) {
          console.error("Error updating attendance:", error);
          setSuccessMessage("An error occurred while updating attendance.");
        }

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
  const sendQRCodeEmaill = async (meetingId) => {
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
          {isUserEligibleForClubBoard() && (

          <button
            className={`px-4 py-2 rounded ${selectedFilter === 'QR' ?  'text-primary border-b-2 border-primary' : 'text-white'}`}
            onClick={() => setSelectedFilter('QR')}
          >
           QR code Scanner
          </button>  )}
        </div>

        {/* Display corresponding image */}
        {selectedFilter === 'physical' ? (
    <img
      src={physicalMeeting}
      alt="Physical Meeting"
      className="w-full h-auto mb-6 shadow-lg"
    />
  ) : selectedFilter === 'online' ? (
    <img
      src={onlineMeeting}
      alt="Online Meeting"
      className="w-full h-auto mb-6 shadow-lg"
    />
  ) : (
    <div>
      <h2 className="text-lg font-semibold mb-2"></h2>
      <QRScanner />
    </div>
  )}    
   {(selectedFilter === 'online' || selectedFilter === 'physical') && (
    <div>

        {/* Upcoming Club Meetings Section */}
        <h2 className="text-xl font-semibold flex items-center p-5">
          <span>Upcoming Club Meetings</span>
        </h2>
       
{selectedMeetingId && (
  <div className="mt-8">
    <h3 className="text-lg font-semibold mb-4">
      Participants for Meeting ID: {selectedMeetingId}
    </h3>
    {loadingParticipants ? (
      <div>Loading participants...</div>
    ) : (
      (() => {
        // Get current user ID (assume it's stored in localStorage or obtained dynamically)
        const currentUserId = userId; // Replace with appropriate method if different
        const filteredParticipants = participants.filter(
          (participant) => participant.userId === currentUserId
        );

        return filteredParticipants.length > 0 ? (
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Participant ID</th>
                <th className="px-4 py-2 border">Club ID</th>
                <th className="px-4 py-2 border">Meeting ID</th>
                <th className="px-4 py-2 border">QR Code</th>
              </tr>
            </thead>
            <tbody>
              {filteredParticipants.map((participant) => (
                <tr key={participant.participantId}>
                  <td className="px-4 py-2 border">{participant.participantId}</td>
                  <td className="px-4 py-2 border">{participant.clubId}</td>
                  <td className="px-4 py-2 border">{participant.meetingId}</td>
                  <td className="px-4 py-2 border">{participant.qrCodeUser}</td>
                  <td className="px-4 py-2 border">{participant.userId}</td>
                  <td className="px-4 py-2 border">
                {/* Display QR Code dynamically */}
                {qrCodeDataUrls[participant.participantId] ? (
                  <div>
                    <img
                      src={qrCodeDataUrls[participant.participantId]}
                      alt={`QR Code for ${participant.participantId}`}
                      className="w-16 h-16"
                    />
                    <a
                      href={qrCodeDataUrls[participant.participantId]}
                      download={`qr_code_${participant.participantId}.png`}
                      className="text-blue-500 underline"
                    >
                      Download QR
                    </a>
                  </div>
                ) : (
                  <div>Loading QR...</div>
                )}
              </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-gray-500">
            No participants found for your user ID in this meeting.
          </div>
        );
      })()
    )}
  </div>
)}</div>
)}

<tbody>
          {tableColumns.map((column, index) => (
            <tr key={index} className="border-b">
              <td className="px-4 py-2 font-medium">{column.label}</td>
              <td className="px-4 py-2">{column.value}</td>
            </tr>
          ))}
        </tbody>
  {meetingId && meetingName && qrCodeData && (
        <table border="1" style={{ width: "100%", marginTop: "20px" }}>
          <thead>
            <tr>
              <th>Variable</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Meeting ID</td>
              <td>{meetingId}</td>
            </tr>
            <tr>
              <td>Meeting Name</td>
              <td>{meetingName}</td>
            </tr>
            <tr>
              <td>Selected Meeting ID</td>
              <td>{selectedMeetingId}</td>
            </tr>
            <tr>
              <td>Filtered Participants</td>
              <td>
                <pre>{JSON.stringify(participants.filter(
                  (participant) => participant.meetingId === meetingId && participant.userId === userId
                ), null, 2)}</pre>
              </td>
            </tr>
            <tr>
              <td>QR Code Data</td>
              <td>
                <pre>{JSON.stringify(qrCodeData, null, 2)}</pre>
              </td>
            </tr>
          </tbody>
        </table>
      )}

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
                      onClick={() => handleMeetingClick(announcement.meeting_id, announcement.meeting_name)}                      className={`px-4 py-2 w-full ${sendingQRCode[announcement.meeting_id] === 'fetching' ? 'bg-gray-500' : 'bg-primary'} text-black rounded font-medium`}
                      disabled={sendingQRCode[announcement.meeting_id] === 'fetching'}
                    >
                      {sendingQRCode[announcement.meeting_id] === 'fetching'
                        ? 'Fetching...'
                        : sendingQRCode[announcement.meeting_id] // Display the fetched QR code value if available
                        ? sendingQRCode[announcement.meeting_id]
                        : 'Fetch My QR Code'}
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
        {(selectedFilter === 'online' || selectedFilter === 'physical') && (

        <div className="mb-2 mt-10">
  <h1>Upcoming Event OC meetings</h1>
  {eventMeetings
    .filter((meeting) => {
      const meetingDate = new Date(meeting.date);
      const currentDate = new Date();

      // Ensure the meeting is in the future
      return meetingDate > currentDate;
    })
    .map((meeting) => (
      <div key={meeting.e_meeting_id} className="mb-4 border-b border-gray-300 pb-2">
        <p className="flex items-center space-x-2 overflow-x-auto whitespace-nowrap">
          <span>
            <strong>{meeting.meeting_name}</strong>
          </span>
          <span className="text-[#AEC90A] font-bold">{formatDate(meeting.date)}</span>
          <span className="text-[#AEC90A] font-bold">{formatTime(meeting.time)}</span>

          {/* Conditionally display the dot for meeting type */}
          {meeting.meeting_type === 'ONLINE' ? (
            <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span> // Green dot for online
          ) : (
            <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> // Red dot for physical
          )}

          <span>at {meeting.venue}</span>

          {/* Conditional "Join" button or "Get QR Code" */}
          {isMeetingToday(meeting.date) && isTimeClose(meeting.time) ? (
            meeting.meeting_type === 'ONLINE' ? (
              <button
                className="ml-2 p-2 bg-yellow-500 text-white rounded"
                disabled={false} // Enabled for online meetings when time is close
              >
                Join
              </button>
            ) : (
              <button
                className="ml-2 p-2 bg-yellow-500 text-white rounded"
              >
                Get QR Code
              </button>
            )
          ) : (
            meeting.meeting_type === 'ONLINE' ? (
              <button
                className="ml-2 p-2 bg-gray-500 text-white rounded cursor-not-allowed"
                disabled={true} // Disabled for online meetings outside the time range
              >
                Join
              </button>
            ) : (
              <button
                className="ml-2 p-2 bg-[#AEC90A] text-white rounded cursor-not-allowed"
                disabled={true} // Disabled for physical meetings outside the time range
              >
                Get QR Code
              </button>
            )
          )}
        </p>
      </div>
    ))}
</div>)}
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