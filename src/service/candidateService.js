import axios from 'axios';

const API_BASE_URL = 'https://eventix-spring-production.up.railway.app'; // Replace with your actual API base URL

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


// candidateService.js

export const incrementVotes = async (candidateIds) => {
    try {
        const response = await axios.patch(`${API_BASE_URL}/candidates/vote`, candidateIds);
        return response.data; // This may be empty since the controller returns Void
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error incrementing votes');
    }
};


export const releaseElection = async (electionId, body, token) => {
    try {
        const response = await axios.patch(
            `${API_BASE_URL}/president/releaseElection/${electionId}`,
            body,
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token here
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error releasing election:', error);
        throw error;
    }
};


export const getElectionReleased = async (electionId, token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/president/getElectionReleased/${electionId}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the headers
            },
        });
        return response.data; // Return the response data
    } catch (error) {
        console.error("Error fetching election released status:", error);
        throw error; // Rethrow the error for further handling
    }
};
