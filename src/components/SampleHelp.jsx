/* import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"; */
/* import { AiOutlinePlus, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai"; */
/* import Sidebar from "./Sidebar"; */ // Ensure you import Sidebar
/* import Navbar from "./Navbar"; */ // Ensure you import Navbar
/* import SponsorsService from "../service/SponsorsService";

const AddSponsor = () => {
  const navigate = useNavigate();

  const [sponsor_name, setSponsorName] = useState("");
  const [sponsor_description, setSponsorDescription] = useState("");
  const [sponsorType, setSponsorType] = useState("");
  const [amount, setAmount] = useState("");
  const [contact_person, setContactPerson] = useState("");
  const [contact_email, setContactEmail] = useState("");
  const [proofFile, setProofFile] = useState(null);
  const [proofFileurl, setProofFileurl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState("");

  const { id } = useParams();

  const handleFileChange = (e) => {
    setProofFile(e.target.files[0]);
  };

  const validate = () => {
    const newErrors = {};

    if (!sponsor_name) newErrors.sponsor_name = "Sponsor name is required.";
    if (!sponsor_description) newErrors.sponsor_description = "Sponsor description is required.";
    if (!sponsorType) newErrors.sponsorType = "Sponsor type is required.";
    if (!amount || isNaN(amount) || amount <= 0) newErrors.amount = "Amount should be a positive number.";
    if (!contact_person) newErrors.contact_person = "Contact person is required.";
    if (!contact_email || !/\S+@\S+\.\S+/.test(contact_email)) newErrors.contact_email = "A valid contact email is required.";
    if (!proofFile && !proofFileurl) newErrors.proofFile = "Company logo is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const fetchSponsorDetails = async () => {
      if (id) {
        try {
          const token = localStorage.getItem('token');
          const response = await SponsorsService.getSponsorById(id, token);
          console.log('Response:', response); 
          const { content } = response; 
          if (content) {
            setSponsorName(content.sponsor_name || '');
            setSponsorDescription(content.sponsor_description || '');
            setSponsorType(content.sponsorType || '');
            setAmount(content.amount || '');
            setContactPerson(content.contact_person || '');
            setContactEmail(content.contact_email || '');
            setProofFileurl(content.company_logo || ''); 
          } else {
            console.warn('Content is undefined or null');
          }
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching sponsor details:", error);
          setErrors("Failed to fetch sponsor details");
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    fetchSponsorDetails();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const token = localStorage.getItem("token");
    const formData = new FormData();

    formData.append(
      "data",
      new Blob(
        [
          JSON.stringify({
            sponsor_name,
            sponsor_description,
            sponsorType,
            amount,
            contact_person,
            contact_email,
          }),
        ],
        { type: "application/json" }
      )
    );

    if (proofFile) {
      formData.append("file", proofFile);
    } */

    /* try {
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
        console.log("Sponsor updated:", response);
        navigate("/president/club");
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
        console.log("Sponsor added:", response);
        navigate("/president/club");
      }
    } catch (error) {
      console.error("Error processing Sponsor:", error);

      const errorMessages = error.response
        ? error.response.data.errors
        : { global: error.message };
      setErrors(errorMessages);
      setTimeout(() => setErrors({}), 5000);
    }
  };

  function pageTitle() {
    if (id) {
      return <h2 className="text-2xl font-bold mb-4">Update Sponsor</h2>;
    } else {
      return <h2 className="text-2xl font-bold mb-4">Add New Sponsor</h2>;
    }
  }

  return (
    <div className="fixed inset-0 flex">
      <Sidebar className="flex-shrink-0" />
      <div className="flex flex-col flex-1 bg-neutral-900 text-white">
        <Navbar className="sticky top-0 z-10 p-4" />
        <div className="flex-1 overflow-y-auto p-10 ml-10 mr-20">
          {pageTitle()}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col space-y-2">
              <label htmlFor="sponsorName" className="text-lg font-semibold">
                Sponsor Name
              </label>
              <input
                type="text"
                id="sponsorName"
                value={sponsor_name}
                onChange={(e) => setSponsorName(e.target.value)}
                className="p-2 bg-black text-white rounded"
                placeholder="Enter sponsor name" */
               /*  required */
            /*   /> */
             {/*  {errors.sponsor_name && <div className="text-red-500">{errors.sponsor_name}</div>}
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="proofFile" className="text-lg font-semibold">
                Company Logo
              </label>
              <input
                type="file"
                id="proofFile"
                accept="image/*" */} // Accept only image files
              /*   onChange  = {handleFileChange}
                className = "p-2 bg-black text-white rounded" */
                /* required */
             /*  />
              {!proofFile ? ( */ // Show existing file if not replaced
               /*  <div className="mt-2">
                  <p className="text-white">Existing file:</p>
                  <img
                    src={proofFileurl}
                    alt="Existing Logo"
                    className="mt-2 w-32 h-32 object-cover rounded"
                  />
                </div>
              ) : (
                proofFile && (
                  <div className="mt-2">
                    <p className="text-white">
                      Selected file: {proofFile.name}
                    </p>
                    <img
                      src={URL.createObjectURL(proofFile)}
                      alt="Preview"
                      className="mt-2 w-32 h-32 object-cover rounded"
                    />
                  </div>
                )
              )}
              {errors.proofFile && <div className="text-red-500">{errors.proofFile}</div>}
            </div>

            <div className="flex flex-col space-y-2">
              <label
                htmlFor="sponsorDescription"
                className="text-lg font-semibold"
              >
                Sponsor Description
              </label>
              <textarea
                id="sponsorDescription"
                value={sponsor_description}
                onChange={(e) => setSponsorDescription(e.target.value)}
                className="p-2 bg-black text-white rounded"
                placeholder="Enter a description of the sponsor"
                rows="4"
              />
              {errors.sponsor_description && <div className="text-red-500">{errors.sponsor_description}</div>}
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="sponsorType" className="text-lg font-semibold">
                Sponsor Type
              </label>
              <select
                id="sponsorType"
                value={sponsorType}
                onChange={(e) => setSponsorType(e.target.value)}
                className="p-2 bg-black text-white rounded" */
               /*  required */
             /*  >
                <option value="">Select sponsor type</option>
                <option value="PLATINUM">Platinum</option>
                <option value="GOLD">Gold</option>
                <option value="SILVER">Silver</option>
              </select>
              {errors.sponsorType && <div className="text-red-500">{errors.sponsorType}</div>}
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="amount" className="text-lg font-semibold">
                Amount
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="p-2 bg-black text-white rounded"
                placeholder="Enter amount" */
                /* required */
              {/* />
              {errors.amount && <div className="text-red-500">{errors.amount}</div>}
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="contactPerson" className="text-lg font-semibold">
                Contact Person
              </label>
              <input
                type="text"
                id="contactPerson"
                value={contact_person}
                onChange={(e) => setContactPerson(e.target.value)}
                className="p-2 bg-black text-white rounded"
                placeholder="Enter contact person's name" */}
                /* required */
              /* />
              {errors.contact_person && <div className="text-red-500">{errors.contact_person}</div>}
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="contactEmail" className="text-lg font-semibold">
                Contact Email
              </label>
              <input
                type="email"
                id="contactEmail"
                value={contact_email}
                onChange={(e) => setContactEmail(e.target.value)}
                className="p-2 bg-black text-white rounded"
                placeholder="Enter contact email" */
                /* required */
             /*  />
              {errors.contact_email && <div className="text-red-500">{errors.contact_email}</div>}
            </div>

            <div className="flex justify-center items-center space-x-5">
              <Link
                to="/sponsors"
                className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="bg-[#AEC90A] text-white p-2 rounded hover:bg-gray-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSponsor; */

// import React from 'react'

// const SampleHelp = () => {
//   return (
//     <div>SampleHelp</div>
//   )
// }

// export default SampleHelp

import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "./Sidebar"; // Ensure you import Sidebar
import Navbar from "./Navbar"; // Ensure you import Navbar
import SponsorsService from "../service/SponsorsService";

const SampleHelp = () => {
  const navigate = useNavigate();
  const { id } = useParams();

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
    const fetchSponsorDetails = async () => {
      if (id) {
        try {
          const token = localStorage.getItem('token');
          const response = await SponsorsService.getSponsorById(id, token);
          console.log('Response:', response); 
          const { content } = response; 
          if (content) {
            setSponsorName(content.sponsor_name || '');
            setSponsorDescription(content.sponsor_description || '');
            setSponsorType(content.sponsorType || '');
            setAmount(content.amount || '');
            setContactPerson(content.contact_person || '');
            setContactEmail(content.contact_email || '');
            setProofFileurl(content.company_logo || ''); 
          } else {
            console.warn('Content is undefined or null');
          }
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching sponsor details:", error);
          setErrors("Failed to fetch sponsor details");
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    fetchSponsorDetails();
  }, [id]);

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
          console.log("Sponsor updated:", response);
          navigate("/president/club");
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
          console.log("Sponsor added:", response);
          navigate("/president/club");
        }
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

  function pageTitle() {
    return <h2 className="text-2xl font-bold mb-4">{id ? "Update Sponsor" : "Add New Sponsor"}</h2>;
  }

  return (
    <div className="fixed inset-0 flex">
      <Sidebar className="flex-shrink-0" />
      <div className="flex flex-col flex-1 bg-neutral-900 text-white">
        <Navbar className="sticky top-0 z-10 p-4" />
        <div className="flex-1 overflow-y-auto p-10 ml-10 mr-20">
          {pageTitle()}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col space-y-2">
              <label htmlFor="sponsorName" className="text-lg font-semibold">
                Sponsor Name
              </label>
              <input
                type="text"
                id="sponsorName"
                value={sponsor_name}
                onChange={(e) => setSponsorName(e.target.value)}
                className="p-2 bg-black text-white rounded"
                placeholder="Enter sponsor name"
              />
              {isSubmitted && errors.sponsor_name && <div className="text-red-500">{errors.sponsor_name}</div>}
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="proofFile" className="text-lg font-semibold">
                Company Logo
              </label>
              <input
                type="file"
                id="proofFile"
                accept="image/*" // Accept only image files
                onChange={handleFileChange}
                className="p-2 bg-black text-white rounded"
              />
              {!proofFile && proofFileurl ? ( // Show existing file if not replaced
                <div className="mt-2">
                  <p className="text-white">Existing file:</p>
                  <img
                    src={proofFileurl}
                    alt="Existing Logo"
                    className="mt-2 w-32 h-32 object-cover rounded"
                  />
                </div>
              ) : (
                proofFile && (
                  <div className="mt-2">
                    <p className="text-white">Selected file: {proofFile.name}</p>
                    <img
                      src={URL.createObjectURL(proofFile)}
                      alt="Preview"
                      className="mt-2 w-32 h-32 object-cover rounded"
                    />
                  </div>
                )
              )}
              {isSubmitted && errors.proofFile && <div className="text-red-500">{errors.proofFile}</div>}
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="sponsorDescription" className="text-lg font-semibold">
                Sponsor Description
              </label>
              <textarea
                id="sponsorDescription"
                value={sponsor_description}
                onChange={(e) => setSponsorDescription(e.target.value)}
                className="p-2 bg-black text-white rounded"
                placeholder="Enter a description of the sponsor"
                rows="4"
              />
              {isSubmitted && errors.sponsor_description && <div className="text-red-500">{errors.sponsor_description}</div>}
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="sponsorType" className="text-lg font-semibold">
                Sponsor Type
              </label>
              <select
                id="sponsorType"
                value={sponsorType}
                onChange={(e) => setSponsorType(e.target.value)}
                className="p-2 bg-black text-white rounded"
              >
                <option value="">Select sponsor type</option>
                <option value="PLATINUM">Platinum</option>
                <option value="GOLD">Gold</option>
                <option value="SILVER">Silver</option>
              </select>
              {isSubmitted && errors.sponsorType && <div className="text-red-500">{errors.sponsorType}</div>}
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="amount" className="text-lg font-semibold">
                Amount
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="p-2 bg-black text-white rounded"
                placeholder="Enter amount"
              />
              {isSubmitted && errors.amount && <div className="text-red-500">{errors.amount}</div>}
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="contactPerson" className="text-lg font-semibold">
                Contact Person
              </label>
              <input
                type="text"
                id="contactPerson"
                value={contact_person}
                onChange={(e) => setContactPerson(e.target.value)}
                className="p-2 bg-black text-white rounded"
                placeholder="Enter contact person's name"
              />
              {isSubmitted && errors.contact_person && <div className="text-red-500">{errors.contact_person}</div>}
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="contactEmail" className="text-lg font-semibold">
                Contact Email
              </label>
              <input
                type="email"
                id="contactEmail"
                value={contact_email}
                onChange={(e) => setContactEmail(e.target.value)}
                className="p-2 bg-black text-white rounded"
                placeholder="Enter contact email"
              />
              {isSubmitted && errors.contact_email && <div className="text-red-500">{errors.contact_email}</div>}
            </div>

            <div className="flex justify-center items-center space-x-5">
              <Link to="/sponsors" className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600">
                Cancel
              </Link>
              <button type="submit" className="bg-[#AEC90A] text-white p-2 rounded hover:bg-gray-600">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SampleHelp;

