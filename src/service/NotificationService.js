import axios from "axios";

class NotificationService{

    static BASE_URL = "http://localhost:8080"

    static async saveNotification(notification, 
                                is_read,
                                club_id,
                                user_id,
                                token){

        try{

       
            const data = {
               
                notification,
                is_read,
                club_id,
                user_id
            };

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            };


            const response1 = await axios.post(`${NotificationService.BASE_URL}/student/saveNotification`, data, { headers });


            return response1.data;

        }catch(err){
            throw err;
        }

    }

    static async getAllNotifications(token) {
        try{

            const response1 = await axios.get(`${NotificationService.BASE_URL}/student/getAllNotifications`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": 'application/json'
                    }
                }
            )
            console.log("Notification response", response1.data);
            return response1.data;
            
        }catch(err){
            throw err;
        }
    }

    static async getNotificationById(notification_id, token) {
        try{
    
            const response1 = await axios.get(`${NotificationService.BASE_URL}/student/getNotification/${notification_id}`,
                {
                    headers: {Authorization: `Bearer ${token}`}
                }
            )
            return response1.data;
            
        }catch(err){
            throw err;
        }
    }

    static async getNotificationByUserId(user_id, token) {
        try{
    
            const response1 = await axios.get(`${NotificationService.BASE_URL}/student/getNotificationsByUserId/${user_id}`,
                {
                    headers: {Authorization: `Bearer ${token}`}
                }
            )
            return response1.data;
            
        }catch(err){
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

export default NotificationService;