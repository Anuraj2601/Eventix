import React, { useState, useEffect, useReducer } from "react";
import { Typography } from "@material-tailwind/react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import EventService from "../service/EventService";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  DatePicker,
  TimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import dayjs from "dayjs";

// Initial state for the form
const initialState = {
  name: "",
  venue: "",
  date: null,
  time: null,
  budget_pdf: null,
  purpose: "",
  benefits: "",
  event_image: null,
  public_status: false,
};

// Reducer function to manage form state
const formReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };
    case "UPDATE_MULTIPLE_FIELDS":
      return { ...state, ...action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

const EditEvent = () => {
  const navigate = useNavigate();
  const {event_id} = useParams(); // Get IDs from the URL
  const [formFields, dispatch] = useReducer(formReducer, initialState);
  const [isFormValid, setIsFormValid] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetchEventDetails();
  }, []);

  // Fetch existing event details and populate the form
  const fetchEventDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const eventData = await EventService.getEvent(event_id, token);
      console.log("Fetched Event Data:", eventData);

      const [hours, minutes] = eventData.content.time; // Extract hours and minutes from array
      const eventTime = dayjs().hour(hours).minute(minutes); // Create a valid dayjs object

      dispatch({
        type: "UPDATE_MULTIPLE_FIELDS",
        payload: {
          name: eventData.content.name,
          venue: eventData.content.venue,
          date: dayjs(eventData.content.date),
          time: eventTime,
          purpose: eventData.content.purpose,
          benefits: eventData.content.benefits,
          public_status: eventData.content.public_status,
          event_image: eventData.content.event_image,
          budget_pdf: eventData.content.budget_pdf,
        },
      });
    } catch (error) {
      Swal.fire("Error", "Failed to load event data", "error");
    }
  };

  // Handle input changes for text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "UPDATE_FIELD", field: name, value: value });
  };

  // Handle file uploads and validate size/type
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    if (file) {
      const maxSize = 5 * 1024 * 1024; // 5MB limit
      if (file.size > maxSize) {
        Swal.fire("Error", "File size should not exceed 5MB", "error");
        return;
      }
      if (name === "budget_pdf" && file.type !== "application/pdf") {
        Swal.fire("Error", "Budget file must be a PDF", "error");
        return;
      }
      if (name === "event_image") {
        setImagePreview(URL.createObjectURL(file));
      }
    }

    dispatch({ type: "UPDATE_FIELD", field: name, value: file });
  };

  // Validate the form
  const validateForm = () => {
    const { name, venue, date, time, purpose, benefits } = formFields;
    const errors = {};

    if (!name.trim()) errors.name = "Event name is required.";
    if (!venue.trim()) errors.venue = "Venue is required.";
    if (!date) errors.date = "Date is required.";
    if (!time) errors.time = "Time is required.";
    if (!purpose.trim()) errors.purpose = "Purpose is required.";
    if (!benefits.trim()) errors.benefits = "Benefits are required.";

    setFormErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  useEffect(() => {
    validateForm();
  }, [formFields]);

  const handleSubmit = async () => {
    validateForm(); // Ensure form is validated before submission
    if (!isFormValid) return;

    // Prepare JSON data
    const jsonData = {};
    Object.entries(formFields).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (dayjs.isDayjs(value)) {
          jsonData[key] = value.toISOString(); // Convert date/time to ISO string
        } else if (key !== "budget_pdf" && key !== "event_image") {
          jsonData[key] = value; // Exclude files
        }
      }
    });

     // Log the jsonData to the console
  console.log("Form Data to be Submitted:", jsonData);

    // Extract files
    const eventImage = formFields.event_image instanceof File ? formFields.event_image : null;
    const budgetFile = formFields.budget_pdf instanceof File ? formFields.budget_pdf : null;

    try {
      const token = localStorage.getItem("token");
      

      // Call the API via EventService
      const response = await EventService.updateEvent(event_id, jsonData, eventImage, budgetFile, token);

      if (response.success) {
        Swal.fire("Success", "Event updated successfully!", "success").then(
          () => {
            navigate(-1);
          }
        );
      } else {
        Swal.fire(
          "Error",
          response.message || "Failed to update event",
          "error"
        );
      }
    } catch (error) {
      Swal.fire("Error", "An unexpected error occurred", "error");
    }
  };

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: { main: "#AEC90A" },
      background: { paper: "#1e1e1e", default: "#121212" },
      text: { primary: "#ffffff", secondary: "#a1a1a1" },
    },
  });

  return (
    <div className="fixed inset-0 flex">
      <Sidebar className="flex-shrink-0" />
      <div className="flex flex-col flex-1">
        <Navbar className="sticky top-0 z-10 p-4" />
        <div className="bg-black bg-opacity-90 text-white flex-col p-8 md:p-20 overflow-y-auto">
          <Typography variant="h3" className="mb-4 text-center">
            Edit Event
          </Typography>

          <div className="grid grid-cols-1 gap-4">
            {/* Event Name */}
            <div className="mb-4">
              <label className="block mb-2">Event Name:</label>
              <input
                type="text"
                name="name"
                value={formFields.name}
                onChange={handleInputChange}
                className="w-full p-2 rounded-xl bg-black text-white"
              />
              {formErrors.name && (
                <p className="text-red-500">{formErrors.name}</p>
              )}
            </div>
            {/* Venue */}
            <div className="mb-4">
              <label className="block mb-2">Venue:</label>
              <input
                type="text"
                name="venue"
                value={formFields.venue}
                onChange={handleInputChange}
                className="w-full p-2 rounded-xl bg-black text-white"
              />
              {formErrors.venue && (
                <p className="text-red-500">{formErrors.venue}</p>
              )}
            </div>
            {/* Date and Time Pickers */}
            <ThemeProvider theme={darkTheme}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className="mb-4">
                  <label className="block mb-2">Date:</label>
                  <DatePicker
                    value={formFields.date}
                    onChange={(newValue) =>
                      dispatch({
                        type: "UPDATE_FIELD",
                        field: "date",
                        value: newValue,
                      })
                    }
                    minDate={dayjs()} // Prevent past dates
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        className: "bg-black text-white",
                      },
                    }}
                  />
                  {formErrors.date && (
                    <p className="text-red-500">{formErrors.date}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block mb-2">Time:</label>
                  <TimePicker
                    value={formFields.time}
                    onChange={(newValue) =>
                      dispatch({
                        type: "UPDATE_FIELD",
                        field: "time",
                        value: newValue,
                      })
                    }
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        className: "bg-black text-white",
                      },
                    }}
                  />
                  {formErrors.time && (
                    <p className="text-red-500">{formErrors.time}</p>
                  )}
                </div>
              </LocalizationProvider>
            </ThemeProvider>
            {/* Purpose */}
            <div className="mb-4">
              <label className="block mb-2">Purpose:</label>
              <textarea
                name="purpose"
                value={formFields.purpose}
                onChange={handleInputChange}
                className="w-full p-2 rounded-xl bg-black text-white"
              />
              {formErrors.purpose && (
                <p className="text-red-500">{formErrors.purpose}</p>
              )}
            </div>
            {/* Benefits */}
            <div className="mb-4">
              <label className="block mb-2">Benefits:</label>
              <textarea
                name="benefits"
                value={formFields.benefits}
                onChange={handleInputChange}
                className="w-full p-2 rounded-xl bg-black text-white"
              />
              {formErrors.benefits && (
                <p className="text-red-500">{formErrors.benefits}</p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4">
              {/* Budget File */}
              <div className="mb-4">
                <label className="block mb-2">Budget File:</label>
                {formFields.budget_pdf &&
                  typeof formFields.budget_pdf === "string" && (
                    <button
                      onClick={() =>
                        window.open(formFields.budget_pdf, "_blank")
                      }
                      className="mb-2 p-2 text-white rounded-xl border-2 border-[#AEC90A]"
                    >
                      View Existing Budget File
                    </button>
                  )}
                <input
                  type="file"
                  name="budget_pdf"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="w-full p-2 bg-black text-white"
                />
              </div>

              {/* Event Image */}
              <div className="mb-4">
                <label className="block mb-2">Event Image:</label>
                {formFields.event_image &&
                  typeof formFields.event_image === "string" && (
                    <div className="mb-4">
                      <img
                        src={formFields.event_image}
                        alt="Event"
                        className="w-48 h-48 object-cover rounded-md"
                      />
                    </div>
                  )}
                <input
                  type="file"
                  name="event_image"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full p-2 bg-black text-white"
                />
                {imagePreview && (
                  <div className="mt-4">
                    <img
                      src={imagePreview}
                      alt="Event Preview"
                      className="w-48 h-48 object-cover rounded-md"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Public Status with Radio Buttons */}
            <div className="mb-4">
              <label className="block mb-2">Public Status:</label>
              <div className="flex items-center space-x-4">
                <div>
                  <input
                    type="radio"
                    id="public"
                    name="public_status"
                    value={true}
                    checked={formFields.public_status === true}
                    onChange={() =>
                      dispatch({
                        type: "UPDATE_FIELD",
                        field: "public_status",
                        value: true,
                      })
                    }
                    className="mr-2"
                  />
                  <label htmlFor="public">Public</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="private"
                    name="public_status"
                    value={false}
                    checked={formFields.public_status === false}
                    onChange={() =>
                      dispatch({
                        type: "UPDATE_FIELD",
                        field: "public_status",
                        value: false,
                      })
                    }
                    className="mr-2"
                  />
                  <label htmlFor="private">Private</label>
                </div>
              </div>
            </div>
            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={!isFormValid}
              className="w-full bg-[#AEC90A] p-2 text-white rounded-xl disabled:bg-gray-400"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEvent;
