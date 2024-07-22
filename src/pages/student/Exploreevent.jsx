import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { useLocation } from 'react-router-dom';
import EventNav from '../../components/EventNav';
import AnnouncementNav from '../../components/AnnouncementNav';
import gold from "../../assets/gold.png";
import gold1 from "../../assets/gold1.png";
import platinum from "../../assets/platinum.png";
import platinum1 from "../../assets/platinum1.png";
import silver from "../../assets/silver.png";
import CustomSwitch from '../../components/Customswitch';
import RegisterNav from '../../components/RegisterNav';
import { FaHeart } from "react-icons/fa";
import { FaTimes } from 'react-icons/fa';
import { FaUpload } from 'react-icons/fa'; // Import the upload icon


ReactModal.setAppElement('#root'); // For accessibility

const ExploreEvent = () => {
    const location = useLocation();
    const { name, image, date, clubName, clubImage, venue } = location.state;
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [formFields, setFormFields] = useState({
        budget: '',
        purpose: '',
        benefits: '',
        sponsors: Array(5).fill({ name: '', type: 'Gold', amount: '' }), // Initialize sponsor fields
        iudApproval: 'not-approved',
        proofOfApproval: ''
    });
    const [isFormValid, setIsFormValid] = useState(false);

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
                                <CardBody className="h-full relative ">
                                    <div className="relative">
                                        <img src={image} alt={name} className="w-full h-80 object-cover rounded-2xl mb-4  custom-3d-shadow  custom-card" />
                                        <div className="absolute p-2 rounded-2xl top-1 right-1 flex items-center space-x-2 ">
                                            <span>Organized by</span>
                                            <img src={clubImage} alt={clubName} className="w-10 h-10 rounded-full custom-3d-shadow  custom-card" />
                                        </div>

                                        <div className="flex items-center justify-between mb-2  custom-card">
                                            <Typography color="white" variant="h3">
                                                {name}
                                            </Typography>
                                            <div className="flex items-center   custom-card">
                                                <FaHeart
                                                    onClick={handleLikeClick}
                                                    className={`cursor-pointer mr-2 ${liked ? 'text-red-500' : 'text-white'}`}
                                                    size={24}
                                                />
                                                <Typography color="white" variant="subtitle1">
                                                    {likes}
                                                </Typography>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between mb-2">
                                            <Typography color="white" variant="subtitle1" className="text-[#AEC90A]  custom-card">
                                                On {date}
                                            </Typography>
                                            <Typography color="white" variant="subtitle1" className="text-[#AEC90A]  custom-card">
                                                Venue - {venue}
                                            </Typography>
                                            <button
                                                className="  custom-card border-[#AEC90A] border-2 text-[#AEC90A] opacity-90  px-2 py-2 rounded-full"
                                            >
                                                Register Now
                                            </button>
                                        </div>
                                        <Typography color="white" variant="body1" className="mb-4">
                                            An event designed to inspire and empower students. Join us for insightful talks, hands-on workshops, and networking opportunities.
                                        </Typography>
                                        <div className="order-3 md:order-4 flex justify-center items-center bg-[#1E1E1E]  custom-3d-shadow  custom-card">
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
    <Card className="w-full bg-neutral-900 h-128 relative bg-[#1E1E1E]">
        <CardBody className="h-full relative">
           
            <div className="relative h-full flex flex-col justify-center">
                <Typography color="white" variant="h3" className="mb-2 text-center p-5">
                    Sponsors
                </Typography>
                <div className="flex justify-between mb-4">
                    <div className="flex flex-col items-center ">
                        <img src={platinum} alt="Platinum Sponsor" className="w-40 h-40 rounded-full border-4 border-black mb-2 relative custom-card custom-3d-shadow" />
                        <Typography color="white" variant="subtitle1">
                            Platinum Sponsor
                        </Typography>
                    </div>
                    <div className="flex flex-col items-center">
                        <img src={platinum1} alt="Platinum Sponsor" className="w-40 h-40 rounded-full border-4 border-black mb-2 relative custom-card" />
                        <Typography color="white" variant="subtitle1">
                            Platinum Sponsor
                        </Typography>
                    </div>
                    <div className="flex flex-col items-center">
                        <img src={gold} alt="Gold Sponsor" className="w-40 h-40 rounded-full border-4 border-black mb-2 relative custom-card" />
                        <Typography color="white" variant="subtitle1">
                            Gold Sponsor
                        </Typography>
                    </div>
                    <div className="flex flex-col items-center">
                        <img src={gold1} alt="Gold Sponsor" className="w-40 h-40 rounded-full border-4 border-black mb-2 relative custom-card" />
                        <Typography color="white" variant="subtitle1">
                            Gold Sponsor
                        </Typography>
                    </div>
                    <div className="flex flex-col items-center">
                        <img src={silver} alt="Silver Sponsor" className="w-40 h-40 rounded-full border-4 border-black mb-2 relative custom-card" />
                        <Typography color="white" variant="subtitle1">
                            Silver Sponsor
                        </Typography>
                    </div>
                </div>
            </div>
        </CardBody>
    </Card>
</div>

                    
                </div>
            </div>

                                   
        </div>
    );
};

export default ExploreEvent;
