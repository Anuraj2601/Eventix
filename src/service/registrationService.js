import axios from 'axios';

class RegistrationService {
    static BASE_URL = "http://localhost:8080"; // Adjust base URL as needed

    /**
     * Save the registration details to the server.
     * 
     * @param {string} email - The email of the user.
     * @param {string} clubId - The ID of the club.
     * @param {string} team - The selected team.
     * @param {string} interviewSlot - The selected interview slot.
     * @param {string} reason - The reason for joining.
     * @param {string} token - The authorization token.
     * @returns {Promise<Object>} - The response data from the server.
     * @throws {Error} - Throws an error if the request fails.
     */
    static async saveRegistration(email, clubId, team, interviewSlot, reason, token) {
        try {
            const data = {
                clubId,
                email,
                team,
                interviewSlot,
                reason,
            };
    
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            };
    
            console.log('Request Data:', data);
            console.log('Request Headers:', headers);
    
            const response = await axios.post(`${RegistrationService.BASE_URL}/student/saveRegistration`, data, { headers });
    
            return response.data;
        } catch (err) {
            console.error('Error during registration:', err);
            // Provide more detailed error message
            const errorMessage = err.response?.data?.message || err.message || 'Unknown error occurred';
            throw new Error(`Registration failed: ${errorMessage}`);
        }
    }
    
}

export default RegistrationService;
