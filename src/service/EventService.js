import axios from "axios";

class EventService{
    static BASE_URL = "http://localhost:8080"

    static async saveEvent(){
        
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

export default EventService;