import axios from "axios";

const API_URL = "http://localhost:5000/api/God"; 

export const getGods = () => axios.get(API_URL);
export const getGodById = (id) => axios.get(`${API_URL}/${id}`);
export const addGod = (God) => axios.post(API_URL, God);
export const updateGod = (id, God) => axios.put(`${API_URL}/${id}`, God);
export const deleteGod = (id) => axios.delete(`${API_URL}/${id}`);
