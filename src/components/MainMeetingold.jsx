import React, { useState, useEffect } from "react";
import axios from "axios";
import { getUserEmailFromToken, getUserIdFromToken } from '../utils/utils';

const MeetingsAndParticipants = () => {
  const [meetings, setMeetings] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [loadingMeetings, setLoadingMeetings] = useState(true);
  const [loadingParticipants, setLoadingParticipants] = useState(false);
  const [selectedMeetingId, setSelectedMeetingId] = useState(null);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token") || "";
  const userId = getUserIdFromToken();

  // Fetch meetings
  const fetchMeetings = async () => {
    try {
      const response = await axios.get(
        "https://eventix-spring-production.up.railway.app/president/getAllMeetings",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data && response.data.content) {
        setMeetings(response.data.content);
      } else {
        setError("No meetings data available.");
      }
    } catch (err) {
      console.error("Error fetching meetings:", err);
      setError("Failed to fetch meetings. Please try again later.");
    } finally {
      setLoadingMeetings(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchMeetings();
    }
  }, [token]);

  const fetchParticipants = async (meetingId) => {
    setLoadingParticipants(true);
    try {
      const response = await axios.get(
        `https://eventix-spring-production.up.railway.app/api/meeting-participants/meeting/${meetingId}`
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

  if (loadingMeetings) {
    return <div>Loading meetings...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-6">
      {/* Meetings Section */}
      <h3 className="text-xl font-semibold mb-4">Meetings</h3>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Meeting ID</th>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Date</th>
            <th className="px-4 py-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {meetings.map((meeting) => (
            <tr key={meeting.meetingId}>
              <td className="px-4 py-2 border">{meeting.meetingId}</td>
              <td className="px-4 py-2 border">{meeting.name}</td>
              <td className="px-4 py-2 border">{meeting.date}</td>
              <td className="px-4 py-2 border text-center">
                <button
                  onClick={() => handleMeetingClick(meeting.meetingId)}
                  className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
                >
                  View Participants
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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


    </div>
  );
};

export default MeetingsAndParticipants;
