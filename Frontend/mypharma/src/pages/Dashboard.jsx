import React from "react";

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Grid of cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Today's Sales */}
        <div className="bg-blue-600 text-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Today's Sales</h2>
          <p className="text-2xl mt-2">₹25,450</p>
        </div>

        {/* Total Medicines */}
        <div className="bg-green-600 text-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Total Medicines</h2>
          <p className="text-2xl mt-2">1,250</p>
        </div>

        {/* Low Stock */}
        <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Low Stock</h2>
          <p className="text-2xl mt-2">18</p>
        </div>

        {/* Expiring Soon */}
        <div className="bg-red-600 text-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Expiring Soon</h2>
          <p className="text-2xl mt-2">12</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
