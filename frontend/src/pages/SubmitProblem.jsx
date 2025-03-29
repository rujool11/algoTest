import { useState, useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import problemSettingSvg from "../assets/problem_setting.svg";
import { Context } from "../main";
import Logout from "../components/user/Logout";
import ProblemNav from "../components/problems/ProblemNav";
import TestCaseNav from "../components/misc/TestCaseNav";
import DeleteNav from "../components/misc/DeleteNav";

const SubmitProblem = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const { isAuthorized, user } = useContext(Context); 

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    sampleInput: "",
    sampleOutput: "",
    difficulty: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, description, sampleInput, sampleOutput, difficulty, password } = formData;

    if (!name || !description || !sampleInput || !sampleOutput || !difficulty || !password) {
      toast.error("All fields are required.");
      return;
    }

    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      await axios.post(`${BACKEND_URL}/api/problem`, formData, config);
      toast.success("Problem submitted successfully!");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Submission failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <nav className="px-16 pt-6 bg-gray-900 shadow-md">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-white">
            Problem Submission
          </h1>
          <div className="flex items-center space-x-4">
            <ProblemNav />
            <TestCaseNav />
            <DeleteNav />
            <Logout />
          </div>
        </div>
      </nav>
      <div className="min-h-screen flex bg-gray-900">
        {/* Art */}
        <div className="w-3/7 flex items-center justify-center">
          <img
            src={problemSettingSvg}
            alt="Problem Setting Illustration"
            className="w-3/4"
          />
        </div>
        {/* Form */}
        <div className="w-4/7 flex flex-col items-center justify-center">
          <h1 className="w-full text-center text-3xl text-white font-bold mb-4">
            Fill Problem Details
          </h1>
          <form className="w-full max-w-lg" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Problem Name"
              className="w-full p-2 mb-3 bg-gray-800 text-white rounded"
              value={formData.name}
              onChange={handleChange}
            />
            <textarea
              name="description"
              placeholder="Problem Description"
              className="w-full p-2 mb-3 bg-gray-800 text-white rounded"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
            <textarea
              name="sampleInput"
              placeholder="Sample Input"
              className="w-full p-2 mb-3 bg-gray-800 text-white rounded"
              value={formData.sampleInput}
              onChange={handleChange}
            ></textarea>
            <textarea
              name="sampleOutput"
              placeholder="Sample Output"
              className="w-full p-2 mb-3 bg-gray-800 text-white rounded"
              value={formData.sampleOutput}
              onChange={handleChange}
            ></textarea>
            <select
              name="difficulty"
              className="w-full p-2 mb-3 bg-gray-800 text-white rounded"
              value={formData.difficulty}
              onChange={handleChange}
            >
              <option value="">Select Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            <input
              type="password"
              name="password"
              placeholder="Submission Password"
              className="w-full p-2 mb-3 bg-gray-800 text-white rounded"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full p-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
            >
              {loading ? "Submitting..." : "Submit Problem"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SubmitProblem;
