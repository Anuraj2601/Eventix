import { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import physicalMeeting from '../assets/physicalMeeting02.png';
import onlineMeeting from '../assets/onlineMeeting.png';
import RegistrationService from '../service/registrationService'; // Adjust the path as needed
import { getUserEmailFromToken, getUserIdFromToken } from '../utils/utils';
import { useNavigate } from "react-router-dom";
import EventMeetingService from "../service/EventMeetingService";


const MeetingsList = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clubs, setClubs] = useState([]);
  const [disabledButtons, setDisabledButtons] = useState(new Set());
  const [eventMeetings, setEventMeetings] = useState([]);
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
  

  // Handle meeting selection
  const handleMeetingClick = (meetingId) => {
    setSelectedMeetingId(meetingId);
    fetchParticipants(meetingId);
  };

  // Function to send the QR code via email
  const sendQRCodeEmail = async (meetingId, qrCodeUrl) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/president/sendQrCode/${meetingId}`,
        { email: userEmail, qrCodeUrl }, // Send the QR code URL in the email
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


    const meetingAnnouncements = [
        {
            id: 1,
            title: 'Monthly Strategy Meeting',
            description: 'Discussing next month’s strategic goals.',
            date: '2024-08-05',
            time: '10:00 AM',
            location: 'S104',
            postedDate: '2024-07-25',
            postedTime: '10:00 AM',
            clubName: 'IEEE Student Chapter',
            clubImage: ieee
        },
        {
            id: 2,
            title: 'Team Building Workshop',
            description: 'A workshop to enhance team collaboration.',
            date: '2024-08-12',
            time: '02:00 PM',
            location: 'W002',
            postedDate: '2024-07-26',
            postedTime: '11:00 AM',
            clubName: 'ISACA',
            clubImage: isaca,
        },
        {
            id: 3,
            title: 'Quarterly Review Meeting',
            description: 'Reviewing the company’s quarterly performance.',
            date: '2024-08-20',
            time: '09:00 AM',
            location: 'E104',
            postedDate: '2024-07-27',
            postedTime: '09:00 AM',
            clubName: 'ROTRACT',
            clubImage: rotract
        },
    ];

  useEffect(() => {
    if (token) {
      fetchMeetings();
      fetchClubs();
      fetchRegistrations();
      fetchEventMeetings();
    }
  }, [token]);

    const handleDeclineMeeting = (id) => {
        setCurrentMeetingId(id);
        setShowPopup(true);
    };

    const handlePopupClose = () => {
        setShowPopup(false);
        setReason('');
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            console.log('Reason for declining meeting ID', currentMeetingId, ':', reason);
            setDeclinedMeetings(prev => new Set(prev).add(currentMeetingId));
            handlePopupClose();
            setIsLoading(false);
        }, 1500);
    };

    const handleReRequest = (id) => {
        console.log('Re-request meeting ID:', id);
    };
    const renderContent = () => {
        return (
            <div className="relative flex flex-col items-center">
    <img
        src={selectedFilter === 'physical' ? physicalMeeting : onlineMeeting}
        alt={selectedFilter === 'physical' ? "Physical Meeting" : "Online Meeting"}
        className="w-full h-auto mb-6 shadow-lg"
    />
    {selectedFilter === 'physical' && (
        <button
            onClick={() => setShowDeclinedModal(true)}
            className="absolute top-4 right-4 bg-[#DDFF00] font-medium text-dark-500 px-4 py-2 rounded-md shadow-md"
        >
            Declined ({declinedMeetings.size})
        </button>
    )}
    {(selectedFilter === 'physical' || selectedFilter === 'online') && shouldShowForm && (
        <div
            className={`absolute left-10 top-7 bg-black bg-opacity-75 p-6 rounded-lg text-white w-[600px] mt-3 ${selectedFilter === 'online' ? 'h-[400px]' : 'h-[500px]'}`}
        >
            {selectedFilter === 'physical' && (
                <h2 className="text-lg font-semibold mb-4">Create New Physical Meeting</h2>
            )}
            {selectedFilter === 'online' && (
                <h2 className="text-lg font-semibold mb-4">Create New Online Meeting</h2>
            )}
            <form className="space-y-4">
                <div>
                    <label className="block text-sm mb-2">Topic</label>
                    <input
                        type="text"
                        className="w-full p-4 rounded-md h-12 bg-dark-500 border border-gray-600 text-white text-sm"
                        placeholder="Enter meeting topic"
                    />
                </div>
                <div className="flex space-x-4">
                    <div className="flex-1">
                        <label className="block text-sm mb-2">Date</label>
                        <input
                            type="date"
                            className="w-full p-2 text-sm h-10 rounded-md bg-dark-500 border border-gray-600 text-white"
                            style={{ color: 'white', caretColor: 'white' }}
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm mb-2">Time</label>
                        <input
                            type="time"
                            className="w-full text-sm h-10 p-2 rounded-md bg-dark-500 border border-gray-600 text-white"
                            style={{ color: 'white', caretColor: 'white' }}
                        />
                    </div>
                </div>
                {selectedFilter === 'physical' && (
                    <div>
                        <label className="block text-sm mb-2">Venue</label>
                        <input
                            type="text"
                            className="w-full p-4 rounded-md bg-dark-500 border h-12 border-gray-600 text-white text-sm"
                            placeholder="Enter Meeting Venue"
                        />
                    </div>
                )}
                <div>
                    <label className="block text-sm mb-2">For who</label>
                    <select className="w-full p-2 rounded-md bg-dark-500 border border-gray-600 text-white">
                        <option>Board</option>
                        <option>OC</option>
                        <option>Club Members</option>
                    </select>
                </div>
                <button type="submit" className="w-full bg-[#DDFF00] text-dark-500 font-medium py-2 rounded-md">
                    Create Meeting
                </button>
            </form>
        </div>
    )}
</div>

          
        );
    };



    const renderMeetingAnnouncements = () => {
        const handleGetQRCode = (id) => {
            setPopupVisible(id);
            setTimeout(() => {
                setPopupVisible(null);
                setDisabledButtons((prev) => new Set(prev).add(id));
            }, 5000);
        };

        const handleCancelPopup = (id) => {
            setPopupVisible(null);
            setDisabledButtons((prev) => new Set(prev).add(id));
        };

        const announcementsToShow = selectedFilter === 'online' ? meetingAnnouncements.slice(0, 2) : meetingAnnouncements;

        return (
            <div className="p-4 rounded-lg mb-20 mx-4">
                <h2 className="text-[16px] font-medium mb-4">Upcoming CLUB Meetings</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {announcementsToShow.map((announcement) => (
                        <div key={announcement.id} className="relative bg-dark-500 rounded-lg flex flex-col items-center p-4 h-80">
                            <div className="flex flex-col items-center mb-6 flex-grow">
                                <img src={announcement.clubImage} alt={announcement.clubName} className="w-12 h-12 rounded-full mb-2" />
                                <p className="text-sm text-primary font-semibold">{announcement.clubName}</p>
                                <p className="text-sm text-center mt-2">
                                    <span className="block font-medium leading-loose">{announcement.title}</span>
                                    {announcement.description}
                                    <span className='block text-[20px] text-primary opacity-100 mt-6'>
                                        {announcement.date} | {announcement.time} | {announcement.location}
                                    </span>
                                </p>
                            </div>

                            {selectedFilter === 'physical' ? (
                                <div className="flex space-x-2 mb-10 w-full">
                                    <button
                                        onClick={() => handleDeclineMeeting(announcement.id)}
                                        className={`px-4 py-2 w-1/2 ${declinedMeetings.has(announcement.id) ? 'bg-dark-500 cursor-not-allowed border border-red-600 text-red-500' : 'bg-dark-400 text-primary'} rounded font-medium hover:scale-105 transition-transform duration-200`}
                                        disabled={declinedMeetings.has(announcement.id)}
                                    >
                                        {declinedMeetings.has(announcement.id) ? 'Declined' : 'Decline'}
                                    </button>
                                    <button
                                        onClick={() => handleGetQRCode(announcement.id)}
                                        className={`px-4 py-2 w-1/2 ${disabledButtons.has(announcement.id) ? 'bg-dark-500 cursor-not-allowed opacity-50 text-primary border border-secondary' : 'bg-primary text-sec'} rounded font-semibold hover:bg-primary-dark hover:scale-105 transition-transform duration-200 text-dark-400`}
                                        disabled={disabledButtons.has(announcement.id)}
                                    >
                                        {disabledButtons.has(announcement.id) ? 'QR Code Sent' : 'Get QR Code'}
                                    </button>
                                </div>
                            ) : (
                                <div className="flex space-x-2 mb-10 w-full">
                                    <button
                                        onClick={() => handleJoinMeeting(announcement.id)}
                                        className="px-4 py-2 w-full cursor-not-allowed text-white opacity-50 rounded font-medium bg-dark-400 hover:bg-primary-dark hover:scale-105 transition-transform duration-200"
                                    >
                                        Join Meeting
                                    </button>
                                </div>
                            )}

                            <div className="text-xs text-gray-400 absolute bottom-2 w-full text-right">
                                <span className="mx-0">{announcement.postedDate}</span>
                                <span className="mx-2">{announcement.postedTime}</span>
                            </div>

                            {popupVisible === announcement.id && (
                                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                                    <div className="bg-white p-6 rounded-lg w-[450px] h-[200px] flex flex-col items-center justify-center">
                                        <p className="text-dark-400 mb-4 font-medium">Wait a minute, your QR code will be sent to you as a notification.</p>
                                        <button onClick={() => handleCancelPopup(announcement.id)} className="bg-dark-400 text-white px-4 py-2 w-[400px] rounded">
                                            No need
                                        </button>
                                        <div className="mb-4 text-primary font-medium animate-blink mt-6">Loading...</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    <style>{`
        @keyframes blink {
            0% { opacity: 1; }
            50% { opacity: 0; }
            100% { opacity: 1; }
        }
    
        .animate-blink {
            animation: blink 1.5s infinite;
            text-align: center;
        }
    `}</style>


  const getClubImageByEventMeeting = (eventMeeting) => {
    const club = clubs.find(c => c.club_id === eventMeeting.club_id);
  
    if (!club) {
      console.error(`Club with ID ${eventMeeting.club_id} not found.`);
      return null; // Return null if the club is not found
    }
  
    return club.image; // Assuming the club has an 'image' property
  };
  

    const handleCancelPopup = () => {
        setPopupVisible(null);
    };

    const announcementsToShow = selectedFilter === 'online' ? unionAnnouncements.slice(0, 3) : unionAnnouncements;

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
          <button
      className={`px-4 py-2 rounded ${selectedFilter === 'QR' ? 'text-primary border-b-2 border-primary' : 'text-white'}`}
      onClick={() => setSelectedFilter('QR')}
    >
      Scan QR code
    </button>
        </div>

        {/* Display corresponding image */}
        <img
          src={selectedFilter === 'physical' ? physicalMeeting : onlineMeeting}
          alt={selectedFilter === 'physical' ? "Physical Meeting" : "Online Meeting"}
          className="w-full h-auto mb-6 shadow-lg"
        />
{selectedFilter === 'QR' }
        {/* Upcoming Club Meetings Section */}
        <h2 className="text-xl font-semibold flex items-center p-5">
          <span>Upcoming Club Meetings</span>
        </h2>
       
        {/* Participants Section */}
{/* Participants Section */}
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
            ))}
        </div>
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
          <span><strong>{meeting.meeting_name}</strong></span>
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
</div>
      </div>
    );
};



    return (
        <div className="fixed inset-0 flex">
            <Sidebar className="flex-shrink-0" />
            <div className="flex flex-col flex-1">
                <Navbar className="sticky top-0 z-10 p-4" />
                <div className="bg-neutral-900 text-white flex flex-col flex-1 overflow-hidden">
                    <div className="p-0 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
                        <div className="flex justify-left ml-4 mb-6">
                            <button
                                className={`px-0 py-2 ${selectedFilter === 'physical' ? 'text-primary border-b-2 border-primary' : 'text-white'}`}
                                onClick={() => setSelectedFilter('physical')}
                            >
                                Physical Meeting
                            </button>
                            <button
                                className={`px-4 py-2 ml-4 ${selectedFilter === 'online' ? 'text-primary border-b-2 border-primary' : 'text-white'}`}
                                onClick={() => setSelectedFilter('online')}
                            >
                                Online Meeting
                            </button>
                        </div>
                        {renderContent()}
                        {renderMeetingAnnouncements()}
                        {renderUnionAnnouncements()}
                    </div>
                </div>
            </div>

            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-1/2 max-w-lg relative">
                        <h2 className="text-lg font-semibold mb-4 text-black">Can{"'"}t Attend the Meeting ?!</h2>
                        <p className="mb-4 text-black">Please provide a valid reason for not attending the meeting</p>
                        <form onSubmit={handleFormSubmit}>
                            <textarea
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                rows="4"
                                className="w-full p-2 border border-gray-300 rounded mb-4"
                                placeholder="Enter your reason here..."
                            />
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={handlePopupClose}
                                    className="px-4 py-2 bg-dark-400 w-1/3 text-white rounded hover:bg-dark-500 hover:scale-105 transition-transform duration-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 font-medium bg-primary text-dark-400 w-1/3 rounded hover:scale-105 transition-transform duration-200"
                                >
                                    Send
                                </button>
                            </div>
                        </form>
                    </div>
                    {isLoading && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <div className="text-[#DDFF00] text-sm font-semibold animate-pulse">Loading...</div>
                        </div>
                    )}
                </div>
            )}

            {showDeclinedModal && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-1/2 max-w-lg relative">
                        <div className="absolute top-2 right-2 cursor-pointer" onClick={() => setShowDeclinedModal(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600 hover:text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <h2 className="text-lg font-semibold mb-4 text-black">Declined Meetings</h2>
                        <ul>
                            {[...declinedMeetings].map((id) => {
                                const meeting = [...meetingAnnouncements, ...unionAnnouncements].find((announcement) => announcement.id === id);
                                return meeting ? (
                                    <li key={id} className="mb-5 w-[460px] border border-primary rounded-md text-dark-500 font-medium h-[60px] px-2 py-6 flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">{meeting.title}</p>
                                            <p>{meeting.date} | {meeting.time} | {meeting.location}</p>
                                        </div>
                                        <button
                                            onClick={() => handleReRequest(id)}
                                            className="px-4 py-2 bg-primary text-dark-500 rounded hover:bg-primary-dark transition-transform duration-200"
                                        >
                                            Re-request
                                        </button>
                                    </li>
                                ) : null;
                            })}
                        </ul>
                    </div>
                </div>
            )}

        </div>
    );
};

export default MainMeeting;
