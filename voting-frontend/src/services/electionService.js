import axios from "axios";

const API_URL = "http://localhost:8080/api";

export const getActiveElections = () => {

  const token = localStorage.getItem("token");

  return axios.get(
    `${API_URL}/elections/active`,
    {
      headers: { Authorization: `Bearer ${token}`}
    }
  );
};