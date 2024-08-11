import axios from "axios";

class ElectionService{

    static BASE_URL = "http://localhost:8080"


    static async saveElection(election_name, appOpens, appCloses, votingOpens, votingCloses, token ){
        try{

            const data = {
                election_name,
                appOpens,
                appCloses,
                votingOpens,
                votingCloses
            };

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            };

            const response = await axios.post(`${ElectionService.BASE_URL}/president/saveElection`, data, { headers });

            return response.data;

        }catch(err){
            throw err;
        }

    }

    static async getAllElections(token){
        try{

            const response = await axios.get(`${ElectionService.BASE_URL}/president/getAllElections`,
                {
                    headers : {Authorization: `Bearer ${token}`,
                    "Content-Type": 'application/json'
                } 

                }
            )

            console.log("Elections response", response.data);
            return response.data;

        }catch(err){
            throw err;
        }
    }

    static async getElectionById(election_id,token) {
        try{
    
            const response = await axios.get(`${ElectionService.BASE_URL}/president/getElection/${election_id}`,
                {
                    headers: {Authorization: `Bearer ${token}`}
                }
            )
            return response.data;
            
        }catch(err){
            throw err;
        }
    }


    static async updateElection(election_id ,election_name, appOpens, appCloses, votingOpens, votingCloses, token ){

        try{

            const data = {
                election_id,
                election_name,
                appOpens,
                appCloses,
                votingOpens,
                votingCloses
            };

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            };

              
            const response = await axios.put(`${ElectionService.BASE_URL}/president/updateElection/${election_id}`, data, { headers });
        
        
            return response.data;



        }catch(err){
            throw err;
        }

    }



    static async deleteElection(election_id, token){
        try {
            const response = await axios.delete(`${ElectionService.BASE_URL}/president/deleteElection/${election_id}`,
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

export default ElectionService;