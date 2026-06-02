import axios from "axios";

const API_URL = "http://localhost:8080";

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