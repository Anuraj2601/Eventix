import axios from 'axios';

class RegistrationService {
    static BASE_URL = "http://localhost:8080/student"; // Adjust base URL as needed

    /**
     * Save the registration details to the server.
     */
    static async saveRegistration(email, clubId, team, interviewSlot, reason, position, token) {
        try {
            const data = { clubId, email, team, interviewSlot, reason, position };

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            };

            const response = await axios.post(`${RegistrationService.BASE_URL}/saveRegistration`, data, { headers });
            return response.data;
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'Unknown error occurred';
            throw new Error(`Registration failed: ${errorMessage}`);
        }
    }

    
    /**
     * Get all registrations for the authenticated user.
     */
    static async getAllRegistrations(token) {
        try {
            const headers = {
                'Authorization': `Bearer ${token}`,
            };

            const response = await axios.get(`${RegistrationService.BASE_URL}/getAllRegistrations`, { headers });
            return response.data;
            
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'Error fetching registrations';
            throw new Error(errorMessage);
        }
    }

    /**
     * Update a specific registration.
     */
    static async updateRegistration(id, updates, token) {
        try {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            };

            const response = await axios.put(`${RegistrationService.BASE_URL}/updateRegistration/${id}`, updates, { headers });
            return response.data;
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'Error updating registration';
            throw new Error(errorMessage);
        }
    }
}

export default RegistrationService;
