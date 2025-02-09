import { useState } from "react";
import { toast } from "react-toastify";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePicture: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file || (file.type !== "image/jpeg" && file.type !== "image/png")) {
      toast.error("Only JPEG/PNG images are allowed.");
      return;
    }

    setLoading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "WeChat");
    data.append("cloud_name", "ddlr4zdn7");

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/ddlr4zdn7/upload", {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      setFormData({ ...formData, profilePicture: result.url });
      toast.success("Image uploaded successfully.");
    } catch (error) {
      toast.error("Image upload failed. Try again.");
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword, profilePicture } = formData;

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

    const newFormData = new FormData();
    newFormData.append("username", username);
    newFormData.append("email", email);
    newFormData.append("password", password);
    if (profilePicture) newFormData.append("profilePicture", profilePicture);

    setLoading(true);
    try {
      const { data } = await axios.post(
        `${BACKEND_URL}/api/user/register`,
        newFormData,
        { headers: { "Content-Type": "application/json" } }
      );

      toast.success("Registration successful.");
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/content");

    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }

  };

  return (
    <form className="w-full max-w-sm" onSubmit={handleSubmit}>
      <input type="text" name="username" placeholder="Username" className="w-full p-2 mb-3 bg-gray-800 text-white rounded" onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" className="w-full p-2 mb-3 bg-gray-800 text-white rounded" onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" className="w-full p-2 mb-3 bg-gray-800 text-white rounded" onChange={handleChange} />
      <input type="password" name="confirmPassword" placeholder="Confirm Password" className="w-full p-2 mb-3 bg-gray-800 text-white rounded" onChange={handleChange} />
      <input type="file" accept="image/jpeg, image/png" className="w-full file:p-1 p-2 mb-3 file:bg-blue-700 file:rounded bg-gray-800 text-white rounded" onChange={handleFileChange} />
      <button type="submit" className="w-full  p-2 bg-blue-600 hover:bg-blue-700 text-white rounded" disabled={loading}>
        {loading ? "Uploading..." : "Sign Up"}
      </button>
    </form>
  );
};

export default Signup;
