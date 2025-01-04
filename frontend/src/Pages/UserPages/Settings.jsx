import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/usercomponents/Navbar";
import { updateUserProfile } from "../../slices/userSlice";
import toast from 'react-hot-toast';

const Settings = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    contact: "",
    image: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email || "",
        firstName: user.fullName?.firstName || "",
        lastName: user.fullName?.lastName || "",
        contact: user.contact || "",
        image: user.image || "",
      });
    }
  }, [user]);

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
      const response = await fetch("http://localhost:4000/User/userProfile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        // Dispatch the update action to Redux
        dispatch(updateUserProfile({
          firstName: formData.firstName,
          lastName: formData.lastName,
          contact: formData.contact,
          image: formData.image
        }));
        
        toast.success("Profile updated successfully!");
        navigate("/userProfile");
      } else {
        toast.error(data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred while updating profile");
    }
  };

  return (
    <div className="min-h-screen bg-[#131C24]">
      <Navbar />
      <div className="pt-20 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1D2A36] shadow-xl rounded-lg w-full max-w-lg p-8 border border-[#32415D]">
          <h2 className="text-2xl font-bold text-[#F8F9FB] mb-6">Edit Profile</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <div className="flex justify-center">
                <div className="relative">
                  <img
                    src={formData.image || "https://via.placeholder.com/150"}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  <label className="absolute bottom-0 right-0 bg-[#F4C753] text-[#141C24] p-2 rounded-full cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                    <span className="text-sm">Edit</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#F8F9FB] mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full bg-[#29374C] text-[#F8F9FB] p-3 rounded-lg border border-[#32415D] focus:outline-none focus:border-[#F4C753]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#F8F9FB] mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full bg-[#29374C] text-[#F8F9FB] p-3 rounded-lg border border-[#32415D] focus:outline-none focus:border-[#F4C753]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#F8F9FB] mb-1">
                  Contact Number
                </label>
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  className="w-full bg-[#29374C] text-[#F8F9FB] p-3 rounded-lg border border-[#32415D] focus:outline-none focus:border-[#F4C753]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#F8F9FB] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  className="w-full bg-[#29374C] text-[#F8F9FB] p-3 rounded-lg border border-[#32415D]"
                  readOnly
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-[#F4C753] text-[#141C24] py-2 px-4 rounded-lg hover:bg-[#f3bc3a] transition-colors font-bold"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/userProfile')}
                  className="flex-1 bg-[#29374C] text-[#F8F9FB] py-2 px-4 rounded-lg hover:bg-[#32415D] transition-colors font-bold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
