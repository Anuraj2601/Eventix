import React, { useState, useEffect } from 'react';
import { Typography } from "@material-tailwind/react";
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { getUserEmailFromToken } from '../utils/utils'; // Ensure this function is correctly implemented
import { createCandidate } from '../service/candidateService'; // Import the service
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ApplyForm = () => {
    const [formFields, setFormFields] = useState({
        position: 'President',
        userEmail: '', // Autofilled from session token
        contribution: '', // User input for how they can contribute to the club
        electionId: '', // Hidden field for election ID
    });
    const [isFormValid, setIsFormValid] = useState(false);
    const [loading, setLoading] = useState(true); // Add loading state for the email fetching
    const [error, setError] = useState(null); // To handle any errors
    const [submissionError, setSubmissionError] = useState(null); // To handle form submission errors
    const [successMessage, setSuccessMessage] = useState(''); // To handle successful submission
    const navigate = useNavigate(); // Hook for navigation

    // Fetch user email and autofill the form
    useEffect(() => {
        const fetchUserEmail = async () => {
            try {
                const email = getUserEmailFromToken(); // Utility function to fetch user email from token
                setFormFields((prevState) => ({ ...prevState, userEmail: email }));
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserEmail();
    }, []);

    // Extract electionId from URL
    useEffect(() => {
        const url = window.location.href;
        const electionId = url.substring(url.lastIndexOf('/') + 1); // Extracting the last part of the URL
        setFormFields((prevFields) => ({
            ...prevFields,
            electionId,
        }));
    }, []);

    // Validate form whenever the form fields change
    useEffect(() => {
        validateForm();
    }, [formFields]);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormFields((prevFields) => ({
            ...prevFields,
            [name]: value,
        }));
    };

    // Validate form logic
    const validateForm = () => {
        const { position, contribution, userEmail } = formFields;
        const isValid = position.trim() !== '' && contribution.trim() !== '' && userEmail.trim() !== '';
        setIsFormValid(isValid);
    };

    // Handle form submission
    const handleSubmit = async () => {
        try {
            const response = await createCandidate(formFields);
            console.log('Candidate created successfully:', response);
            setSuccessMessage('Your application was submitted successfully!');
            setSubmissionError(null); // Clear any previous errors

            // Redirect to the previous page after a short delay to allow the success message to be seen
            setTimeout(() => {
                navigate(-1); // Go back to the previous page
            }, 2000);
        } catch (err) {
            setSubmissionError(err.message);
            setSuccessMessage(''); // Clear any previous success messages
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="fixed inset-0 flex">
            <Sidebar className="flex-shrink-0"/>
            <div className="flex flex-col flex-1">
                <Navbar className="sticky top-0 z-10 p-4"/>
                <div className="bg-black bg-opacity-90 text-white flex-col md:p-20 overflow-y-auto">
                    <Typography variant="h3" className="mb-4 text-center">Application Form</Typography>

                    <div className="grid grid-cols-1 gap-4">
                        {/* Position Dropdown */}
                        <div>
                            <label className="block mb-2">Position:</label>
                            <select
                                name="position"
                                value={formFields.position}
                                onChange={handleInputChange}
                                className="w-full h-16 bg-black text-white p-2 rounded-2xl"
                                style={{ boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' }}
                            >
                                <option value="President">President</option>
                                <option value="Secretary">Secretary</option>
                                <option value="Treasurer">Treasurer</option>
                            </select>
                        </div>

                        {/* User Email (Autofilled) */}
                        <div>
                            <label className="block mb-2">Email:</label>
                            <input
                                type="email"
                                name="userEmail"
                                value={formFields.userEmail}
                                onChange={handleInputChange}
                                className="w-full h-16 bg-black text-white p-2 rounded-2xl"
                                readOnly
                                style={{ boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' }}
                            />
                        </div>

                        {/* Contribution Text Area */}
                        <div>
                            <label className="block mb-2">How would you contribute to the club in this position?</label>
                            <textarea
                                name="contribution"
                                value={formFields.contribution}
                                onChange={handleInputChange}
                                rows="4"
                                className="w-full bg-black text-white p-2 rounded-2xl"
                                style={{ boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' }}
                            />
                        </div>

                        {/* Hidden Election ID Field */}
                        <input
                            type="hidden"
                            name="electionId"
                            value={formFields.electionId}
                        />
                    </div>

                    <div className="flex justify-center mt-20">
                        <button
                            onClick={handleSubmit}
                            disabled={!isFormValid}
                            className={`p-2 rounded-2xl ${isFormValid ? 'bg-green-500' : 'bg-gray-500'} text-white`}
                            style={{ boxShadow: '0 8px 16px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 255, 0.1)' }}
                        >
                            Apply
                        </button>
                    </div>

                    {submissionError && <div className="text-red-500 text-center mt-4">{submissionError}</div>}

                    {/* Success Dialog Box */}
                    {successMessage && (
                        <div className="fixed inset-0 flex items-center justify-center bg-white p-4 rounded-lg shadow-lg">
                            <div className="text-center">
                                <Typography variant="h6" className="text-yellow-500">{successMessage}</Typography>
                                <button
                                    onClick={() => setSuccessMessage('')}
                                    className="mt-4 p-2 bg-yellow-500 text-white rounded-lg"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ApplyForm;
