import axios from "axios";

class ClubsService {
  static BASE_URL = "https://eventix-spring-production.up.railway.app";

  static async addClub(club_name, club_in_charge, club_description, club_image, token) {
    try {

      
      const formData = new FormData();
      formData.append('data', new Blob([JSON.stringify({
        club_name,
        //club_president_id,
        club_in_charge,
        club_description,
       
        //id

    })], {type: 'application/json'}));
      if (club_image) {
        formData.append("file", club_image);
      }

      const headers = {
        "Content-Type": "mulltipart/form-data",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(
        `${ClubsService.BASE_URL}/clubs/addClub`,
        formData,
        { headers }
      );

      return response.data;
      
    } catch (err) {
      throw err;
    }
  }

  static async getAllClubs(token) {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(
        `${ClubsService.BASE_URL}/clubs/getAllClubs`,
        { headers }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async getAllClubslanding() {
    try {
      const response = await axios.get(
        `${ClubsService.BASE_URL}/clubs/getAllClubs`
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }
  

  static async getClubById(club_id, token) {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(
        `${ClubsService.BASE_URL}/clubs/getClub/${club_id}`,
        { headers }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async deleteClub(club_id, token) {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.delete(
        `${ClubsService.BASE_URL}/clubs/deleteClub/${club_id}`,
        { headers }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async updateClub(club_id, clubData, file, token) {
    try {
      const formData = new FormData();
      formData.append(
        'data',
        new Blob([JSON.stringify(clubData)], { type: 'application/json' })
      );
      if (file) {
        formData.append('file', file);
      }

      const headers = {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.put(
        `${ClubsService.BASE_URL}/clubs/updateClub/${club_id}`,
        formData,
        { headers }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

  static isAuthenticated() {
    const token = localStorage.getItem('token');
    return !!token;
  }
}

export default ClubsService;
