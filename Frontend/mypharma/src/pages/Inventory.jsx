import React, { useEffect, useState } from "react";
import axios from "axios";

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInventory = async () => {
      setLoading(true);
      setError("");

      let url = "http://localhost:8080/api/inventory";

      if (filter === "low") {
        url = "http://localhost:8080/api/inventory/low-stock";
      }

      if (filter === "expired") {
        url = "http://localhost:8080/api/inventory/expired";
      }

      if (filter === "expiring") {
        url = "http://localhost:8080/api/inventory/expiring-soon";
      }

      try {
        const response = await axios.get(url);
        setInventory(response.data);
      } catch (error) {
        console.error("Error fetching inventory:", error);
        setError("Failed to load inventory");
        setInventory([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, [filter]);

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Inventory
      </h1>

      {/* Filter Buttons */}
      <div className="flex gap-4 mb-6">

        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded ${
            filter === "all"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
        >
          All
        </button>

        <button
          onClick={() => setFilter("low")}
          className={`px-4 py-2 rounded ${
            filter === "low"
              ? "bg-yellow-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Low Stock
        </button>

        <button
          onClick={() => setFilter("expired")}
          className={`px-4 py-2 rounded ${
            filter === "expired"
              ? "bg-red-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Expired
        </button>

        <button
          onClick={() => setFilter("expiring")}
          className={`px-4 py-2 rounded ${
            filter === "expiring"
              ? "bg-orange-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Expiring Soon
        </button>

      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="text-center py-6">
          Loading inventory...
        </div>
      )}

      {/* Inventory Table */}
      {!loading && (
        <div className="overflow-x-auto">

          <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">

            <thead className="bg-green-600 text-white">
              <tr>

                <th className="p-3 text-left">
                  Medicine
                </th>

                <th className="p-3 text-left">
                  Batch
                </th>

                <th className="p-3 text-left">
                  Quantity
                </th>

                <th className="p-3 text-left">
                  Min Stock
                </th>

                <th className="p-3 text-left">
                  Expiry Date
                </th>

                <th className="p-3 text-left">
                  Status
                </th>

              </tr>
            </thead>

            <tbody>

              {inventory.length > 0 ? (

                inventory.map((item) => (

                  <tr
                    key={`${item.medicineId}-${item.batchNumber}`}
                    className="border-b hover:bg-gray-100"
                  >

                    <td className="p-3">
                      {item.medicineName}
                    </td>

                    <td className="p-3">
                      {item.batchNumber || "-"}
                    </td>

                    <td className="p-3">
                      {item.quantity ?? 0}
                    </td>

                    <td className="p-3">
                      {item.minStock ?? 0}
                    </td>

                    <td className="p-3">
                      {item.expiryDate || "-"}
                    </td>

                    <td className="p-3">

                      {item.status === "LOW STOCK" && (
                        <span className="text-yellow-600 font-semibold">
                          Low Stock
                        </span>
                      )}

                      {item.status === "EXPIRED" && (
                        <span className="text-red-600 font-semibold">
                          Expired
                        </span>
                      )}

                      {item.status === "EXPIRING SOON" && (
                        <span className="text-orange-600 font-semibold">
                          Expiring Soon
                        </span>
                      )}

                      {item.status === "NORMAL" && (
                        <span className="text-green-600 font-semibold">
                          OK
                        </span>
                      )}

                    </td>

                  </tr>

                ))

              ) : (

                <tr>
                  <td
                    colSpan="6"
                    className="text-center p-6 text-gray-500"
                  >
                    No inventory data found
                  </td>
                </tr>

              )}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
};

export default Inventory;