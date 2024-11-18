// src/services/voterService.js
import axios from "axios";

// Base URL for the backend API
const API_URL = "http://localhost:8080/api/voters";

// Service to add a new voter
export const addVoter = async (voterData) => {
  try {
    const response = await axios.post(API_URL, voterData);
    return response.data;  // Returns the created voter data
  } catch (error) {
    console.error("Error adding voter:", error);
    throw error;
  }
};

// Service to get all voters
export const getAllVoters = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;  // Returns a list of all voters
  } catch (error) {
    console.error("Error fetching all voters:", error);
    throw error;
  }
};



export const getVotersByElection = async (electionId, userId) => {
  try {
    const response = await axios.get(`${API_URL}/election/${electionId}`, {
      params: { userId }, // Passing userId as a query parameter
    });
    console.log("Successfully fetched data:", response.data); // Log the results on success
    return response.data; // true if the user has voted, false otherwise
  } catch (error) {
    console.error(`Error fetching voters for election ${electionId}:`, error);
    throw error;
  }
};


  
  

  
  
  