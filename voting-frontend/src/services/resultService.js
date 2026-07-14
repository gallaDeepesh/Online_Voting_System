import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/results `;

// Helper function to dynamically generate authorization headers
const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

export const getResults = async (electionId) => {
    const response = await axios.get(
        `${API_URL}/api/${electionId}`,
        getAuthHeaders() // Pass headers as the second argument for GET requests
    );
    return response.data;
};

export const getWinner = async (electionId) => {
    const response = await axios.get(
        `${API_URL}/api/${electionId}/winner`,
        getAuthHeaders()
    );
    return response.data;
};

export const getStats = async (electionId) => {
    const response = await axios.get(
        `${API_URL}/api/${electionId}/stats`,
        getAuthHeaders()
    );
    return response.data;
};
