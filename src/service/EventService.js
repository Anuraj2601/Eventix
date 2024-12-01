import axios from "axios";

class EventService {
  static BASE_URL = "https://eventix-spring-production.up.railway.app";

  static async saveEvent(
    name,
    venue,
    date,
    time,
    purpose,
    benefits,
    eventImage,
    budgetFile,
    public_status,
    club_id,
    token
  ) {
    try {
      const formData = new FormData();
      formData.append(
        "data",
        new Blob(
          [
            JSON.stringify({
              name,
              venue,
              date,
              time,
              purpose,
              benefits,
              public_status,
              club_id,
            }),
          ],
          { type: "application/json" }
        )
      );
      if (eventImage) formData.append("eventImage", eventImage);
      if (budgetFile) formData.append("budgetFile", budgetFile);

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };

      console.log("Request Data:", formData);
      console.log("Request Headers:", headers);

      const response = await axios.post(
        `${EventService.BASE_URL}/event/saveEvent`,
        formData,
        { headers }
      );

      return response.data;
    } catch (err) {
      console.error("Error saving event:", err);
      throw err;
    }
  }

  static async getAllEventsById(club_id, token) {
    try {
      const response = await axios.get(
        `${EventService.BASE_URL}/event/getEventsByClub/${club_id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  }

  static async getAllEvents(token) {
    try {
      const response = await axios.get(
        `${EventService.BASE_URL}/event/getAllEvents`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data; // Return the response data from the API
    } catch (error) {
      console.error("Error fetching events:", error);
      throw error; // Throw the error if request fails
    }
  }

  static async getEvent(event_id, token) {
    try {
      const response = await axios.get(
        `${EventService.BASE_URL}/event/getEvent/${event_id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data; // Return the response data from the API
    } catch (error) {
      console.error("Error fetching events:", error);
      throw error; // Throw the error if request fails
    }
  }

  static async getAllEventslanding() {
    try {
      const response = await axios.get(
        `${EventService.BASE_URL}/event/getAllEvents`,
        {}
      );
      return response.data; // Return the response data from the API
    } catch (error) {
      console.error("Error fetching events:", error);
      throw error; // Throw the error if request fails
    }
  }

  static async getAllEventsWithClubs(token) {
    try {
      const response = await axios.get(
        `${EventService.BASE_URL}/event/getAllEventsWithClubs`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data; // Return the response data from the API
    } catch (error) {
      console.error("Error fetching events:", error);
      throw error; // Throw the error if request fails
    }
  }

  static async updateBudgetStatus(eventId, status, role, token) {
    try {
      const response = await axios.put(
        `${EventService.BASE_URL}/event/updateBudgetStatus/${eventId}`,
        null,
        {
          params: { status, role },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating budget status:", error);
      throw error;
    }
  }

  static async updateIudStatus(eventId, status, role, token) {
    try {
      const response = await axios.put(
        `${EventService.BASE_URL}/event/updateIudStatus/${eventId}`,
        null,
        {
          params: { status, role },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating IUD status:", error);
      throw error;
    }
  }

  static async deleteEventById(eventId, token) {
    try {
      // Make the DELETE request to the backend
      const response = await axios.delete(
        `${EventService.BASE_URL}/event/deleteEvent/${eventId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data; // Return the response data from the API
    } catch (error) {
      console.error("Error deleting event:", error);
      throw error; // Throw the error if request fails
    }
  }

  static async updateEvent(eventId, jsonData, eventImage, budgetFile, token) {
    try {
      const formData = new FormData();

      // Add JSON data as a "data" field
      formData.append("data", new Blob([JSON.stringify(jsonData)], { type: "application/json" }));

      // Append files if they exist
      if (eventImage) formData.append("eventImage", eventImage);
      if (budgetFile) formData.append("budgetFile", budgetFile);

      // Logging FormData for debugging
      console.log("FormData contents:");
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value instanceof File ? value.name : value);
      }

      const headers = {
        Authorization: `Bearer ${token}`,
//"Content-Type": "multipart/form-data",
      };

      console.log("Request Data:", formData);
      console.log("Request Headers:", headers);

      const response = await axios.put(`${EventService.BASE_URL}/event/updateEvent/${eventId}`, formData, { headers });

      return response.data;
    } catch (err) {
      console.error("Error updating event:", err);
      throw err;
    }
  }

  static async downloadEventProposal(eventId, token) {
    try {
      const response = await axios.get(
        `${EventService.BASE_URL}/event/${eventId}/download-proposal`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob", // Ensures the response is treated as a binary file
        }
      );
      return response; // Return the full Axios response
    } catch (error) {
      console.error("Error downloading event proposal:", error);
      throw error; // Throw the error for further handling
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

export default EventService;
