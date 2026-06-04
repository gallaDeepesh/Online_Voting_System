import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom"; // 1. Added useNavigate
import { getCandidatesByElection } from "../services/candidateService";
import { castVote } from "../services/voteService";
import Countdown from "./Countdown.jsx";

function CandidateList() {
  const { electionId } = useParams();
  const navigate = useNavigate(); // 2. Initialized navigate hook
  const location = useLocation(); 
  const endTime = location.state?.endTime;

  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  // 3. Keep track of whether the election has ended globally in the component
  const [electionEnded, setElectionEnded] = useState(false);

  useEffect(() => {
    fetchCandidates();
    
    // 4. Check if the election is already ended when the page loads
    if (endTime) {
      setElectionEnded(new Date(endTime) <= new Date());
    }
  }, [endTime]);

  const fetchCandidates = async () => {
    try {
      const response = await getCandidatesByElection(electionId);
      setCandidates(response.data);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (candidateId) => {
    // 5. Block voting if the election has ended
    if (electionEnded) {
      alert("This election has already completed.");
      return;
    }

    try {
      const voteData = {
        electionId: Number(electionId),
        candidateId: candidateId,
      };

      const response = await castVote(voteData);
      alert(response.data);
    } catch (error) {
      console.error("Voting Error:", error);
      alert(
        error.response?.data ||
          error.response?.data?.message ||
          "Failed to cast vote"
      );
    }
  };

  if (loading) {
    return <h2>Loading candidates...</h2>;
  }

  return (
    <div>
      <Countdown endDate={endTime} />
      <h1>Candidates</h1>

      {candidates.length === 0 ? (
        <p>No candidates found for this election.</p>
      ) : (
        candidates.map((candidate) => (
          <div
            key={candidate.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "10px",
              borderRadius: "8px",
            }}
          >
            <h3>{candidate.name}</h3>

            {/* If voting is over, disable the vote button */}
            <button 
              onClick={() => handleVote(candidate.id)} 
              disabled={electionEnded}
              style={{ backgroundColor: electionEnded ? "#ccc" : "" }}
            >
              {electionEnded ? "Voting Closed" : "Vote"}
            </button>
          </div>
        ))
      )}

      <div style={{ marginTop: "20px" }}>
        {electionEnded ? (
          <button onClick={() => navigate(`/results/${electionId}`)}> {/* 6. Fixed electionId */}
            View Results
          </button>
        ) : (
          <p>Election results will be shown after the election is completed.</p>
        )}
      </div>
    </div>
  );
}

export default CandidateList;
