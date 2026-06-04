import { useState } from "react";
import { createElection } from "../services/electionService";

function CreateElection() {
    // 1. Corrected state structure using 'startTime' and 'endTime'
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

    // 2. Fixed reset form keys to match the state mapping exactly
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

        // Optional Frontend Validation: Ensure end time comes after start time
        if (new Date(formData.endTime) <= new Date(formData.startTime)) {
            setMessage({
                type: "error",
                text: "The End Date & Time must be after the Start Date & Time."
            });
            return;
        }

        try {
            setLoading(true);
            setMessage({ type: "", text: "" });

            // Sends the perfectly structured payload to your Spring Boot API
            await createElection(formData);

            setMessage({
                type: "success",
                text: "Election created successfully!"
            });

            resetForm();

        } catch (error) {
            console.error(error);

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
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">

                    <div className="card shadow">
                        <div className="card-body">

                            <h2 className="text-center mb-4">
                                Create Election
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
                                        Election Title
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        className="form-control"
                                        placeholder="Enter election title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        className="form-control"
                                        rows="4"
                                        placeholder="Enter election description"
                                        value={formData.description}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="row">

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">
                                            Start Date & Time
                                        </label>
                                        <input
                                            type="datetime-local"
                                            name="startTime"
                                            className="form-control"
                                            value={formData.startTime}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">
                                            End Date & Time
                                        </label>
                                        <input
                                            type="datetime-local"
                                            name="endTime"
                                            className="form-control"
                                            value={formData.endTime}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-success w-100"
                                    disabled={loading}
                                >
                                    {loading
                                        ? "Creating Election..."
                                        : "Create Election"}
                                </button>

                            </form>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default CreateElection;
