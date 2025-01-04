import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/usercomponents/Navbar";

const UserProfilePage = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#131C24]">
      <Navbar />
      <div className="pt-20 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1D2A36] shadow-xl rounded-lg w-full max-w-lg p-8 border border-[#32415D]">
          <div className="text-center mb-6">
            <div className="relative inline-block">
              <img
                src={user.image || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover mx-auto"
              />
            </div>
            <h2 className="text-3xl font-semibold text-[#F8F9FB] mt-4">
              {user.fullName?.firstName} {user.fullName?.lastName}
            </h2>
            <p className="text-[#F8F9FB] opacity-80">{user.email}</p>
          </div>

          <div className="space-y-4">
            <div className="bg-[#29374C] p-4 rounded-lg">
              <label className="block text-sm font-medium text-[#F8F9FB] opacity-80">
                First Name
              </label>
              <p className="mt-1 text-[#F8F9FB]">{user.fullName?.firstName}</p>
            </div>

            <div className="bg-[#29374C] p-4 rounded-lg">
              <label className="block text-sm font-medium text-[#F8F9FB] opacity-80">
                Last Name
              </label>
              <p className="mt-1 text-[#F8F9FB]">{user.fullName?.lastName}</p>
            </div>

            <div className="bg-[#29374C] p-4 rounded-lg">
              <label className="block text-sm font-medium text-[#F8F9FB] opacity-80">
                Contact Number
              </label>
              <p className="mt-1 text-[#F8F9FB]">{user.contact}</p>
            </div>

            <div className="bg-[#29374C] p-4 rounded-lg">
              <label className="block text-sm font-medium text-[#F8F9FB] opacity-80">
                Email Address
              </label>
              <p className="mt-1 text-[#F8F9FB]">{user.email}</p>
            </div>

            <button
              onClick={() => navigate('/userSettings')}
              className="w-full bg-[#F4C753] text-[#141C24] py-2 px-4 rounded-lg hover:bg-[#f3bc3a] transition-colors font-bold"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
