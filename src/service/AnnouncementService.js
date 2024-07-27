import axios from "axios";

class AnnouncementService{
    static BASE_URL = "http://localhost:8080"

    static async getAllAnnouncements(token) {
        try{

            const response = await axios.get(`${AnnouncementService.BASE_URL}/president/getAllAnnouncements`,
                {
                    headers: {Authorization: `Bearer ${token}`}
                }
            )
            return response.data;
            
        }catch(err){
            throw err;
        }
    }



}

export default AnnouncementService;