import { useState } from "react";
import "./style/Login.css"
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/api";
import { jwtDecode } from "jwt-decode";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");

        try {
            setLoading(true);

            const response = await loginUser(formData);

            // Store JWT Token
            localStorage.setItem("token", response.data);
            const decoded = jwtDecode(localStorage.getItem("token"));
            const role = decoded.role;
            console.log(role);

            setMessage("Login Successful");

            if (role === "ADMIN") {
                navigate("/AdminDashboard");
            }
            else {
                navigate("/Userdashboard");
            }

        } catch (error) {

            setMessage(
                error.response?.data?.message ||
                "Invalid Email or Password"
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="row justify-content-center w-100">
                <div className="col-md-6">

                    <div className="card login-card">
                        <div className="card-body">

                            <h2 className="login-title">
                                Login
                            </h2>

                            {message && (
                                <div className="alert alert-info">
                                    {message}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Password</label>

                                    <div className="password-container">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            className="form-control"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                        />

                                        <button
                                            type="button"
                                            className="show-password-btn"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? "Hide" : "Show"}
                                        </button>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary w-100 login-btn"
                                    disabled={loading}
                                >
                                    {loading ? "Logging In..." : "Login"}
                                </button>

                            </form>

                            <div className="login-link">
                                Don't have an account?{" "}
                                <Link to="/register">
                                    Register
                                </Link>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
export default Login;