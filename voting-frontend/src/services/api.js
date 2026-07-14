import axios from "axios";

const API_URL = "http://16.171.10.108:8080/api/auth"
export const registerUser = (userData) => {
    return axios.post(`${API_URL}/register`, userData);
};

export const loginUser = (credentials) => {
    return axios.post(`${API_URL}/login`, credentials);
};