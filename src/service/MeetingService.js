import axios from "axios";

class MeetingService{

    static BASE_URL = "http://localhost:8080";

    static async saveMeeting(meeting_name, date, time, meeting_type, participant_type ){
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
                    headers: { Authorization: `Bearer ${token}`}
                }
            )

            console.log("Meetings response", response.data);
            return response.data;

        }catch(err){
            throw err;
        }
    }


}

export default MeetingService;