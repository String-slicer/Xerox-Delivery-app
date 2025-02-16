import React, { useState } from "react";
import { useNavigate } from "react-router";

const CaptainSignupPage = () => {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    firstName: "",
    lastName: "",
    password: "",
    rePassword: "",
    contact: "",
    vehicleColor: "",
    vehiclePlate: "",
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
      const response = await fetch("http://localhost:4000/Captain/sendotp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
    if(!otpVerified){
      alert("Email is not verified");
      return;
    }
    if (formData.password !== formData.rePassword) {
      alert("Passwords do not match!");
      return;
    }

    const payload = {
      fullName: {
        firstName: formData.firstName,
        lastName: formData.lastName,
      },
      email: formData.email,
      password: formData.password,
      contact: formData.contact,
      vehicle: {
        color: formData.vehicleColor,
        plate: formData.vehiclePlate,
      },
    };

    try {
      const response = await fetch("http://localhost:4000/Captain/captainSignup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log(data);
      if (data.success) {
        alert("Captain registered successfully!");
        navigate("/captainlogin");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#131C24] dark group/design-root overflow-x-hidden font-sans">
      <div className="layout-container flex h-full grow flex-col items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded-xl border border-[#32415D] bg-[#1D2A36] p-8 shadow-lg">
          <h2 className="mb-8 text-center text-3xl font-bold text-[#F8F9FB]">Join Our Fleet</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#F8F9FB]">Email Address</label>
              <div className="mt-2 flex space-x-2">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="flex-1 rounded-xl border border-[#32415D] bg-[#29374C] p-3 text-[#F8F9FB] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F4C753]"
                  required
                  disabled={otpVerified}
                />
                {!otpVerified && (
                  <button 
                    type="button" 
                    onClick={handleEmailVerify} 
                    className="rounded-xl bg-[#F4C753] px-4 py-2 font-bold text-[#141C24] transition-colors hover:bg-[#f3bc38]"
                  >
                    Verify
                  </button>
                )}
              </div>
            </div>

            {otpSent && !otpVerified && (
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-[#F8F9FB]">Enter OTP</label>
                <input
                  type="text"
                  id="otp"
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  placeholder="Enter the OTP"
                  className="mt-2 w-full rounded-xl border border-[#32415D] bg-[#29374C] p-3 text-[#F8F9FB] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F4C753]"
                  required
                />
                <button 
                  type="button" 
                  onClick={handleOtpVerify} 
                  className="mt-2 w-full rounded-xl bg-[#32415D] px-4 py-3 font-bold text-[#F8F9FB] transition-colors hover:bg-[#3d4e6d]"
                >
                  Verify OTP
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-[#F8F9FB]">First Name</label>
                <input 
                  type="text" 
                  id="firstName" 
                  name="firstName" 
                  value={formData.firstName} 
                  onChange={handleChange} 
                  required 
                  className="mt-2 w-full rounded-xl border border-[#32415D] bg-[#29374C] p-3 text-[#F8F9FB] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F4C753]"
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-[#F8F9FB]">Last Name</label>
                <input 
                  type="text" 
                  id="lastName" 
                  name="lastName" 
                  value={formData.lastName} 
                  onChange={handleChange} 
                  required 
                  className="mt-2 w-full rounded-xl border border-[#32415D] bg-[#29374C] p-3 text-[#F8F9FB] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F4C753]"
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact" className="block text-sm font-medium text-[#F8F9FB]">Contact Number</label>
              <input 
                type="text" 
                id="contact" 
                name="contact" 
                value={formData.contact} 
                onChange={handleChange} 
                required 
                className="mt-2 w-full rounded-xl border border-[#32415D] bg-[#29374C] p-3 text-[#F8F9FB] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F4C753]"
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="vehicleColor" className="block text-sm font-medium text-[#F8F9FB]">Vehicle Color</label>
                <input 
                  type="text" 
                  id="vehicleColor" 
                  name="vehicleColor" 
                  value={formData.vehicleColor} 
                  onChange={handleChange} 
                  required 
                  className="mt-2 w-full rounded-xl border border-[#32415D] bg-[#29374C] p-3 text-[#F8F9FB] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F4C753]"
                />
              </div>

              <div>
                <label htmlFor="vehiclePlate" className="block text-sm font-medium text-[#F8F9FB]">Vehicle Plate</label>
                <input 
                  type="text" 
                  id="vehiclePlate" 
                  name="vehiclePlate" 
                  value={formData.vehiclePlate} 
                  onChange={handleChange} 
                  required 
                  className="mt-2 w-full rounded-xl border border-[#32415D] bg-[#29374C] p-3 text-[#F8F9FB] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F4C753]"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#F8F9FB]">Password</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                required 
                className="mt-2 w-full rounded-xl border border-[#32415D] bg-[#29374C] p-3 text-[#F8F9FB] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F4C753]"
              />
            </div>

            <div>
              <label htmlFor="rePassword" className="block text-sm font-medium text-[#F8F9FB]">Confirm Password</label>
              <input 
                type="password" 
                id="rePassword" 
                name="rePassword" 
                value={formData.rePassword} 
                onChange={handleChange} 
                required 
                className="mt-2 w-full rounded-xl border border-[#32415D] bg-[#29374C] p-3 text-[#F8F9FB] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F4C753]"
              />
            </div>

            <button 
              type="submit" 
              className="w-full rounded-xl bg-[#F4C753] px-4 py-3 font-bold text-[#141C24] transition-colors hover:bg-[#f3bc38]"
            >
              Register as Captain
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CaptainSignupPage;
