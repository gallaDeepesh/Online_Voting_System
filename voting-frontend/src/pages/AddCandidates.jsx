import { useState, useEffect } from "react";
import { getAllElections } from "../services/electionService";
import { addCandidate } from "../services/candidateService";

function AddCandidates() {
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
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">

                    <div className="card shadow">
                        <div className="card-body">

                            <h2 className="text-center mb-4">
                                Add Candidate
                            </h2>

                            {message.text && (
                                <div
                                    className={`alert ${
                                        message.type === "success"
                                            ? "alert-success"
                                            : "alert-danger"
                                    }`}
                                >
                                    {message.text}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Candidate Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Party Name
                                    </label>
                                    <input
                                        type="text"
                                        name="partyName"
                                        className="form-control"
                                        value={formData.partyName}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Symbol
                                    </label>
                                    <input
                                        type="text"
                                        name="symbol"
                                        className="form-control"
                                        value={formData.symbol}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label">
                                        Active Election
                                    </label>
                                    <select
                                        name="electionId"
                                        className="form-select"
                                        value={formData.electionId}
                                        onChange={handleChange}
                                        required
                                    >
                                        {/* 2. Fixed: Informational context fallback when zero options are loaded */}
                                        {elections.length === 0 ? (
                                            <option value="">No Active Elections Available</option>
                                        ) : (
                                            <>
                                                <option value="">Select Active Election</option>
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
                                    className="btn btn-primary w-100"
                                    disabled={loading || elections.length === 0}
                                >
                                    {loading ? "Adding Candidate..." : "Add Candidate"}
                                </button>

                            </form>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default AddCandidates;