import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Context } from '../main.jsx';
import Logout from '../components/user/Logout.jsx';
import ProblemSubmissionNav from '../components/problems/ProblemSubmissionNav.jsx';
import TestCaseNav from '../components/misc/TestCaseNav.jsx';
import DeleteNav from '../components/misc/DeleteNav.jsx';

const getBadgeClass = (verdict) => {
  const key = verdict.toLowerCase();
  if (key === 'accepted') {
    return 'bg-green-600 text-white';
  }
  if (key === 'tle') {
    return 'bg-yellow-500 text-black';
  }
  if (key.includes('wrong') || key.includes('error') || key === 'runtime error') {
    return 'bg-red-600 text-white';
  }
  if (key === 'pending') {
    return 'bg-gray-500 text-white';
  }
  return 'bg-gray-600 text-white';
};

const Submissions = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const { user } = useContext(Context);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  const config = {
    headers: {
      Authorization: user?.token ? `Bearer ${user.token}` : '',
    },
  };

  const fetchSubmissions = async () => {
    if (!user?._id) return;
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${BACKEND_URL}/api/submissions/user/${user._id}`,
        config
      );
      setSubmissions(data);
    } catch (error) {
      toast.error('Failed to fetch submissions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [BACKEND_URL, user]);

  return (
    <div className="p-4 min-h-screen bg-gray-900">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 mt-3 space-y-4 md:space-y-0">
        <h1 className="text-3xl text-white font-bold">My Submissions</h1>
        <div className="flex items-center space-x-4">
          <ProblemSubmissionNav />
          <TestCaseNav />
          <DeleteNav />
          <Logout />
        </div>
      </div>

      {loading ? (
        <p className="text-white text-center">Loading...</p>
      ) : submissions.length === 0 ? (
        <p className="text-white text-center">No submissions found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {submissions.map((sub) => {
            const badgeClass = getBadgeClass(sub.verdict);
            return (
              <div
                key={sub._id}
                className="bg-gray-800 text-white p-5 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <h2 className="text-xl font-bold mb-3 text-blue-400">{sub.problemName}</h2>
                <p className="mb-1"><strong className="text-gray-300">Language:</strong> {sub.language}</p>
                <div className={`inline-block px-3 py-1 mt-2 mb-3 rounded-full text-sm font-semibold ${badgeClass}`}>
                  {sub.verdict}
                </div>
                {sub.time != null && (
                  <p className="mb-1"><strong className="text-gray-300">Time:</strong> {sub.time} ms</p>
                )}
                <p className="text-sm text-gray-400 mt-2">
                  Submitted: {new Date(sub.createdAt).toLocaleString()}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Submissions;
