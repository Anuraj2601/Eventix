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
        
              
            const response = await axios.post(`${AnnouncementService.BASE_URL}/president/saveAnnouncement`, data, { headers });
        
        
            return response.data;

        }catch(err){
            throw err;
        }

    }

    static async getAllAnnouncements(token) {
        try{

            const response = await axios.get(`${AnnouncementService.BASE_URL}/president/getAllAnnouncements`,
                {
                    headers: {Authorization: `Bearer ${token}`}
                }
            )
            console.log('Announcements response:', response.data);
            return response.data;
            
        }catch(err){
            throw err;
        }
    }



}

export default AnnouncementService;