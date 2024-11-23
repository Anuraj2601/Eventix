import { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash, FaExclamationCircle } from "react-icons/fa";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import loginImg from '../assets/loginImg.png';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [usernameValid, setUsernameValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    const [isUsernameTouched, setIsUsernameTouched] = useState(false);
    const [isPasswordTouched, setIsPasswordTouched] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [showForgotPasswordPopup, setShowForgotPasswordPopup] = useState(false);
    const [contactInfo, setContactInfo] = useState('');
    const [isContactInfoValid, setIsContactInfoValid] = useState(true);

    useEffect(() => {
        setIsButtonDisabled(!(usernameValid && passwordValid && username && password));
    }, [usernameValid, passwordValid, username, password]);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
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

    const validateUsername = (value) => {
        const regex = /^\d{4}[a-zA-Z]{2}\d{3}$/;
        setUsernameValid(regex.test(value));
    };

    const validatePassword = (value) => {
        setPasswordValid(value.length >= 8);
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
        validateUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        validatePassword(e.target.value);
    };

    const handleUsernameBlur = () => {
        setIsUsernameTouched(true);
        validateUsername(username);
    };

    const handlePasswordBlur = () => {
        setIsPasswordTouched(true);
        validatePassword(password);
    };

    const handleForgotPasswordClick = () => {
        setShowForgotPasswordPopup(true);
    };

    const handleContactInfoChange = (e) => {
        setContactInfo(e.target.value);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\d{10}$/;
        setIsContactInfoValid(emailRegex.test(e.target.value) || phoneRegex.test(e.target.value));
    };

    const handleForgotPasswordSubmit = () => {

        console.log('Sending validation pin to:', contactInfo);

        setShowForgotPasswordPopup(false);
    };

    return (
        <div className="flex h-screen justify-center bg-dark-400">

            {/* Left Side */}
            <div className="w-1/3 flex flex-col items-center justify-center relative" style={{ backgroundColor: '#AEC90A', borderTopRightRadius: '1rem', borderBottomRightRadius: '1rem' }}>
                <span className="absolute top-4 left-4 cursor-pointer text-white hover:text-dark-400 text-3xl" onClick={handleBackClick}>
                    <IoArrowBackCircleOutline />
                </span>
                <img src={loginImg} alt="Login" className="mt-[170px] w-[600px] h-auto" />
            </div>

            {/* Right Side */}
            <div className="w-1/2 bg-dark-background flex flex-col justify-center px-10">
                <div className="space-y-6 mx-auto w-[30vw]">
                    <div>
                        <label htmlFor="username" className="block text-white text-sm mb-4">User Name</label>
                        {!usernameValid && isUsernameTouched && (
                            <p className="text-red-500 text-sm ml-0">Username must be in the format 2021cs100</p>
                        )}
                        <div className="relative">
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={username}
                                onChange={handleUsernameChange}
                                onBlur={handleUsernameBlur}
                                className={`w-full px-4 py-2 h-[50px] bg-dark-400 text-white border ${usernameValid ? 'border-white' : 'border-red-500'} opacity-50 rounded`}
                                placeholder="Enter your username"
                            />
                            {!usernameValid && isUsernameTouched && (
                                <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-red-500">
                                    <FaExclamationCircle />
                                </span>
                            )}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-white text-sm mb-4">Password</label>
                        {!passwordValid && isPasswordTouched && (
                            <p className="text-red-500 text-sm ml-0">Password must be at least 8 characters long</p>
                        )}
                        <div className="relative mb-20">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={password}
                                onChange={handlePasswordChange}
                                onBlur={handlePasswordBlur}
                                className={`w-full px-4 py-2 h-[50px] bg-dark-400 text-white border ${passwordValid ? 'border-white' : 'border-red-500'} opacity-50 rounded`}
                                placeholder="Enter your password"
                            />
                            {!passwordValid && isPasswordTouched && (
                                <span className="absolute inset-y-0 right-7 pr-3 flex items-center text-red-500">
                                    <FaExclamationCircle />
                                </span>
                            )}

                            <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-white cursor-pointer" onClick={togglePasswordVisibility}>
                                {showPassword ? <FaEye /> : <FaEyeSlash />}
                            </span>
                        </div>
                    </div>

                    <div className='mt-40'>
                        <button
                            className={`w-full py-2 h-[50px] rounded font-bold font-base text-[14px] ${isButtonDisabled ? 'bg-dark-400 cursor-not-allowed' : 'bg-primary text-black hover:bg-secondary'}`}
                            disabled={isButtonDisabled}
                        >
                            LOGIN
                        </button>
                        <div className="flex justify-center mt-5">
                            <button className="w-full border border-white py-2 h-[50px] rounded font-base text-[14px]">Signup</button>
                        </div>

                        <div className="text-right mt-4">
                            <button onClick={handleForgotPasswordClick} className="text-sm text-secondary hover:underline">Forgot password?</button>
                        </div>
                    </div>
                </div>
            </div>



            {/* Popup for leaving without login */}
            {showPopup && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                    <div className="fixed top-0 left-0 right-0 bottom-0 bg-dark-500 opacity-50"></div>
                    <div className="bg-white w-[27vw] h-[20vh] p-8 rounded-lg text-center relative transition-transform duration-300 ease-in-out transform hover:scale-105">
                        <span className="absolute top-2 right-2 w-6 h-6 bg-dark-400 rounded-full flex items-center justify-center cursor-pointer text-white text-[22px] font-normal hover:bg-dark-500" onClick={handleClosePopup}>
                            &times;
                        </span>
                        <h2 className="text-[15px] font-semibold text-dark-400 mb-4">Leave without login?</h2>
                        <button className="bg-dark-400 text-white px-4 py-2 w-32 text-[14px] rounded font-medium mr-2 hover:bg-dark-500" onClick={handleOkClick}>OK</button>
                    </div>
                </div>
            )}




            {/* Popup for forgot password */}
            {showForgotPasswordPopup && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                    <div className="fixed top-0 left-0 right-0 bottom-0 bg-dark-500 opacity-50"></div>
                    <div className="bg-white w-[40vw] p-8 rounded-lg text-center relative">
                        <span className="absolute top-2 right-2 w-6 h-6 bg-dark-400 rounded-full flex items-center justify-center cursor-pointer text-white text-[22px] font-normal hover:bg-dark-500" onClick={() => setShowForgotPasswordPopup(false)}>
                            &times;
                        </span>
                        <h2 className="text-[15px] font-semibold text-dark-400 mb-4">Forgot Password?</h2>
                        <div className="mb-4">
                            <label htmlFor="contactInfo" className="block text-sm text-dark-400 mb-2 font-base">Enter Email or Phone Number</label>
                            <input
                                type="text"
                                id="contactInfo"
                                value={contactInfo}
                                onChange={handleContactInfoChange}
                                className={`w-full px-4 py-2 h-[50px] bg-dark-500 text-white border ${isContactInfoValid ? 'border-white' : 'border-red-500'} rounded`}
                                placeholder="Enter your email or phone number"
                            />
                        </div>
                        <button
                            className={`bg-primary text-dark-400 font-semibold hover:bg-secondary px-4 py-2 w-[12vw] h-12 text-[14px] rounded mb-0 mt-3 ${!isContactInfoValid ? 'cursor-not-allowed' : ''}`}
                            onClick={handleForgotPasswordSubmit}
                            disabled={!isContactInfoValid}
                        >
                            Send Validation Pin
                        </button>


                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
