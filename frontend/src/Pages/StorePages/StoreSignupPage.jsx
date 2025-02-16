import React, { useState } from "react";
import { useNavigate } from "react-router";

const StoreSignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    StoreName: "",
    email: "",
    contact: "",
    password: "",
    rePassword: "",
    address: "",
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [serverOtp, setServerOtp] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEmailVerify = async () => {
    if (!formData.email) {
      alert("Please enter your email.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/Store/sendotp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email }),
      });
      const data = await response.json();
      if (data.success) {
        setServerOtp(data.otp);
        alert(`OTP sent to ${formData.email}`);
        setOtpSent(true);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOtpVerify = () => {
    if (formData.otp === serverOtp) {
      setOtpVerified(true);
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otpVerified) {
      alert("Email is not verified");
      return;
    }
    if (formData.password !== formData.rePassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/Store/storeSignup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        alert("Store registered successfully!");
        navigate("/storelogin");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#131C24] flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="bg-[#1D2A36] p-6 rounded-xl shadow-lg w-full max-w-md border border-[#32415D]">
        <h2 className="text-3xl font-bold text-[#F8F9FB] mb-8 text-center">
          Register Your Store
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#F8F9FB] mb-2">
              Store Name
            </label>
            <input
              type="text"
              name="StoreName"
              value={formData.StoreName}
              onChange={handleChange}
              placeholder="Enter your store name"
              className="w-full bg-[#29374C] text-[#F8F9FB] p-3 rounded-lg border border-[#32415D] focus:outline-none focus:ring-2 focus:ring-[#F4C753] placeholder-gray-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#F8F9FB] mb-2">
              Email Address
            </label>
            <div className="flex space-x-2">
              <input
                type="email"
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
              <label className="block text-sm font-medium text-[#F8F9FB] mb-2">
                Enter OTP
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
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
              <label className="block text-sm font-medium text-[#F8F9FB] mb-2">
                Contact Number
              </label>
              <input
                type="number"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="Enter contact number"
                className="w-full bg-[#29374C] text-[#F8F9FB] p-3 rounded-lg border border-[#32415D] focus:outline-none focus:ring-2 focus:ring-[#F4C753] placeholder-gray-400 appearance-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#F8F9FB] mb-2">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter store address"
                className="w-full bg-[#29374C] text-[#F8F9FB] p-3 rounded-lg border border-[#32415D] focus:outline-none focus:ring-2 focus:ring-[#F4C753] placeholder-gray-400"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#F8F9FB] mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create password"
                className="w-full bg-[#29374C] text-[#F8F9FB] p-3 rounded-lg border border-[#32415D] focus:outline-none focus:ring-2 focus:ring-[#F4C753] placeholder-gray-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#F8F9FB] mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="rePassword"
                value={formData.rePassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className="w-full bg-[#29374C] text-[#F8F9FB] p-3 rounded-lg border border-[#32415D] focus:outline-none focus:ring-2 focus:ring-[#F4C753] placeholder-gray-400"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#F4C753] text-[#141C24] py-3 px-4 rounded-lg hover:bg-[#f3bc38] focus:outline-none focus:ring-2 focus:ring-[#F4C753] font-bold text-sm transition-colors duration-200"
          >
            Register Store
          </button>
        </form>
      </div>
    </div>
  );
};

export default StoreSignupPage;
