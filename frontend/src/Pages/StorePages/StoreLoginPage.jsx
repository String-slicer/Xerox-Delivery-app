import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { storelogin } from "../../slices/storeSlice";
import { useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";

const StoreLoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await fetch("http://localhost:4000/Store/storeLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email:formData.email,password:formData.password}),
      });
     
      const data = await response.json();
      console.log(data)
      if (data.success) {
        dispatch(storelogin(data.store));
        localStorage.setItem('token', data.token)
        toast.success("Login successful!");
        navigate("/storehome");
      } else {
        toast.error(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Error during login:", error.message);
      setLoginError("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#131C24] dark group/design-root overflow-x-hidden font-sans">
      <header className="flex items-center justify-between border-b border-solid border-b-[#29374C] px-10 py-3">
        <div className="flex items-center gap-4 text-[#F8F9FB]">
          <div className="size-4">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z" fill="currentColor"></path>
            </svg>
          </div>
          <h2 className="text-[#F8F9FB] text-lg font-bold leading-tight">Xerox</h2>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md p-8 rounded-xl border border-[#32415D] bg-[#1D2A36]">
          <h2 className="text-3xl font-bold text-center text-[#F8F9FB] mb-8">
            Store Login
          </h2>
          {loginError && (
            <div className="mb-4 p-3 rounded bg-[#2D1619] text-[#FF4D4F] text-sm">
              {loginError}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#F8F9FB] mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-xl bg-[#29374C] border border-[#32415D] text-[#F8F9FB] placeholder-[#8F9BB3] focus:outline-none focus:border-[#F4C753]"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#F8F9FB] mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-xl bg-[#29374C] border border-[#32415D] text-[#F8F9FB] placeholder-[#8F9BB3] focus:outline-none focus:border-[#F4C753]"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#F4C753] text-[#141C24] py-3 px-4 rounded-xl font-bold hover:bg-[#f5d27f] transition-colors"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              className="text-sm text-[#F4C753] hover:text-[#f5d27f] transition-colors"
            >
              Forgot Password?
            </button>
          </div>

          <div className="mt-8 pt-6 text-center border-t border-[#32415D]">
            <p className="text-[#8F9BB3]">
              Don't have a store account?{" "}
              <a href="/storeSignup" className="text-[#F4C753] hover:text-[#f5d27f] transition-colors">
                Register here
              </a>
            </p>
          </div>
        </div>
      </div>
      <Toaster position="top-center" />
    </div>
  );
};

export default StoreLoginPage;

