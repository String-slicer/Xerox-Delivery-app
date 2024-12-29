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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-xl rounded-lg w-full max-w-lg p-8">
        <div className="text-center mb-6">
          <div className="relative inline-block">
            <img
              src={formData.image || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover mx-auto"
            />
            {isEditable && (
              <label className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <span className="text-sm">Change</span>
              </label>
            )}
          </div>
          <h2 className="text-3xl font-semibold text-gray-800 mt-4">{store.StoreName}</h2>
          <p className="text-gray-500">{store.email}</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="storeName" className="block text-sm font-medium text-gray-700">Store Name</label>
            <input
              type="text"
              id="storeName"
              name="storeName"
              value={formData.storeName}
              onChange={handleChange}
              className={`mt-2 p-3 w-full border rounded-lg ${isEditable ? "border-blue-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              readOnly={!isEditable}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Contact Number</label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className={`mt-2 p-3 w-full border rounded-lg ${isEditable ? "border-blue-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              readOnly={!isEditable}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={`mt-2 p-3 w-full border rounded-lg ${isEditable ? "border-blue-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              readOnly={!isEditable}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="locationLat" className="block text-sm font-medium text-gray-700">Latitude</label>
            <input
              type="number"
              id="locationLat"
              name="locationLat"
              value={formData.locationLat}
              onChange={handleChange}
              className={`mt-2 p-3 w-full border rounded-lg ${isEditable ? "border-blue-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              readOnly={!isEditable}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="locationLng" className="block text-sm font-medium text-gray-700">Longitude</label>
            <input
              type="number"
              id="locationLng"
              name="locationLng"
              value={formData.locationLng}
              onChange={handleChange}
              className={`mt-2 p-3 w-full border rounded-lg ${isEditable ? "border-blue-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              readOnly={!isEditable}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-2 p-3 w-full border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              readOnly={!isEditable}
            />
          </div>

          <div className="flex justify-between items-center">
            <div>
              {!isEditable ? (
                <input
                type="button"
                onClick={toggleEditable}
                value="edit profile"
                className="text-blue-500 font-semibold hover:underline"
              />
              ) : (
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  Save Changes
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StoreProfilePage;
