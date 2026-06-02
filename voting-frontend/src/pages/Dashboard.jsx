import { useEffect, useState } from "react";
import { getActiveElections } from "../services/electionService";
import { useNavigate, Link } from "react-router-dom";

function Dashboard() {

    const navigate = useNavigate();
  const [elections, setElections] = useState([]);

  useEffect(() => {
    fetchElections();
  }, []);

  const fetchElections = async () => {
    try {
      const response = await getActiveElections();
      setElections(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Active Elections</h1>

      {elections.map((election) => (
  <div
    key={election.id}
    onClick={() =>
      navigate(`/election/${election.id}`)
    }
  >
    <h3>{election.title}</h3>
    <p>{election.description}</p>
  </div>
))}
    </div>
  );
}

export default Dashboard;