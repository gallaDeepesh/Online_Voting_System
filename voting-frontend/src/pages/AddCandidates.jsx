import { useState, useEffect } from "react";
import { getAllElections } from "../services/electionService";
import { addCandidate } from "../services/candidateService";
import { useNavigate } from "react-router-dom";
import "./style/AddCandidates.css";

function AddCandidates() {
    const navigate =useNavigate();
    const [elections, setElections] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        partyName: "",
        symbol: "",
        electionId: ""
    });

    const [message, setMessage] = useState({
        type: "",
        text: ""
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchElections();
    }, []);

    const fetchElections = async () => {
        try {
            const response = await getAllElections();
            
            // 1. Fixed: Guarded array method against undefined or non-array values safely
            const rawElections = Array.isArray(response) ? response : response?.data || [];
            
            const activeElections = rawElections.filter(
                election => election && election.status === "ACTIVE"
            );

            setElections(activeElections);
        } catch (error) {
            console.error("Error fetching elections:", error);
            setMessage({
                type: "error",
                text: "Failed to load active elections list."
            });
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const resetForm = () => {
        setFormData({
            name: "",
            partyName: "",
            symbol: "",
            electionId: ""
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setMessage({ type: "", text: "" });

            await addCandidate({
                ...formData,
                electionId: Number(formData.electionId)
            });

            setMessage({
                type: "success",
                text: "Candidate added successfully!"
            });

            resetForm();
        } catch (error) {
            console.error(error);
            setMessage({
                type: "error",
                text:
                    error.response?.data?.message ||
                    error.response?.data ||
                    "Failed to add candidate."
            });
        } finally {
            setLoading(false);
        }
    };

    return (
    <div className="add-candidate-container">

        <div className="page-header">

            <div>
                <h1>Add Candidate</h1>
                <p>
                    Add candidates to active elections
                </p>
            </div>

            <button
                className="back-btn"
                onClick={() =>
                    navigate("/AdminDashboard")
                }
            >
                Back
            </button>

        </div>

        <div className="add-candidate-card">

            {message.text && (
                <div
                    className={`message-alert ${
                        message.type === "success"
                            ? "success-alert"
                            : "error-alert"
                    }`}
                >
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit}>

                <div className="form-group">
                    <label>Candidate Name</label>

                    <input
                        type="text"
                        name="name"
                        className="custom-input"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter candidate name"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Party Name</label>

                    <input
                        type="text"
                        name="partyName"
                        className="custom-input"
                        value={formData.partyName}
                        onChange={handleChange}
                        placeholder="Enter party name"
                    />
                </div>

                <div className="form-group">
                    <label>Symbol</label>

                    <input
                        type="text"
                        name="symbol"
                        className="custom-input"
                        value={formData.symbol}
                        onChange={handleChange}
                        placeholder="Enter election symbol"
                    />
                </div>

                <div className="form-group">
                    <label>Active Election</label>

                    <select
                        name="electionId"
                        className="custom-select"
                        value={formData.electionId}
                        onChange={handleChange}
                        required
                    >
                        {elections.length === 0 ? (
                            <option value="">
                                No Active Elections Available
                            </option>
                        ) : (
                            <>
                                <option value="">
                                    Select Active Election
                                </option>

                                {elections.map((election) => (
                                    <option
                                        key={election.id}
                                        value={election.id}
                                    >
                                        {election.title}
                                    </option>
                                ))}
                            </>
                        )}
                    </select>
                </div>

                <button
                    type="submit"
                    className="add-candidate-btn"
                    disabled={
                        loading ||
                        elections.length === 0
                    }
                >
                    {loading
                        ? "Adding Candidate..."
                        : "Add Candidate"}
                </button>

            </form>

        </div>

    </div>
);
}

export default AddCandidates;