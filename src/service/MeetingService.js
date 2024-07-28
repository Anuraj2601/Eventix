import axios from "axios";

class MeetingService{
    static BASE_URL = "http://localhost:8080"

    static async getAllMeetings(token){
        try{

            const response = await axios.get(`${MeetingService.BASE_URL}/president/getAllMeetings`,
                {
                    headers : {Authorization: `Bearer ${token}`} 
                }

            )
                console.log(response)
                return response.data



        }catch(err){
            throw err;
        }
    }

}

export default MeetingService