import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import loginImg from "../assets/loginImg.png";
import { useNavigate } from "react-router-dom";
import UsersService from "../service/UsersService";
import { Link } from "react-router-dom";

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

  const domain = "@stu.ucsc.cmb.ac.lk";

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
    if (!password) return "Password is required";
    return "";  // No additional checks, any non-empty string is valid
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

  const handleAutoFillEmail = (input) => {
    if (!input.endsWith(domain)) {
      return input.split("@")[0] + domain;
    }
    return input;
  };

  const handleEmailChange = (e) => {
    const inputValue = e.target.value;
    const autoFilledEmail = handleAutoFillEmail(inputValue);
    setEmail(autoFilledEmail);
    setErrors({ ...errors, email: validateEmail(autoFilledEmail) });
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
          localStorage.setItem("session_id", userData.id);
          localStorage.setItem("User_Id", userData.id);

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
          setErrors({ ...errors, global: "Invalid email or password" });
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
    <div className="flex flex-col lg:flex-row h-screen justify-center bg-dark-400">
      {/* Left Side */}
      <div
        className="lg:w-1/3 flex flex-col items-center justify-center relative p-4 bg-green-500"
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
        <img src={loginImg} alt="Login" className="mt-80 lg:mt-[157px] w-full h-auto max-w-[600px]" />
      </div>

      {/* Right Side */}
      <div className="lg:w-1/2 w-full bg-dark-background flex flex-col justify-center px-6 lg:px-10 py-8 border-t border-r border-b border-white border-opacity-30">
        <form onSubmit={handleSubmit} className="space-y-6 mx-auto w-full lg:w-[60%]">
         

{showPopup && (
  <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-[9999]">
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-dark-500 opacity-50"></div>
    <div className="bg-white w-[27vw] h-[20vh] p-8 rounded-lg text-center relative transition-transform duration-300 ease-in-out transform hover:scale-105 z-[10000]">
      <span
        className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center cursor-pointer text-white text-[22px] font-medium hover:bg-dark-400"
        onClick={handleClosePopup}
      >
        &times;
      </span>
      <h2 className="text-[15px] font-semibold text-dark-400 mb-4">
        Leave without Login?
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
{showBadCredentialsPopup && (
  <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-[9999]">
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-dark-500 opacity-50"></div>
    <div className="bg-white w-[27vw] h-[20vh] p-8 rounded-lg text-center relative transition-transform duration-300 ease-in-out transform hover:scale-105 z-[10000]">
      <span
        className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center cursor-pointer text-white text-[22px] font-medium hover:bg-dark-400"
        onClick={handleLoginPopup}
      >
        &times;
      </span>
      <h2 className="text-[15px] font-semibold text-dark-400 mb-4">
        <span className="text-red-600">Invalid email or password</span>
      </h2>
      <button
        className="bg-primary text-white px-4 py-2 w-32 text-[14px] rounded font-medium mr-2 hover:bg-dark-400"
        onClick={handleLoginPopup}
      >
        OK
      </button>
    </div>
  </div>
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
            <Link
              to="/forgot-password"
              className="text-sm text-[#AEC90A] hover:underline hover:text-blue-700 transition"
            >
              Forgot password?
            </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
