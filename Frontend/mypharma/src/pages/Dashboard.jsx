import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(
    {
      todaysSales: 0,
      totalMedicines: 0,
      lowStock: 0,
      expiringSoon: 0

    });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/dashboard");
        setDashboard(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setError("Unable to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Grid of cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Today's Sales */}
        <div className="bg-blue-600 text-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Today's Sales</h2>
          <p className="text-2xl mt-2">₹{dashboard.todaysSales?.toLocaleString("en-IN")}</p>
        </div>

        {/* Total Medicines */}
        <div className="bg-green-600 text-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Total Medicines</h2>
          <p className="text-2xl mt-2">{dashboard.totalMedicines}</p>
        </div>

        {/* Low Stock */}
        <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Low Stock</h2>
          <p className="text-2xl mt-2">{dashboard.lowStock}</p>
        </div>

        {/* Expiring Soon */}
        <div className="bg-red-600 text-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Expiring Soon</h2>
          <p className="text-2xl mt-2">{dashboard.expiringSoon}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
