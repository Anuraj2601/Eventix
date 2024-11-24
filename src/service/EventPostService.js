import axios from "axios";

class EventPostService{

    static BASE_URL = "http://localhost:8080";

    static async saveEventPost (title, 
                            description, 
                            post_image, 
                            post_status, 
                            club_id, 
                            published_user_id, 
                            event_id,
                            token){

        //console.log("published id in event post service", published_user_id)                        

        try{
            const formData = new FormData();
            formData.append('data', new Blob([JSON.stringify({
                title,
                description,
                post_status,
                club_id,
                published_user_id,
                event_id

            })], {type: 'application/json'}));
            formData.append('file', post_image);

            const headers = {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            };

            const response = await axios.post(`${EventPostService.BASE_URL}/member/saveEventPost`, formData, { headers });

            return response.data;

        }catch(err){
            throw err;
        }


    }

    static async getAllEventPosts(token) {
        try {

          const response = await axios.get(`${EventPostService.BASE_URL}/member/getAllEventPosts`,
            {

                headers: { Authorization: `Bearer ${token}` }

            }
          );

          return response.data;

        } catch (err) {
          throw err;
        }
    }

    static async getEventPostById(eventPostId, token) {
        try{
    
            const response = await axios.get(`${EventPostService.BASE_URL}/member/getEventPost/${eventPostId}`,
                {
                    headers: {Authorization: `Bearer ${token}`}
                }
            )

            return response.data;
            
        }catch(err){
            throw err;
        }
    }




    static async updateEventPost (eventPostId, 
                            title, 
                            description, 
                            post_image, 
                            post_status, 
                            club_id, 
                            published_user_id, 
                            event_id,
                            token){

        try{
            const formData = new FormData();
            formData.append('data', new Blob([JSON.stringify({
                eventPostId,
                title,
                description,
                post_status,
                club_id,
                published_user_id,
                event_id

            })], {type: 'application/json'}));
            formData.append('file', post_image);

            const headers = {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            };

            const response = await axios.put(`${EventPostService.BASE_URL}/member/updateEventPost/${eventPostId}`, formData, { headers });

            return response.data;

        }catch(err){
            throw err;
        }


    }


    static async deleteEventPost(eventPostId, token) {
        try {
          const response = await axios.delete(`${EventPostService.BASE_URL}/member/deleteEventPost/${eventPostId}`,

            {
              headers: { Authorization: `Bearer ${token}` },
            }

          );

          return response.data;

        } catch (err) {
          throw err;
        }
    }

    // static async updateEventPostStatus(post_id, status, token){

    //     try{
    //         const response = await axios.put(`${PostService.BASE_URL}/member/updatePostStatus/${post_id}/${status}`,
    //             null,
    //             {
    //                 headers: { Authorization: `Bearer ${token}` },
    //             }

    //         );

    //         return response.data;

    //     }catch(err){
    //         throw err;
    //     }

    // }
    




    static logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
    }
    
    static isAuthenticated() {
        const token = localStorage.getItem("token");
        return !!token;
    }



}

export default EventPostService;