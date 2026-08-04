import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}`;
console.log("Loaded API_URL:", API_URL);
export const registerUser = (userData) => {
    return axios.post(`${API_URL}/api/auth/register`, userData);
};

export const loginUser = (credentials) => {
    console.log("Loaded API_URL:", API_URL);
    return axios.post(`${API_URL}/api/auth/login`, credentials);
};