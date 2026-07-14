import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}`;

export const getAllElections = () => {

  const token = localStorage.getItem("token");

  return axios.get(
    `${API_URL}/api/elections/all`,
    {
      headers: { Authorization: `Bearer ${token}`}
    }
  );
};

export const createElection = async (electionData) => {
  const token = localStorage.getItem("token");

  return axios.post(
    `${API_URL}/api/elections`,electionData,
    {
      headers: {Authorization: `Bearer ${token}`}
    }
  );
};