import axios from "axios";

class EventFeedbackService{
    static BASE_URL = "http://localhost:8080"

    static async saveEventFeedback(feedback,  
                                club_id, 
                                event_id,
                                user_id,
                                token){

        try{

            // const formData = new FormData();
            // formData.append('data', new Blob([JSON.stringify({
            //     title,
            //     content,
            //     announcementType
               
            // })], { type: 'application/json' }));
            const data = {
                feedback,
                club_id,
                event_id,
                user_id
            };

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            };
        
              
            const response1 = await axios.post(`${EventFeedbackService.BASE_URL}/student/saveEventFeedback`, data, { headers });
        
        
            return response1.data;

        }catch(err){
            throw err;
        }

    }

    static async getAllEventFeedbacks(token) {
        try{

            const response1 = await axios.get(`${EventFeedbackService.BASE_URL}/student/getAllEventFeedbacks`,
                {
                    headers: {Authorization: `Bearer ${token}`,
                    "Content-Type": 'application/json'
                }
                }
            )
            console.log("Event Feedback response",response1.data);
            return response1.data;
            
        }catch(err){
            throw err;
        }
    }

    static async getEventFeedbackById(e_feedback_id,token) {

        try{
    
            const response1 = await axios.get(`${EventFeedbackService.BASE_URL}/student/getEventFeedback/${e_feedback_id}`,
                {
                    headers: {Authorization: `Bearer ${token}`}
                }
            )
            return response1.data;
            
        }catch(err){
            throw err;
        }

    }


    static async updateEventFeedback(e_feedback_id, 
                                    feedback,  
                                    club_id, 
                                    event_id,
                                    user_id,
                                    token){

        try{

            const data = {
                e_feedback_id,
                feedback,  
                club_id, 
                event_id,
                user_id
            };

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            };
        
              
            const response1 = await axios.put(`${EventFeedbackService.BASE_URL}/student/updateEventFeedback/${e_feedback_id}`, data, { headers });
        
        
            return response1.data;



        }catch(err){
            throw err;
        }

    }

    static async deleteEventFeedback(e_feedback_id, token){
        try {
            const response1 = await axios.delete(`${EventFeedbackService.BASE_URL}/student/deleteEventFeedback/${e_feedback_id}`,
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

export default EventFeedbackService;