import axios from "axios";

class ElectionService{

    static BASE_URL = "http://localhost:8080"

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

}

export default ElectionService;