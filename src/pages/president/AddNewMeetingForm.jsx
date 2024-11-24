import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MeetingService from "../../service/MeetingService";
import { Button } from "@material-tailwind/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddNewMeetingForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { club } = location.state || {};
  const clubId = club?.club_id;

  const [title, setTitle] = useState("");
  const [date, setDate] = useState(null);
  const [time, setTime] = useState("");
  const [meetingType, setMeetingType] = useState("PHYSICAL");
  const [participantType, setParticipantType] = useState("");
  const [venue, setVenue] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    return error;
  };

  const validateAllFields = () => {
    const validationErrors = {
      title: validateField("title", title),
      date: validateField("date", date),
      time: validateField("time", time),
      meetingType: validateField("meetingType", meetingType),
      participantType: validateField("participantType", participantType),
      venue: validateField("venue", venue),
    };

    return Object.values(validationErrors).every((error) => !error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (validateAllFields()) {
      try {
        const token = localStorage.getItem("token");
        const meetingData = {
          meeting_name: title,
          date: date.toISOString().split("T")[0],
          time,
          meeting_type: meetingType,
          participant_type: participantType,
          club_id: clubId,
          ...(meetingType === "PHYSICAL" && { venue }),
        };

        const response = await MeetingService.saveMeeting(
          meetingData.meeting_name,
          meetingData.date,
          meetingData.time,
          meetingData.meeting_type,
          meetingData.participant_type,
          meetingData.club_id,
          token,
          meetingType === "PHYSICAL" ? meetingData.venue : undefined
        );

        if (response.status === 200) {
          alert("Meeting saved successfully!");
          navigate(-1);
        } else {
          alert("Error saving meeting.");
        }
      } catch (error) {
        console.error("Error saving meeting:", error.response || error.message);
        alert("An error occurred while saving the meeting.");
      }
    }
  };

  const handleChange = (field, value) => {
    switch (field) {
      case "title":
        setTitle(value);
        break;
      case "date":
        setDate(value);
        break;
      case "time":
        setTime(value);
        break;
      case "meetingType":
        setMeetingType(value);
        break;
      case "participantType":
        setParticipantType(value);
        break;
      case "venue":
        setVenue(value);
        break;
      default:
        break;
    }
    if (isSubmitted) validateField(field, value);
  };

  return (
    <div className="flex h-screen bg-neutral-900 text-white">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Navbar />
        <div className="p-10">
          <h1 className="text-center text-xl font-bold mb-6">{id ? "Update Meeting" : "Create a New Meeting"}</h1>
          <form onSubmit={handleSubmit} className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="block mb-2">Title</label>
              <input
                type="text"
                className="w-full bg-black text-white p-2 rounded-2xl"
                value={title}
                onChange={(e) => handleChange("title", e.target.value)}
              />
              {errors.title && <p className="text-red-500">{errors.title}</p>}
            </div>
            <div>
              <label className="block mb-2">Meeting Date</label>
              <DatePicker
                selected={date}
                onChange={(date) => handleChange("date", date)}
                dateFormat="yyyy/MM/dd"
                minDate={new Date()}
                className="w-full bg-black text-white p-2 rounded-2xl"
              />
              {errors.date && <p className="text-red-500">{errors.date}</p>}
            </div>
            <div>
              <label className="block mb-2">Meeting Time</label>
              <input
                type="time"
                className="w-full bg-black text-white p-2 rounded-2xl"
                value={time}
                onChange={(e) => handleChange("time", e.target.value)}
              />
              {errors.time && <p className="text-red-500">{errors.time}</p>}
            </div>
            <div>
              <label className="block mb-2">Meeting Type</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="type"
                    value="PHYSICAL"
                    checked={meetingType === "PHYSICAL"}
                    onChange={(e) => handleChange("meetingType", e.target.value)}
                  />
                  Physical
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="type"
                    value="ONLINE"
                    checked={meetingType === "ONLINE"}
                    onChange={(e) => handleChange("meetingType", e.target.value)}
                  />
                  Online
                </label>
              </div>
              {errors.meetingType && <p className="text-red-500">{errors.meetingType}</p>}
            </div>
            {meetingType === "PHYSICAL" && (
              <div>
                <label className="block mb-2">Venue</label>
                <input
                  type="text"
                  className="w-full bg-black text-white p-2 rounded-2xl"
                  value={venue}
                  onChange={(e) => handleChange("venue", e.target.value)}
                />
                {errors.venue && <p className="text-red-500">{errors.venue}</p>}
              </div>
            )}
            <div>
              <label className="block mb-2">Participant Type</label>
              <select
                className="w-full bg-black text-white p-2 rounded-2xl"
                value={participantType}
                onChange={(e) => handleChange("participantType", e.target.value)}
              >
                <option value="" disabled>
                  Select Participant Type
                </option>
                <option value="EVERYONE">Everyone</option>
                <option value="CLUB_MEMBERS">Club Members</option>
                <option value="CLUB_BOARD">Club Board</option>
              </select>
              {errors.participantType && <p className="text-red-500">{errors.participantType}</p>}
            </div>
            <div className="col-span-full flex justify-center gap-4 mt-6">
              <Button onClick={() => navigate(-1)} className="border-2 border-green-500 text-green-500">
                Cancel
              </Button>
              <Button type="submit" className="bg-green-500 text-black">
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewMeetingForm;
