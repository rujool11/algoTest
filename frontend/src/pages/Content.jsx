import React, { useEffect, useState } from "react";
import MiniProblem from "../components/problems/MiniProblem.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import bgImage from "../assets/boris-stefanik-wxJscL5ZzDA-unsplash.jpg";
import Logout from "../components/user/Logout.jsx";
import ProblemSubmissionNav from "../components/problems/ProblemSubmissionNav.jsx";

const Content = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/api/problem`);
        setProblems(data);
      } catch (error) {
        toast.error("Failed to fetch problems");
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, [BACKEND_URL]);

  const filteredProblems = problems.filter((problem) => {
    if (filter === "all") return true;
    return problem.difficulty?.toLowerCase() === filter;
  });

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
      <div className="flex justify-between items-center ml-30 mr-30 mb-8">
        <h1 className="text-3xl text-white font-bold ">Problems</h1>
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
            className={`px-4 py-2 rounded transition 
              ${
                filter === level
                  ? "bg-blue-600 text-white"
                  : "bg-gray-600 text-gray-300 hover:bg-blue-500"
              }`}
          >
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </button>
        ))}
      </div>
      {loading ? (
        <p className="text-white mx-30">Loading...</p>
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
