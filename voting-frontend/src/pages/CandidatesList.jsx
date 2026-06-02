import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCandidatesByElection } from "../services/candidateService";
import { castVote } from "../services/voteService";

function CandidateList() {
  const { electionId } = useParams();

  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCandidates();
  }, []);

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

            {/* Uncomment if available in response */}
            {/* <p>{candidate.party}</p> */}
            {/* <p>{candidate.description}</p> */}

            <button onClick={() => handleVote(candidate.id)}>
              Vote
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default CandidateList;