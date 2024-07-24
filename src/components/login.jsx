import { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import loginImg from '../assets/loginImg.png';
import { useNavigate } from 'react-router-dom';
import UsersService from '../service/UsersService';

const Login = () => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

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

    const validate = () => {
        const newErrors = {};
        const emailRegex = /^[a-zA-Z0-9._%+-]+@stu\.ucsc\.cmb\.ac\.lk$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

        if (!email) newErrors.email = "Email is required";
        else if (!emailRegex.test(email)) newErrors.email = "Invalid Email format";

        if (!password) newErrors.password = "Password is required";
        else if (!passwordRegex.test(password)) newErrors.password = "Password must be at least 8 characters long and contain both letters and numbers";

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setError(Object.values(validationErrors).join(', '));
            return;
        }

        try {

            const userData = await UsersService.login(email, password)
            console.log(userData)
            if(userData.token) {
                localStorage.setItem('token', userData.token)
                localStorage.setItem('role', userData.role)
                if(userData.role == 'student')
                {
                    navigate('/student')
                }
                if(userData.role == 'ADMIN')
                {
                    navigate('/admin')
                }
                if(userData.role == 'president')
                {
                    navigate('/president/dashboard')
                }

            } else {
                setError(userData.message);
            }
        } catch (error) {
            console.log(error);
            setError(error.message);
            setTimeout(() => {
                setError('');
            }, 5000);
        }
    };

    return (
        <div className="flex h-screen bg-dark-400">

            {/* Left Side */}
            <div className="w-1/3 flex flex-col items-center justify-center relative bg-[#AEC90A] border-r border-white border-opacity-30 rounded-r-lg">
                <span className="absolute top-4 left-4 cursor-pointer text-black hover:text-dark-400 text-3xl" onClick={handleBackClick}>
                    <IoArrowBackCircleOutline />
                </span>
                <img src={loginImg} alt="Login" className="mt-32 w-full h-auto" />
            </div>

            {/* Right Side */}
            <div className="w-2/3 bg-dark-background flex flex-col justify-center px-10 border-t border-r border-b border-white border-opacity-30">
                <form onSubmit={handleSubmit} className="space-y-6 mx-auto w-[60%]">
                    {error && <p className='error-message text-red-700'>{error}</p>}
                    <div>
                        <label htmlFor="username" className="block text-white text-sm mb-4">User Name</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="w-full px-4 py-2 h-[50px] bg-dark-400 text-white border border-white opacity-50 rounded"
                            placeholder="2021cs100@stu.ucsc.cmb.ac.lk"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {error && error.includes('Email') && <p className='text-red-500 text-sm'>{error}</p>}
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
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-white cursor-pointer" onClick={togglePasswordVisibility}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        {error && error.includes('Password') && <p className='text-red-500 text-sm'>{error}</p>}
                    </div>

                    <div className='mt-10'>
                        <button type="submit" className="w-full bg-primary text-black py-2 h-[50px] rounded font-bold hover:bg-secondary rounded-full">LOGIN</button>
                        <div className="flex justify-center mt-5">
                            <button className="w-full border border-white py-2 h-[50px] rounded font-base text-white text-[14px] rounded-full">Signup</button>
                        </div>

                        <div className="text-right mt-4">
                            <a href="#" className="text-sm text-secondary hover:underline">Forgot password?</a>
                        </div>
                    </div>
                </form>
            </div>

            {/* Popup */}
            {showPopup && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                    <div className="fixed top-0 left-0 right-0 bottom-0 bg-dark-500 opacity-50"></div>
                    <div className="bg-white w-[27vw] h-[20vh] p-8 rounded-lg text-center relative transition-transform duration-300 ease-in-out transform hover:scale-105">
                        <span className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center cursor-pointer text-white text-[22px] font-medium hover:bg-dark-400" onClick={handleClosePopup}>
                            &times;
                        </span>
                        <h2 className="text-[15px] font-semibold text-dark-400 mb-4">Leave without login?</h2>
                        <button className="bg-primary text-white px-4 py-2 w-32 text-[14px] rounded font-medium mr-2 hover:bg-dark-400" onClick={handleOkClick}>OK</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
