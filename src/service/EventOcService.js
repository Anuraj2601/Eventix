import axios from "axios";

class EventOcService{

    static BASE_URL = "http://localhost:8080"

    static async saveEventOc(oc_name, 
                                team, 
                                event_name, 
                                is_removed,
                                event_id,
                                user_id,
                                token){

        try{

       
            const data = {
               
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


            const response1 = await axios.post(`${EventOcService.BASE_URL}/president/saveEventOc`, data, { headers });


            return response1.data;

        }catch(err){
            throw err;
        }

    }

    static async getAllEventOcs(token) {
        try{

            const response1 = await axios.get(`${EventOcService.BASE_URL}/president/getAllEventOcs`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": 'application/json'
                    }
                }
            )
            console.log("Event OC response", response1.data);
            return response1.data;
            
        }catch(err){
            throw err;
        }
    }

    static async getEventOcById(eventOc_id,token) {
        try{
    
            const response1 = await axios.get(`${AnnouncementService.BASE_URL}/president/getEventOc/${eventOc_id}`,
                {
                    headers: {Authorization: `Bearer ${token}`}
                }
            )
            return response1.data;
            
        }catch(err){
            throw err;
        }
    }

    static async updateEventOc(eventOc_id,
                            oc_name, 
                            team, 
                            event_name, 
                            is_removed,
                            event_id,
                            user_id,
                            token){

        try{


            const data = {
                eventOc_id,
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


            const response1 = await axios.post(`${EventOcService.BASE_URL}/president/updateEventOc`, data, { headers });


            return response1.data;

        }catch(err){
            throw err;
        }

    }

    static async deleteEventOc(eventOc_id, token){
        try {
            const response1 = await axios.delete(`${EventOcService.BASE_URL}/president/deleteEventOc/${eventOc_id}`,
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

export default EventOcService;