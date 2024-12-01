import axios from "axios";

class EventMeetingService{

    static BASE_URL = "https://eventix-spring-production.up.railway.app"

    static async saveEventMeeting(meeting_name, 
                                meeting_type, 
                                date, 
                                time,
                                venue,
                                club_id,
                                event_id,
                                token){

        try{

       
            const data = {
               
                meeting_name, 
                meeting_type, 
                date, 
                time,
                venue,
                club_id,
                event_id

            };

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            };


            const response1 = await axios.post(`${EventMeetingService.BASE_URL}/president/saveEventMeeting`, data, { headers });


            return response1.data;

        }catch(err){
            throw err;
        }

    }

    static async getAllEventMeetings(token) {
        try{

            const response1 = await axios.get(`${EventMeetingService.BASE_URL}/president/getAllEventMeetings`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": 'application/json'
                    }
                }
            )
            console.log("Event Meeting response", response1.data);
            return response1.data;
            
        }catch(err){
            throw err;
        }
    }

    static async getEventMeeting(eventMeeting_id,token) {
        try{
    
            const response1 = await axios.get(`${EventMeetingService.BASE_URL}/president/getEventMeeting/${eventMeeting_id}`,
                {
                    headers: {Authorization: `Bearer ${token}`}
                }
            )
            return response1.data;
            
        }catch(err){
            throw err;
        }
    }

    static async updateEventMeeting(eventMeeting_id,
                            meeting_name, 
                            meeting_type, 
                            date, 
                            time,
                            venue,
                            club_id,
                            event_id,
                            token){

        try{


            const data = {
                eventMeeting_id,
                meeting_name, 
                meeting_type, 
                date, 
                time,
                venue,
                club_id,
                event_id
            };

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            };


            const response1 = await axios.put(`${EventMeetingService.BASE_URL}/president/updateEventMeeting/${eventMeeting_id}`, data, { headers });


            return response1.data;

        }catch(err){
            throw err;
        }

    }

    static async deleteEventMeeting(eventMeeting_id, token){
        try {
            const response1 = await axios.delete(`${EventMeetingService.BASE_URL}/president/deleteEventMeeting/${eventMeeting_id}`,
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

export default EventMeetingService;