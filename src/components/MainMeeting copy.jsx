import React, { useEffect, useState } from "react";
import axios from 'axios';
import ClubsService from '../service/ClubsService';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const MeetingsList = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clubs, setClubs] = useState([]);
  const [disabledButtons, setDisabledButtons] = useState(new Set());
  const [popupVisible, setPopupVisible] = useState(null);
  const [qrCodeDialogVisible, setQrCodeDialogVisible] = useState(false); // For dialog visibility
  const [popupMeetingId, setPopupMeetingId] = useState(null);
  const token = localStorage.getItem('token') || '';

  const fetchClubs = async () => {
    try {
      const clubs = await ClubsService.getAllClubs(token);
      const clubsArray = clubs.content || [];
      setClubs(clubsArray);
    } catch (error) {
      console.error("Failed to fetch clubs", error);
    }
  };

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
    console.log('Fetched club:', club);  // Check if the club is fetched correctly
    return club;
  };

  const handleGetQRCode = (id) => {
    setPopupMeetingId(id);
    setQrCodeDialogVisible(true); // Show the dialog box
    setTimeout(() => {
      setPopupVisible(null);
      setDisabledButtons((prev) => new Set(prev).add(id));
    }, 5000);
  };

  const handleCancelPopup = (id) => {
    setPopupVisible(null);
    setDisabledButtons((prev) => new Set(prev).add(id));
  };

  const handleCloseDialog = () => {
    setQrCodeDialogVisible(false);
    setDisabledButtons((prev) => new Set(prev).add(popupMeetingId)); // Disable QR Code button after dialog
  };

  const isJoinButtonEnabled = (meetingDate, meetingTime) => {
    const currentTime = new Date();
    const meetingDateTime = new Date(meetingDate);
    meetingDateTime.setHours(meetingTime[0], meetingTime[1]);
    
    // Enable Join button only if meeting is within the next hour
    return meetingDateTime - currentTime <= 60 * 60 * 1000 && meetingDateTime > currentTime;
  };

  const filterFutureMeetings = (meetings) => {
    const currentDate = new Date();
    return meetings.filter(meeting => {
      const meetingDate = new Date(meeting.date);
      const [hour, minute] = meeting.time;
      meetingDate.setHours(hour, minute);
      return meetingDate > currentDate;
    });
  };

  const renderMeetingSections = () => {
    // Filter meetings by participant type "EVERYONE" and only future meetings
    const filteredMeetings = filterFutureMeetings(meetings.filter(meeting => meeting.participant_type === 'EVERYONE'));
  
    return (
      <div className="p-4 rounded-lg mb-20 mx-4">
        {/* Online Meetings Section */}
        <h2 className="text-xl font-semibold flex items-center p-5">
          <span>Online Meetings</span>
          <span className="ml-2 bg-green-500 w-3 h-3 rounded-full"></span> {/* Green Dot */}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredMeetings.filter(meeting => meeting.meeting_type === 'ONLINE').map((announcement) => {
            // Get the corresponding club by matching club_id with meetings
            const club = getClubDetailsById(announcement.club_id);
  
            // Log to check if the club is being fetched correctly
            console.log("Meeting:", announcement);
            console.log("Club:", club);
  
            const clubImage = club ? club.club_image : "https://via.placeholder.com/150";
            const clubName = club ? club.club_name : "Unknown Club";
  
            return (
              <div key={announcement.meeting_id} className="relative bg-dark-500 rounded-lg flex flex-col items-center p-4 h-80">
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
                  <button
                    onClick={() => window.open(announcement.meeting_link, "_blank")}
                    className={`px-4 py-2 w-full ${isJoinButtonEnabled(announcement.date, announcement.time) ? 'bg-primary text-sec' : 'bg-gray-500 cursor-not-allowed'} rounded font-medium`}
                    disabled={!isJoinButtonEnabled(announcement.date, announcement.time)}
                  >
                    Join Meeting
                  </button>
                </div>
              </div>
            );
          })}
        </div>
  
        {/* Physical Meetings Section */}
        <h2 className="text-xl font-semibold flex items-center p-5">
          <span>Physical Meetings</span>
          <span className="ml-2 bg-[#AEC90A] w-3 h-3 rounded-full"></span> {/* Green Dot */}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredMeetings.filter(meeting => meeting.meeting_type === 'PHYSICAL').map((announcement) => {
            // Get the corresponding club by matching club_id with meetings
            const club = getClubDetailsById(announcement.club_id);
  
            // Log to check if the club is being fetched correctly
            console.log("Meeting:", announcement);
            console.log("Club:", club);
  
            const clubImage = club ? club.club_image : "https://via.placeholder.com/150";
            const clubName = club ? club.club_name : "Unknown Club";
            return (
              <div key={announcement.meeting_id} className="relative bg-dark-500 rounded-lg flex flex-col items-center p-4 h-80">
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
                  <button
                    onClick={() => handleGetQRCode(announcement.meeting_id)}
                    className={`px-4 py-2 w-full ${disabledButtons.has(announcement.meeting_id) ? 'bg-dark-500 cursor-not-allowed opacity-50' : 'bg-primary text-sec'} rounded font-semibold`}
                    disabled={disabledButtons.has(announcement.meeting_id)}
                  >
                    {disabledButtons.has(announcement.meeting_id) ? 'QR code sent to Your mail' : 'Click to receive QR code'}
                  </button>
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
        <Navbar /><div className="bg-neutral-900 text-white flex flex-col flex-1 overflow-auto">
        {loading ? <div>Loading...</div> : renderMeetingSections()}
        {qrCodeDialogVisible && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg text-black">You will receive the QR code to your email in a while.</p>
            <button onClick={handleCloseDialog} className="mt-4 px-4 py-2 bg-primary text-white rounded">OK</button>
          </div>
        )}</div>
      </div>
    </div>
  );
};

export default MeetingsList;
