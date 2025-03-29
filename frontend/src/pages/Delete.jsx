import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Logout from "../components/user/Logout";
import ProblemNav from "../components/problems/ProblemNav";
import ProblemSubmissionNav from "../components/problems/ProblemSubmissionNav";
import MiniMiniProblem from "../components/problems/MiniMiniProblem";
import MiniTestCase from "../components/misc/MiniTestCase"; 
import { Context } from "../main";
import TestCaseNav from "../components/misc/TestCaseNav";

const DeletePage = () => {
  const { user } = useContext(Context);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState("");
  const [problems, setProblems] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [testCases, setTestCases] = useState([]);
  const [selectedTestCase, setSelectedTestCase] = useState(null);
  const [deletePassword, setDeletePassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [testCaseLoading, setTestCaseLoading] = useState(false);

  // Handle problem search
  const handleSearch = async () => {
    setSearchLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `${BACKEND_URL}/api/problem/search?search=${search}`,
        config
      );
      setProblems(data);
    } catch (error) {
      toast.error("Failed to fetch search results");
    } finally {
      setSearchLoading(false);
    }
  };

  // fetchTestCases on problem selection
  const fetchTestCases = async (problemId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `${BACKEND_URL}/api/testcase/${problemId}`,
        config
      );
      setTestCases(data);
    } catch (error) {
      toast.error("Failed to fetch test cases");
    }
  };

  const handleSelectProblem = (problem) => {
    setSelectedProblem(problem);
    setSelectedTestCase(null);
    setTestCases([]); // clear current list
    fetchTestCases(problem._id);
  };

  // delete problem and all associated test cases
  const handleDeleteProblem = async () => {
    if (!selectedProblem) {
      toast.error("Please select a problem to delete.");
      return;
    }
    if (!deletePassword) {
      toast.error("Please enter the delete password.");
      return;
    }
    if (!window.confirm("Are you sure you want to delete this problem and all its test cases?")) {
      return;
    }
    setLoading(true);
    try {
      const headers = {
        Authorization: `Bearer ${user.token}`,
        "x-delete-password": deletePassword,
      };

      // delete all test cases
      await axios.delete(
        `${BACKEND_URL}/api/testcase/${selectedProblem._id}`,
        { headers }
      );
      // delete problem
      await axios.delete(
        `${BACKEND_URL}/api/problem/${selectedProblem._id}`,
        { headers }
      );
      toast.success("Problem and all associated test cases deleted successfully!");
      //  remove deleted problem from display
      setProblems(problems.filter((p) => p._id !== selectedProblem._id));
      setSelectedProblem(null);
      setTestCases([]);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete problem. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // delete single test case
  const handleDeleteTestCase = async () => {
    if (!selectedTestCase) {
      toast.error("Please select a test case to delete.");
      return;
    }
    if (!deletePassword) {
      toast.error("Please enter the delete password.");
      return;
    }
    if (!window.confirm("Are you sure you want to delete this test case?")) {
      return;
    }
    setTestCaseLoading(true);
    try {
      const headers = {
        Authorization: `Bearer ${user.token}`,
        "x-delete-password": deletePassword,
      };
      await axios.delete(
        `${BACKEND_URL}/api/testcase/del_ind/${selectedTestCase._id}`,
        { headers }
      );
      toast.success("Test case deleted successfully!");
      //  update test case display
      setTestCases(testCases.filter((tc) => tc._id !== selectedTestCase._id));
      setSelectedTestCase(null);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete test case. Please try again."
      );
    } finally {
      setTestCaseLoading(false);
    }
  };

  return (
    <>
      {/* Top Navbar */}
      <nav className="px-16 pt-6 bg-gray-900 shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-white">Delete Problems &amp; Test Cases</h1>
        <div className="flex items-center space-x-4">
          <ProblemSubmissionNav />
          <TestCaseNav />
          <ProblemNav />
          <Logout />
        </div>
      </nav>

      {/* Page Content */}
      <div className="min-h-screen flex bg-gray-900 p-8">
        {/* Left Side: Problem Search & Delete */}
        <div className="flex-3 flex flex-col bg-gray-800 p-4 mr-4 rounded">
          <div className="flex mb-4">
            <input
              type="text"
              placeholder="Search problems..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="p-2 w-full rounded bg-gray-700 text-white outline-none"
            />
            <button
              className="bg-blue-600 text-white p-2 ml-2 rounded"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
          <div className="overflow-y-auto flex-1">
            {problems.map((problem) => (
              <MiniMiniProblem
                key={problem._id}
                problem={problem}
                onSelect={handleSelectProblem}
                selected={selectedProblem?._id === problem._id}
              />
            ))}
            {searchLoading && (
              <div className="flex items-center justify-center h-full">
                <p className="text-white">Loading...</p>
              </div>
            )}
          </div>
          {/* Delete Problem Button */}
          <button
            className="mt-4 p-2 bg-red-600 hover:bg-red-700 text-white rounded"
            onClick={handleDeleteProblem}
            disabled={loading}
          >
            {loading ? "Deleting Problem..." : "Delete Problem"}
          </button>
          {/* Delete password field */}
          <div className="mt-2">
            <input
              type="password"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
              className="w-full p-2 bg-gray-700 rounded text-white"
              placeholder="Enter deletion password"
            />
          </div>
        </div>

        {/* Right Side: Display Test Cases & Delete Selected Test Case */}
        <div className="flex-5 flex flex-col bg-gray-800 p-8 rounded">
          {selectedProblem ? (
            <>
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
              <div className="overflow-y-auto flex-1 mb-4">
                {testCases.length ? (
                  testCases.map((testCase) => (
                    <MiniTestCase
                      key={testCase._id}
                      testCase={testCase}
                      onSelect={setSelectedTestCase}
                      selected={selectedTestCase?._id === testCase._id}
                    />
                  ))
                ) : (
                  <p className="text-gray-400">No test cases found.</p>
                )}
              </div>
              {/* Delete Test Case Button */}
              <button
                className="p-2 bg-red-600 hover:bg-red-700 text-white rounded"
                onClick={handleDeleteTestCase}
                disabled={testCaseLoading}
              >
                {testCaseLoading ? "Deleting Test Case..." : "Delete Test Case"}
              </button>
            </>
          ) : (
            <p className="text-gray-400">No problem selected. Please choose a problem.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default DeletePage;

