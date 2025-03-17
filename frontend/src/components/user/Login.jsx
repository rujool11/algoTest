import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = formData;

    if (!username || !email || !password) {
      toast.error("All fields are required.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Invalid email format.");
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post(
        `${BACKEND_URL}/api/user/login`,
        formData,
      );

      toast.success("Login successful.");
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/problem");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="w-full max-w-sm" onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        className="w-full p-2 mb-3 bg-gray-800 text-white rounded"
        value={formData.username}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="w-full p-2 mb-3 bg-gray-800 text-white rounded"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="w-full p-2 mb-3 bg-gray-800 text-white rounded"
        value={formData.password}
        onChange={handleChange}
      />
      <button
        type="submit"
        className="w-full p-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default Login;
