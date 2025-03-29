import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Logout from "../components/user/Logout";
import ProblemNav from "../components/problems/ProblemNav";
import ProblemSubmissionNav from "../components/problems/ProblemSubmissionNav";
import DeleteNav from "../components/misc/DeleteNav";
import MiniMiniProblem from "../components/problems/MiniMiniProblem";
import { Context } from "../main";

const SubmitTestCases = () => {
  const { user } = useContext(Context);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState("");
  const [problems, setProblems] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [password, setPassword] = useState("");
  const [testCases, setTestCases] = useState([{ input: "", output: "" }]);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  // Handle changes for each test case row
  const handleTestCaseChange = (index, field, value) => {
    const newTestCases = [...testCases]; // shallow copy
    newTestCases[index][field] = value;
    setTestCases(newTestCases);
  };

  // add new empty test case row
  const addTestCaseRow = () => {
    setTestCases([...testCases, { input: "", output: "" }]);
  };

  // handle search functionality
  const handleSearch = async () => {
    setSearchLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
      const { data } = await axios.get(
        `${BACKEND_URL}/api/problem/search?search=${search}`,
        config,
      );
      setProblems(data);
    } catch (error) {
      toast.error("Failed to fetch search results");
    } finally {
      setSearchLoading(false);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProblem) {
      toast.error("Please select a problem from the left.");
      return;
    }
    if (!password || testCases.some((tc) => !tc.input || !tc.output)) {
      toast.error("All fields are required for test cases.");
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
      const payload = { password, testCases };
      await axios.post(
        `${BACKEND_URL}/api/testcase/${selectedProblem._id}`,
        payload,
        config
      );
      toast.success("Test cases submitted successfully!");
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
      {/* Top Navbar */}
      <nav className="px-16 pt-6 bg-gray-900 shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-white">Submit Test Cases</h1>
        <div className="flex items-center space-x-4">
          <ProblemSubmissionNav />
          <ProblemNav />
          <DeleteNav />
          <Logout />
        </div>
      </nav>

      {/* Page Content */}
      <div className="min-h-screen flex bg-gray-900 p-8">
        {/* Left Side: Search and MiniMiniProblem */}
        <div className="flex-3 flex flex-col bg-gray-800 p-4 mr-4 rounded">
          <div className="flex">
            <input
              type="text"
              placeholder="Search problems..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="p-2 w-full rounded mb-4 bg-gray-700 text-white outline-none"
            />
            <button
              className="bg-blue-600 text-white p-2 rounded mb-4"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
          {/* List problems */}
          <div className="overflow-y-auto">
            {problems.map((problem) => (
              <MiniMiniProblem
                key={problem._id}
                problem={problem}
                onSelect={setSelectedProblem}
              />
            ))}
          </div>
            {searchLoading ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-white">Loading...</p>
              </div>
            ) : null} 
            
        </div>

        {/* Right Side: Test Case Submission Form */}
        <div className="flex-5 flex flex-col bg-gray-800 p-8 rounded">
          <h1 className="text-3xl text-white font-bold mb-6">Add Details</h1>
          {selectedProblem ? (
            <div className="mb-4">
              <h2 className="text-xl text-white">
                Selected Problem: {selectedProblem.name}
              </h2>
              <p className="text-sm text-white">
                Difficulty:{" "}
                <span
                  className={
                    selectedProblem.difficulty.toLowerCase() === "easy"
                      ? "text-green-500"
                      : selectedProblem.difficulty.toLowerCase() === "medium"
                      ? "text-yellow-500"
                      : "text-red-500"
                  }
                >
                  {selectedProblem.difficulty}
                </span>
              </p>
            </div>
          ) : (
            <p className="text-gray-400 mb-4">
              No problem selected. Please choose a problem .
            </p>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-white mb-1">
                Submission Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 bg-gray-700 rounded text-white"
                placeholder="Enter password"
              />
            </div>

            <div className="mb-4">
              <p className="text-white mb-2">Test Cases</p>
              {testCases.map((testCase, index) => (
                <div
                  key={index}
                  className="mb-3 border p-3 rounded bg-gray-900"
                >
                  <input
                    type="text"
                    value={testCase.input}
                    onChange={(e) =>
                      handleTestCaseChange(index, "input", e.target.value)
                    }
                    className="w-full p-2 bg-gray-700 rounded text-white mb-2"
                    placeholder="Test case input"
                  />
                  <input
                    type="text"
                    value={testCase.output}
                    onChange={(e) =>
                      handleTestCaseChange(index, "output", e.target.value)
                    }
                    className="w-full p-2 bg-gray-700 rounded text-white"
                    placeholder="Expected output"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={addTestCaseRow}
                className="text-blue-500 hover:text-blue-400"
              >
                + Add another test case
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full p-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
            >
              {loading ? "Submitting..." : "Submit Test Cases"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SubmitTestCases;
