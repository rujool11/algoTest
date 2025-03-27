import React from "react";

const difficultyColor = (difficulty) => {
  // Map difficulty to colors: easy = green, medium = yellow, hard = red
  switch (difficulty.toLowerCase()) {
    case "easy":
      return "text-green-500";
    case "medium":
      return "text-yellow-500";
    case "hard":
      return "text-red-500";
    default:
      return "text-white";
  }
};

const MiniMiniProblem = ({ problem, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(problem)}
      className="cursor-pointer border-t border-gray-300 pt-2 mt-2"
    >
      <h3 className="font-semibold px-4 text-lg text-white">{problem.name}</h3>
      <p className={`text-sm px-4 ${difficultyColor(problem.difficulty)}`}>
        {problem.difficulty}
      </p>
    </div>
  );
};

export default MiniMiniProblem;
