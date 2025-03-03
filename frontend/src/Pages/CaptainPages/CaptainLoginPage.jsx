import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { captainlogin } from "../../slices/captainSlice";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

const CaptainLoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const dispatch = useDispatch(); // Initialize dispatch

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/Captain/captainLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });

      const data = await response.json();
      console.log(data)
      if (data.success) {
        dispatch(captainlogin(data.captain)); // Dispatch captainlogin action
        localStorage.setItem('token', data.token)
        toast.success("Login successful!");
        navigate("/captainhome");
      } else {
        toast.error(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Error during login:", error.message);
      setLoginError("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#131C24]">
      <div className="bg-[#1D2A36] p-8 rounded-lg shadow-lg w-full max-w-md border border-[#32415D]">
        <h2 className="text-3xl font-bold text-center text-[#F8F9FB] mb-6">
          Captain Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#F8F9FB]"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="mt-1 p-2 w-full bg-[#29374C] border border-[#32415D] rounded-lg text-[#F8F9FB] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F4C753]"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#F8F9FB]"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="mt-1 p-2 w-full bg-[#29374C] border border-[#32415D] rounded-lg text-[#F8F9FB] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F4C753]"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#F4C753] text-[#141C24] py-2 rounded-lg hover:bg-[#29374C] hover:text-[#F8F9FB] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#F4C753] font-bold"
          >
            Login
          </button>
        </form>

        {loginError && (
          <div className="text-red-500 text-center mt-4">
            {loginError}
          </div>
        )}

        <div className="flex flex-col items-center gap-4 mt-6">
          <button
            type="button"
            className="text-sm text-[#F4C753] hover:underline focus:outline-none"
          >
            Forgot Password?
          </button>

          <div className="flex items-center gap-2 text-[#F8F9FB]">
            <span>Don't have an account?</span>
            <button
              onClick={() => navigate("/captainSignup")}
              className="text-[#F4C753] hover:underline focus:outline-none font-medium"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
      <Toaster position="top-center" />
    </div>
  );
};

export default CaptainLoginPage;

