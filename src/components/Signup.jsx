import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import signupMan from "../assets/signupMan.png";
import { useNavigate } from "react-router-dom";
import UsersService from "../service/UsersService";

const Signup = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [regNo, setRegNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [role, setRole] = useState("student");
  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    regNo: "",
    email: "",
    password: "",
    confirmpassword: "",
    role: "student",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const token = localStorage.getItem("token");
  const emailRegex = /^[\d{4}(cs|is)\d{3}]+@stu\.ucsc\.cmb\.ac\.lk$/;
  const regNoRegex = /^(\d{4}(cs|is)\d{3})$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const [emailExists, setEmailExists] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  useEffect(() => {
    if (isSubmitted) {
      validateField("firstname", firstname);
    }
  }, [firstname]);

  useEffect(() => {
    if (isSubmitted) {
      validateField("lastname", lastname);
    }
  }, [lastname]);

  useEffect(() => {
    if (isSubmitted) {
      validateField("regNo", regNo);
    }
  }, [regNo]);

  useEffect(() => {
    if (isSubmitted) {
      validateField("email", email);
    }
  }, [email]);

  useEffect(() => {
    if (isSubmitted) {
      validateField("password", password);
    }
  }, [password]);

  useEffect(() => {
    if (isSubmitted) {
      validateField("confirmpassword", confirmpassword);
    }
  }, [confirmpassword]);

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
    navigate("/");
  };

 
  const validateField = (field, value) => {
    let error = "";
    switch (field) {
      case "firstname":
        if (!value) error = "First Name is required";
        break;
      case "lastname":
        if (!value) error = "Last Name is required";
        break;
      case "regNo":
        if (!value) error = "Registration Number is required";
        else if (!regNoRegex.test(value)) error = "Invalid Registration Number format";
        break;
      case "email":
        if (!value) error = "Student Email is required";
        else if (!emailRegex.test(value)) error = "Invalid Email format";
        else if (!value.startsWith(regNo)) error = "Email must start with the Registration Number";
        break;
      case "password":
        if (!value) error = "Password is required";
        else if (!passwordRegex.test(value)) error = "Password must be at least 8 characters long and contain both letters and numbers";
        break;
      case "confirmpassword":
        if (!value) error = "Confirm Password is required";
        else if (value !== password) error = "Passwords do not match";
        break;
      default:
        break;
    }
    return error;
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  
    // Validate all fields and check if email exists
    const newErrors = {
      firstname: validateField("firstname", firstname),
      lastname: validateField("lastname", lastname),
      regNo: validateField("regNo", regNo),
      email: validateField("email", email),
      password: validateField("password", password),
      confirmpassword: validateField("confirmpassword", confirmpassword),
    };
  
    setErrors(newErrors);
  
    const hasValidationErrors = Object.values(newErrors).some((error) => error !== "");
    const allFieldsFilled = Object.values({
      firstname,
      lastname,
      regNo,
      email,
      password,
      confirmpassword,
    }).every((field) => field !== "");
  
    // If there are validation errors or email exists, show error message
    if (hasValidationErrors || !allFieldsFilled ) {
      setDialogMessage("Please fix the errors before submitting.");
      setShowDialog(true);
      return;
    }
  
    // Check if the email already exists in the system (via API call)
    try {
      const emailCheckResponse = await UsersService.getUserByEmailforsignup(email);
  
      // If email already exists, set emailExists flag to true and show an error
      if (emailCheckResponse) {
        setEmailExists(true);  // Set emailExists flag to true
        setEmailErrorMessage("Email already exists.");
        setDialogMessage("This email is already registered. Please use a different one.");
        setShowDialog(true);
        return; // Exit the function to prevent registration if email exists
      }
  
      try {
        const response = await UsersService.register(firstname, lastname, email, password, regNo, role);
        console.log("Registration successful", response);
      } catch (error) {
        console.error("Registration error", error);
      }
  
      setTimeout(() => {
        navigate("/"); // Navigate after a delay to ensure the dialog is shown
      }, 12000); // Delay navigation slightly to show dialog
    } catch (error) {
      console.error("Error during registration:", error);
      setDialogMessage("An error occurred during registration.");
      setShowDialog(true);
    }
  };
  
  
  
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Clear errors when user starts typing again
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));

    if (name === "regNo") setRegNo(value);
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    if (name === "confirmpassword") setConfirmpassword(value);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
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
        <img src={signupMan} alt="signup" className="w-[700px] mt-[156px] h-auto" />
      </div>

      {/* Right Side */}
      <div className="w-1/2 bg-dark-background flex flex-col justify-center px-10 border-l border-white border-opacity-30">
        <div className="space-y-2 mx-auto w-[50%] py-10">
          {/* Form Fields */}
          <div className="flex space-x-4">
            <div className="w-1/2">
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
            <div className="w-1/2">
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
            {/* Email Existence Error Above */}
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
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-white"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {isSubmitted && errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <div>
            <label htmlFor="confirmpassword" className="block text-white text-sm mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="confirmpassword"
                name="confirmpassword"
                className="w-full px-4 py-2 h-[40px] bg-dark-400 text-white border border-white opacity-50 rounded mb-2"
                placeholder="********"
                value={confirmpassword}
                onChange={(e) => setConfirmpassword(e.target.value)}
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-white"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {isSubmitted && errors.confirmpassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmpassword}</p>
            )}
          </div>
          <div>
            <button
              onClick={handleSubmit}
              className="w-full bg-[#AEC90A] rounded-full text-white py-2 px-4 rounded mt-5"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
      {showDialog && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-opacity-60 bg-black flex justify-center items-center z-50"
        >
          <div
            className="bg-white p-6 rounded-lg w-[80%] max-w-lg"
          >
            <div>
              <p className="text-black text-xl mb-4">{dialogMessage}</p>
              <button
                className="w-full bg-[#AEC90A] text-white py-2 px-4 rounded mt-3"
                onClick={handleCloseDialog}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

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
              Leave without Signup?
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
    </div>
  );
};

export default Signup;
