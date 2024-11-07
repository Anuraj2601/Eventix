import axios from "axios";

class EventService{
    static BASE_URL = "http://localhost:8080"

    static async saveEvent(name, venue, date, purpose, benefits, eventImage, budgetFile, token){
        try{

            const formData = new FormData();
            formData.append('data', new Blob([JSON.stringify({ name, venue, date, purpose, benefits })], { type: 'application/json' }));
            if (eventImage) formData.append('eventImage', eventImage);
            if (budgetFile) formData.append('budgetFile', budgetFile);

            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            };

            console.log('Request Data:', formData);
            console.log('Request Headers:', headers);

            const response = await axios.post(`${EventService.BASE_URL}/event/saveEvent`, formData, { headers });

            return response.data;

        } catch (err) {
            console.error('Error saving event:', err);
            throw err;
        }
        
    }







    static logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
    }
    
    static isAuthenticated() {
        const token = localStorage.getItem("token");
        return !!token;
    }


}

export default EventService;