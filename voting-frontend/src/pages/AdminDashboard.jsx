import { useNavigate } from "react-router-dom";
import "./style/AdminDashboard.css";

function AdminDashboard() {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className="admin-dashboard-container">

            <div className="admin-dashboard-header">

                <div>
                    <h1 className="admin-dashboard-title">
                        Admin Dashboard
                    </h1>

                    <p className="admin-dashboard-subtitle">
                        Manage elections, candidates and voting activities
                    </p>
                </div>

                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>

            <div className="admin-actions-grid">

                <div
                    className="admin-action-card"
                    onClick={() =>
                        navigate("/admin/create-election")
                    }
                >
                    <h3>Create Election</h3>

                    <p>
                        Create and schedule new elections
                        for voters.
                    </p>

                    <button className="action-btn create-btn">
                        Create Election
                    </button>
                </div>

                <div
                    className="admin-action-card"
                    onClick={() =>
                        navigate("/admin/Addcandidates")
                    }
                >
                    <h3>Add Candidate</h3>

                    <p>
                        Add candidates and assign them
                        to elections.
                    </p>

                    <button className="action-btn candidate-btn">
                        Add Candidate
                    </button>
                </div>

                <div
                    className="admin-action-card"
                    onClick={() =>
                        navigate("/admin/manage-elections")
                    }
                >
                    <h3>Manage Elections</h3>

                    <p>
                        View, edit and monitor all
                        election activities.
                    </p>

                    <button className="action-btn manage-btn">
                        Manage Elections
                    </button>
                </div>

            </div>

        </div>
    );
}

export default AdminDashboard;