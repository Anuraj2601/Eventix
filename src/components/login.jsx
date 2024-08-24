/* import { useState } from 'react';
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
    const [errors, setErrors] = useState({
        email: '',
        password:''
    });

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

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); */
/*  const validationErrors = */ /* if(validate()) { */
/* if (Object.keys(validationErrors).length > 0) {
            setErrors(Object.values(validationErrors).join(', '));
            return;
        } */

/*  try {

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
                if(userData.role == 'member')
                {
                    navigate('/member/dashboard')
                }
                if(userData.role == 'oc')
                {
                    navigate('/oc/dashboard')
                }
                if(userData.role == 'treasurer')
                {
                    navigate('/treasurer/dashboard')
                }
                if(userData.role == 'secretary')
                {
                    navigate('/secretary/dashboard')
                }

            } else { */
/* setError(userData.message); */
/* alert("Bad Credentials");
                setErrors({ ...errors, global: userData.message });
            }
        } catch (error) {
            console.error("Error processing User:", error); */

// Extract the error message
/*  const errorMessage = error.response
              ? (error.response.data.message || error.response.data.errors || error.message)
              : error.message; */

// Display error message using alert
/*  alert(`Error: ${errorMessage}`); */

// Update state with error messages
/*  setErrors({ ...errors, global: errorMessage });
            setTimeout(() => { */
/* setError(''); */
/* setErrors({ ...errors, global: '' });
            }, 5000);
        }
    }
    };

    return (
        <div className="flex h-screen justify-center bg-dark-400  "> */

{
  /* Left Side */
}
{
  /* <div className="w-1/3 flex flex-col items-center justify-center relative ml-20" style={{ backgroundColor: '#AEC90A', borderTopRightRadius: '1rem', borderBottomRightRadius: '1rem' }}>
            <span  className="absolute top-4 left-4 cursor-pointer text-black hover:text-dark-400 text-3xl" onClick={handleBackClick}>
                    <IoArrowBackCircleOutline />
                </span>
                <img src={loginImg} alt="Login" className="mt-32 w-full h-auto" />
            </div> */
}

{
  /* Right Side */
}
{
  /* <div className="w-1/2 bg-dark-background flex flex-col justify-center px-10 border-t border-r border-b border-white border-opacity-30">
                <form onSubmit={handleSubmit} className="space-y-6 mx-auto w-[60%]">
                    {errors.global && <p className='text-red-700 text-sm'>{errors.global}</p>}
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
                        {errors.email */
} /* && error.includes('Email') */ /* && <p className='text-red-500 text-sm'>{errors.email}</p>}
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
                        {errors.password */ /* && error.includes('Password') */ /* && <p className='text-red-500 text-sm'>{errors.password}</p>}
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
            </div> */

{
  /* Popup */
}
{
  /*  {showPopup && (
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

export default Login; */
}

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import loginImg from "../assets/loginImg.png";
import { useNavigate } from "react-router-dom";
import UsersService from "../service/UsersService";

const Login = () => {
  const navigate = useNavigate();

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showBadCredentialsPopup, setShowBadCredentialsPopup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    global: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleBackClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleLoginPopup = () => {
    setShowBadCredentialsPopup(false);
    setShowErrorPopup(false);
  };

  const handleOkClick = () => {
    handleClosePopup();
    navigate("/");
  };

  const handleSignup = () => {
    navigate("/Signup");
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@stu\.ucsc\.cmb\.ac\.lk$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Invalid Email format";
    return "";
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!password) return "Password is required";
    if (!passwordRegex.test(password))
      return "Password must be at least 8 characters";
    return "";
  };

  const validate = () => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    setErrors({
      email: emailError,
      password: passwordError,
      global: "",
    });

    return !emailError && !passwordError;
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrors({ ...errors, email: validateEmail(e.target.value) });
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrors({ ...errors, password: validatePassword(e.target.value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
       

        const userData = await UsersService.login(email, password);
        if (userData.token) {
            setShowSuccessPopup(true);
          localStorage.setItem("token", userData.token);
          localStorage.setItem("role", userData.role);
            


          switch (userData.role) {
            case "student":
              navigate("/student");
              break;
            case "ADMIN":
              navigate("/admin");
              break;
            case "president":
              navigate("/president/dashboard");
              break;
            case "member":
              navigate("/member/dashboard");
              break;
            case "oc":
              navigate("/oc/dashboard");
              break;
            case "treasurer":
              navigate("/treasurer/dashboard");
              break;
            case "secretary":
              navigate("/secretary/dashboard");
              break;
            default:
              alert("Unknown role");
          }
        } else {
          setShowBadCredentialsPopup(true);
          setErrors({ ...errors, global: userData.message });
        }
      } catch (error) {
        const errorMessage = error.response
          ? error.response.data.message ||
            error.response.data.errors ||
            error.message
          : error.message;

       setShowErrorPopup(true);

        setErrors({ ...errors, global: errorMessage });
        setTimeout(() => {
          setErrors({ ...errors, global: "" });
        }, 5000);
      }
    }
  };

  return (
    <div className="flex h-screen justify-center bg-dark-400">
      {/* Left Side */}
      <div
        className="w-1/3 flex flex-col items-center justify-center relative ml-20"
        style={{
          backgroundColor: "#AEC90A",
          borderTopRightRadius: "1rem",
          borderBottomRightRadius: "1rem",
        }}
      >
        <span
          className="absolute top-4 left-4 cursor-pointer text-black hover:text-dark-400 text-3xl"
          onClick={handleBackClick}
        >
          <IoArrowBackCircleOutline />
        </span>
        <img src={loginImg} alt="Login" className="mt-[157px] w-full h-auto" />
      </div>
      {/* Right Side */}
      <div className="w-1/2 bg-dark-background flex flex-col justify-center px-10 border-t border-r border-b border-white border-opacity-30">
        <form onSubmit={handleSubmit} className="space-y-6 mx-auto w-[60%]">
          {errors.global && (
            <p className="text-red-700 text-sm">{errors.global}</p>
          )}
          <div>
            <label htmlFor="username" className="block text-white text-sm mb-4">
              User Name
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full px-4 py-2 h-[50px] bg-dark-400 text-white border border-white opacity-50 rounded"
              placeholder="2021cs100@stu.ucsc.cmb.ac.lk"
              value={email}
              onChange={handleEmailChange}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-white text-sm mb-4">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="w-full px-4 py-2 h-[50px] bg-dark-400 text-white border border-white opacity-50 rounded"
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
              />
              <span
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-white cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          <div className="mt-10">
            <button
              type="submit"
              className="w-full bg-primary text-black py-2 h-[50px] rounded font-bold hover:bg-secondary rounded-full"
            >
              LOGIN
            </button>
            <div className="flex justify-center mt-5">
              <button
                className="w-full border border-white py-2 h-[50px] rounded font-base text-white text-[14px] rounded-full"
                onClick={handleSignup}
              >
                Signup
              </button>
            </div>

            <div className="text-right mt-4">
              <a href="#" className="text-sm text-secondary hover:underline">
                Forgot password?
              </a>
            </div>
          </div>
        </form>
      </div>
      {/* Popup */}
      {showPopup && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
          <div className="fixed top-0 left-0 right-0 bottom-0 bg-dark-500 opacity-50"></div>
          <div className="bg-white w-[27vw] h-[20vh] p-8 rounded-lg text-center relative transition-transform duration-300 ease-in-out transform hover:scale-105">
            <span
              className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center cursor-pointer text-white text-[22px] font-medium hover:bg-dark-400"
              onClick={handleClosePopup}
            >
              &times;
            </span>
            <h2 className="text-[15px] font-semibold text-dark-400 mb-4">
              Leave without login?
            </h2>
            <button
              className="bg-primary text-white px-4 py-2 w-32 text-[14px] rounded font-medium mr-2 hover:bg-dark-400"
              onClick={handleOkClick}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {showSuccessPopup && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
          <div className="fixed top-0 left-0 right-0 bottom-0 bg-dark-500 opacity-50"></div>
          <div className="bg-white w-[27vw] h-[20vh] p-8 rounded-lg text-center relative transition-transform duration-300 ease-in-out transform hover:scale-105">
            <span
              className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center cursor-pointer text-white text-[22px] font-medium hover:bg-dark-400"
              onClick={handleClosePopup}
            >
              &times;
            </span>
            <h2 className="text-[20px] font-semibold text-primary mt-4 mb-2">
              Successfully Login
            </h2>
          </div>
        </div>
      )}
      {showBadCredentialsPopup && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
          <div className="fixed top-0 left-0 right-0 bottom-0 bg-dark-500 opacity-50"></div>
          <div className="bg-white w-[27vw] h-[20vh] p-8 rounded-lg text-center relative transition-transform duration-300 ease-in-out transform hover:scale-105">
            <span
              className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center cursor-pointer text-white text-[22px] font-medium hover:bg-dark-400"
              onClick={handleLoginPopup}
            >
              &times;
            </span>
            <h2 className="text-[20px] font-semibold text-red-900 mt-4 mb-2">
              Bad Credentials
            </h2>
          </div>
        </div>
      )}

      {showErrorPopup && (
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-dark-500 opacity-50"></div>
        <div className="bg-white w-[27vw] h-[20vh] p-8 rounded-lg text-center relative transition-transform duration-300 ease-in-out transform hover:scale-105">
          <span
            className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center cursor-pointer text-white text-[22px] font-medium hover:bg-dark-400"
            onClick={handleLoginPopup}
          >
            &times;
          </span>
          <h2 className="text-[20px] font-semibold text-red-900 mt-4 mb-2">
           Error : {errors.global}
          </h2>
        </div>
      </div>
      )}

      ; 
    </div>
  );
};

export default Login;
