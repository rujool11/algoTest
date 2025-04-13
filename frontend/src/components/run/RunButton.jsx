import React, { useState } from "react";
import axios from "axios";

const RunButton = ({ code, language }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customInput, setCustomInput] = useState("");
  const [runOutput, setRunOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const openModal = () => {
    setCustomInput("");
    setRunOutput(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleRunCode = async () => {
    setIsLoading(true);
    setRunOutput(null); // Reset output
    
    try {
      const res = await axios.post(`${BACKEND_URL}/api/run`, {
        code,
        language: language === "cpp" ? "cpp" : "py",
        customInput,
      });
  
      const result = res.data.op;
      
      // when theres's an error message (compilation/runtime error)
      if (result.error && result.error.message) {
        const errorMsg = result.error.message;
        // Check error type and simplify message
        if (errorMsg.includes('COMPILATION ERROR')) {
          setRunOutput("Compilation Error");
        } else if (errorMsg.includes('RUNTIME ERROR')) {
          setRunOutput("Runtime Error");
        } else {
          setRunOutput(errorMsg); // Fallback to full message
        }
      }
      // when there's output (successful execution)
      else if (result.output !== undefined) {
        setRunOutput(result.output || "(No output)");
      }
      //  no output and no error (empty case)
      else {
        setRunOutput("(No output)");
      }
  
    } catch (err) {
      // this only catches network/request errors
      if (err.response) {
        // check if backend returned an error object
        const backendError = err.response.data?.op?.error?.message;
        setRunOutput(backendError || "Execution failed");
      } else if (err.request) {
        setRunOutput("Failed to connect to server");
      } else {
        setRunOutput("Error in sending request");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={openModal}
        className="bg-blue-800 hover:bg-blue-600 text-white font-semibold py-1 px-4 rounded-md ml-4"
      >
        Run
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-gray-800 rounded-lg shadow-xl w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 p-6">
            <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-2">
              <h3 className="text-lg font-bold text-white">
                Run Code with Custom Input
              </h3>
              <button
                onClick={closeModal}
                className="text-red-500 hover:text-red-400 text-2xl"
              >
                &times;
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Provide Input:
              </label>
              <textarea
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                rows="4"
                className="w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter your custom input here..."
              ></textarea>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleRunCode}
                className={`bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Running..." : "Run Code"}
              </button>
            </div>

            {runOutput !== null && (
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-2 text-white">
                  Output:
                </h4>
                <pre className="bg-gray-700 p-3 rounded-md text-sm whitespace-pre-wrap min-h-[1.5rem] text-white">
                  {runOutput}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default RunButton;
