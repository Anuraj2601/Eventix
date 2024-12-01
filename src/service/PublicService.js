import axios from 'axios';

// Define the base URL for your backend API
const BASE_URL = 'https://eventix-spring-production.up.railway.app/api/public-registrations'; // Update this URL based on your backend

// Get all public registrations
export const getAllPublicRegistrations = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data; // Return the data from the response
  } catch (error) {
    console.error('Error fetching all public registrations:', error);
    throw error; // Rethrow the error for handling by the component
  }
};

// Get public registrations by event
export const getPublicRegistrationsByEvent = async (eventId) => {
  try {
    const response = await axios.get(`${BASE_URL}/event/${eventId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching registrations for event ${eventId}:`, error);
    throw error;
  }
};

// Save new public registration
export const savePublicRegistration = async (publicRegistrationsDTO) => {
  try {
    const response = await axios.post(BASE_URL, publicRegistrationsDTO);
    return response.data; // Return the saved registration data
  } catch (error) {
    console.error('Error saving public registration:', error);
    throw error;
  }
};

// Update check-in status for a registration
export const updateCheckInStatus = async (registrationId) => {
  try {
    const response = await axios.patch(`${BASE_URL}/${registrationId}/checkin`);
    return response.data; // Return the updated check-in status
  } catch (error) {
    console.error(`Error updating check-in status for registration ${registrationId}:`, error);
    throw error;
  }
};
