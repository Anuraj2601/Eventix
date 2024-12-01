import React, { useState, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Card, CardBody, Typography, Chip, Button } from "@material-tailwind/react";
import EditDeleteButton from './EditDeleteButton';
import { FaEye } from 'react-icons/fa'; // Import view icon
import { FaPlus } from "react-icons/fa6";
import MeetingService from "../service/MeetingService";




const Meeting = ({club}) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  // Check if the current path is either '/president' or '/secretary'
  const isEditable = currentPath.startsWith('/president') || currentPath.startsWith('/secretary');

  const [meetings,setMeetings] = useState([]);



  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await MeetingService.getAllMeetings(token);
        const meetingsArray = response.content || [];
  
        // Filter meetings by club_id from the `club` prop
        const filteredMeetings = meetingsArray.filter(meeting => meeting.club_id === club.club_id);
        setMeetings(filteredMeetings);
      } catch (error) {
        console.error('Error fetching meetings:', error);
      }
    };
  
    fetchMeetings();
  }, [club.club_id]); // Add club.club_id as a dependency to re-run if it changes
  

  const formatDate = (dateString) => {
    if (dateString.length < 3) return 'Invalid date'; 
    //console.log(dateString);
  
    return `${dateString[0]}-${String(dateString[1]).padStart(2, '0')}-${String(dateString[2]).padStart(2, '0')}`;
  };

  const formatTime = (timeArray) => {
    if (timeArray.length < 2) return 'Invalid time';
  
    const [hour, minute] = timeArray;
  
    if (hour === 0) {
      return `12:${String(minute).padStart(2, '0')} AM`;
    } else if (hour === 12) {
      return `12:${String(minute).padStart(2, '0')} PM`;
    } else if (hour > 12) {
      return `${hour - 12}:${String(minute).padStart(2, '0')} PM`;
    } else {
      return `${hour}:${String(minute).padStart(2, '0')} AM`;
    }
  };
  


  const handleUpdate = (id) => {
    navigate(`/president/club/meet/edit/${id}`, { state: { club } });
  }

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this Meeting?"
      );

      const token = localStorage.getItem("token");
      if (confirmDelete) {
        await MeetingService.deleteMeeting(id, token);

        //navigate(-1);
        setMeetings(prevMeetings => prevMeetings.filter(meeting => meeting.meeting_id !== id));

      }
    } catch (error) {
      console.error("Error fetching meetings:", error);
    }
    
  };

  const openMeetingForm = () => {
    navigate(`/president/club/meet/add?clubId=${club.club_id}`, { state: { club } });
  };
  

  return (
    <>
      {isEditable && (
        <Button
          className="flex items-center gap-2 bg-[#AEC90A] mr-0 mt-2 font-bold rounded-full text-black ml-[950px]"
          onClick={openMeetingForm}
        >
          <FaPlus size={18} />New Meeting
        </Button>
      )}
      <Card className="w-full bg-neutral-900">
        <CardBody>
          <div className="">
            {(meetings || []).map(meeting => (
             
              <div
                key={meeting.meeting_id}
                className="flex items-center justify-between p-4 bg-[#1E1E1E] rounded-xl mb-4"
                style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)' }}
              >
                <div className="flex flex-col w-1/4">
                  <Typography className="text-white font-normal" variant="h6">
                    {meeting.meeting_name}
                  </Typography>
                 
                  <div className="flex items-center gap-4 mt-2">
                    <Typography className="text-[#AEC90A] font-normal" variant="h6">
                      Date: {formatDate(meeting.date)}
                    </Typography>
                    <Typography className="text-[#AEC90A] font-normal" variant="h6">
                      Time: {formatTime(meeting.time)}
                    </Typography>
                  </div>
                </div>
                <div className="flex flex-col w-1/4 items-center">
                  {meeting.meeting_type === "ONLINE" ? (
                    <Chip
                      variant="ghost"
                      color="green"
                      size="sm"
                      className="font-normal mb-2 text-white"
                      value="Online"
                      icon={
                        <span className="mx-auto mt-2 block h-2 w-2 rounded-full bg-[#00DE3E] content-['']" />
                      }
                    />
                  ) : (
                    <Chip
                      variant="ghost"
                      color="red"
                      size="sm"
                      className="font-normal mb-2 text-white"
                      value="Physical"
                      icon={
                        <span className="mx-auto mt-2 block h-2 w-2 rounded-full bg-[#FF0000] content-['']" />
                      }
                    />
                  )}
                </div>
                <div className="flex flex-col w-1/4 items-center">
                  {isEditable && (
                    <div className="flex items-center gap-2">
                      <FaEye className="text-[#AEC90A]" />
                      <Typography className="text-white font-normal">
                        {meeting.participant_type}
                      </Typography>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-4 w-1/4 justify-end">
                  <Button
                    color="gray"
                    className="text-gray-400 shadow-black shadow-md"
                  >
                    Join
                  </Button>
                  {isEditable && (
                    <div className="flex items-center gap-4">
                      <EditDeleteButton
                        onEdit={() => handleUpdate(meeting.meeting_id)}
                        onDelete={() => handleDelete(meeting.meeting_id)}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default Meeting;
