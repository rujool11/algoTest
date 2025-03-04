// import React from "react";

// const MiniProblem = ({ problem }) => {

//     const getDifficultyColor = (difficulty) => {
//         switch(difficulty?.toLowerCase()) {
//             case "easy":
//                 return "text-green-500";
//             case "medium":
//                 return "text-yellow-500";
//             case "hard":
//                 return "text-red-500";
//             default:
//                 return "text-gray-500";
//         }
//     };

//     return (
//         <div className="p-4 bg-gray-800 rounded-xl shadow">
//             <h2 className="text-xl text-white font-semibold mb-2">{problem.name}</h2>
//             <p className="text-gray-300 mb-2">{problem.description}</p>
//             <p className={`font-bold mb-2 ${getDifficultyColor(problem.difficulty)}`}>Difficulty: {problem.difficulty}</p>
//             <button className="rounded bg-blue-600 hover:bg-blue-800 text-white px-4 py-2">Open</button>
//         </div>
//     )
// };

// export default MiniProblem;

import React from "react";

const MiniProblem = ({ problem }) => {
    const getDifficultyColor = (difficulty) => {
        switch (difficulty?.toLowerCase()) {
            case "easy":
                return "bg-green-500";
            case "medium":
                return "bg-yellow-500";
            case "hard":
                return "bg-red-500";
            default:
                return "bg-gray-500";
        }
    };

    return (
        <div className="p-6 bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition duration-300 ease-in-out">
            <h2 className="text-2xl text-white font-bold mb-3">{problem.name}</h2>
            <p className="text-gray-300 mb-4">{problem.description}</p>
            <div className="flex items-center mb-4">
                <span className={`inline-block w-3 h-3 rounded-full ${getDifficultyColor(problem.difficulty)} mr-2`}></span>
                <span className="text-white font-semibold">Difficulty: {problem.difficulty}</span>
            </div>
             <button className="rounded bg-blue-600 hover:bg-blue-800 text-white px-4 py-2">Open</button>
        </div>
    );
};

export default MiniProblem;
