import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MeetingService from "../../service/MeetingService";
import { Button } from "@material-tailwind/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns'; // Import date-fns
import axios from 'axios';

const AddNewMeetingForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(null);
  const [time, setTime] = useState("");
  const [meetingType, setMeetingType] = useState("PHYSICAL");
  const [participantType, setParticipantType] = useState("");
  const [venue, setVenue] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { id } = useParams();
  const { club } = location.state || {};
  const clubId = club?.club_id;

  const handleRadioChange = (e) => setMeetingType(e.target.value);

  const validateField = (field, value) => {
    let error = "";
    switch (field) {
      case "title":
        if (!value) error = "Meeting title is required.";
        break;
      case "date":
        if (!value) error = "Meeting date is required.";
        break;
      case "time":
        if (!value) error = "Meeting time is required.";
        break;
      case "meetingType":
        if (!value) error = "Meeting type is required.";
        break;
      case "participantType":
        if (!value) error = "Participant type is required.";
        break;
      case "venue":
        if (meetingType === "PHYSICAL" && !value) error = "Venue is required for physical meetings.";
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    // Validate all fields
    const isValid = ["title", "date", "time", "meetingType", "participantType", "venue"]
      .every((field) => !errors[field] && eval(field));

    if (isValid) {
      try {
        const token = localStorage.getItem("token");
        const meetingData = {
          meeting_id: id,  // Make sure id is correctly set for editing an existing meeting
          meeting_name: title,
          date: date.toISOString().split('T')[0],  // Ensure the date format is yyyy-mm-dd
          time: time,  // Ensure time is in correct format (HH:mm:ss)
          meeting_type: meetingType,  // "PHYSICAL" or "ONLINE"
          participant_type: participantType,  // "EVERYONE", "CLUB_MEMBERS", or "CLUB_BOARD"
          club_id: clubId,  // Club ID related to the meeting
          venue,  // Venue for the meeting
          qrCodeUrl: meetingType === "PHYSICAL" ? "http://example.com/qrcode/1" : "",  // Only include qrCodeUrl if it's a physical meeting
        };

        console.log('Sending data to server:', meetingData);  // Log the data being sent for debugging

        const response = await axios.post('http://localhost:8080/president/saveMeeting', meetingData, {
          headers: {
            Authorization: `Bearer ${token}`,  // Send the token for authentication
          },
        });

        if (response.status === 200) {
          alert("Meeting saved successfully!");
        } else {
          alert("Error saving meeting.");
        }
        navigate(-1);
      } catch (error) {
        console.error("Error saving meeting:", error);
        alert("An error occurred while saving the meeting.");
      }
    }
  };

  return (
    <div className="flex h-screen bg-neutral-900 text-white">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Navbar />
        <div className="p-5 grid justify-center items-center ">

          <h1 className="text-center text-xl font-bold mb-3">{id ? "Update Meeting" : "Create a New Meeting"}</h1>
          <form onSubmit={handleSubmit} className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div className="hidden">
              <label className="block mb-1">Club ID</label>
              <input
                type="text"
                className="w-full bg-black text-white p-2 rounded-2xl"
                value={clubId}
                disabled
              />
            </div>
            <div className="col-span-1 md:col-span-2 lg:col-span-3">
              <label className="block mb-1">Title</label>
              <input
                type="text"
                className="w-full bg-black text-white p-3 rounded-2xl"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {isSubmitted && errors.title && <p className="text-red-500">{errors.title}</p>}
            </div>
            
            <div className="col-span-1 md:col-span-2 lg:col-span-3">
              <label className="block mb-2">Meeting Type</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="type"
                    value="PHYSICAL"
                    checked={meetingType === "PHYSICAL"}
                    onChange={handleRadioChange}
                  />
                  Physical
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="type"
                    value="ONLINE"
                    checked={meetingType === "ONLINE"}
                    onChange={handleRadioChange}
                  />
                  Online
                </label>
              </div>
              {isSubmitted && errors.meetingType && <p className="text-red-500">{errors.meetingType}</p>}
              <div className="col-span-1 md:col-span-2 lg:col-span-1 flex gap-4">
              <div className="w-full">
                <label className="block mb-2">Meeting Date</label>
                <DatePicker
                  selected={date}
                  onChange={(date) => setDate(date)}
                  dateFormat="yyyy/MM/dd"
                  minDate={new Date()}
                  className="w-full bg-black text-white p-3 rounded-2xl"
                />
                {isSubmitted && errors.date && <p className="text-red-500">{errors.date}</p>}
              </div>
              <div className="w-full">
                <label className="block mb-2">Meeting Time</label>
                <input
                  type="time"
                  className="w-full bg-black text-white p-3 rounded-2xl"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
                {isSubmitted && errors.time && <p className="text-red-500">{errors.time}</p>}
              </div>
            </div>
            </div>
            
            {meetingType === "PHYSICAL" && (
              <div className="col-span-1 md:col-span-2 lg:col-span-3">
                <label className="block mb-2">Venue</label>
                <input
                  type="text"
                  className="w-full bg-black text-white p-3 rounded-2xl"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                />
                {isSubmitted && errors.venue && <p className="text-red-500">{errors.venue}</p>}
              </div>
            )}
            <div className="col-span-1 md:col-span-2 lg:col-span-3">
              <label className="block mb-2">Participant Type</label>
              <select
                className="w-full bg-black text-white p-3 rounded-2xl"
                value={participantType}
                onChange={(e) => setParticipantType(e.target.value)}
              >
                <option value="" disabled>Select Participant Type</option>
                <option value="EVERYONE">Everyone</option>
                <option value="CLUB_MEMBERS">Club Members</option>
                <option value="CLUB_BOARD">Club Board</option>
              </select>
              {isSubmitted && errors.participantType && <p className="text-red-500">{errors.participantType}</p>}
            </div>
            <div className="col-span-1 md:col-span-2 lg:col-span-3">
              <Button type="submit" className="w-1/2 items-center bg-[#AEC90A] py-2 px-4 rounded-2xl">
                {id ? "Update Meeting" : "Create Meeting"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewMeetingForm;
