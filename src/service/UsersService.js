import axios from "axios";

class UsersService{
    static BASE_URL = "http://localhost:8080"

    static async login(email,password) {
        try{

            const response = await axios.post(`${UsersService.BASE_URL}/auth/login`, {email, password})
            return response.data;

        }catch(err){
            throw err;
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

    static async getUserById(token) {
        try{

            const response = await axios.get(`${UsersService.BASE_URL}/admin/get-user/${userId}`,
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
}

export default UsersService;