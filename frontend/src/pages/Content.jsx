import React, { useEffect, useState } from "react";
import MiniProblem from "../components/problems/MiniProblem.jsx";
import axios from "axios";
import { toast } from "react-toastify";


const Content = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="p-4 bg-gray-700 min-h-screen">
      <h1 className="text-3xl text-white font-bold mx-30 mb-8">Problems</h1>
      {loading ? (
        <p className="text-white mx-30">Loading...</p>
      ) : (
        <div className="flex gap-4 flex-col overflow-x-auto mx-30">
          {problems.map((problem) => (
            <MiniProblem key={problem._id} problem={problem} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Content;
