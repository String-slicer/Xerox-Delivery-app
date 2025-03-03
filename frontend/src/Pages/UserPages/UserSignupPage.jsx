import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const UserSignupPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    firstName: "",
    lastName: "",
    password: "",
    rePassword: "",
    contact: "",
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [serverOtp, setServerOtp] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEmailVerify = async () => {
    console.log(formData.email);
    if (!formData.email) {
      toast.error("Please enter your email.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/User/sendotp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email }),
      });
      const data = await response.json();
      if (data.success) {
        setServerOtp(data.otp);
        toast.success(`OTP sent to ${formData.email}`);
        setOtpSent(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to send OTP");
    }
  };

  const handleOtpVerify = () => {
    if (formData.otp === serverOtp) {
      setOtpVerified(true);
      toast.success("Email verified successfully!");
    } else {
      toast.error("Invalid OTP. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.rePassword) {
      toast.error("Passwords do not match!");
      return;
    }
    console.log("Signup Data Submitted:", formData);
    const response = await fetch("http://localhost:4000/User/userSignup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log(data);
    if (data.success) {
      toast.success("User registered successfully!");
      navigate("/userLogin");
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#131C24] flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="bg-[#1D2A36] p-6 rounded-xl shadow-lg w-full max-w-md border border-[#32415D]">
        <h2 className="text-3xl font-bold text-[#F8F9FB] mb-8 text-center">
          Create Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#F8F9FB] mb-2"
            >
              Email Address
            </label>
            <div className="flex space-x-2">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="flex-1 bg-[#29374C] text-[#F8F9FB] p-3 rounded-lg border border-[#32415D] focus:outline-none focus:ring-2 focus:ring-[#F4C753] placeholder-gray-400"
                required
                disabled={otpVerified}
              />
              {!otpVerified && (
                <button
                  type="button"
                  onClick={handleEmailVerify}
                  className="bg-[#F4C753] text-[#141C24] px-6 py-3 rounded-lg hover:bg-[#f3bc38] focus:outline-none focus:ring-2 focus:ring-[#F4C753] font-bold"
                  disabled={otpVerified || !formData.email}
                >
                  Verify
                </button>
              )}
            </div>
          </div>

          {otpSent && !otpVerified && (
            <div>
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-[#F8F9FB] mb-2"
              >
                Enter OTP
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  id="otp"
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  placeholder="Enter the OTP"
                  className="flex-1 bg-[#29374C] text-[#F8F9FB] p-3 rounded-lg border border-[#32415D] focus:outline-none focus:ring-2 focus:ring-[#F4C753] placeholder-gray-400"
                  required
                />
                <button
                  type="button"
                  onClick={handleOtpVerify}
                  className="bg-[#32415D] text-[#F8F9FB] px-6 py-3 rounded-lg hover:bg-[#3d4e6a] focus:outline-none focus:ring-2 focus:ring-[#F4C753] font-bold"
                >
                  Verify OTP
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-[#F8F9FB] mb-2"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter first name"
                className="w-full bg-[#29374C] text-[#F8F9FB] p-3 rounded-lg border border-[#32415D] focus:outline-none focus:ring-2 focus:ring-[#F4C753] placeholder-gray-400"
                required
              />
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-[#F8F9FB] mb-2"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter last name"
                className="w-full bg-[#29374C] text-[#F8F9FB] p-3 rounded-lg border border-[#32415D] focus:outline-none focus:ring-2 focus:ring-[#F4C753] placeholder-gray-400"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="contact"
              className="block text-sm font-medium text-[#F8F9FB] mb-2"
            >
              Contact Number
            </label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Enter contact number"
              className="w-full bg-[#29374C] text-[#F8F9FB] p-3 rounded-lg border border-[#32415D] focus:outline-none focus:ring-2 focus:ring-[#F4C753] placeholder-gray-400"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#F8F9FB] mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create password"
              className="w-full bg-[#29374C] text-[#F8F9FB] p-3 rounded-lg border border-[#32415D] focus:outline-none focus:ring-2 focus:ring-[#F4C753] placeholder-gray-400"
              required
            />
          </div>

          <div>
            <label
              htmlFor="rePassword"
              className="block text-sm font-medium text-[#F8F9FB] mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="rePassword"
              name="rePassword"
              value={formData.rePassword}
              onChange={handleChange}
              placeholder="Confirm password"
              className="w-full bg-[#29374C] text-[#F8F9FB] p-3 rounded-lg border border-[#32415D] focus:outline-none focus:ring-2 focus:ring-[#F4C753] placeholder-gray-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#F4C753] text-[#141C24] py-3 px-4 rounded-lg hover:bg-[#f3bc38] focus:outline-none focus:ring-2 focus:ring-[#F4C753] font-bold text-sm transition-colors duration-200"
          >
            Create Account
          </button>
        </form>
      </div>
      <Toaster position="top-center" />
    </div>
  );
};

export default UserSignupPage;
