import React, { useState, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Card, CardBody, Typography, Chip, Button } from "@material-tailwind/react";
import EditDeleteButton from './EditDeleteButton';
import { FaEye } from 'react-icons/fa'; // Import view icon
import { FaPlus } from "react-icons/fa6";
import MeetingService from "../service/MeetingService";




const Meeting = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  // Check if the current path is either '/president' or '/secretary'
  const isEditable = currentPath.startsWith('/president') || currentPath.startsWith('/secretary');

  const [meetings,setMeetings] = useState([]);

  useEffect(() => {
    console.log("meetings:", meetings);
    fetchMeetings();
  }, [meetings]);

  useEffect(() => {
    if (meetings.length === 0) {
      console.log("No meetings to check.");
    } else {
      const ids = meetings.map(meeting => meeting.meeting_id);
      const uniqueIds = new Set(ids);
      console.log(`Meetings length: ${meetings.length}`);
      console.log(ids.length === uniqueIds.size ? 'All IDs are unique' : 'There are duplicate IDs');
    }
  }, [meetings]);

  const fetchMeetings = async () => {
      try {
          const token = localStorage.getItem('token');
          const response = await MeetingService.getAllMeetings(token);
          const meetingsArray = response.content || [];
          console.log('meeting response in fetchMeetings:', response);
          setMeetings(meetingsArray);

      } catch(error) {
          console.error('Error fetching meetings:', error);
      }
  };

  const formatDate = (dateString) => {
    if (dateString.length < 3) return 'Invalid date'; 
    console.log(dateString);
  
    return `${dateString[0]}-${dateString[1]}-${dateString[2]}`;
  };

  /* const meetings1 = [
    {
      id: "1",
      desc: "Regarding next club board election",
      date: "05.06.2024",
      time: "14:00",
      status: "Online",
      audience: "Club Members"
    },
    {
      id: "2",
      desc: "Regarding club membership update",
      date: "08.06.2024",
      time: "15:30",
      status: "Physical",
      audience: "Everyone"
    },
    {
      id: "3",
      desc: "Discussion on upcoming events",
      date: "10.06.2024",
      time: "12:00",
      status: "Online",
      audience: "Club Board"
    },
  ]; */

  const handleUpdate = (id) => {
    navigate(`/president/club/meeting/edit/${id}`);
  }

  const handleDelete = (id) => {
    // Add your delete handling logic here
  };

  const openMeetingForm = () =>{
    navigate(`/president/club/meeting/add`);
  }

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
                      Date: {meeting.date}
                    </Typography>
                    <Typography className="text-[#AEC90A] font-normal" variant="h6">
                      Time: {meeting.time}
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
