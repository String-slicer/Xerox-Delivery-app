import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { captainlogout } from "../../slices/captainSlice";
import Navbar from "../../components/captaincomponents/Navbar";

const CaptainSettings = () => {
  const captain = useSelector((state) => state.captain.captain);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    contact: "",
    image: "",
    vehicleColor: "",
    vehiclePlate: "",
  });

  useEffect(() => {
    if (captain) {
      setFormData({
        email: captain.email || "",
        firstName: captain.fullName?.firstName || "",
        lastName: captain.fullName?.lastName || "",
        contact: captain.contact || "",
        image: captain.image || "",
        vehicleColor: captain.vehicle?.color || "",
        vehiclePlate: captain.vehicle?.plate || "",
      });
    }
  }, [captain]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/Captain/CaptainProfile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData }),
      });
      const data = await response.json();
      if (data.success) {
        navigate('/captainProfile');
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      try {
        const response = await fetch("http://localhost:4000/Captain/delete", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          dispatch(captainlogout());
          navigate('/');
        }
      } catch (error) {
        console.error("Error deleting account:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#131C24]">
      <Navbar />
      <div className="pt-16 sm:pt-20 px-3 sm:px-6 lg:px-8 pb-8">
        <div className="mx-auto bg-[#1D2A36] border border-[#29374C] shadow-xl rounded-lg w-full max-w-lg p-4 sm:p-6 lg:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-[#F8F9FB] mb-4 sm:mb-6">Account Settings</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Profile Image */}
            <div className="flex flex-col items-center mb-4 sm:mb-6">
              <div className="relative">
                <img
                  src={formData.image || "https://via.placeholder.com/150"}
                  alt="Profile"
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-2 border-[#F4C753]"
                />
                <label className="absolute bottom-0 right-0 bg-[#F4C753] text-[#131C24] p-1.5 sm:p-2 rounded-full cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </label>
              </div>
            </div>

            {/* Personal Information */}
            <div className="space-y-3 sm:space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-[#8B95A5] mb-1">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="p-2.5 sm:p-3 w-full border rounded-lg border-[#29374C] bg-[#131C24] text-[#F8F9FB] text-sm focus:border-[#F4C753] focus:ring-1 focus:ring-[#F4C753]"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-[#8B95A5] mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="p-2.5 sm:p-3 w-full border rounded-lg border-[#29374C] bg-[#131C24] text-[#F8F9FB] text-sm focus:border-[#F4C753] focus:ring-1 focus:ring-[#F4C753]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-[#8B95A5] mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="p-2.5 sm:p-3 w-full border rounded-lg border-[#29374C] bg-[#131C24] text-[#F8F9FB] text-sm focus:border-[#F4C753] focus:ring-1 focus:ring-[#F4C753]"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-[#8B95A5] mb-1">Contact Number</label>
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  className="p-2.5 sm:p-3 w-full border rounded-lg border-[#29374C] bg-[#131C24] text-[#F8F9FB] text-sm focus:border-[#F4C753] focus:ring-1 focus:ring-[#F4C753]"
                />
              </div>

              {/* Vehicle Information */}
              <div className="pt-2 sm:pt-4">
                <h3 className="text-base sm:text-lg font-semibold text-[#F8F9FB] mb-3 sm:mb-4">Vehicle Details</h3>
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-[#8B95A5] mb-1">Vehicle Color</label>
                    <input
                      type="text"
                      name="vehicleColor"
                      value={formData.vehicleColor}
                      onChange={handleChange}
                      className="p-2.5 sm:p-3 w-full border rounded-lg border-[#29374C] bg-[#131C24] text-[#F8F9FB] text-sm focus:border-[#F4C753] focus:ring-1 focus:ring-[#F4C753]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-[#8B95A5] mb-1">Vehicle Plate</label>
                    <input
                      type="text"
                      name="vehiclePlate"
                      value={formData.vehiclePlate}
                      onChange={handleChange}
                      className="p-2.5 sm:p-3 w-full border rounded-lg border-[#29374C] bg-[#131C24] text-[#F8F9FB] text-sm focus:border-[#F4C753] focus:ring-1 focus:ring-[#F4C753]"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 sm:pt-6 space-y-3 sm:space-y-4">
                <button
                  type="submit"
                  className="w-full bg-[#F4C753] text-[#131C24] py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg hover:bg-[#f3be2c] font-bold text-sm transition-colors"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={handleDeleteAccount}
                  className="w-full bg-red-600 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg hover:bg-red-700 font-bold text-sm transition-colors"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CaptainSettings;
