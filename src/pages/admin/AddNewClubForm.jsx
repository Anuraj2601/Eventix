import React, { useState, useEffect } from "react";
import { Typography } from "@material-tailwind/react";
import { FaUpload } from "react-icons/fa";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import EventService from "../../service/EventService";
import ClubsService from "../../service/ClubsService";
import { useNavigate } from "react-router-dom";
import UsersService from "../../service/UsersService";

const AddNewClubForm = () => {
    const navigate = useNavigate();

  const [formFields, setFormFields] = useState({
    name: "",
    //presidentEmail: "",
    advisorEmail: "",
    description: "",
    clubImage: null, // New field for the event image
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

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@stu\.ucsc\.cmb\.ac\.lk$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Invalid Email format";
    return "";
  };

  const validateAdvisorEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@ucsc\.cmb\.ac\.lk$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Invalid Email format";
    return "";
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

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    
    // Check if file is valid
    console.log(`File selected for ${name}:`, file);

    // Validate file type for budget
    // if (name === 'budgetFile') {
    //   if (file && file.type !== 'application/pdf') {
    //     alert("Please upload a PDF file for the budget.");
    //     return;
    //   }
    // }

    // Validate file type for eventImage
    if (name === 'clubImage') {
      if (file && !['image/jpeg', 'image/png'].includes(file.type)) {
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
      //presidentEmail,
      advisorEmail,
      description,
      clubImage,
    } = formFields;
    
    // Add console log to inspect form fields
    console.log("Validating form with fields:", formFields);

    const isValid =
      name.trim() !== "" && 
      //presidentEmail.trim() !== "" && !validateEmail(presidentEmail) &&
      advisorEmail.trim() !== "" && !validateAdvisorEmail(advisorEmail) &&
      description.trim() !== "" &&
      (clubImage === null || (clubImage instanceof File && 
        ['image/jpeg', 'image/png'].includes(clubImage.type))); // Event image is optional but must be JPEG or PNG if provided

    console.log("Form Validation Status:", isValid); // Debugging line
    setIsFormValid(isValid);
  };

  const handleSubmit = async () => {
    if (!isFormValid) {
      alert("Please fill in all required fields correctly.");
      return;
    }

    const token = localStorage.getItem("token");
    // let president_id;

    // try{
    //   //const token = localStorage.getItem("token");
    //   const response1 = await UsersService.getUserByEmail(formFields.presidentEmail, token);
    //   console.log("User id by email", response1);
    //   president_id = response1.content.id;
      

        

    // }catch(err){
    //     console.log("Error getting club president id:", err)

    // }


    const formData = new FormData();
    
    // Append form fields to FormData
    formData.append("name", formFields.name);
    //formData.append("presidentEmail", formFields.presidentEmail);
    //formData.append("presidentId", president_id);
    formData.append("advisorEmail", formFields.advisorEmail);
    formData.append("description", formFields.description);
    
    // Append files to FormData
    // if (formFields.budget) {
    //   formData.append("budgetFile", formFields.budgetFile);
    // }
    if (formFields.clubImage) {
      formData.append("clubImage", formFields.clubImage);
    }

    

    try {
      // Replace with your backend API URL
      const response = await ClubsService.addClub(
        formFields.name,
        //president_id,
        formFields.advisorEmail,
        formFields.description,
        formFields.clubImage,
        token
      );
      console.log("Form submitted successfully", response);
      alert("Club added successfully");
      navigate(-1);
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
            Create New Club
          </Typography>

          <div className="grid grid-cols-1 gap-4">
            {/* Event Image Upload */}
            <div className="mb-4">
              <label className="block mb-2">Club Logo Image:</label>
              <div className="flex flex-col items-center">
                <input
                  type="file"
                  name="clubImage"
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
                <label className="block mb-2">Name of the Club:</label>
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
              {/* <div>
                <label className="block mb-2">Club President Email:</label>
                <input
                  type="text"
                  name="presidentEmail"
                  value={formFields.presidentEmail}
                  onChange={handleInputChange}
                  className="w-full h-16 bg-black text-white p-2 rounded-2xl"
                  style={{
                    boxShadow:
                      "0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)",
                  }}
                />
              </div> */}
              <div>
                <label className="block mb-2">
                  Club Advisor Email:
                </label>
                <input
                  type="text"
                  name="advisorEmail"
                  value={formFields.advisorEmail}
                  onChange={handleInputChange}
                  className="w-full h-16 bg-black text-white p-2 rounded-2xl"
                  style={{
                    boxShadow:
                      "0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)",
                  }}
                />
              </div>

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

              {/* <div>
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
              </div> */}
            </div>

            {/* Second Set of Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">Club Description:</label>
                <textarea
                  name="description"
                  value={formFields.description}
                  onChange={handleInputChange}
                  className="w-full h-32 bg-black text-white p-2 rounded-2xl"
                  style={{
                    boxShadow:
                      "0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)",
                  }}
                />
              </div>
              {/* <div>
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
              </div> */}
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
            <button className="bg-gray-500 p-2 rounded-2xl"
              onClick={handleSubmit}
              // disabled={!isFormValid}
              // className={`p-2 rounded-2xl ${
              //   isFormValid ? "bg-green-500" : "bg-gray-500"
              // } text-white`}
              // style={{
              //   boxShadow:
              //     "0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)",
              // }}
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
