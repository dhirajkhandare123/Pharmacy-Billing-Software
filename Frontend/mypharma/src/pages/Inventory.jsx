import React, { useEffect, useState } from "react";
import axios from "axios";

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [filter, setFilter] = useState("all");

  // Fetch inventory based on filter
  useEffect(() => {
    let url = "http://localhost:8080/api/inventory";
    if (filter === "low") url = "http://localhost:8080/api/inventory/low-stock";
    if (filter === "expired") url = "http://localhost:8080/api/inventory/expired";
    if (filter === "expiring") url = "http://localhost:8080/api/inventory/expiring?days=30";

    axios.get(url)
      .then((res) => setInventory(res.data))
      .catch((err) => console.error(err));
  }, [filter]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Inventory</h1>

      {/* Filter buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded ${filter === "all" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("low")}
          className={`px-4 py-2 rounded ${filter === "low" ? "bg-yellow-500 text-white" : "bg-gray-200"}`}
        >
          Low Stock
        </button>
        <button
          onClick={() => setFilter("expired")}
          className={`px-4 py-2 rounded ${filter === "expired" ? "bg-red-600 text-white" : "bg-gray-200"}`}
        >
          Expired
        </button>
        <button
          onClick={() => setFilter("expiring")}
          className={`px-4 py-2 rounded ${filter === "expiring" ? "bg-orange-500 text-white" : "bg-gray-200"}`}
        >
          Expiring Soon
        </button>
      </div>

      {/* Inventory Table */}
      <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-green-600 text-white">
          <tr>
            <th className="p-3 text-left">Medicine</th>
            <th className="p-3 text-left">Batch</th>
            <th className="p-3 text-left">Quantity</th>
            <th className="p-3 text-left">Min Stock</th>
            <th className="p-3 text-left">Expiry Date</th>
            <th className="p-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item, index) => (
            <tr key={index} className="border-b hover:bg-gray-100">
              <td className="p-3">{item.medicineName}</td>
              <td className="p-3">{item.batchNumber}</td>
              <td className="p-3">{item.quantity}</td>
              <td className="p-3">{item.minimumStockLevel}</td>
              <td className="p-3">{item.expiryDate}</td>
              <td className="p-3">
                {item.lowStock ? (
                  <span className="text-yellow-600 font-semibold">Low Stock</span>
                ) : item.expired ? (
                  <span className="text-red-600 font-semibold">Expired</span>
                ) : (
                  <span className="text-green-600 font-semibold">OK</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Inventory;
