import axios from "axios";

class EventAnnouncementService{
    static BASE_URL = "http://localhost:8080"

    static async saveEventAnnouncement(title, 
                                content, 
                                type, 
                                club_id, 
                                event_id,
                                token){

        try{

            // const formData = new FormData();
            // formData.append('data', new Blob([JSON.stringify({
            //     title,
            //     content,
            //     announcementType
               
            // })], { type: 'application/json' }));
            const data = {
                title,
                content,
                type,
                club_id,
                event_id
            };

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            };
        
              
            const response1 = await axios.post(`${EventAnnouncementService.BASE_URL}/president/saveEventAnnouncement`, data, { headers });
        
        
            return response1.data;

        }catch(err){
            throw err;
        }

    }

    static async getAllEventAnnouncements(token) {
        try{

            const response1 = await axios.get(`${EventAnnouncementService.BASE_URL}/president/getAllEventAnnouncements`,
                {
                    headers: {Authorization: `Bearer ${token}`,
                 "Content-Type": 'application/json'
                }
                }
            )
            console.log("Event Announcement response",response1.data);
            return response1.data;
            
        }catch(err){
            throw err;
        }
    }

    static async getEventAnnouncementById(eventAnnouncementId,token) {

        try{
    
            const response1 = await axios.get(`${EventAnnouncementService.BASE_URL}/president/getEventAnnouncement/${eventAnnouncementId}`,
                {
                    headers: {Authorization: `Bearer ${token}`}
                }
            )
            return response1.data;
            
        }catch(err){
            throw err;
        }

    }


    static async updateEventAnnouncement(eventAnnouncementId, 
                                    title, 
                                    content, 
                                    type, 
                                    club_id, 
                                    event_id,
                                    token){

        try{

            const data = {
                eventAnnouncementId,
                title,
                content,
                type,
                club_id,
                event_id
            };

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            };
        
              
            const response1 = await axios.put(`${EventAnnouncementService.BASE_URL}/president/updateEventAnnouncement/${eventAnnouncementId}`, data, { headers });
        
        
            return response1.data;



        }catch(err){
            throw err;
        }

    }

    static async deleteEventAnnouncement(eventAnnouncementId, token){
        try {
            const response1 = await axios.delete(`${EventAnnouncementService.BASE_URL}/president/deleteEventAnnouncement/${eventAnnouncementId}`,
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

export default EventAnnouncementService;