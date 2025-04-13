// SubmitButton.jsx
import React, { useState, useContext } from "react";
import axios from "axios";
import { Context } from "../../main.jsx";

const SubmitButton = ({ code, language, problem }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  
  const { user } = useContext(Context);
  
  // get token from user
  const token = user?.token;

  const openModal = () => {
    setSubmissionResult(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitCode = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/submissions/submit/${problem._id}`,
        {
          problem,
          code,
          lang: language === "cpp" ? "cpp" : "py",
          username: user?.username || "unknown",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // set submissionResult
      setSubmissionResult(response.data);
    } catch (error) {
      const errorMsg =
        error.response?.data?.error || "Submission failed due to an error.";
      setSubmissionResult({ error: errorMsg });
    } finally {
      setIsLoading(false);
    }
  };

  const verdictColors = {
    Accepted: "text-green-500",
    "Wrong Answer": "text-red-500",
    TLE: "text-yellow-500",
    "Compilation Error": "text-orange-500",
    "Runtime Error": "text-purple-500",
  };

  return (
    <>
      <button
        onClick={openModal}
        className="bg-blue-800 hover:bg-blue-600 text-white font-semibold py-1 px-4 rounded-md"
      >
        Submit
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-gray-800 rounded-lg shadow-xl w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 p-6">
            <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-2">
              <h3 className="text-lg font-bold text-white">Submit Code</h3>
              <button
                onClick={closeModal}
                className="text-red-500 hover:text-red-400 text-2xl"
              >
                &times;
              </button>
            </div>

            {/* Show confirmation and buttons only if there is no submission result */}
            {!submissionResult && (
              <>
                <div className="mb-4">
                  <p className="text-gray-300">
                    Are you sure you want to submit your code for evaluation?
                  </p>
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={handleSubmitCode}
                    className={`bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md ${
                      isLoading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={isLoading}
                  >
                    {isLoading ? "Submitting..." : "Submit Code"}
                  </button>
                  <button
                    onClick={closeModal}
                    className="bg-gray-600 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}

            {submissionResult && (
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-2 text-white">
                  Submission Result:
                </h4>
                {submissionResult.error ? (
                  <p className="text-red-500">{submissionResult.error}</p>
                ) : (
                  <div className="text-white">
                    <p>
                      <span className="font-semibold">Verdict:</span>{" "}
                      <span
                        className={
                          verdictColors[submissionResult.verdict] || "text-white"
                        }
                      >
                        {submissionResult.verdict}
                      </span>
                    </p>
                    <p>
                      <span className="font-semibold">Time:</span>{" "}
                      {submissionResult.time} ms
                    </p>
                    <p>
                      <span className="font-semibold">Language:</span>{" "}
                      {submissionResult.language}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SubmitButton;
