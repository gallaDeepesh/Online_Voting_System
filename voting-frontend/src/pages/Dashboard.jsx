import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllElections } from "../services/electionService";
import "./style/Dashboard.css";

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
        navigate("/");
    };

    if (loading) {
        return (
            <div className="dashboard-loading">
                <h3>Loading Elections...</h3>
            </div>
        );
    }

    return (
        <div className="dashboard-container">

            {/* Header */}
            <div className="dashboard-header">

                <div>
                    <h1 className="dashboard-title">
                        Online Voting System
                    </h1>

                    <p className="dashboard-subtitle">
                        Participate in elections securely and transparently
                    </p>
                </div>

                <button
                    className="logout-btn"
                    onClick={logout}
                >
                    Logout
                </button>

            </div>

            {/* Tabs */}
            <div className="dashboard-tabs">

                <button
                    className={`tab-btn ${
                        selectedTab === "ACTIVE"
                            ? "active-tab"
                            : ""
                    }`}
                    onClick={() => setSelectedTab("ACTIVE")}
                >
                    Active Elections
                </button>

                <button
                    className={`tab-btn ${
                        selectedTab === "UPCOMING"
                            ? "active-tab"
                            : ""
                    }`}
                    onClick={() => setSelectedTab("UPCOMING")}
                >
                    Upcoming Elections
                </button>

                <button
                    className={`tab-btn ${
                        selectedTab === "COMPLETED"
                            ? "active-tab"
                            : ""
                    }`}
                    onClick={() => setSelectedTab("COMPLETED")}
                >
                    Completed Elections
                </button>

            </div>

            {/* Elections Grid */}
            <div className="elections-grid">

                {filteredElections.length === 0 ? (

                    <div className="no-election-card">
                        <h4>No elections available</h4>
                        <p>
                            There are currently no elections
                            under this category.
                        </p>
                    </div>

                ) : (

                    filteredElections.map((election) => (

                        <div
                            key={election.id}
                            className="election-card"
                        >

                            <div className="election-card-header">

                                <h3 className="election-title">
                                    {election.title}
                                </h3>

                                <span
                                    className={`status-badge ${selectedTab.toLowerCase()}`}
                                >
                                    {selectedTab}
                                </span>

                            </div>

                            <p className="election-description">
                                {election.description}
                            </p>

                            <div className="election-details">

                                <div className="detail-item">
                                    <strong>Start Date:</strong>
                                    <span>
                                        {new Date(
                                            election.startTime
                                        ).toLocaleDateString('en-GB')}
                                    </span>
                                </div>

                                <div className="detail-item">
                                    <strong>End Date:</strong>
                                    <span>
                                        {new Date(
                                            election.endTime
                                        ).toLocaleDateString('en-GB')}
                                    </span>
                                </div>

                            </div>

                            <div className="card-footer-custom">

                                {selectedTab === "ACTIVE" && (
                                    <button
                                        className="vote-btn"
                                        onClick={() =>
                                            navigate(
                                                `/election/${election.id}`,
                                                {
                                                    state: {
                                                        endTime:
                                                            election.endTime
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
                                        className="disabled-btn"
                                        disabled
                                    >
                                        Not Started Yet
                                    </button>
                                )}

                                {selectedTab === "COMPLETED" && (
                                    <button
                                        className="result-btn"
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

                    ))
                )}

            </div>

        </div>
    );
}

export default Dashboard;