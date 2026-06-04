import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllElections } from "../services/electionService";

function Dashboard() {

    const navigate = useNavigate();

    const [elections, setElections] = useState([]);
    const [selectedTab, setSelectedTab] = useState("ACTIVE");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchElections();
    }, []);

    const fetchElections = async () => {
        try {
            const response = await getAllElections();
            setElections(response.data);
        } catch (error) {
            console.error("Error fetching elections:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredElections = elections.filter(
        election => election.status === selectedTab
    );

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    if (loading) {
        return (
            <div className="container mt-5 text-center">
                <h3>Loading Elections...</h3>
            </div>
        );
    }

    return (
        <div className="container mt-4">

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>User Dashboard</h2>

                <button
                    className="btn btn-danger"
                    onClick={logout}
                >
                    Logout
                </button>
            </div>

            <div className="btn-group w-100 mb-4">

                <button
                    className={`btn ${
                        selectedTab === "ACTIVE"
                            ? "btn-primary"
                            : "btn-outline-primary"
                    }`}
                    onClick={() => setSelectedTab("ACTIVE")}
                >
                    Active Elections
                </button>

                <button
                    className={`btn ${
                        selectedTab === "UPCOMING"
                            ? "btn-warning"
                            : "btn-outline-warning"
                    }`}
                    onClick={() => setSelectedTab("UPCOMING")}
                >
                    Upcoming Elections
                </button>

                <button
                    className={`btn ${
                        selectedTab === "COMPLETED"
                            ? "btn-success"
                            : "btn-outline-success"
                    }`}
                    onClick={() => setSelectedTab("COMPLETED")}
                >
                    Completed Elections
                </button>

            </div>

            <div className="row">

                {filteredElections.length === 0 ? (
                    <div className="col-12">
                        <div className="alert alert-info">
                            No elections found.
                        </div>
                    </div>
                ) : (

                    filteredElections.map((election) => (

                        <div
                            key={election.id}
                            className="col-md-6 mb-4"
                        >
                            <div className="card shadow-sm h-100">

                                <div className="card-body">

                                    <h4 className="card-title">
                                        {election.title}
                                    </h4>

                                    <p className="card-text">
                                        {election.description}
                                    </p>

                                    <p>
                                        <strong>Start:</strong>{" "}
                                        {new Date(
                                            election.startDate
                                        ).toLocaleString()}
                                    </p>

                                    <p>
                                        <strong>End:</strong>{" "}
                                        {new Date(
                                            election.endDate
                                        ).toLocaleString()}
                                    </p>

                                    {selectedTab === "ACTIVE" && (
                                        <button
                                            className="btn btn-primary"
                                            onClick={() =>
                                                navigate(
                                                    `/election/${election.id}`,
                                                    {
                                                        state: {
                                                            endTime:
                                                                election.endDate
                                                        }
                                                    }
                                                )
                                            }
                                        >
                                            Vote Now
                                        </button>
                                    )}

                                    {selectedTab === "UPCOMING" && (
                                        <button
                                            className="btn btn-secondary"
                                            disabled
                                        >
                                            Not Started Yet
                                        </button>
                                    )}

                                    {selectedTab === "COMPLETED" && (
                                        <button
                                            className="btn btn-success"
                                            onClick={() =>
                                                navigate(
                                                    `/results/${election.id}`
                                                )
                                            }
                                        >
                                            View Results
                                        </button>
                                    )}

                                </div>

                            </div>
                        </div>

                    ))
                )}

            </div>

        </div>
    );
}

export default Dashboard;