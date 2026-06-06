import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    getResults,
    getWinner,
    getStats
} from "../services/resultService";
import { useNavigate } from "react-router-dom";
import "./style/Result.css";

function Result() {
    const navigate = useNavigate();

    const { electionId } = useParams();

    const [results, setResults] = useState([]);
    const [winner, setWinner] = useState(null);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    

    useEffect(() => {

        const fetchResults = async () => {

            try {

                const [
                    resultsData,
                    winnerData,
                    statsData
                ] = await Promise.all([
                    getResults(electionId),
                    getWinner(electionId),
                    getStats(electionId)
                ]);
                
                setResults(resultsData);
                setWinner(winnerData);
                setStats(statsData);

            } catch (err) {

                setError(
                    err.response?.data ||
                    "Unable to load election results"
                );

            } finally {
                setLoading(false);
            }
        };

        fetchResults();

    }, [electionId]);

if (loading) {
    return (
        <div className="result-loading">
            Loading Results...
        </div>
    );
}

if (error) {
    return (
        <div className="result-container">

            <div className="page-header">

                <div>
                    <h1>Election Results</h1>
                    <p>Election outcome and statistics</p>
                </div>

            </div>

            <div className="error-card">
                {error}
            </div>

        </div>
    );
}

return (
    <div className="result-container">

        <div className="page-header">

            <div>
                <h1>Election Results</h1>
                <p>
                    View election outcome and voting statistics
                </p>
            </div>

            <button
                className="back-btn"
                onClick={() => navigate(-1)}
            >
                Back
            </button>

        </div>

        {stats && (

            <div className="stats-grid">

                <div className="stat-card">
                    <h3>Total Votes</h3>
                    <span>{stats.totalVotes}</span>
                </div>

                <div className="stat-card">
                    <h3>Total Candidates</h3>
                    <span>{stats.totalCandidates}</span>
                </div>

                <div className="stat-card">
                    <h3>Winner</h3>
                    <span>{stats.winner}</span>
                </div>

            </div>

        )}

        {winner && (

            <div className="winner-card">

                <div className="winner-icon">
                    🏆
                </div>

                <div>
                    <h2>Election Winner</h2>

                    <h3>
                        {winner.candidateName}
                    </h3>

                    <p>
                        Total Votes:
                        {" "}
                        {winner.totalVotes}
                    </p>
                </div>

            </div>

        )}

        <div className="results-table-card">

            <h2>Candidate Results</h2>

            <table className="results-table">

                <thead>
                    <tr>
                        <th>Candidate</th>
                        <th>Votes</th>
                    </tr>
                </thead>

                <tbody>

                    {results.map((result) => (

                        <tr
                            key={result.candidateId}
                        >
                            <td>
                                {result.candidateName}
                            </td>

                            <td>
                                {result.totalVotes}
                            </td>
                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    </div>
);
}

export default Result;