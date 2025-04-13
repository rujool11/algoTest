import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    const { username, email, password, confirmPassword } = formData;

    if (!username || !email || !password || !confirmPassword) {
      toast.error("All fields are required.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Invalid email format.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(
        `${BACKEND_URL}/api/user/register`,
        {
          username,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Registration successful.");
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/problems");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Registration failed. Please try again."
      );
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
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="w-full p-2 mb-3 bg-gray-800 text-white rounded"
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="w-full p-2 mb-3 bg-gray-800 text-white rounded"
        onChange={handleChange}
      />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        className="w-full p-2 mb-3 bg-gray-800 text-white rounded"
        onChange={handleChange}
      />
      <button
        type="submit"
        className="w-full p-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Sign Up"}
      </button>
    </form>
  );
};

export default Signup;
