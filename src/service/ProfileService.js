import axios from 'axios';

const API_URL = 'http://localhost:8080/api/profiles'; // Adjust to your backend URL

export const getProfiles = () => {
  return axios.get(API_URL);
};

export const getProfileById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

export const createProfile = (profile) => {
  return axios.post(API_URL, profile);
};

export const updateProfile = (id, profile) => {
  return axios.put(`${API_URL}/${id}`, profile);
};

export const deleteProfile = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
