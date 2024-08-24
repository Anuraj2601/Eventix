import React, { useState, useEffect } from "react";
import SponsorsService from "../service/SponsorsService";
import { AiOutlineClose } from "react-icons/ai"; // Import close icon

const AddSponsorModal = ({ isOpen, onClose }) => {
  const [sponsor_name, setSponsorName] = useState("");
  const [sponsor_description, setSponsorDescription] = useState("");
  const [sponsorType, setSponsorType] = useState("");
  const [amount, setAmount] = useState("");
  const [contact_person, setContactPerson] = useState("");
  const [contact_email, setContactEmail] = useState("");
  const [proofFile, setProofFile] = useState(null);
  const [proofFileurl, setProofFileurl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    // Any code to execute when the modal opens
  }, [isOpen]);

  const handleFileChange = (e) => {
    setProofFile(e.target.files[0]);
  };

  const validateField = (field, value) => {
    let error = "";
    switch (field) {
      case "sponsor_name":
        if (!value) error = "Sponsor name is required.";
        break;
      case "sponsor_description":
        if (!value) error = "Sponsor description is required.";
        break;
      case "sponsorType":
        if (!value) error = "Sponsor type is required.";
        break;
      case "amount":
        if (!value || isNaN(value) || value <= 0)
          error = "Amount should be a positive number.";
        break;
      case "contact_person":
        if (!value) error = "Contact person is required.";
        break;
      case "contact_email":
        if (!value || !/\S+@\S+\.\S+/.test(value))
          error = "A valid contact email is required.";
        break;
      case "proofFile":
        if (!value && !proofFileurl) error = "Company logo is required.";
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
  };

  useEffect(() => {
    if (isSubmitted) {
      validateField("sponsor_name", sponsor_name);
    }
  }, [sponsor_name]);

  useEffect(() => {
    if (isSubmitted) {
      validateField("sponsor_description", sponsor_description);
    }
  }, [sponsor_description]);

  useEffect(() => {
    if (isSubmitted) {
      validateField("sponsorType", sponsorType);
    }
  }, [sponsorType]);

  useEffect(() => {
    if (isSubmitted) {
      validateField("amount", amount);
    }
  }, [amount]);

  useEffect(() => {
    if (isSubmitted) {
      validateField("contact_person", contact_person);
    }
  }, [contact_person]);

  useEffect(() => {
    if (isSubmitted) {
      validateField("contact_email", contact_email);
    }
  }, [contact_email]);

  useEffect(() => {
    if (isSubmitted) {
      validateField("proofFile", proofFile);
    }
  }, [proofFile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    validateField("sponsor_name", sponsor_name);
    validateField("sponsor_description", sponsor_description);
    validateField("sponsorType", sponsorType);
    validateField("amount", amount);
    validateField("contact_person", contact_person);
    validateField("contact_email", contact_email);
    validateField("proofFile", proofFile);

    if (Object.values(errors).every((error) => error === "") && Object.values({
        sponsor_name,
        sponsor_description,
        sponsorType,
        amount,
        contact_person,
        contact_email,
        proofFile
      }).every((field) => field !== "" || proofFileurl)) {
      try {
        const token = localStorage.getItem("token");
        const formData = new FormData();

        formData.append("data", new Blob([JSON.stringify({
            sponsor_name,
            sponsor_description,
            sponsorType,
            amount,
            contact_person,
            contact_email,
          })], { type: "application/json" }));

        if (proofFile) {
          formData.append("file", proofFile);
        }

        // Add sponsor or update sponsor based on ID
        // Assuming you have a condition to check for `id` in the parent component
        if (id) {
          const response = await SponsorsService.updateSponsor(
            id,
            sponsor_name,
            sponsor_description,
            sponsorType,
            amount,
            contact_person,
            contact_email,
            proofFile,
            token
          );
          alert("Sponsor updated successfully");
        } else {
          const response = await SponsorsService.addSponsor(
            sponsor_name,
            sponsor_description,
            sponsorType,
            amount,
            contact_person,
            contact_email,
            proofFile,
            token
          );
          alert("Sponsor added successfully");
        }

        onClose(); // Close the modal after successful submission
      } catch (error) {
        console.error("Error processing Sponsor:", error);
        const errorMessages = error.response
          ? error.response.data.errors
          : { global: error.message };
        setErrors(errorMessages);
        setTimeout(() => setErrors({}), 5000);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75">
      <div className="bg-neutral-900 text-white p-8 rounded-lg relative w-3/4 max-w-3xl">
        <button onClick={onClose} className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600">
          <AiOutlineClose size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4">
          {id ? "Update Sponsor" : "Add New Sponsor"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Form fields here */}
          {/* You can use the same form fields as in your original AddSponsor component */}
        </form>
      </div>
    </div>
  );
};

export default AddSponsorModal;
