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
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogType, setDialogType] = useState("");
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
          setDialogMessage("Meeting successfully saved");
          setDialogType("success");
          setShowDialog(true);
  
          // Wait for the user to close the dialog before navigating
          const handleCloseDialog = () => {
            setShowDialog(false);
            navigate(-1);  // Navigate back after closing the dialog
          };
  
          // Automatically close the dialog after a brief delay
          setTimeout(() => {
            handleCloseDialog(); // You can also attach this to a "Close" button click event
          }, 3000); // Wait 3 seconds before navigating (you can adjust the delay)
        } else {
          setDialogMessage("Meeting successfully saved");
          setDialogType("success");
          setShowDialog(true);
          setTimeout(() => {
            navigate(-1);
          }, 10000);
        }
      } catch (error) {
        console.error("Error saving meeting:", error.response || error.message);
        setDialogMessage("An error occurred while saving the meeting.");
        setDialogType("error");
        setShowDialog(true);
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
               
                <option value="CLUB_MEMBERS">Club Members</option>
                <option value="CLUB_BOARD">Club Board</option>
              </select>
              {errors.participantType && <p className="text-red-500">{errors.participantType}</p>}
            </div>
            <div className="col-span-full flex justify-center gap-4 mt-6">
              <Button onClick={() => navigate(-1)} className="border-2 border-[#AEC90A] text-[#AEC90A]">
                Cancel
              </Button>
              <Button type="submit" className="bg-[#AEC90A] text-black">
                Submit
              </Button>
            </div>
          </form>
        </div>

        {showDialog && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 bg-white text-black rounded-lg shadow-lg">
          <p>{dialogMessage}</p>
          <div className="flex justify-center space-x-4 mt-4">
            {dialogType === "confirmation" && (
              <>
                <button
                  onClick={updateRoles}
                  className="bg-red-500 p-3 rounded-full"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setShowDialog(false)}
                  className="bg-gray-500 p-3 rounded-full"
                >
                  Cancel
                </button>
              </>
            )}
            {dialogType === "success" && (
              <button
                onClick={() => setShowDialog(false)}
                className="bg-[#AEC90A] p-3 rounded-full"
              >
                Close
              </button>
            )}
            {dialogType === "error" && (
              <button
                onClick={() => setShowDialog(false)}
                className="bg-gray-500 p-3 rounded-full"
              >
                Close
              </button>
            )}
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default AddNewMeetingForm;
