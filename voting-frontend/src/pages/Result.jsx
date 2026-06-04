import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    getResults,
    getWinner,
    getStats
} from "../services/resultService";

function Result() {

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
        return <h2>Loading results...</h2>;
    }

    if (error) {
        return (
            <div>
                <h2>Results</h2>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="container">
            <h1>Election Results</h1>

            {stats && (
                <div
                    style={{
                        border: "1px solid #ddd",
                        padding: "15px",
                        marginBottom: "20px"
                    }}
                >
                    <h2>Election Statistics</h2>

                    <p>
                        <strong>Total Votes:</strong>{" "}
                        {stats.totalVotes}
                    </p>

                    <p>
                        <strong>Total Candidates:</strong>{" "}
                        {stats.totalCandidates}
                    </p>

                    <p>
                        <strong>Winner:</strong>{" "}
                        {stats.winner}
                    </p>
                </div>
            )}

            {winner && (
                <div
                    style={{
                        border: "1px solid green",
                        padding: "15px",
                        marginBottom: "20px"
                    }}
                >
                    <h2>Winner</h2>

                    <p>
                        <strong>{winner.candidateName}</strong>
                    </p>

                    <p>
                        Votes: {winner.totalVotes}
                    </p>
                </div>
            )}

            <h2>Candidate Results</h2>

            <table
                border="1"
                cellPadding="10"
                style={{
                    width: "100%",
                    borderCollapse: "collapse"
                }}
            >
                <thead>
                    <tr>
                        <th>Candidate</th>
                        <th>Votes</th>
                    </tr>
                </thead>

                <tbody>
                    {results.map((result) => (
                        <tr key={result.candidateId}>
                            <td>{result.candidateName}</td>
                            <td>{result.totalVotes}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Result;