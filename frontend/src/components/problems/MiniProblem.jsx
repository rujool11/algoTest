import React from "react";

const MiniProblem = ({ problem }) => {

    const getDifficultyColor = (difficulty) => {
        switch(difficulty?.toLowerCase()) {
            case "easy":
                return "text-green-500";
            case "medium":
                return "text-yellow-500";
            case "hard":
                return "text-red-500";
            default:
                return "text-gray-500";
        }
    };

    return (
        <div className="p-4 bg-gray-800 rounded shadow">
            <h2 className="text-xl text-white font-semibold mb-2">{problem.name}</h2>
            <p className="text-gray-300 mb-2">{problem.description}</p>
            <p className={`font-bold mb-2 ${getDifficultyColor(problem.difficulty)}`}>Difficulty: {problem.difficulty}</p>
            <button className="rounded bg-blue-600 hover:bg-blue-800 text-white px-4 py-2">Open</button>
        </div>
    )
};

export default MiniProblem;
