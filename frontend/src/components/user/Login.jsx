import { useState } from "react";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
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
  };

  return (
    <form className="w-full max-w-sm" onSubmit={handleSubmit}>
      <input type="text" name="username" placeholder="Username" className="w-full p-2 mb-3 bg-gray-800 text-white rounded" onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" className="w-full p-2 mb-3 bg-gray-800 text-white rounded" onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" className="w-full p-2 mb-3 bg-gray-800 text-white rounded" onChange={handleChange} />
      <button type="submit" className="w-full p-2 bg-blue-600 hover:bg-blue-700 text-white rounded">Login</button>
    </form>
  );
};

export default Login;
