import React, { useState } from "react";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    firstName: "",
    lastName: "",
    password: "",
    rePassword: "",
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [serverOtp, setServerOtp] = useState(""); // Simulated OTP for verification

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEmailVerify = () => {
    // Simulate sending OTP
    const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit OTP
    setServerOtp(generatedOtp);
    setOtpSent(true);
    alert(`OTP sent to ${formData.email}: ${generatedOtp}`); // In production, you'd send this via email.
  };

  const handleOtpVerify = () => {
    if (formData.otp === serverOtp) {
      setOtpVerified(true);
      alert("Email verified successfully!");
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.rePassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Signup Data Submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
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
                className="mt-1 p-2 flex-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
                disabled={otpVerified}
              />
              <button
                type="button"
                onClick={handleEmailVerify}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                disabled={otpVerified || !formData.email}
              >
                Verify
              </button>
            </div>
          </div>

          {/* OTP */}
          {otpSent && !otpVerified && (
            <div>
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700"
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
                  className="mt-1 p-2 flex-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
                <button
                  type="button"
                  onClick={handleOtpVerify}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  Verify OTP
                </button>
              </div>
            </div>
          )}

          {/* Rest of the form */}
          {otpVerified && (
            <>
              {/* First Name */}
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              {/* Last Name */}
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              {/* Re-enter Password */}
              <div>
                <label
                  htmlFor="rePassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Re-enter Password
                </label>
                <input
                  type="password"
                  id="rePassword"
                  name="rePassword"
                  value={formData.rePassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              {/* Register Button */}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Register
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
