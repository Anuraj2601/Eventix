import React, { useState, useEffect } from "react";
import { Typography } from "@material-tailwind/react";
import { FaUpload } from "react-icons/fa";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import axios from "axios";
import EventService from "../service/EventService";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
  DatePicker,
  TimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const AddEvent = () => {
  const navigate = useNavigate(); // Initialize navigate hook

  // <Route path='/club/454/add-event' element={<AddEvent />} ></Route>
  const id = useParams(); // Get club_id from the URL
  const club_id = id.name;
  console.log("Club ID:", club_id);

  const [formFields, setFormFields] = useState({
    name: "",
    venue: "",
    date: null, // Updated to use MUI DatePicker (dayjs object)
    time: null, // Updated to use MUI TimePicker (dayjs object)
    budgetFile: null, // PDF file for the budget,
    purpose: "",
    benefits: "",
    eventImage: null, // New field for the event image
  });
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    console.log("Form fields changed, validating form...");
    validateForm();
  }, [formFields]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prevFields) => {
      const updatedFields = { ...prevFields, [name]: value };
      console.log("Updated Form Fields:", updatedFields); // Debugging line
      return updatedFields;
    });
  };

  // const handleSponsorChange = (index, field, value) => {
  //   const updatedSponsors = [...formFields.sponsors];
  //   updatedSponsors[index] = { ...updatedSponsors[index], [field]: value };
  //   setFormFields((prevFields) => ({
  //     ...prevFields,
  //     sponsors: updatedSponsors,
  //   }));
  // };

  //   const handleApprovalChange = (value) => {
  //     setFormFields((prevFields) => ({
  //       ...prevFields,
  //       iudApproval: value,
  //       proofOfApproval: value === "approved" ? prevFields.proofOfApproval : null,
  //     }));
  //     validateForm();
  //   };

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#AEC90A", // Customize the primary color (e.g., green)
      },
      background: {
        paper: "#1e1e1e", // Dark background for picker popups
        default: "#121212",
      },
      text: {
        primary: "#ffffff", // White text
        secondary: "#a1a1a1", // Light gray text
      },
    },
  });

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    // Check if file is valid
    console.log(`File selected for ${name}:`, file);

    // Validate file type for budget
    if (name === "budgetFile") {
      if (file && file.type !== "application/pdf") {
        alert("Please upload a PDF file for the budget.");
        return;
      }
    }

    // Validate file type for eventImage
    if (name === "eventImage") {
      if (file && !["image/jpeg", "image/png"].includes(file.type)) {
        alert("Please upload an image file (JPEG or PNG) for the event image.");
        return;
      }
    }

    setFormFields((prevFields) => ({
      ...prevFields,
      [name]: file, // Update state with the selected file
    }));
  };

  const validateForm = () => {
    const {
      name,
      venue,
      date,
      time,
      budgetFile,
      purpose,
      benefits,
      eventImage,
    } = formFields;

    // Add console log to inspect form fields
    console.log("Validating form with fields:", formFields);

    const isValid =
      name.trim() !== "" &&
      venue.trim() !== "" &&
      date !== null && // Date must be selected
      time !== null && // Time must be selected
      budgetFile !== null && // Budget file is required
      budgetFile instanceof File &&
      budgetFile.type === "application/pdf" && // Check for PDF type
      purpose.trim() !== "" &&
      benefits.trim() !== "" &&
      (eventImage === null ||
        (eventImage instanceof File &&
          ["image/jpeg", "image/png"].includes(eventImage.type))); // Event image is optional but must be JPEG or PNG if provided

    console.log("Form Validation Status:", isValid); // Debugging line
    setIsFormValid(isValid);
  };

  const handleSubmit = async () => {
    if (!isFormValid) {
      alert("Please fill in all required fields correctly.");
      return;
    }

    const formData = new FormData();

    // Append form fields to FormData
    formData.append("name", formFields.name);
    formData.append("venue", formFields.venue);
    formData.append("date", formFields.date.toISOString()); // Convert date to ISO string
    formData.append("time", formFields.time.format("HH:mm")); // Format time
    formData.append("purpose", formFields.purpose);
    formData.append("benefits", formFields.benefits);

    //formData.append("club_id", club_id);

    // Append files to FormData
    if (formFields.budget) {
      formData.append("budgetFile", formFields.budgetFile);
    }
    if (formFields.eventImage) {
      formData.append("eventImage", formFields.eventImage);
    }

    const token = localStorage.getItem("token");

    try {
      // Replace with your backend API URL
      const response = await EventService.saveEvent(
        formFields.name,
        formFields.venue,
        formFields.date.toISOString(),
        formFields.time.format("HH:mm"),
        formFields.purpose,
        formFields.benefits,
        formFields.eventImage,
        formFields.budgetFile,
        club_id,
        token
      );
      console.log("Form submitted successfully", response);
      Swal.fire({
        text: "Event Request Created Successfully!",
        icon: "success",
      }).then(() => {
        // Reset form fields after success
        setFormFields({
          name: "",
          venue: "",
          date: null,
          time: null,
          budgetFile: null,
          purpose: "",
          benefits: "",
          eventImage: null,
        });
        setIsFormValid(false); // Optionally reset form validation
         // Navigate to the previous page
         navigate(-1); // Go back to the previous page
      });
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <div className="fixed inset-0 flex">
      <Sidebar className="flex-shrink-0" />
      <div className="flex flex-col flex-1">
        <Navbar className="sticky top-0 z-10 p-4" />
        <div className="bg-black bg-opacity-90 text-white flex-col p-8 md:p-20 overflow-y-auto">
          <Typography variant="h3" className="mb-4 text-center">
            Proposal Form
          </Typography>

          <div className="grid grid-cols-1 gap-4">
            {/* Event Image Upload */}
            <div className="mb-4">
              <label className="block mb-2">Event Image:</label>
              <div className="flex flex-col items-center">
                <input
                  type="file"
                  name="eventImage"
                  onChange={handleFileChange}
                  className="w-full h-12 bg-black text-white p-2 rounded-2xl"
                  style={{
                    boxShadow:
                      "0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)",
                  }}
                />
                <FaUpload className="text-white mt-2" />
              </div>
            </div>

            {/* First Set of Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block mb-2">Name of the Event:</label>
                <input
                  type="text"
                  name="name"
                  value={formFields.name}
                  onChange={handleInputChange}
                  className="w-full h-16 bg-black text-white p-2 rounded-2xl"
                  style={{
                    boxShadow:
                      "0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)",
                  }}
                />
              </div>
              <div>
                <label className="block mb-2">Venue of the Event:</label>
                <input
                  type="text"
                  name="venue"
                  value={formFields.venue}
                  onChange={handleInputChange}
                  className="w-full h-16 bg-black text-white p-2 rounded-2xl"
                  style={{
                    boxShadow:
                      "0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)",
                  }}
                />
              </div>
              {/* <div>
                <label className="block mb-2">
                  Tentative Date of the Event:
                </label>
                <input
                  type="date"
                  name="date"
                  value={formFields.date}
                  onChange={handleInputChange}
                  className="w-full h-16 bg-black text-white p-2 rounded-2xl"
                  style={{
                    boxShadow:
                      "0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)",
                  }}
                />
              </div> */}
              <ThemeProvider theme={darkTheme}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div className="mb-4">
                    <label className="block mb-2">
                      Tentative Date of the Event:
                    </label>
                    <DatePicker
                      value={formFields.date}
                      onChange={(newValue) =>
                        setFormFields((prev) => ({ ...prev, date: newValue }))
                      }
                      minDate={dayjs()} // Prevent selecting past dates
                      slots={{
                        textField: (props) => (
                          <TextField
                            {...props}
                            className="w-full h-16 bg-black text-white p-2 rounded-2xl"
                            sx={{
                              boxShadow:
                                "0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)",
                            }}
                          />
                        ),
                      }}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2">Event Time:</label>
                    <TimePicker
                      value={formFields.time}
                      onChange={(newValue) =>
                        setFormFields((prev) => ({ ...prev, time: newValue }))
                      }
                      slots={{
                        textField: (props) => (
                          <TextField
                            {...props}
                            className="w-full h-16 bg-black text-white p-2 rounded-2xl"
                            sx={{
                              boxShadow:
                                "0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)",
                            }}
                          />
                        ),
                      }}
                    />
                  </div>
                </LocalizationProvider>
              </ThemeProvider>
              
              {/* <div>
                <label className="block mb-2">Budget of the Event:</label>
                <input
                  type="text"
                  name="budget"
                  value={formFields.budget}
                  onChange={handleInputChange}
                  className="w-full h-16 bg-black text-white p-2 rounded-2xl"
                  style={{
                    boxShadow:
                      "0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)",
                  }}
                />
              </div>
            </div> */}
              <div>
                <label className="block mb-2">Upload Budget File (PDF):</label>
                <div className="flex flex-col items-center">
                  <input
                    type="file"
                    name="budgetFile"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="w-full h-12 bg-black text-white p-2 rounded-2xl"
                    style={{
                      boxShadow:
                        "0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)",
                    }}
                  />
                  <FaUpload className="text-white mt-2" />
                </div>
              </div>
            </div>

            {/* Second Set of Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">Purpose of the Event:</label>
                <textarea
                  name="purpose"
                  value={formFields.purpose}
                  onChange={handleInputChange}
                  className="w-full h-32 bg-black text-white p-2 rounded-2xl"
                  style={{
                    boxShadow:
                      "0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)",
                  }}
                />
              </div>
              <div>
                <label className="block mb-2">Benefits to UCSC:</label>
                <textarea
                  name="benefits"
                  value={formFields.benefits}
                  onChange={handleInputChange}
                  className="w-full h-32 bg-black text-white p-2 rounded-2xl"
                  style={{
                    boxShadow:
                      "0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)",
                  }}
                />
              </div>
            </div>

            {/* IUD Approval Status */}
            {/* <div className="mt-4">
              <label className="block mb-2">IUD Approval Status:</label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="approved"
                    checked={formFields.iudApproval === "approved"}
                    onChange={() => handleApprovalChange("approved")}
                  />
                  <span>Already Approved</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="not-approved"
                    checked={formFields.iudApproval === "not-approved"}
                    onChange={() => handleApprovalChange("not-approved")}
                  />
                  <span>Not Approved</span>
                </label>
              </div>
              {formFields.iudApproval === "approved" && (
                <div className="mt-4">
                  <label className="block mb-2">Proof of IUD Approval:</label>
                  <input
                    type="file"
                    name="proofOfApproval"
                    onChange={handleFileChange}
                    className="w-full h-16 bg-black text-white p-2 rounded-2xl"
                    style={{
                      boxShadow:
                        "0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)",
                    }}
                  />
                </div>
              )}
            </div> */}

            {/* Sponsors */}
          </div>
          <div className="flex justify-center mt-4">
            <button
              onClick={handleSubmit}
              disabled={!isFormValid}
              className={`p-2 rounded-2xl ${
                isFormValid ? "bg-[#AEC90A]" : "bg-gray-500"
              } text-white`}
              style={{
                boxShadow:
                  "0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)",
              }}
            >
              Send Proposal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEvent;
