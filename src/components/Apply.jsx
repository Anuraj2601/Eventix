import React, { useState, useEffect } from 'react';
import { Typography } from "@material-tailwind/react";
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import UserService from '../service/UsersService'; // Update with your actual service path

const ApplyForm = () => {
    const [formFields, setFormFields] = useState({
        position: 'President'
    });
    const [isFormValid, setIsFormValid] = useState(false);
    const [user, setUser] = useState({ name: '', email: '' });

    useEffect(() => {
        // Fetch user details from session token when the component mounts
        const fetchUserDetails = async () => {
            try {
                const token = localStorage.getItem('token'); // Assuming token is stored in local storage
                if (token) {
                    const userDetails = await UserService.getUserDetails(token); // Update with actual service method
                    setUser(userDetails);
                    // Autofill the form if necessary
                    // For now, we'll just print the user details
                    console.log('User details:', userDetails);
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserDetails();
    }, []);

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

    const validateForm = () => {
        const { position } = formFields;
        const isValid = position.trim() !== '';
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
                </div>
            </div>
        </div>
    );
};

export default ApplyForm;
