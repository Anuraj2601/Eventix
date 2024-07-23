import React, { useState, useEffect } from 'react';
import { Typography } from "@material-tailwind/react";
import { FaUpload } from 'react-icons/fa';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const AddEvent = () => {
    const [formFields, setFormFields] = useState({
        name: '',
        venue: '',
        date: '',
        budget: '',
        purpose: '',
        benefits: '',
        sponsors: Array(5).fill({ name: '', type: 'Gold', amount: '' }),
        iudApproval: 'not-approved',
        proofOfApproval: null,
        eventImage: null // New field for the event image
    });
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        validateForm();
    }, [formFields]);

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
            proofOfApproval: value === 'approved' ? prevFields.proofOfApproval : null
        }));
        validateForm();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (e.target.name === 'proofOfApproval') {
            setFormFields(prevFields => ({
                ...prevFields,
                proofOfApproval: file
            }));
        } else if (e.target.name === 'eventImage') {
            setFormFields(prevFields => ({
                ...prevFields,
                eventImage: file
            }));
        }
    };

    const validateForm = () => {
        const { name, venue, date, budget, purpose, benefits, sponsors, iudApproval, proofOfApproval, eventImage } = formFields;
        const isSponsorFilled = sponsors.some(sponsor => sponsor.name.trim() !== '');
        const isProofRequired = iudApproval === 'approved' && !proofOfApproval;
        const isImageRequired = !eventImage;
        const isValid = name.trim() !== '' && venue.trim() !== '' && date.trim() !== '' &&
                        budget.trim() !== '' && purpose.trim() !== '' && benefits.trim() !== '' &&
                        isSponsorFilled && !isProofRequired && !isImageRequired;
        setIsFormValid(isValid);
    };

    const handleSubmit = () => {
        // Implement your form submission logic here
        console.log('Form submitted', formFields);
    };

    return (
        <div className="fixed inset-0 flex">
            <Sidebar className="flex-shrink-0"/>
            <div className="flex flex-col flex-1">
                <Navbar className="sticky top-0 z-10 p-4"/>
                <div className="bg-black bg-opacity-90 text-white flex-col p-8 md:p-20 overflow-y-auto">
                    <Typography variant="h3" className="mb-4 text-center">Proposal Form</Typography>

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
                                    style={{ boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' }}
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
                                    style={{ boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' }}
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
                                    style={{ boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' }}
                                />
                            </div>
                            <div>
    <label className="block mb-2">Tentative Date of the Event:</label>
    <input
        type="date"
        name="date"
        value={formFields.date}
        onChange={handleInputChange}
        className="w-full h-16 bg-black text-white p-2 rounded-2xl"
        style={{ boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' }}
    />
</div>

                            <div>
                                <label className="block mb-2">Budget of the Event:</label>
                                <input
                                    type="text"
                                    name="budget"
                                    value={formFields.budget}
                                    onChange={handleInputChange}
                                    className="w-full h-16 bg-black text-white p-2 rounded-2xl"
                                    style={{ boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' }}
                                />
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
                                    style={{ boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' }}
                                />
                            </div>
                            <div>
                                <label className="block mb-2">Benefits to UCSC:</label>
                                <textarea
                                    name="benefits"
                                    value={formFields.benefits}
                                    onChange={handleInputChange}
                                    className="w-full h-32 bg-black text-white p-2 rounded-2xl"
                                    style={{ boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' }}
                                />
                            </div>
                        </div>

                        {/* IUD Approval Status */}
                        <div className="mt-4">
                            <label className="block mb-2">IUD Approval Status:</label>
                            <div className="flex space-x-4">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        value="approved"
                                        checked={formFields.iudApproval === 'approved'}
                                        onChange={() => handleApprovalChange('approved')}
                                    />
                                    <span>Already Approved</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        value="not-approved"
                                        checked={formFields.iudApproval === 'not-approved'}
                                        onChange={() => handleApprovalChange('not-approved')}
                                    />
                                    <span>Not Approved</span>
                                </label>
                            </div>
                            {formFields.iudApproval === 'approved' && (
                                <div className="mt-4">
                                    <label className="block mb-2">Proof of IUD Approval:</label>
                                    <input
                                        type="file"
                                        name="proofOfApproval"
                                        onChange={handleFileChange}
                                        className="w-full h-16 bg-black text-white p-2 rounded-2xl"
                                        style={{ boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' }}
                                    />
                                </div>
                            )}
                        </div>
                        
                        {/* Sponsors */}
                       
                    </div>
                    <div className="flex justify-center mt-4">
    <button
        onClick={handleSubmit}
        disabled={!isFormValid}
        className={`p-2 rounded-2xl ${isFormValid ? 'bg-green-500' : 'bg-gray-500'} text-white`}
        style={{ boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' }}
    >
        Create Event
    </button>
</div>

                </div>
            </div>
        </div>
    );
};

export default AddEvent;
