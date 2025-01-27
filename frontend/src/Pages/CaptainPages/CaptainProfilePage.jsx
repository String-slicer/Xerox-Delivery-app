import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/captaincomponents/Navbar";

const CaptainProfilePage = () => {
  const captain = useSelector((state) => state.captain.captain);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#131C24]">
      <Navbar />
      <div className="pt-20 px-4 sm:px-6 lg:px-8 flex justify-center">
        <div className="bg-[#1D2A36] border border-[#29374C] shadow-xl rounded-lg w-full max-w-lg p-8">
          <div className="text-center mb-6">
            <div className="relative inline-block">
              <img
                src={captain.image || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover mx-auto border-2 border-[#F4C753]"
              />
            </div>
            <h2 className="text-3xl font-semibold text-[#F8F9FB] mt-4">
              {captain.fullName?.firstName} {captain.fullName?.lastName}
            </h2>
            <p className="text-[#8B95A5]">{captain.email}</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#8B95A5]">Contact Number</label>
              <p className="mt-1 p-3 w-full border rounded-lg border-[#29374C] bg-[#131C24] text-[#F8F9FB]">
                {captain.contact}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#8B95A5]">Vehicle Color</label>
              <p className="mt-1 p-3 w-full border rounded-lg border-[#29374C] bg-[#131C24] text-[#F8F9FB]">
                {captain.vehicle?.color}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#8B95A5]">Vehicle Plate</label>
              <p className="mt-1 p-3 w-full border rounded-lg border-[#29374C] bg-[#131C24] text-[#F8F9FB]">
                {captain.vehicle?.plate}
              </p>
            </div>

            <div className="pt-6">
              <button
                onClick={() => navigate('/captainSettings')}
                className="w-full bg-[#F4C753] text-[#131C24] py-3 px-6 rounded-lg hover:bg-[#f3be2c] focus:outline-none focus:ring-2 focus:ring-[#F4C753] focus:ring-opacity-50 font-bold"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaptainProfilePage;
