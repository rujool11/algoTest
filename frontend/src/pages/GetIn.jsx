import { useState } from "react";
import Signup from "../components/user/Signup.jsx";
import Login from "../components/user/Login.jsx";
import { ToastContainer } from "react-toastify";
import backgroundImage from "../assets/kyle-waterston-4lcBD53rOMw-unsplash.jpg";

import "react-toastify/dist/ReactToastify.css";

const GetIn = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Background Image Section (7/12 width) */}
      <div
        className="hidden md:block md:w-7/12 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>

      {/* Form Section (5/12 width) */}
      <div className="w-full md:w-5/12 flex flex-col justify-center items-center bg-gray-900 text-white p-8">
        <h2 className="text-3xl font-semibold mb-6">{isLogin ? "Login" : "Sign Up"}</h2>
        {isLogin ? <Login /> : <Signup />}
        <p className="mt-4 text-gray-400">
          {isLogin ? "New here? " : "Already a user? "}
          <button
            className="text-blue-400 hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign up" : "Login"}
          </button>
        </p>
      </div>

      <ToastContainer />
    </div>
  );
};

export default GetIn;

