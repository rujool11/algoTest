import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-20 pb-12 text-center">
          <h1 className="text-5xl tracking-tight font-extrabold text-white sm:text-6xl">
            <span className="block text-orange-400">💡 algoTest</span>
            <div className="min-h-[5vh]"></div>
            <span className="block">Practice Coding</span>
            <span className="block text-yellow-400">Problems</span>
          </h1>
          <p className="mt-6 text-xl text-gray-200 max-w-2xl mx-auto">
            algoTest offers a wide range of coding challenges in various
            difficulty levels in C++ and Python to help you master your programming
            skills.
          </p>
          <div className="mt-8">
            <Link
              to="/getin"
              className="inline-block px-4 py-4 border border-transparent text-lg font-medium rounded-4xl text-gray-900 bg-yellow-400 hover:bg-yellow-300 "
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
  );
};

export default Hero;
