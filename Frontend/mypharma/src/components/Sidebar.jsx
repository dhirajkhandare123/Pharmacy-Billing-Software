import React from "react";
import { FaHome, FaPills, FaUsers, FaCashRegister, FaChartBar, FaTruck, FaShoppingCart, FaBoxes } from "react-icons/fa";

const Sidebar = () => {
  return (
    <aside className="bg-gray-900 text-white w-64 h-screen fixed top-0 left-0 shadow-lg">
      <div className="p-4 text-center border-b border-gray-700">
        <h2 className="text-xl font-bold">Pharmacy</h2>
      </div>

      <nav className="mt-6 flex flex-col space-y-2 px-4">
        <a href="/dashboard" className="flex items-center gap-3 p-2 rounded hover:bg-gray-700">
          <FaHome /> <span>Dashboard</span>
        </a>

        <a href="/medicines" className="flex items-center gap-3 p-2 rounded hover:bg-gray-700">
          <FaPills /> <span>Medicines</span>
        </a>

        <a href="/suppliers" className="flex items-center gap-3 p-2 rounded hover:bg-gray-700">
          <FaTruck /> <span>Suppliers</span>
        </a>

        <a href="/purchases" className="flex items-center gap-3 p-2 rounded hover:bg-gray-700">
          <FaShoppingCart />
          <span>Purchases</span>
        </a>

        <a href="/purchases/new" className="flex items-center gap-3 p-2 rounded hover:bg-gray-700">
          <FaShoppingCart /> <span>New Purchases</span>
        </a>

        <a href="/inventory" className="flex items-center gap-3 p-2 rounded hover:bg-gray-700">
          <FaBoxes /> <span>Inventory</span>
        </a>

        <a href="/sales" className="flex items-center gap-3 p-2 rounded hover:bg-gray-700">
          <FaCashRegister /> <span>Sales</span>
        </a>

        <a href="/reports" className="flex items-center gap-3 p-2 rounded hover:bg-gray-700">
          <FaChartBar /> <span>Reports</span>
        </a>
      </nav>
    </aside>
  );
};

export default Sidebar;
