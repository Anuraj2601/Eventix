import axios from "axios";

class UsersService{
    static BASE_URL = "http://localhost:8080"

    static async login(email,password) {
        try{

            const response = await axios.post(`${UsersService.BASE_URL}/auth/login`, {email, password})
            return response.data;

        }catch(err){
            if (err.response && err.response.data) {
            throw new Error(err.response.data.message);
            }
        }
    }

    static async register(firstname,lastname,email,password,regNo,role) {
        try{

            const response = await axios.post(`${UsersService.BASE_URL}/auth/register`, {firstname, lastname, email, password, regNo, role})
            console.log("data passed")
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async getAllUsers(token) {
        try{

            const response = await axios.get(`${UsersService.BASE_URL}/admin/get-all-users`,
                {
                    headers: {Authorization: `Bearer ${token}`}
                }
            )
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async getYourProfile(token) {
        try{

            const response = await axios.get(`${UsersService.BASE_URL}/adminuser/get-profile`,
                {
                    headers: {Authorization: `Bearer ${token}`}
                }
            )
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async getUserById(userId, token) {
        try{

            const response = await axios.get(`${UsersService.BASE_URL}/admin/get-users/${userId}`,
                {
                    headers: {Authorization: `Bearer ${token}`}
                }
            )
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async deleteUser(token) {
        try{

            const response = await axios.delete(`${UsersService.BASE_URL}/admin/delete/${userId}`,
                {
                    headers: {Authorization: `Bearer ${token}`}
                }
            )
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async updateUser(userId, userData, token) {
        try{

            const response = await axios.put(`${UsersService.BASE_URL}/admin/update/${userId}`, userData,
                {
                    headers: {Authorization: `Bearer${token}`}
                }
            )
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static async forgotPassword(email,token) {
        try{

            const response = await axios.put(`${UsersService.BASE_URL}/regenerate-otp`, {
                params: { email },
              },
                {
                    headers: {Authorization: `Bearer${token}`}
                }
            )
            return response.data;
            
        }catch(err){
            throw err;
        }
    }

    static logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
    }

    static isAuthenticated() {
        const token = localStorage.getItem('token')
        return !!token
    }

    static isAdmin() {
        const role = localStorage.getItem('role')
        return role === 'ADMIN'
    }

    static isUser() {
        const role = localStorage.getItem('role')
        return role === 'USER'
    }

    static adminOnly() {
        return this.isAuthenticated() && this.isAdmin();
    }

    static async getAllUserProfiles() {
        try {
            const response = await axios.get(`${UsersService.BASE_URL}/profiles`);
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async getUserProfileByEmail(email) {
        try {
            console.log(`Sending request to get profile by email: ${email}`);
            const response = await axios.get(`${UsersService.BASE_URL}/api/users/profile`, { params: { email } });
            console.log(`Response received for profile by email: ${email}`, response.data);
            return response.data;
        } catch (err) {
            console.error(`Error fetching profile for ${email}:`, err.response?.data?.message || err.message);
            throw new Error(err.response?.data?.message || 'Failed to fetch user profile by email.');
        }
    }

    static async getUserByEmail(email, token){
        try{

            const response = await axios.get(`${UsersService.BASE_URL}/api/users/getUserByEmail`,
                {
                    headers: {Authorization: `Bearer ${token}`},
                    params: { email }
                }
            )
            return response.data;

            

        }catch(err){
            throw err;
        }
    }

    static async getUserByEmailforsignup(email) {
        try {
          const response = await axios.get(`${UsersService.BASE_URL}/api/users/getUserByEmail`, {
            params: { email },
          });
      
          // Make sure the response has the expected data
          if (response.data && response.data.content) {
            return response.data.content;  // Return the content part if it exists
          }
          return null;  // If no content is available, return null
        } catch (err) {
          console.error("Error checking email:", err);
          throw err;  // Re-throw the error to be caught in handleSubmit
        }
      }
      
    
}

export default UsersService;