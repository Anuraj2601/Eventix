import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyAccount = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [showOtpResentPopup, setShowOtpResentPopup] = useState(false); // New state for OTP resent message

  const navigate = useNavigate();

  const emailRegex = /^[\d{4}(cs|is)\d{3}]+@stu\.ucsc\.cmb\.ac\.lk$/;
  const otpRegex = /^\d{6}$/;  // OTP should be a 6-digit number

  // Validate Email and OTP
  const validateEmail = (email) => emailRegex.test(email);
  const validateOtp = (otp) => otpRegex.test(otp);

  // Handle input change and validation for enabling/disabling the submit button
  useEffect(() => {
    if (validateEmail(email) && validateOtp(otp)) {
      setIsSubmitEnabled(true);
    } else {
      setIsSubmitEnabled(false);
    }
  }, [email, otp]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !otp) {
      setError("Both email and OTP are required.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!validateOtp(otp)) {
      setError("OTP should be a 6-digit number.");
      return;
    }

    try {
      const response = await axios.put(
        `https://eventix-spring-production.up.railway.app/verify-account?email=${email}&otp=${otp}`
      );

      if (response.data && response.status === 200) {
        setShowSuccessPopup(true);
      }
    } catch (err) {
      console.error(err);
      setShowErrorPopup(true);
    }
  };

  const handleResendOtp = async () => {
    try {
      const response = await axios.put(
        `https://eventix-spring-production.up.railway.app/regenerate-otp?email=${email}`
      );

      if (response.data && response.status === 200) {
        setShowOtpResentPopup(true);
      }
    } catch (err) {
      console.error(err);
      setShowErrorPopup(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <div className=" p-8 rounded shadow-md w-full h-full max-w-md">
        <button
          onClick={() => navigate("/login")}
          className="text-gray-400 flex items-center mb-4"
        >
          <span className="mr-2">←</span> Back to Login
        </button>
        <h2 className="text-[#AEC90A] text-2xl font-bold text-center mb-6">
          Welcome to EVENTIX!!! Please Verify Your Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-400">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className={`w-full px-4 py-2 border ${
                error ? "border-red-500" : "border-gray-600"
              } rounded focus:outline-none focus:ring focus:ring-[#AEC90A]`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="otp" className="block text-gray-400">
              OTP
            </label>
            <input
              type="text"
              id="otp"
              className={`w-full px-4 py-2 border ${
                error ? "border-red-500" : "border-gray-600"
              } rounded focus:outline-none focus:ring focus:ring-[#AEC90A]`}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter the OTP"
            />
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          {/* Buttons */}
          <div className="flex space-x-8">
            <button
              type="button"
              onClick={handleResendOtp}
              className="bg-[#AEC90A] text-white p-3 rounded-lg hover:bg-[#A8B800] transition"
            >
              Resend OTP
            </button>
            <button
              type="submit"
              disabled={!isSubmitEnabled}
              className={`w-full  rounded-lg ${
                isSubmitEnabled
                  ? "bg-[#AEC90A] text-white hover:bg-[#A8B800] transition"
                  : "bg-gray-500 text-gray-300 cursor-not-allowed"
              }`}
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md">
            <h3 className="text-xl font-bold mb-4 text-[#AEC90A]">Success!</h3>
            <p>Your account has been successfully activated.Now, you can login to your Account</p>
            <button
              onClick={() => {
                setShowSuccessPopup(false);
                navigate("/login");
              }}
              className="mt-4 bg-[#AEC90A] text-white px-4 py-2 rounded hover:bg-[#A8B800] transition"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* OTP Resent Popup */}
      {showOtpResentPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md">
            <h3 className="text-xl font-bold mb-4 text-green-600">Success!</h3>
            <p>OTP has been resent to your email.</p>
            <button
              onClick={() => setShowOtpResentPopup(false)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              OK
            </button>
          </div>
        </div>
      )}
      
      {/* Error Popup */}
      {showErrorPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md">
            <h3 className="text-xl font-bold mb-4 text-red-600">Error!</h3>
            <p>Failed to verify your account. Please try again.</p>
            <button
              onClick={() => setShowErrorPopup(false)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyAccount;
