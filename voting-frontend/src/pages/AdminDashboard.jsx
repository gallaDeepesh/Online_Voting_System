import { useNavigate } from "react-router-dom";
import { useState } from "react";


function AdminDashboard() {

    const [elections, setElections] = useState([]);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };


    return (
        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-8">

                    <div className="card shadow">

                        <div className="card-body">

                            <h1 className="text-center mb-3">
                                Admin Dashboard
                            </h1>

                            <p className="text-center text-muted mb-4">
                                Manage Elections and Candidates
                            </p>

                            <div className="d-grid gap-3">

                                <button
                                    className="btn btn-success btn-lg"
                                    onClick={() => navigate("/admin/create-election")}
                                >
                                    Create Election
                                </button>

                                <button
                                    className="btn btn-primary btn-lg"
                                    onClick={() => navigate("/admin/Addcandidates")}
                                >
                                    Add Candidate
                                </button>

                                <button
                                    className="btn btn-warning btn-lg"
                                    onClick={() => navigate("/admin/manage-elections")}
                                >
                                    Manage Elections
                                </button>

                                <button
                                    className="btn btn-danger btn-lg"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default AdminDashboard;