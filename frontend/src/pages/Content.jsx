import React, { useEffect, useState, useContext } from "react";
import MiniProblem from "../components/problems/MiniProblem.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import bgImage from "../assets/boris-stefanik-wxJscL5ZzDA-unsplash.jpg";
import Logout from "../components/user/Logout.jsx";
import ProblemSubmissionNav from "../components/problems/ProblemSubmissionNav.jsx";
import { Context } from "../main.jsx";

const Content = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const { user } = useContext(Context);
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const config = {
    headers: {
      Authorization: user?.token ? `Bearer ${user.token}` : "",
    },
  };

  const fetchProblems = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/problem`, config);
      setProblems(data);
    } catch (error) {
      toast.error("Failed to fetch problems");
    } finally {
      setLoading(false);
    }
  };

  const fetchSearchResults = async () => {
    try {
      const { data } = await axios.get(
        `${BACKEND_URL}/api/problem/search?search=${searchQuery}`,
        config
      );
      setProblems(data);
    } catch (error) {
      toast.error("Failed to fetch search results");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, [BACKEND_URL]);

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    searchQuery.trim() ? fetchSearchResults() : fetchProblems();
  };

  const filteredProblems = problems.filter((problem) =>
    filter === "all" ? true : problem.difficulty?.toLowerCase() === filter
  );

  return (
    <div
      className="p-4 min-h-screen"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="flex flex-col md:flex-row justify-between items-center ml-30 mr-30 mb-8 space-y-4 md:space-y-0">
        <h1 className="text-3xl text-white font-bold">Problems</h1>
        <form onSubmit={handleSearch} className="flex items-center">
          <input
            type="text"
            placeholder="Search problems..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 rounded-l border-0 outline-none text-white bg-gray-900"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-800 text-white rounded-r hover:bg-blue-600"
          >
            Search
          </button>
        </form>
        <div className="flex items-center space-x-4">
          <ProblemSubmissionNav />
          <Logout />
        </div>
      </div>
      <div className="flex gap-2 mb-6 mx-30">
        {["all", "easy", "medium", "hard"].map((level) => (
          <button
            key={level}
            onClick={() => setFilter(level)}
            className={`px-4 py-2 rounded transition ${
              filter === level
                ? "bg-blue-800 text-white"
                : "bg-gray-600 text-gray-300 hover:bg-blue-600"
            }`}
          >
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </button>
        ))}
      </div>
      {loading ? (
        <p className="text-white mx-30">Loading...</p>
      ) : filteredProblems.length === 0 ? (
        <p className="text-white mx-30">No problems found</p>
      ) : (
        <div className="flex gap-4 flex-col overflow-x-auto mx-30">
          {filteredProblems.map((problem) => (
            <MiniProblem key={problem._id} problem={problem} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Content;
