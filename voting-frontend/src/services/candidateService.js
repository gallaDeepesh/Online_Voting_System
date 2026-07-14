import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}`;

export const getCandidatesByElection = (electionId) => {
    const token = localStorage.getItem("token");

    return axios.get(
        `${API_URL}/api/candidates/election/${electionId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};
export const addCandidate = async (candidateData) => {

    const token = localStorage.getItem("token");

    return axios.post(
        `${API_URL}/api/candidates`,
        candidateData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};