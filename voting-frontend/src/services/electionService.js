import axios from "axios";

const API_URL = "http://localhost:8080/api";

export const getAllElections = () => {

  const token = localStorage.getItem("token");

  return axios.get(
    `${API_URL}/elections/all`,
    {
      headers: { Authorization: `Bearer ${token}`}
    }
  );
};

export const createElection = async (electionData) => {
  const token = localStorage.getItem("token");

  return axios.post(
    `${API_URL}/elections`,electionData,
    {
      headers: {Authorization: `Bearer ${token}`}
    }
  );
};