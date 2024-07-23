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
                <div className="bg-black text-white flex-col text-center items-center justify-center overflow-y-auto p-20">
                    <Typography variant="h3" className="mb-4">Proposal Form</Typography>
                    <div className="">
                        {/* Include EditButton if it is defined */}
                        {/* <EditButton className="absolute top-2 right-2" /> */}
                        <div className="mb-4">
                            <label className="block mb-2">Event Image:</label>
                            <label className="block mb-2 flex items-center">
                                <input
                                    type="file"
                                    name="eventImage"
                                    onChange={handleFileChange}
                                    className="mr-2"
                                />
                                <FaUpload className="ml-2" />
                            </label>
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Name of the Event:</label>
                            <input
                                type="text"
                                name="name"
                                value={formFields.name}
                                onChange={handleInputChange}
                                className="w-full bg-neutral-700 text-white p-2 rounded-lg"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Venue of the Event:</label>
                            <input
                                type="text"
                                name="venue"
                                value={formFields.venue}
                                onChange={handleInputChange}
                                className="w-full bg-neutral-700 text-white p-2 rounded-lg"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Tentative Date of the Event:</label>
                            <input
                                type="text"
                                name="date"
                                value={formFields.date}
                                onChange={handleInputChange}
                                className="w-full bg-neutral-700 text-white p-2 rounded-lg"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Budget of the Event:</label>
                            <input
                                type="text"
                                name="budget"
                                value={formFields.budget}
                                onChange={handleInputChange}
                                className="w-full bg-neutral-700 text-white p-2 rounded-lg"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Purpose of the Event:</label>
                            <textarea
                                name="purpose"
                                value={formFields.purpose}
                                onChange={handleInputChange}
                                className="w-full h-32 bg-neutral-700 text-white p-2 rounded-lg"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Benefits to UCSC:</label>
                            <textarea
                                name="benefits"
                                value={formFields.benefits}
                                onChange={handleInputChange}
                                className="w-full h-32 bg-neutral-700 text-white p-2 rounded-lg"
                            />
                        </div>
                        <div className="mb-4">
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
                                    <span>Requires Approval</span>
                                </label>
                            </div>
                        </div>
                        {formFields.iudApproval === 'approved' && (
                            <div className="mb-4">
                                <label className="block mb-2 flex items-center">
                                    <span className="mr-2">Proof of IUD Approval:</span>
                                    <input
                                        type="file"
                                        name="proofOfApproval"
                                        onChange={handleFileChange}
                                        className="ml-2"
                                    />
                                    <FaUpload className="ml-2" />
                                </label>
                            </div>
                        )}
                        
                        
                        <div className="flex justify-center">
                            <button
                                onClick={handleSubmit}
                                className={`px-4 py-2 rounded-full ${isFormValid ? 'bg-[#AEC90A]' : 'bg-gray-500 cursor-not-allowed'}`}
                                disabled={!isFormValid}
                            >
                                Create Event
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddEvent;
