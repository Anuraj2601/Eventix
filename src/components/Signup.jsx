import React, { useState } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import signupMan from "../assets/signupMan.png";

const Signup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [regNo, setRegNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [emailExists, setEmailExists] = useState(false);

  const handleBackClick = () => {
    console.log("Back button clicked");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    const errors = {};
    if (!firstname) errors.firstname = "First name is required.";
    if (!lastname) errors.lastname = "Last name is required.";
    if (!regNo) errors.regNo = "Registration number is required.";
    if (!email) errors.email = "Email is required.";
    if (!password) errors.password = "Password is required.";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (validateForm()) {
      console.log("Form submitted:", {
        firstname,
        lastname,
        regNo,
        email,
        password,
      });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen justify-center bg-dark-400">
      {/* Left Side */}
      <div
        className="lg:w-1/3 w-full flex flex-col items-center justify-center relative lg:ml-20 p-5"
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
        <img
          src={signupMan}
          alt="signup"
          className="w-full max-w-md lg:mt-[156px] h-auto"
        />
      </div>

      {/* Right Side */}
      <div className="lg:w-1/2 w-full bg-dark-background flex flex-col justify-center px-5 lg:px-10 border-l border-white border-opacity-30">
        <form
          className="space-y-4 mx-auto w-full lg:w-[50%] py-10"
          onSubmit={handleSubmit}
        >
          {/* Form Fields */}
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="lg:w-1/2 w-full">
              <label
                htmlFor="firstname"
                className="block text-white text-sm mb-2"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                className="w-full px-4 py-2 h-[40px] bg-dark-400 text-white border border-white opacity-50 rounded mb-2"
                placeholder="Cusherah"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
              {isSubmitted && errors.firstname && (
                <p className="text-red-500 text-sm mt-1">{errors.firstname}</p>
              )}
            </div>
            <div className="lg:w-1/2 w-full">
              <label
                htmlFor="lastname"
                className="block text-white text-sm mb-2"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                className="w-full px-4 py-2 h-[40px] bg-dark-400 text-white border border-white opacity-50 rounded mb-2"
                placeholder="Kugananthan"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
              {isSubmitted && errors.lastname && (
                <p className="text-red-500 text-sm mt-1">{errors.lastname}</p>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="regNo" className="block text-white text-sm mb-2">
              Registration Number
            </label>
            <input
              type="text"
              id="regNo"
              name="regNo"
              className="w-full px-4 py-2 h-[40px] bg-dark-400 text-white border border-white opacity-50 rounded mb-2"
              placeholder="2021is100"
              value={regNo}
              onChange={(e) => setRegNo(e.target.value)}
            />
            {isSubmitted && errors.regNo && (
              <p className="text-red-500 text-sm mt-1">{errors.regNo}</p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="block text-white text-sm mb-2">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="w-full px-4 py-2 h-[40px] bg-dark-400 text-white border border-white opacity-50 rounded mb-2"
              placeholder="2021is100@stu.ucsc.cmb.ac.lk"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailExists && (
              <div className="text-red-600 text-center">
                <p>Email already exists. Please use a different email.</p>
              </div>
            )}
            {isSubmitted && errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block text-white text-sm mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="w-full px-4 py-2 h-[40px] bg-dark-400 text-white border border-white opacity-50 rounded mb-2"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute right-2 top-2 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {isSubmitted && errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded mt-4"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
