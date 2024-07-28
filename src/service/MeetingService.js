import axios from "axios";

class MeetingService{

    static BASE_URL = "http://localhost:8080";

    static async saveMeeting(meeting_name, date, time, meeting_type, participant_type, token ){
        try{

            const data = {
                meeting_name,
                date,
                time,
                meeting_type,
                participant_type
            };

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            };

            const response = await axios.post(`${MeetingService.BASE_URL}/president/saveMeeting`, data, { headers });

            return response.data;

        }catch(err){
            throw err;
        }

    }

    

    static async getAllMeetings(token){
        try{

            const response = await axios.get(`${MeetingService.BASE_URL}/president/getAllMeetings`,
                {
                    headers : {Authorization: `Bearer ${token}`,
                    "Content-Type": 'application/json'
                } 

                }
            )

            console.log("Meetings response", response.data);
            return response.data;

        }catch(err){
            throw err;
        }
    }

    static async getMeetingById(meeting_id,token) {
        try{
    
            const response = await axios.get(`${MeetingService.BASE_URL}/president/getMeeting/${meeting_id}`,
                {
                    headers: {Authorization: `Bearer ${token}`}
                }
            )
            return response.data;
            
        }catch(err){
            throw err;
        }
    }


    static async updateMeeting(meeting_id ,meeting_name, date, time, meeting_type, participant_type, token ){

        try{

            const data = {
                meeting_name,
                date,
                time,
                meeting_type,
                participant_type
            };

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            };

              
            const response = await axios.put(`${MeetingService.BASE_URL}/president/updateMeeting/${meeting_id}`, data, { headers });
        
        
            return response.data;



        }catch(err){
            throw err;
        }

    }

    static async deleteMeeting(meeting_id, token){
        try {
            const response = await axios.delete(`${MeetingService.BASE_URL}/president/deleteMeeting/${meeting_id}`,
              {
                headers: { Authorization: `Bearer ${token}` }
              }
            );

            return response.data;

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

export default MeetingService;