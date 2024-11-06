/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

const PeopleCard = ({ user }) => {
  return (
    <div className="relative bg-gray-900 shadow-lg rounded-2xl p-6 max-w-md mx-auto transform transition duration-300 hover:scale-105">

      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-pink-500 rounded-full opacity-30 blur-2xl animate-pulse"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500 rounded-full opacity-30 blur-2xl animate-pulse"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center space-y-4">

        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-400 to-indigo-500 p-1">
          <img
            src={user.imageUrl}
            alt={user.name}
            className="w-full h-full object-cover rounded-full border-2 border-gray-900"
          />
        </div>

        <div className="space-y-1">
          <h3 className="text-2xl font-bold text-white tracking-wider drop-shadow-[0_1.5px_1.5px_rgba(255,255,255,0.3)]">
            {user.name}
          </h3>
          <p className="text-gray-400 text-sm tracking-wider">
            Email: <span className="text-white">{user.email}</span>
          </p>
          <p className="text-gray-400 text-sm tracking-wider">
            Contact: <span className="text-white">{user.phone}</span>
          </p>
        </div>

        
        <div className="mt-6 flex gap-4">
          <button className="px-4 py-2 text-white font-medium rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-pink-500/50 hover:from-pink-500 hover:to-purple-500 transform transition-all hover:scale-105">
            Message
          </button>
          <button className="px-4 py-2 text-gray-900 font-medium rounded-lg bg-gradient-to-r from-blue-400 to-cyan-500 shadow-lg shadow-blue-500/50 hover:from-cyan-500 hover:to-blue-400 transform transition-all hover:scale-105">
            Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default PeopleCard;
