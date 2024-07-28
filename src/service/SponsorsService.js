import axios from "axios";

class SponsorsService {
  static BASE_URL = "http://localhost:8080";

  static async addSponsor(
    sponsor_name,
    sponsor_description,
    sponsorType,
    amount,
    contact_person,
    contact_email,
    proofFile,
    token
  ) {
    try {
        const formData = new FormData();
        formData.append('data', new Blob([JSON.stringify({
            sponsor_name,
            sponsor_description,
            sponsorType,
            amount,
            contact_person,
            contact_email
          })], { type: 'application/json' }));
        formData.append('file', proofFile);

      const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      };

      
      const response = await axios.post(`${SponsorsService.BASE_URL}/president/addSponsor`, formData, { headers });


      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async getAllSponsors(token) {
    try {
      const response = await axios.get(
        `${SponsorsService.BASE_URL}/president/getAllSponser`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async getSponsorById(sponsor_id,token) {
    try{

        const response = await axios.get(`${SponsorsService.BASE_URL}/president/getSponsor/${sponsor_id}`,
            {
                headers: {Authorization: `Bearer ${token}`}
            }
        )
        return response.data;
        
    }catch(err){
        throw err;
    }
}

  static async deleteSponsor(sponsor_id,token) {
    try {
      const response = await axios.delete(
        `${SponsorsService.BASE_URL}/president/deleteSponsor/${sponsor_id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async updateSponsor(sponsor_id, sponsor_name,
    sponsor_description,
    sponsorType,
    amount,
    contact_person,
    contact_email,
    proofFile, token) {
    try {
      const formData = new FormData();
      formData.append('data', new Blob([JSON.stringify({
          sponsor_name,
          sponsor_description,
          sponsorType,
          amount,
          contact_person,
          contact_email
        })], { type: 'application/json' }));
      formData.append('file', proofFile);

    const headers = {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`
    };


      const response = await axios.put(
        `${SponsorsService.BASE_URL}/president/updateSponsor/${sponsor_id}`,
        formData,
        {
          headers
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

export default SponsorsService;
