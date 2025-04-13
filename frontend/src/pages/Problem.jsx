import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Logout from "../components/user/Logout.jsx";
import CodeMirror from "@uiw/react-codemirror"; 
import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
import { dracula } from "@uiw/codemirror-theme-dracula";
import ProblemSubmissionNav from "../components/problems/ProblemSubmissionNav.jsx";
import ProblemNav from "../components/problems/ProblemNav.jsx";
import RunButton from "../components/run/RunButton.jsx";

const ProblemPage = () => {
  const { pid } = useParams();
  const [problem, setProblem] = useState(null);
  const [language, setLanguage] = useState("python");
  
  // Default code snippets for each language.
  const defaultCode = {
    python: `# Write your Python code here
def main():
    pass

if __name__ == "__main__":
    main()`,
    cpp: `// Write your C++ code here
#include <iostream>
using namespace std;

int main() {
  
    return 0;
}`
  };

  // Set initial code for Python
  const [code, setCode] = useState(defaultCode[language]);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/problem/${pid}`);
        setProblem(res.data);
      } catch (error) {
        console.error("Error fetching problem:", error);
      }
    };
    fetchProblem();
  }, [pid]);

  // When language changes, update the code with the default code snippet.
  useEffect(() => {
    setCode(defaultCode[language]);
  }, [language]);

  if (!problem) return <div className="text-center mt-10">Loading...</div>;

  const difficultyColors = {
    Easy: "text-green-500",
    Medium: "text-yellow-500",
    Hard: "text-red-500",
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="flex justify-between p-6 bg-gray-900 shadow-md">
        <h1 className="text-2xl font-semibold">🧠 Work out the problem!</h1>
        <div className="flex items-center space-x-4">
          <ProblemNav />
          <ProblemSubmissionNav />
          <Logout />
        </div>
      </nav>
      <div className="flex h-screen p-6 gap-6">
        {/* Problem Description Section */}
        <div className="w-2/5 bg-gray-800 p-6 rounded-lg shadow-lg overflow-x-auto">
          <h2 className="text-xl font-bold mb-2">{problem.name}</h2>
          <p className={`text-sm font-bold ${difficultyColors[problem.difficulty]}`}>
            {problem.difficulty}
          </p>
          <p className="mt-4 text-gray-300 whitespace-pre-wrap break-words">
            {problem.description}
          </p>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Sample Input:</h3>
            <pre className="bg-gray-700 p-2 rounded-md font-mono text-sm overflow-x-auto">
              {problem.sampleInput}
            </pre>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Sample Output:</h3>
            <pre className="bg-gray-700 p-2 rounded-md font-mono text-sm overflow-x-auto">
              {problem.sampleOutput}
            </pre>
          </div>
        </div>

        {/* Code Editor Section */}
        <div className="w-3/5 bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Code Editor</h2>
            <div className="flex justify-between iterms-center gap-4">
            <RunButton code = {code} language={language}/>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-gray-700 text-white p-2 rounded-md"
            >
              <option value="python">Python</option>
              <option value="cpp">C++</option>
            </select>

            </div>
            
          </div>
          <div className="flex-1 max-h-[80vh] overflow-y-auto">
            <CodeMirror
              value={code}
              theme={dracula}
              extensions={[language === "python" ? python() : cpp()]}
              onChange={(value) => setCode(value)}
              minHeight="350px"
              style={{ fontSize: 14 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemPage;
