import axios from "axios";

class BudgetService{

    static BASE_URL = "https://eventix-spring-production.up.railway.app"

    static async saveBudget(budget_name, 
                                budget_amount, 
                                budget_type, 
                                event_id,
                                token){

        try{

       
            const data = {
               
                budget_name, 
                budget_amount, 
                budget_type, 
                event_id
            };

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            };


            const response1 = await axios.post(`${BudgetService.BASE_URL}/president/saveBudget`, data, { headers });


            return response1.data;

        }catch(err){
            throw err;
        }

    }

    static async getAllBudgets(token) {
        try{

            const response1 = await axios.get(`${BudgetService.BASE_URL}/president/getAllBudgets`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": 'application/json'
                    }
                }
            )

            console.log("Event Budget response", response1.data);
            return response1.data;
            
        }catch(err){

            throw err;
        }
    }

    static async getBudgetById(budget_id, token) {
        try{
    
            const response1 = await axios.get(`${BudgetService.BASE_URL}/president/getBudget/${budget_id}`,
                {
                    headers: {Authorization: `Bearer ${token}`}
                }
            )

            return response1.data;
            
        }catch(err){

            throw err;
        }

    }


    static async updateBudget(budget_id,
                                budget_name, 
                                budget_amount, 
                                budget_type, 
                                event_id,
                                token){

        try{


            const data = {
                budget_id,
                budget_name, 
                budget_amount, 
                budget_type, 
                event_id
            };

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            };


            const response1 = await axios.put(`${BudgetService.BASE_URL}/president/updateBudget/${budget_id}`, data, { headers });


            return response1.data;

        }catch(err){
            throw err;
        }

    }

    static async deleteBudget(budget_id, token){

        try {
            const response1 = await axios.delete(`${BudgetService.BASE_URL}/president/deleteBudget/${budget_id}`,
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

export default BudgetService;