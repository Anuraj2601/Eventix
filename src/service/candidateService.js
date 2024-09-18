import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080'; // Replace with your actual API base URL

// Function to create a candidate
export const createCandidate = async (candidateData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/candidates`, candidateData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error creating candidate');
    }
};

export const getAllCandidates = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/candidates`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error fetching candidates');
    }
};

// candidateService.js

export const updateCandidateSelection = async (id, selected) => {
    try {
        const response = await axios.patch(`${API_BASE_URL}/candidates/${id}`, null, {
            params: { selected }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error updating candidate selection');
    }
};
