import { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import signupMan from '../assets/signupMan.png';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleBackClick = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleOkClick = () => {
        handleClosePopup();
        navigate('/');
    };

    return (
        <div className="flex h-screen justify-center bg-dark-400">
            {/* Left Side */}
            <div className="w-1/3 flex flex-col items-center justify-center relative border border-dark-400" style={{ backgroundColor: '#AEC90A', borderTopRightRadius: '1rem', borderBottomRightRadius: '1rem' }}>
                <span className="absolute top-4 left-4 cursor-pointer text-white hover:text-dark-400 text-3xl" onClick={handleBackClick}>
                    <IoArrowBackCircleOutline />
                </span>
                <img src={signupMan} alt="signup" className="w-[700px] mt-[170px] h-auto" />
            </div>

            {/* Right Side */}
            <div className="w-1/2 bg-dark-background flex flex-col justify-center px-10 ">
                <div className="space-y-6 mx-auto w-[30vw]">
                    <div>
                        <label htmlFor="email" className="block text-white text-sm mb-4">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full px-4 py-2 h-[50px] bg-dark-400 text-white border border-white opacity-50 rounded"
                            placeholder="2021cs100@stu.ucsc.cmb.ac.lk"
                        />
                    </div>

                    <div>
                        <label htmlFor="regNo" className="block text-white text-sm mb-4">Registration No</label>
                        <input
                            type="text"
                            id="regNo"
                            name="regNo"
                            className="w-full px-4 py-2 h-[50px] bg-dark-400 text-white border border-white opacity-50 rounded"
                            placeholder="Enter your registration number"
                        />
                    </div>

                    <div className="flex space-x-4">
                        <div className="w-1/2">
                            <label htmlFor="firstName" className="block text-white text-sm mb-4">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                className="w-full px-4 py-2 h-[50px] bg-dark-400 text-white border border-white opacity-50 rounded"
                                placeholder="First Name"
                            />
                        </div>
                        <div className="w-1/2">
                            <label htmlFor="lastName" className="block text-white text-sm mb-4">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                className="w-full px-4 py-2 h-[50px] bg-dark-400 text-white border border-white opacity-50 rounded"
                                placeholder="Last Name"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-white text-sm mb-4">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                className="w-full px-4 py-2 h-[50px] bg-dark-400 text-white border border-white opacity-50 rounded"
                                placeholder="Enter your password"
                            />
                            <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-white cursor-pointer" onClick={togglePasswordVisibility}>
                                {showPassword ? <FaEye /> : <FaEyeSlash />}
                            </span>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-white text-sm mb-4">Confirm Password</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                name="confirmPassword"
                                className="w-full px-4 py-2 h-[50px] bg-dark-400 text-white border border-white opacity-50 rounded"
                                placeholder="Confirm your password"
                            />
                            <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-white cursor-pointer" onClick={toggleConfirmPasswordVisibility}>
                                {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                            </span>
                        </div>
                    </div>

                    <div className='mt-8'>
                        <button className="w-full bg-primary text-black py-2 h-[50px] rounded font-bold hover:bg-secondary text-[14px]">SIGNUP</button>
                    </div>
                </div>
            </div>

            {/* Popup */}
            {showPopup && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                    <div className="fixed top-0 left-0 right-0 bottom-0 bg-dark-500 opacity-50"></div>
                    <div className="bg-white w-[27vw] h-[20vh] p-8 rounded-lg text-center relative transition-transform duration-300 ease-in-out transform hover:scale-105">
                        <span className="absolute top-2 right-2 w-6 h-6 bg-dark-400 rounded-full flex items-center justify-center cursor-pointer text-white text-[22px] font-normal hover:bg-dark-500" onClick={handleClosePopup}>
                            &times;
                        </span>
                        <h2 className="text-[15px] font-semibold text-dark-400 mb-4">Leave without Signup?</h2>
                        <button className="bg-dark-400 text-white px-4 py-2 w-32 text-[14px] rounded font-medium mr-2 hover:bg-dark-500" onClick={handleOkClick}>OK</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
