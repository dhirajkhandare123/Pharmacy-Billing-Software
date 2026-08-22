import React from "react";
import { FaCapsules } from "react-icons/fa"; // Pharmacy icon
import { FiLogOut } from "react-icons/fi";   // Logout icon

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center shadow-md">
      {/* Left side - Logo */}
      <div className="flex items-center space-x-2">
        <FaCapsules className="text-2xl" />
        <span className="font-bold text-lg">Pharmacy Billing</span>
      </div>

      {/* Right side - Logout */}
      <button className="flex items-center space-x-1 hover:text-gray-200">
        <FiLogOut />
        <span>Logout</span>
      </button>
    </nav>
  );
};

export default Navbar;
