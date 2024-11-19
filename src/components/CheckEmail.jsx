import React, { useState } from "react";
import UsersService from "../service/UsersService";

const UserByEmail = () => {
  const [email, setEmail] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      setError(""); // Clear previous errors
      setUserData(null); // Clear previous data
  
      // Fetch data from the API
      const response = await UsersService.getUserByEmailforsignup(email);
  
      // Log the response for debugging purposes
      console.log("API Response:", response);
  
      // Check if the 'content' field exists and contains the user data
      if (response && response.content) {
        setUserData(response.content); // Set user data from 'content'
      } else {
        setError("No user data found");
      }
    } catch (err) {
      console.error("Error fetching user data:", err); // Log the error
      setError(err.message || "Error fetching user data");
    }
  };
  

  return (
    <div className="p-4 bg-gray-900 text-white rounded-md">
      <h2 className="text-xl font-bold mb-4">Search User by Email</h2>
      <div className="mb-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          className="p-2 rounded-md w-full text-black"
        />
      </div>
      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-[#AEC90A] text-black rounded-md"
      >
        Search
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {userData && (
        <div className="mt-4 bg-gray-800 p-4 rounded-md text-white">
          <h3 className="font-semibold">User Details</h3>
          <p><strong>Email:</strong> {userData.email || "N/A"}</p>
          <p><strong>Name:</strong> {userData.firstname || "N/A"}</p>
          <p><strong>Role:</strong> {userData.role || "N/A"}</p>
        </div>
      )}
    </div>
  );
};

export default UserByEmail;
