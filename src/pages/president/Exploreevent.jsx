import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import { useLocation, useNavigate } from "react-router-dom";
import EventNav from "../../components/EventNav";
import AnnouncementNav from "../../components/AnnouncementNav";
import CustomSwitch from '../../components/Customswitch';
import { FaHeart, FaTimes, FaUpload } from "react-icons/fa";
import { AiOutlinePlus, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import SponsorsService from '../../service/SponsorsService';

ReactModal.setAppElement('#root'); // For accessibility

const ExploreEvent = () => {
  const location = useLocation();
  const { name, image, date, clubName, clubImage, venue } = location.state;
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
  });

  const navigate = useNavigate();
  const [eventSponsors, setEventSponsors] = useState([]);

  useEffect(() => {
    fetchSponsors();
    const initialLikes = Math.floor(Math.random() * 100) + 1;
    setLikes(initialLikes);
  }, []);

  const fetchSponsors = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await SponsorsService.getAllSponsors(token);
      const sponsorsArray = response.content || [];
      setEventSponsors(sponsorsArray);
    } catch (error) {
      console.error("Error fetching sponsors:", error);
    }
  };

  const handleDeleteSponsor = async (sponsorId) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this Sponsor?');
      if (confirmDelete) {
        const token = localStorage.getItem('token');
        await SponsorsService.deleteSponsor(sponsorId, token);
        fetchSponsors(); // Refresh the sponsors list
      }
    } catch (error) {
      console.error('Error deleting sponsor:', error);
    }
  };

  const handleLikeClick = () => {
    if (!liked) {
      setLikes(likes + 1);
      setLiked(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormFields(prevFields => ({
      ...prevFields,
      [name]: value
    }));
  };

  const handleSponsorChange = (index, field, value) => {
    const updatedSponsors = [...formFields.sponsors];
    updatedSponsors[index] = { ...updatedSponsors[index], [field]: value };
    setFormFields(prevFields => ({
      ...prevFields,
      sponsors: updatedSponsors
    }));
  };

  const handleApprovalChange = (value) => {
    setFormFields(prevFields => ({
      ...prevFields,
      iudApproval: value,
      proofOfApproval: value === 'approved' ? prevFields.proofOfApproval : ''
    }));
    validateForm();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormFields(prevFields => ({
        ...prevFields,
        proofOfApproval: file
      }));
    }
  };

  const validateForm = () => {
    const { budget, purpose, benefits, sponsors, iudApproval, proofOfApproval } = formFields;
    const isSponsorFilled = sponsors.some(sponsor => sponsor.name.trim() !== '');
    const isProofRequired = iudApproval === 'approved' && !proofOfApproval;
    const isValid = budget.trim() !== '' && purpose.trim() !== '' && benefits.trim() !== '' && isSponsorFilled && !isProofRequired;
    setIsFormValid(isValid);
  };

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

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
                    <img src={image} alt={name} className="w-full h-80 object-cover rounded-2xl mb-4" style={{ boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' }} />
                    <div className="absolute p-2 rounded-2xl top-1 right-1 flex items-center space-x-2 text-white">
                      <span>Organized by</span>
                      <img src={clubImage} alt={clubName} className="w-10 h-10 rounded-full" />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <Typography color="white" variant="h3">{name}</Typography>
                      <div className="flex items-center">
                        <FaHeart onClick={handleLikeClick} className={`cursor-pointer mr-2 ${liked ? 'text-red-500' : 'text-white'}`} size={24} />
                        <Typography color="white" variant="subtitle1">{likes}</Typography>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <Typography color="white" variant="subtitle1" className="text-[#AEC90A] custom-card">On {date}</Typography>
                      <Typography color="white" variant="subtitle1" className="text-[#AEC90A] relative custom-card">Venue - {venue}</Typography>
                      <button onClick={openModal} className="border-[#AEC90A] border-2 text-[#AEC90A] opacity-60 px-4 py-2 rounded-full transition-transform transform hover:scale-105" style={{ boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' }}>View Details</button>
                    </div>
                    <Typography color="white" variant="body1" className="mb-4">
                      An event designed to inspire and empower students. Join us for insightful talks, hands-on workshops, and networking opportunities.
                    </Typography>
                    <div className="order-3 md:order-4 flex justify-center items-center bg-[#1E1E1E] custom-3d-shadow custom-card">
                      <AnnouncementNav />
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
            <div className="order-3 md:order-2 flex w-full">
              <EventNav className="w-full h-full" />
            </div>
          </div>
          <div className="flex justify-center items-center p-10">
            <Card className="w-full bg-neutral-900 h-128 relative bg-[#1E1E1E]" style={{ boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' }}>
              <CardBody className="h-full relative">
                <div className="absolute top-2 right-2 space-2">
                  <Link to="/president/AddSponsor" className="p-1 bg-[#AEC90A] rounded-full flex items-center justify-center hover:bg-[#9ab32f]">
                    <AiOutlinePlus size={24} />
                  </Link>
                </div>
                <div className="relative h-full flex flex-col justify-center">
                  <Typography color="white" variant="h3" className="mb-2 text-center p-5">Sponsors</Typography>
                  {eventSponsors.map(sponsor => (
                    <div key={sponsor.id} className="relative mb-4 p-4 border border-gray-600 rounded-lg">
                      <img src={sponsor.imageUrl} alt={sponsor.name} className="w-full h-40 object-cover rounded-lg mb-2" />
                      <Typography color="white" variant="h4">{sponsor.name}</Typography>
                      <Typography color="white" variant="subtitle1" className="text-[#AEC90A]">Category: {sponsor.category}</Typography>
                      <div className="absolute top-2 right-2 space-x-2 flex">
                        <Link to={`/president/EditSponsor/${sponsor.id}`} className="p-1 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-700">
                          <AiOutlineEdit size={24} />
                        </Link>
                        <button onClick={() => handleDeleteSponsor(sponsor.id)} className="p-1 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-700">
                          <AiOutlineDelete size={24} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="w-full md:w-1/2 lg:w-1/3 mx-auto my-10 h-[80vh] p-8 bg-neutral-900 text-white rounded-lg overflow-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center"
      >
        <div className="relative">
          <button className="absolute top-2 right-2 text-white text-lg" onClick={closeModal}>
            <FaTimes />
          </button>
          <Typography variant="h4" className="text-center mb-4 text-[#AEC90A]">Event Proposal</Typography>
          <form>
            <div className="mb-4">
              <label className="block mb-2">Budget</label>
              <input
                type="text"
                name="budget"
                value={formFields.budget}
                onChange={handleInputChange}
                className="w-full p-2 rounded bg-neutral-700 text-white"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Purpose</label>
              <input
                type="text"
                name="purpose"
                value={formFields.purpose}
                onChange={handleInputChange}
                className="w-full p-2 rounded bg-neutral-700 text-white"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Benefits to UCSC</label>
              <input
                type="text"
                name="benefits"
                value={formFields.benefits}
                onChange={handleInputChange}
                className="w-full p-2 rounded bg-neutral-700 text-white"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Sponsors</label>
              {formFields.sponsors.map((sponsor, index) => (
                <div key={index} className="mb-2">
                  <input
                    type="text"
                    name={`sponsorName${index}`}
                    value={sponsor.name}
                    onChange={(e) => handleSponsorChange(index, 'name', e.target.value)}
                    placeholder="Sponsor Name"
                    className="w-full p-2 mb-1 rounded bg-neutral-700 text-white"
                  />
                  <select
                    name={`sponsorType${index}`}
                    value={sponsor.type}
                    onChange={(e) => handleSponsorChange(index, 'type', e.target.value)}
                    className="w-full p-2 mb-1 rounded bg-neutral-700 text-white"
                  >
                    <option value="Gold">Gold</option>
                    <option value="Silver">Silver</option>
                    <option value="Platinum">Platinum</option>
                  </select>
                  <input
                    type="text"
                    name={`sponsorAmount${index}`}
                    value={sponsor.amount}
                    onChange={(e) => handleSponsorChange(index, 'amount', e.target.value)}
                    placeholder="Amount"
                    className="w-full p-2 rounded bg-neutral-700 text-white"
                  />
                </div>
              ))}
            </div>
            <div className="mb-4">
              <label className="block mb-2">IUD Approval</label>
              <select
                name="iudApproval"
                value={formFields.iudApproval}
                onChange={(e) => handleApprovalChange(e.target.value)}
                className="w-full p-2 rounded bg-neutral-700 text-white"
              >
                <option value="not-approved">Not Approved</option>
                <option value="approved">Approved</option>
              </select>
            </div>
            {formFields.iudApproval === 'approved' && (
              <div className="mb-4">
                <label className="block mb-2">Proof of Approval</label>
                <input
                  type="file"
                  name="proofOfApproval"
                  onChange={handleFileChange}
                  className="w-full p-2 rounded bg-neutral-700 text-white"
                />
              </div>
            )}
            <button
              type="submit"
              className="w-full py-2 rounded bg-[#AEC90A] text-white font-bold"
              disabled={!isFormValid}
            >
              Send Request for Approval
            </button>
          </form>
        </div>
      </ReactModal>
    </div>
  );
};

export default ExploreEvent;
