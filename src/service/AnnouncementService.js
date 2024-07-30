import axios from "axios";

class AnnouncementService{
    static BASE_URL = "http://localhost:8080"

    static async saveAnnouncement(title, content, type, token){

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
                type
            };

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            };
        
              
            const response1 = await axios.post(`${AnnouncementService.BASE_URL}/president/saveAnnouncement`, data, { headers });
        
        
            return response1.data;

        }catch(err){
            throw err;
        }

    }

    static async getAllAnnouncements(token) {
        try{

            const response1 = await axios.get(`${AnnouncementService.BASE_URL}/president/getAllAnnouncements`,
                {
                    headers: {Authorization: `Bearer ${token}`,
                 "Content-Type": 'application/json'
                }
                }
            )
            console.log("Announcement response",response1.data);
            return response1.data;
            
        }catch(err){
            throw err;
        }
    }

    static async getAnnouncementById(announcement_id,token) {
        try{
    
            const response1 = await axios.get(`${AnnouncementService.BASE_URL}/president/getAnnouncement/${announcement_id}`,
                {
                    headers: {Authorization: `Bearer ${token}`}
                }
            )
            return response1.data;
            
        }catch(err){
            throw err;
        }
    }


    static async updateAnnouncement(announcement_id ,title, content, type, token){

        try{

            const data = {
                announcement_id,
                title,
                content,
                type
            };

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            };
        
              
            const response1 = await axios.put(`${AnnouncementService.BASE_URL}/president/updateAnnouncement/${announcement_id}`, data, { headers });
        
        
            return response1.data;



        }catch(err){
            throw err;
        }

    }

    static async deleteAnnouncement(announcement_id, token){
        try {
            const response1 = await axios.delete(`${AnnouncementService.BASE_URL}/president/deleteAnnouncement/${announcement_id}`,
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

export default AnnouncementService;