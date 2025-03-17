import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center max-w-md mx-4">
        <h1 className="text-8xl font-extrabold text-blue-400">404</h1>
        <h2 className="text-3xl font-semibold mt-4 text-white">Page Not Found</h2>
        <p className="mt-4 text-gray-300">
          Oops! It seems the page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-full transition-colors duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
