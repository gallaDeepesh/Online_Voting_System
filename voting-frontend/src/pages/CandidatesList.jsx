import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom"; // 1. Added useNavigate
import { getCandidatesByElection } from "../services/candidateService";
import { castVote } from "../services/voteService";
import Countdown from "./Countdown.jsx";
import "./style/CandidateList.css";

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
    <div className="candidate-page-container">

      <div className="candidate-header">

        <div className="header-left">
          <h1>Candidates</h1>

          <p>
            Select your preferred candidate and cast your vote.
          </p>
        </div>

        <div className="header-right">
          <div className="countdown-box">
            <h4>Time Remaining</h4>
            <Countdown endDate={endTime} />
          </div>
        </div>

      </div>

      {electionEnded && (
        <div className="election-ended-banner">
          This election has ended.
        </div>
      )}

      {candidates.length === 0 ? (

        <div className="no-candidate-card">
          <h3>No Candidates Found</h3>
          <p>
            No candidates are currently available
            for this election.
          </p>
        </div>

      ) : (

        <div className="candidate-grid">

          {candidates.map((candidate) => (

            <div
              key={candidate.id}
              className="candidate-card"
            >

              <h3 className="candidate-name">
                {candidate.name}
              </h3>

              <div className="candidate-details">

                {candidate.partyName && (
                  <p>
                    <strong>Party:</strong>{" "}
                    {candidate.partyName}
                  </p>
                )}

                {candidate.symbol && (
                  <p>
                    <strong>Symbol:</strong>{" "}
                    {candidate.symbol}
                  </p>
                )}

              </div>

              <button
                className={`vote-btn ${electionEnded
                    ? "vote-disabled"
                    : ""
                  }`}
                onClick={() =>
                  handleVote(candidate.id)
                }
                disabled={electionEnded}
              >
                {electionEnded
                  ? "Voting Closed"
                  : "Vote"}
              </button>

            </div>

          ))}

        </div>

      )}

      <div className="results-section">

        {electionEnded ? (

          <button
            className="results-btn"
            onClick={() =>
              navigate(`/results/${electionId}`)
            }
          >
            View Results
          </button>

        ) : (

          <div className="results-pending">
            Election results will be available
            after voting ends.
          </div>

        )}

      </div>

    </div>
  );
}

export default CandidateList;
