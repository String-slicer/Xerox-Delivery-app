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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Captain Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <div className="flex space-x-2">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="mt-1 p-2 flex-1 border rounded-lg focus:outline-none"
                required
                disabled={otpVerified}
              />
              {!otpVerified && (
                <button type="button" onClick={handleEmailVerify} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                  Verify
                </button>
              )}
            </div>
          </div>

          {otpSent && !otpVerified && (
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700">Enter OTP</label>
              <input
                type="text"
                id="otp"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                placeholder="Enter the OTP"
                className="mt-1 p-2 w-full border rounded-lg"
                required
              />
              <button type="button" onClick={handleOtpVerify} className="bg-green-500 text-white w-full py-2 mt-2 rounded-lg">
                Verify OTP
              </button>
            </div>
          )}

            <>
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required className="mt-1 p-2 w-full border rounded-lg" />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required className="mt-1 p-2 w-full border rounded-lg" />
              </div>

              <div>
                <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Contact</label>
                <input type="text" id="contact" name="contact" value={formData.contact} onChange={handleChange} required className="mt-1 p-2 w-full border rounded-lg" />
              </div>

              <div>
                <label htmlFor="vehicleColor" className="block text-sm font-medium text-gray-700">Vehicle Color</label>
                <input type="text" id="vehicleColor" name="vehicleColor" value={formData.vehicleColor} onChange={handleChange} required className="mt-1 p-2 w-full border rounded-lg" />
              </div>

              <div>
                <label htmlFor="vehiclePlate" className="block text-sm font-medium text-gray-700">Vehicle Plate</label>
                <input type="text" id="vehiclePlate" name="vehiclePlate" value={formData.vehiclePlate} onChange={handleChange} required className="mt-1 p-2 w-full border rounded-lg" />
              </div>


              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required className="mt-1 p-2 w-full border rounded-lg" />
              </div>

              <div>
                <label htmlFor="rePassword" className="block text-sm font-medium text-gray-700">Re-enter Password</label>
                <input type="password" id="rePassword" name="rePassword" value={formData.rePassword} onChange={handleChange} required className="mt-1 p-2 w-full border rounded-lg" />
              </div>

              <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg">Register</button>
            </>
        </form>
      </div>
    </div>
  );
};

export default CaptainSignupPage;
