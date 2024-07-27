import axios from "axios";

class SponsorsService {
  static BASE_URL = "http://localhost:8080";

  static async addSponsor(
    sponsorName,
    sponsorDescription,
    sponsorType,
    amount,
    contactPerson,
    contactEmail,
    proofFile,
    token
  ) {
    try {
        const formData = new FormData();
        formData.append('data', new Blob([JSON.stringify({
            sponsorName,
            sponsorDescription,
            sponsorType,
            amount,
            contactPerson,
            contactEmail
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

  static async deleteSponsor(token) {
    try {
      const response = await axios.delete(
        `${UsersService.BASE_URL}/president/delete/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async updateSponsor(userData, token) {
    try {
      const response = await axios.put(
        `${UsersService.BASE_URL}/president/updateSponsor`,
        userData,
        {
          headers: { Authorization: `Bearer${token}` },
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
