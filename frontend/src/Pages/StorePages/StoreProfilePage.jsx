import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const StoreProfilePage = () => {
  const store = useSelector((state) => state.store.store);
  const [formData, setFormData] = useState({
    storeName: "",
    email: "",
    contact: "",
    address: "",
    image: store.image || "",
    locationLat: store.location?.ltd || "",
    locationLng: store.location?.lng || "",
  });

  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    if (store) {
      setFormData({
        storeName: store.StoreName || "",
        email: store.email || "",
        contact: store.contact || "",
        address: store.address || "",
        image: store.image || "",
        locationLat: store.location?.ltd || "",
        locationLng: store.location?.lng || "",
      });
    }
  }, [store]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/Store/storeProfile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData }),
      });
      const data = await response.json();
      if (data.success) {
        alert("Profile updated successfully!");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
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

  const toggleEditable = () => {
    setIsEditable(!isEditable);
  };

  return (
    <div className="max-w-7xl mx-auto p-2 sm:p-6">
      <div className="bg-[#1D2A36] border border-[#32415D] rounded-xl shadow-lg">
        {/* Profile Header */}
        <div className="relative h-32 sm:h-48 rounded-t-xl bg-gradient-to-r from-[#29374C] to-[#1D2A36]">
          <div className="absolute -bottom-16 left-4 sm:left-8">
            <div className="relative">
              <img
                src={formData.image || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl border-4 border-[#1D2A36] bg-[#29374C] object-cover"
              />
              {isEditable && (
                <label className="absolute bottom-2 right-2 bg-[#F4C753] text-[#141C24] p-2 rounded-lg cursor-pointer hover:bg-[#f4c753ee] transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </label>
              )}
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="px-4 sm:px-8 pt-20 pb-6 sm:pb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
            <div>
              <h2 className="text-2xl font-bold text-[#F8F9FB]">{store.StoreName}</h2>
              <p className="text-[#A3AED0]">{store.email}</p>
            </div>
            <button
              onClick={toggleEditable}
              className={`px-4 py-2 rounded-lg transition-colors ${
                isEditable 
                  ? "bg-[#F4C753] text-[#141C24] hover:bg-[#f4c753ee]" 
                  : "bg-[#29374C] text-[#F8F9FB] hover:bg-[#32415D]"
              }`}
            >
              {isEditable ? "Save Changes" : "Edit Profile"}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#A3AED0] mb-2">Store Name</label>
                <input
                  type="text"
                  name="storeName"
                  value={formData.storeName}
                  onChange={handleChange}
                  className="w-full bg-[#29374C] border border-[#32415D] text-[#F8F9FB] rounded-lg px-4 py-3 focus:outline-none focus:border-[#F4C753] transition-colors"
                  readOnly={!isEditable}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#A3AED0] mb-2">Contact Number</label>
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  className="w-full bg-[#29374C] border border-[#32415D] text-[#F8F9FB] rounded-lg px-4 py-3 focus:outline-none focus:border-[#F4C753] transition-colors"
                  readOnly={!isEditable}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#A3AED0] mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-[#29374C] border border-[#32415D] text-[#F8F9FB] rounded-lg px-4 py-3 focus:outline-none focus:border-[#F4C753] transition-colors"
                  readOnly={!isEditable}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#A3AED0] mb-2">Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full bg-[#29374C] border border-[#32415D] text-[#F8F9FB] rounded-lg px-4 py-3 focus:outline-none focus:border-[#F4C753] transition-colors"
                  readOnly={!isEditable}
                  rows="3"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#A3AED0] mb-2">Latitude</label>
                  <input
                    type="number"
                    name="locationLat"
                    value={formData.locationLat}
                    onChange={handleChange}
                    className="w-full bg-[#29374C] border border-[#32415D] text-[#F8F9FB] rounded-lg px-4 py-3 focus:outline-none focus:border-[#F4C753] transition-colors"
                    readOnly={!isEditable}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#A3AED0] mb-2">Longitude</label>
                  <input
                    type="number"
                    name="locationLng"
                    value={formData.locationLng}
                    onChange={handleChange}
                    className="w-full bg-[#29374C] border border-[#32415D] text-[#F8F9FB] rounded-lg px-4 py-3 focus:outline-none focus:border-[#F4C753] transition-colors"
                    readOnly={!isEditable}
                  />
                </div>
              </div>
            </div>
          </form>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
            <div className="bg-[#29374C] p-6 rounded-lg">
              <h4 className="text-[#A3AED0] text-sm font-medium">Total Orders</h4>
              <p className="text-2xl font-bold text-[#F8F9FB] mt-2">1,234</p>
              <p className="text-[#F4C753] text-sm mt-1">↑ 12% this month</p>
            </div>
            <div className="bg-[#29374C] p-6 rounded-lg">
              <h4 className="text-[#A3AED0] text-sm font-medium">Total Revenue</h4>
              <p className="text-2xl font-bold text-[#F8F9FB] mt-2">₹45,678</p>
              <p className="text-[#F4C753] text-sm mt-1">↑ 8% this month</p>
            </div>
            <div className="bg-[#29374C] p-6 rounded-lg">
              <h4 className="text-[#A3AED0] text-sm font-medium">Average Rating</h4>
              <p className="text-2xl font-bold text-[#F8F9FB] mt-2">4.8/5</p>
              <p className="text-[#F4C753] text-sm mt-1">From 256 reviews</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreProfilePage;
