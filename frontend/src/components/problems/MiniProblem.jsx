import React from "react";
import { useNavigate } from "react-router-dom";

const MiniProblem = ({ problem }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case "easy":
        return "green-500";
      case "medium":
        return "yellow-500";
      case "hard":
        return "red-500";
      default:
        return "gray-500";
    }
  };

  const color = getDifficultyColor(problem.difficulty);

  const navigate = useNavigate();

  const borderClasses = {
    "green-500": "border-green-500",
    "yellow-500": "border-yellow-500",
    "red-500": "border-red-500",
    "gray-500": "border-gray-500",
  };

  const handleClick = () => {
    navigate(`/problem/${problem._id}`);
  }

  return (
    <div
      className={`p-6 bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300 ease-in-out border-2 ${borderClasses[color]}`}
    >
      <h2 className="text-2xl text-white font-bold mb-3">{problem.name}</h2>
      <p className="text-gray-300 mb-4">{problem.description}</p>
      <div className="flex items-center mb-4">
        <span
          className={`inline-block w-3 h-3 rounded-full bg-${color} mr-2`}
        ></span>
        <span className="text-white font-semibold">
          Difficulty: {problem.difficulty}
        </span>
      </div>
      <button
        className="rounded bg-blue-600 hover:bg-blue-800 text-white px-4 py-2"
        onClick={handleClick}
      >
        Open
      </button>
    </div>
  );
};

export default MiniProblem;
