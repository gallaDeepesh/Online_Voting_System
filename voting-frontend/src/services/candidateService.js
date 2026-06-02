import axios from "axios";

const API_URL = "http://localhost:8080/api";

export const getCandidatesByElection = (electionId) => {
    const token = localStorage.getItem("token");

    return axios.get(
        `${API_URL}/candidates/election/${electionId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};