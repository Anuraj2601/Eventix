import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import UsersService from "../service/UsersService";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Email is required.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      await UsersService.forgotPassword({ email }); // Replace with your service call
      setShowSuccessPopup(true);
    } catch (err) {
      console.error(err);
      setShowErrorPopup(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-dark-400">
      <div className="bg-[#0c0a09] p-8 rounded shadow-md w-full max-w-md">
        <button
          onClick={() => navigate("/login")}
          className="text-primary flex items-center mb-4"
        >
          <FaArrowLeft className="mr-2" /> Back to Login
        </button>
        <h2 className="text-primary text-2xl font-bold text-center mb-6">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-primary">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className={`w-full px-4 py-2 border ${
                error ? "border-red-500" : "border-gray-300"
              } rounded focus:outline-none focus:ring focus:ring-blue-300`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded hover:bg-secondary transition"
          >
            Send Reset Link
          </button>
        </form>
      </div>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md">
            <h3 className="text-xl font-bold mb-4">Success!</h3>
            <p>A reset link has been sent to your email.</p>
            <button
              onClick={() => {
                setShowSuccessPopup(false);
                navigate("/login");
              }}
              className="mt-4 bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition"
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
            <h3 className="text-xl font-bold mb-4">Error!</h3>
            <p>Something went wrong. Please try again later.</p>
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

export default ForgotPassword;
