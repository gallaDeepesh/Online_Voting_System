import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createElection } from "../services/electionService";
import "./style/CreateElection.css";

function CreateElection() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        startTime: "",
        endTime: ""
    });

    const [message, setMessage] = useState({
        type: "",
        text: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const resetForm = () => {
        setFormData({
            title: "",
            description: "",
            startTime: "",
            endTime: ""
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            new Date(formData.endTime) <=
            new Date(formData.startTime)
        ) {
            setMessage({
                type: "error",
                text: "End time must be after start time."
            });
            return;
        }

        try {
            setLoading(true);
            setMessage({ type: "", text: "" });

            await createElection(formData);

            setMessage({
                type: "success",
                text: "Election created successfully!"
            });

            resetForm();

        } catch (error) {

            setMessage({
                type: "error",
                text:
                    error.response?.data?.message ||
                    "Failed to create election."
            });

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-election-container">

            <div className="page-header">

                <div>
                    <h1>Create Election</h1>
                    <p>
                        Schedule and configure a new election
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

            <div className="create-election-card">

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
                        <label>Election Title</label>

                        <input
                            type="text"
                            name="title"
                            className="custom-input"
                            placeholder="Enter election title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>

                        <textarea
                            name="description"
                            className="custom-textarea"
                            rows="5"
                            placeholder="Enter election description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="datetime-row">

                        <div className="form-group">
                            <label>Start Date & Time</label>

                            <input
                                type="datetime-local"
                                name="startTime"
                                className="custom-input"
                                value={formData.startTime}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>End Date & Time</label>

                            <input
                                type="datetime-local"
                                name="endTime"
                                className="custom-input"
                                value={formData.endTime}
                                onChange={handleChange}
                                required
                            />
                        </div>

                    </div>

                    <button
                        type="submit"
                        className="create-election-btn"
                        disabled={loading}
                    >
                        {loading
                            ? "Creating Election..."
                            : "Create Election"}
                    </button>

                </form>

            </div>

        </div>
    );
}

export default CreateElection;