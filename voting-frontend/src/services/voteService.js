import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}`;

export const castVote = (voteData) => {

    const token = localStorage.getItem("token");

    return axios.post(
        `${API_URL}/vote`,
        voteData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};