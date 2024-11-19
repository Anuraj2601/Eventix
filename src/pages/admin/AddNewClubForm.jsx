import React, { useState, useEffect } from "react";
import { Typography } from "@material-tailwind/react";
import { FaUpload } from "react-icons/fa";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import ClubsService from "../../service/ClubsService";
import { useNavigate } from "react-router-dom";

const AddNewClubForm = () => {
  const navigate = useNavigate();

  const [formFields, setFormFields] = useState({
    name: "",
    advisorEmail: "",
    description: "",
    clubImage: null,
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [validationError, setValidationError] = useState("");
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  useEffect(() => {
    validateForm();
  }, [formFields]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));

    if (name === "advisorEmail") {
      const emailValidationError = validateAdvisorEmail(value);
      setEmailError(emailValidationError);
    }
  };

  const validateAdvisorEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@ucsc\.cmb\.ac\.lk$/;
    if (!email) return "Email is required.";
    if (!emailRegex.test(email)) return "Invalid Email format. Must end with '@ucsc.cmb.ac.lk'.";
    return "";
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    if (name === "clubImage" && file && !["image/jpeg", "image/png"].includes(file.type)) {
      setValidationError("Please upload an image file (JPEG or PNG) for the club image.");
      return;
    }

    setFormFields((prevFields) => ({
      ...prevFields,
      [name]: file,
    }));
  };

  const validateForm = () => {
    const { name, advisorEmail, description, clubImage } = formFields;

    const isValid =
      name.trim() !== "" &&
      advisorEmail.trim() !== "" &&
      emailError === "" &&
      description.trim() !== "" &&
      (clubImage === null || (clubImage instanceof File && ["image/jpeg", "image/png"].includes(clubImage.type)));

    setIsFormValid(isValid);
  };

  const handleSubmit = async () => {
    if (!isFormValid) {
      setValidationError("Please fill in all required fields correctly.");
      return;
    }

    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("name", formFields.name);
    formData.append("advisorEmail", formFields.advisorEmail);
    formData.append("description", formFields.description);
    if (formFields.clubImage) {
      formData.append("clubImage", formFields.clubImage);
    }

    try {
      const response = await ClubsService.addClub(
        formFields.name,
        formFields.advisorEmail,
        formFields.description,
        formFields.clubImage,
        token
      );
      console.log("Form submitted successfully", response);
      setValidationError(""); // Clear any validation error
      setShowSuccessDialog(true); // Show success dialog
    } catch (error) {
      console.error("Error submitting form", error);
      setValidationError("An error occurred while submitting the form.");
    }
  };

  return (
    <div className="fixed inset-0 flex">
      <Sidebar className="flex-shrink-0" />
      <div className="flex flex-col flex-1">
        <Navbar className="sticky top-0 z-10 p-4" />
        <div className="bg-black bg-opacity-90 text-white flex-col p-8 md:p-20 overflow-y-auto">
          <Typography variant="h3" className="mb-4 text-center">
            Create New Club
          </Typography>

          {/* Validation Error Dialog */}
          {validationError && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg text-black">
                <p>{validationError}</p>
                <button
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => setValidationError("")}
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {/* Success Dialog */}
          {showSuccessDialog && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg text-black">
                <p>Club added successfully!</p>
                <button
                  className="mt-4 bg-[#AEC90A]  text-white px-4 py-2 rounded"
                  onClick={() => {
                    setShowSuccessDialog(false);
                    navigate(-1);
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4">
            <div className="mb-4">
              <label className="block mb-2">Club Logo Image:</label>
              <div className="flex flex-col items-center">
                <input
                  type="file"
                  name="clubImage"
                  onChange={handleFileChange}
                  className="w-full h-12 bg-black text-white p-2 rounded-2xl"
                />
                <FaUpload className="text-white mt-2" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">Name of the Club:</label>
                <input
                  type="text"
                  name="name"
                  value={formFields.name}
                  onChange={handleInputChange}
                  className="w-full h-16 bg-black text-white p-2 rounded-2xl"
                />
              </div>
              <div>
                <label className="block mb-2">Club Advisor Email:</label>
                <input
                  type="text"
                  name="advisorEmail"
                  value={formFields.advisorEmail}
                  onChange={handleInputChange}
                  className="w-full h-16 bg-black text-white p-2 rounded-2xl"
                />
                {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
              </div>
            </div>

            <div>
              <label className="block mb-2">Club Description:</label>
              <textarea
                name="description"
                value={formFields.description}
                onChange={handleInputChange}
                className="w-full h-32 bg-black text-white p-2 rounded-2xl"
              />
            </div>
          </div>

          <div className="flex justify-center mt-4">
  <button
    className={`px-6 py-2 rounded-lg text-center ${
      isFormValid ? "bg-[#AEC90A]" : "bg-gray-500 cursor-not-allowed"
    }`}
    onClick={handleSubmit}
    disabled={!isFormValid}
  >
    Submit
  </button>
</div>

        </div>
      </div>
    </div>
  );
};

export default AddNewClubForm;
