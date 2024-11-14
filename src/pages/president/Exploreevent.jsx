import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import EventNav from "../../components/EventNav";
import AnnouncementNav from "../../components/AnnouncementNav";

import gold from "../../assets/gold.png";
import gold1 from "../../assets/gold1.png";
import platinum from "../../assets/platinum.png";
import platinum1 from "../../assets/platinum1.png";
import silver from "../../assets/silver.png";
import CustomSwitch from "../../components/Customswitch";
import RegisterNav from "../../components/RegisterNav";
import { FaHeart } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { FaUpload } from "react-icons/fa"; // Import the upload icon
import EditButton from "../../components/EditButton"; // Import the EditButton component
import SponsorsService from "../../service/SponsorsService";
import { AiOutlinePlus, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import AddSponsorModal from "../../components/AddSponsorModal"; // Import your modal
import RegistrationModal from '../../components/RegistrationModal';
import EventRegistrationModal from "../../components/EventRegistrationModal";


ReactModal.setAppElement("#root"); // For accessibility

const Exploreevent = () => {
  const location = useLocation();
  
  const { name, image, date, clubName, clubImage, venue } = location.state || {} ;
  //console.log("explore events location", location.state);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formFields, setFormFields] = useState({
    budget: "",
    purpose: "",
    benefits: "",
    sponsors: Array(5).fill({ name: "", type: "Gold", amount: "" }), // Initialize sponsor fields
    iudApproval: "not-approved",
    proofOfApproval: "",
    /* budget: "1000 USD", */ // Dummy budget value
    /* purpose: "To enhance the skills of students through practical workshops.", */ // Dummy purpose value
    /* benefits: "Increased engagement in club activities and better preparation for industry challenges." */ // Dummy benefits value
  });

  const club_id = location.state.clubId;
  //console.log("explore events location", club_id);
  const eventDetails = location.state;
  
  const navigate = useNavigate();

  const [eventSponsor, setEventSponsonsors] = useState([]);

   // Function to check if the path starts with one of the specified paths
  const isMatchingPage = () => {
    const paths = ['/president', '/secretary'];
    return paths.some(path => location.pathname.startsWith(path));
  };

  useEffect(() => {
    fetchSponsors();
  }, []);

  const fetchSponsors = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await SponsorsService.getAllSponsors(token);
      const sponsorsArray = response.content || [];
      //console.log('Sponsors response:', response);
      setEventSponsonsors(sponsorsArray);
    } catch (error) {
      console.error("Error  fetching users:", error);
    }
  };

  function updateSponsor(id) {
    navigate(`/president/EditSponsor/${id}`);
  }

  const handleDeleteSponsor = async (sponsorId) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this Sponsor?"
      );

      if (confirmDelete) {
        const token = localStorage.getItem("token");
        await SponsorsService.deleteSponsor(sponsorId, token);

        //navigate("/president/club")
        // Remove the deleted sponsor from the state
        //setEventSponsonsors(prevSponsors => prevSponsors.filter(sponsor => sponsor.id !== sponsorId));

      }
    } catch (error) {
      console.error("Error deleting sponsor:", error);
    }
  };


  const [isFormValid, setIsFormValid] = useState(false);

  const [budget, setBudget] = useState("100000 Rupees");
  const [purpose, setPurpose] = useState(
    "To enhance the skills of students through practical workshops."
  );
  const [benefits, setBenefits] = useState(
    "Increased engagement in club activities and better preparation for industry challenges."
  );

  useEffect(() => {
    const initialLikes = Math.floor(Math.random() * 100) + 1;
    setLikes(initialLikes);
  }, []);

  useEffect(() => {
    validateForm();
  }, [formFields]);

  const handleLikeClick = () => {
    if (!liked) {
      setLikes(likes + 1);
      setLiked(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleSponsorChange = (index, field, value) => {
    const updatedSponsors = [...formFields.sponsors];
    updatedSponsors[index] = { ...updatedSponsors[index], [field]: value };
    setFormFields((prevFields) => ({
      ...prevFields,
      sponsors: updatedSponsors,
    }));
  };

  const handleApprovalChange = (value) => {
    setFormFields((prevFields) => ({
      ...prevFields,
      iudApproval: value,
      proofOfApproval: value === "approved" ? prevFields.proofOfApproval : "",
    }));
    validateForm();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormFields((prevFields) => ({
        ...prevFields,
        proofOfApproval: file,
      }));
    }
  };

  const validateForm = () => {
    const {
      budget,
      purpose,
      benefits,
      sponsors,
      iudApproval,
      proofOfApproval,
    } = formFields;
    const isSponsorFilled = sponsors.some(
      (sponsor) => sponsor.name.trim() !== ""
    );
    const isProofRequired = iudApproval === "approved" && !proofOfApproval;
    const isValid =
      budget.trim() !== "" &&
      purpose.trim() !== "" &&
      benefits.trim() !== "" &&
      isSponsorFilled &&
      !isProofRequired;
    setIsFormValid(isValid);
  };

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const [isRegModalOpen, setIsRegModalOpen] = useState(false);

  const handleRegister = () => {
    setIsRegModalOpen(true);
  };

  const closeRegModal = () => {
    setIsRegModalOpen(false);
};

  return (
    <div className="fixed inset-0 flex">
      <Sidebar className="flex-shrink-0" />
      <div className="flex flex-col flex-1">
        <Navbar className="sticky top-0 z-10 p-4" />
        <div className="bg-neutral-900 text-white flex flex-col flex-1 overflow-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full">
            <div className="order-1 md:order-1 flex justify-center items-center">
              <Card className="w-full bg-neutral-900 h-128 relative">
                <CardBody className="h-full relative">
                  <div className="relative">
                    <img
                      src={image}
                      alt={name}
                      className="w-full h-80 object-cover rounded-2xl mb-4 "
                      style={{
                        boxShadow:
                          "0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)",
                      }}
                    />
                    <div className="absolute p-2 rounded-2xl top-1 right-1 flex items-center space-x-2 text-white">
                      <span>Organized by</span>
                      <img
                        src={clubImage}
                        alt={clubName}
                        className="w-10 h-10 rounded-full"
                      />
                    </div>


                    <div className="flex items-center justify-between mb-2">
                      <Typography color="white" variant="h3">
                        {name}
                      </Typography>
                      <div className="flex items-center">
                        <FaHeart
                          onClick={handleLikeClick}
                          className={`cursor-pointer mr-2 ${
                            liked ? "text-red-500" : "text-white"
                          }`}
                          size={24}
                        />
                        <Typography color="white" variant="subtitle1">
                          {likes}
                        </Typography>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <Typography
                        color="white"
                        variant="subtitle1"
                        className="text-[#AEC90A] custom-card"
                      >
                        On {date}
                      </Typography>
                      <Typography
                        color="white"
                        variant="subtitle1"
                        className="text-[#AEC90A] relative custom-card"
                      >
                        Venue - {venue}
                      </Typography>
                      {/* <button
                        onClick={openModal}
                        className="border-[#AEC90A] border-2 text-[#AEC90A] opacity-60 px-4 py-2 rounded-full transition-transform transform hover:scale-105"
                        style={{
                          boxShadow:
                            "0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)",
                        }}
                      >
                        View Details
                      </button> */}

                      {isMatchingPage() ? (
                        <button
                        onClick={openModal}
                        className="border-[#AEC90A] border-2 text-[#AEC90A] opacity-60 px-4 py-2 rounded-full transition-transform transform hover:scale-105"
                        style={{
                          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)"
                        }}
                      >
                        View Details
                      </button>
                       
                      ) : (
                        
                        <button
                          onClick={handleRegister}
                          className="custom-card border-[#AEC90A] border-2 text-[#AEC90A] opacity-90 px-2 py-2 rounded-full"
                          style={{
                            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)"
                          }}
                        >
                          Register Now
                        </button>
                      )}

                    </div>
                    <Typography color="white" variant="body1" className="mb-4">
                      An event designed to inspire and empower students. Join us
                      for insightful talks, hands-on workshops, and networking
                      opportunities.
                    </Typography>
                    <div className="order-3 md:order-4 flex justify-center items-center bg-[#1E1E1E] custom-3d-shadow  custom-card">
                      <AnnouncementNav />
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>

            <div className="order-3 md:order-2 flex w-full">
              <EventNav className="w-full h-full" clubId={club_id} event={eventDetails}/>
            </div>
          </div>


                    <div className="flex justify-center items-center p-10">
            <Card
              className="w-full bg-neutral-900 h-128 relative bg-[#1E1E1E]"
              style={{
                boxShadow:
                  "0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)",
              }}
            >
              <CardBody className="h-full relative">
                <div className="absolute top-2 right-2">
                  
                    {isMatchingPage() && (
                      <Link
                      to="/president/AddSponsor"
                      className="p-1 bg-[#AEC90A] rounded-full flex items-center justify-center hover:bg-[#9ab32f]"
                    >
                        <AiOutlinePlus size={24} />
                      </Link>
                    )}
                    {/* <AiOutlinePlus size={24} /> */}
                  
                </div>
                <div className="relative h-full flex flex-col justify-center">
                  <Typography
                    color="white"
                    variant="h3"
                    className="mb-2 text-center p-5"
                  >
                    Sponsors
                  </Typography>
                  <div className="flex justify-between mb-4">
                    {(eventSponsor || []).map((eventS) => (
                      <div
                        className="flex flex-col items-center "
                        key={eventS.sponsor_id}
                      >
                        {/* <div className="flex flex-row gap-1 top-1">
                          <Button
                            onClick={() => updateSponsor(eventS.sponsor_id)}
                          >
                            <Link className="p-1 bg-[#AEC90A] rounded-full flex items-center justify-center hover:bg-[#9ab32f]">
                              <AiOutlineEdit size={24} />
                            </Link>
                          </Button>
                          <button
                            onClick={() =>
                              handleDeleteSponsor(eventS.sponsor_id)
                            }
                          >
                            <Link className="p-1 bg-[#AEC90A] rounded-full flex items-center justify-center hover:bg-[#9ab32f]">
                              <AiOutlineDelete size={24} />
                            </Link>
                          </button>
                        </div> */}
                        {isMatchingPage() && (
                          <div className="flex flex-row gap-1 top-1">
                            <Button onClick={() => updateSponsor(eventS.sponsor_id)}>
                              <Link className="p-1 bg-[#AEC90A] rounded-full flex items-center justify-center hover:bg-[#9ab32f]">
                                <AiOutlineEdit size={24} />
                              </Link>
                            </Button>
                            <button onClick={() => handleDeleteSponsor(eventS.sponsor_id)}>
                              <Link className="p-1 bg-[#AEC90A] rounded-full flex items-center justify-center hover:bg-[#9ab32f]">
                                <AiOutlineDelete size={24} />
                              </Link>
                            </button>
                          </div>
                        )}

                        <img
                          src={eventS.company_logo}
                          alt="Platinum Sponsor"
                          className="w-40 h-40 rounded-full border-4 border-black mb-2 relative custom-card custom-3d-shadow"
                          style={{
                            boxShadow:
                              "0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)",
                          }}
                        />

                        <Typography color="white" variant="subtitle1">
                          {eventS.sponsorType} Sponsor
                        </Typography>
                      </div>
                    ))}
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          <div className="w-full p-10">
          {isMatchingPage() && (
            <RegisterNav className="w-full h-96" />
          )}

            {/* <RegisterNav className="w-full h-96" /> */}
          </div>
        </div>
      </div>

      {/* Modal for Proposal */}
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="fixed inset-0 bg-black p-10 w-full md:w-3/4 mx-auto my-10 rounded-lg overflow-y-auto"
        overlayClassName="fixed inset-0 bg-black "
      >
        <div className="relative bg-black text-white p-5 rounded-lg w-full">
          <button
            onClick={closeModal}
            className="absolute top-2 right-2 text-white text-lg"
          >
            <FaTimes size={20} />
          </button>
          <Typography variant="h4" className="text-center mb-4 ">
            Proposal Details
          </Typography>

          <div className="relative flex justify-center ">
            <img
              src={image}
              alt={name}
              className="w-2/4 h-96 object-cover rounded-2xl mb-4"
            />
            <div className="absolute bottom-20 right-68 p-5 flex items-center space-x-2">
              <span>Organized by</span>
              <img
                src={clubImage}
                alt={clubName}
                className="w-10 h-10 rounded-full"
              />
            </div>

          </div>

          <div className="mb-4 text-center">
            <Typography variant="h5" className="mb-1">
              Event Name:
            </Typography>
            <div className="relative">
              <input
                type="text"
                name="name"
                value={name}
                readOnly
                className="w-2/4 bg-neutral-900 text-white p-2 rounded-full text-center"
              />

            </div>
          </div>

          <div className="mb-4 text-center">
            <Typography variant="h5" className="mb-1">
              Venue of the Event:
            </Typography>
            <div className="relative">
              <input
                type="text"
                name="venue"
                value={venue}
                readOnly
                className="w-2/4 bg-neutral-900 text-white p-2 rounded-full text-center"
              />
            </div>
          </div>

          <div className="mb-4 text-center">
            <Typography variant="h5" className="mb-1">
              Date of the Event:
            </Typography>
            <div className="relative">
              <input
                type="text"
                name="date"
                value={date}
                readOnly
                className="w-2/4 bg-neutral-900 text-white p-2 rounded-full text-center"
              />
            </div>
          </div>

          <div className="mb-4 text-center">
            <label className="block mb-2">Budget of the Event:</label>
            <input
              type="text"
              name="budget"
              value={budget}
              onChange={handleInputChange}
              className="w-2/4 bg-neutral-900 text-white p-2 rounded-full text-center"
            />
          </div>
          <div className="mb-4 text-center">
            <label className="block mb-2">Purpose of the Event:</label>
            <input
              type="text"
              name="purpose"
              value={purpose}
              onChange={handleInputChange}
              className="w-full h-40 bg-neutral-900 text-white p-2 rounded-lg text-center"
            />
          </div>
          <div className="mb-4 text-center">
            <label className="block mb-2">Benefits to UCSC:</label>
            <input
              type="text"
              name="benefits"
              value={benefits}
              onChange={handleInputChange}
              className="w-full h-40 bg-neutral-900 text-white p-2 rounded-lg text-center"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button
           
            className="px-4 py-2 rounded-full 
              isFormValid  bg-[#AEC90A]  
              "
           
          >
            Download Proposal{" "}
          </button>
        </div>
      </ReactModal>

      <EventRegistrationModal
                event={event}
                isOpen={isRegModalOpen}
                onClose={closeRegModal}
            /> 
    </div>
  );
};

export default Exploreevent;
