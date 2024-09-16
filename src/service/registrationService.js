import axios from "axios";

class registrationService {
    static BASE_URL = "http://localhost:8080"; // Update the base URL as needed

    static async saveRegistration(formData, token) {
        try {
            // Destructure the formData object
            const { club_id, fullName, email, registerNo, indexNo, team, year, reason, interviewSlot } = formData;

            // Construct the data object based on the formData fields
            const data = {
                club_id,      // ID of the club
                fullName,    // Full name of the participant
                email,       // Email address
                registerNo,  // Registration number
                indexNo,     // Index number
                team,        // Team the participant is part of
                year,        // Year of the participant
                reason,      // Reason for registration
                interviewSlot // Selected interview time slot
            };

            // Set the request headers, including the Authorization token
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            };

            // Make the POST request to the backend API
            const response = await axios.post(`${registrationService.BASE_URL}/student/saveRegistration`, data, { headers });

            // Return the response data
            return response.data;

        } catch (err) {
            // Log the error for debugging
            console.error("Error during registration:", err.response ? err.response.data : err.message);
            // Throw a more descriptive error
            throw new Error(`Registration failed: ${err.response ? err.response.data.message : err.message}`);
        }
    }
}

export default registrationService;
