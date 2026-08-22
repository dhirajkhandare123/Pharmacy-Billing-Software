import React from "react";

const Reports = () => {
  // Dummy data for now — later integrate with backend APIs
  const reportData = {
    totalSales: 152000,
    totalPurchases: 98000,
    totalProfit: 54000,
    topMedicine: "Paracetamol",
    topSupplier: "ABC Pharma",
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Reports</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-blue-600 text-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Total Sales</h2>
          <p className="text-2xl mt-2">₹{reportData.totalSales}</p>
        </div>

        <div className="bg-green-600 text-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Total Purchases</h2>
          <p className="text-2xl mt-2">₹{reportData.totalPurchases}</p>
        </div>

        <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Profit</h2>
          <p className="text-2xl mt-2">₹{reportData.totalProfit}</p>
        </div>
      </div>

      {/* Detailed Insights */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Insights</h2>
        <ul className="space-y-2">
          <li><strong>Top Selling Medicine:</strong> {reportData.topMedicine}</li>
          <li><strong>Top Supplier:</strong> {reportData.topSupplier}</li>
          <li><strong>Sales vs Purchases:</strong> ₹{reportData.totalSales} vs ₹{reportData.totalPurchases}</li>
        </ul>
      </div>
    </div>
  );
};

export default Reports;
