import axios from "axios";

class PostService{

    static BASE_URL = "http://localhost:8080";

    static async savePost (name, 
                            position, 
                            description, 
                            post_image, 
                            post_status, 
                            club_id, 
                            published_user_id, 
                            //id,
                            token){

        console.log("published id in post service", published_user_id)                        

        try{
            const formData = new FormData();
            formData.append('data', new Blob([JSON.stringify({
                name,
                position,
                description,
                post_status,
                club_id,
                published_user_id
                //id

            })], {type: 'application/json'}));
            formData.append('file', post_image);

            const headers = {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            };

            const response = await axios.post(`${PostService.BASE_URL}/president/savePost`, formData, { headers });

            return response.data;

        }catch(err){
            throw err;
        }


    }

    static async getAllPosts(token) {
        try {

          const response = await axios.get(`${PostService.BASE_URL}/president/getAllPosts`,
            {

                headers: { Authorization: `Bearer ${token}` }

            }
          );

          return response.data;

        } catch (err) {
          throw err;
        }
    }

    static async getPostById(post_id, token) {
        try{
    
            const response = await axios.get(`${PostService.BASE_URL}/president/getPost/${post_id}`,
                {
                    headers: {Authorization: `Bearer ${token}`}
                }
            )

            return response.data;
            
        }catch(err){
            throw err;
        }
    }



    static async updatePost (post_id, 
                            name, 
                            position, 
                            description, 
                            post_image, 
                            post_status, 
                            club_id, 
                            published_user_id, 
                            //id,
                            token){

        try{
            const formData = new FormData();
            formData.append('data', new Blob([JSON.stringify({
                post_id,
                name,
                position,
                description,
                post_status,
                club_id,
                published_user_id
                //id

            })], {type: 'application/json'}));
            formData.append('file', post_image);

            const headers = {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            };

            const response = await axios.put(`${PostService.BASE_URL}/president/updatePost`, formData, { headers });

            return response.data;

        }catch(err){
            throw err;
        }


    }


    static async deletePost(post_id, token) {
        try {
          const response = await axios.delete(`${PostService.BASE_URL}/president/deletePost/${post_id}`,

            {
              headers: { Authorization: `Bearer ${token}` },
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

export default PostService;