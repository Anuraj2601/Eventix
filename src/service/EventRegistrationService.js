import axios from "axios";

class EventRegistrationService{

    static BASE_URL = "https://eventix-spring-production.up.railway.app"

    static async saveEventRegistration(email, 
                                mobile_no, 
                                reason, 
                                is_checked,
                                club_id,
                                event_id,
                                user_id,
                                token){

        try{

       
            const data = {
               
                email, 
                mobile_no, 
                reason, 
                is_checked,
                club_id,
                event_id,
                user_id
            };

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            };


            const response1 = await axios.post(`${EventRegistrationService.BASE_URL}/student/saveEventRegistration`, data, { headers });


            return response1.data;

        }catch(err){
            throw err;
        }

    }

    static async getAllEventRegistrations(token) {
        try{

            const response1 = await axios.get(`${EventRegistrationService.BASE_URL}/student/getAllEventRegistrations`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": 'application/json'
                    }
                }
            )
            console.log("Event Registrations response", response1.data);
            return response1.data;
            
        }catch(err){
            throw err;
        }
    }

    static async getEventRegistrationById(eReg_id,token) {
        try{
    
            const response1 = await axios.get(`${EventRegistrationService.BASE_URL}/student/getEventRegistration/${eReg_id}`,
                {
                    headers: {Authorization: `Bearer ${token}`}
                }
            )
            return response1.data;
            
        }catch(err){
            throw err;
        }
    }

    static async updateEventRegistration(eReg_id,
                                oc_name, 
                                team, 
                                event_name, 
                                is_removed,
                                event_id,
                                user_id,
                                token){

            try{


                const data = {
                    eReg_id,
                    oc_name, 
                    team, 
                    event_name, 
                    is_removed,
                    event_id,
                    user_id
                };

                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                };


                const response1 = await axios.put(`${EventRegistrationService.BASE_URL}/student/updateEventRegistration/${eReg_id}`, data, { headers });


                return response1.data;

            }catch(err){
                throw err;
            }

    }

    static async deleteEventRegistration(eReg_id, token){
        try {
            const response1 = await axios.delete(`${EventRegistrationService.BASE_URL}/student/deleteEventRegistration/${eReg_id}`,
              {
                headers: { Authorization: `Bearer ${token}` }
              }
            );

            return response1.data;

        } catch (err) {
            throw err;
        }

    }

    static async registrationCheckIn(eReg_id, token){
        try {
            const response1 = await axios.put(`${EventRegistrationService.BASE_URL}/student/registrationCheckIn/${eReg_id}`,
                {},
              {
                headers: { Authorization: `Bearer ${token}` }
              }
            );

            return response1.data;

        } catch (err) {
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

export default EventRegistrationService;