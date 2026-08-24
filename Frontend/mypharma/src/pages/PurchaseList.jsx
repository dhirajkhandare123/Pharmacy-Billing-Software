import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PurchaseList = () => {
  const [purchases, setPurchases] = useState([]);
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [supplier, setSupplier] = useState("");

  const navigate = useNavigate();

  // Fetch purchases
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/purchases")
      .then((res) => {
        setPurchases(res.data);
      })
      .catch((err) => {
        console.error("Error fetching purchases:", err);
      });
  }, []);

  // Filter purchases
  const filteredPurchases = purchases.filter((purchase) => {
    const matchesSearch =
      purchase.invoiceNumber
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchesDate =
      !date || purchase.purchaseDate === date;

    const matchesSupplier =
      !supplier ||
      purchase.supplier?.name
        ?.toLowerCase()
        .includes(supplier.toLowerCase());

    return matchesSearch && matchesDate && matchesSupplier;
  });

  const handleView = (id) => {
    navigate(`/purchases/${id}`);
  };

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Purchases
        </h1>

        <button
          onClick={() => navigate("/purchases/new")}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          <FaPlus />
          New Purchase
        </button>
      </div>

      {/* Search / Filter */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">

        <h2 className="font-semibold mb-3">
          Search / Filter
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Invoice Search */}
          <input
            type="text"
            placeholder="Search Invoice..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 border rounded"
          />

          {/* Date */}
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="p-2 border rounded"
          />

          {/* Supplier */}
          <input
            type="text"
            placeholder="Supplier..."
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
            className="p-2 border rounded"
          />

        </div>
      </div>

      {/* Purchase Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">

        <table className="w-full border-collapse">

          <thead className="bg-purple-600 text-white">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Invoice</th>
              <th className="p-3 text-left">Supplier</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-right">Amount</th>
              <th className="p-3 text-center">View</th>
            </tr>
          </thead>

          <tbody>

            {filteredPurchases.length > 0 ? (
              filteredPurchases.map((purchase) => (

                <tr
                  key={purchase.id}
                  className="border-b hover:bg-gray-100"
                >

                  <td className="p-3">
                    {purchase.id}
                  </td>

                  <td className="p-3 font-medium">
                    {purchase.invoiceNumber}
                  </td>

                  <td className="p-3">
                    {purchase.supplierName}
                  </td>

                  <td className="p-3">
                    {purchase.purchaseDate}
                  </td>

                  <td className="p-3 text-right font-semibold">
                    ₹{purchase.totalAmount}
                  </td>

                  <td className="p-3">

                    <div className="flex justify-center">

                      <button
                        onClick={() =>
                          handleView(purchase.id)
                        }
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                      >
                        <FaEye />
                        View
                      </button>

                    </div>

                  </td>

                </tr>

              ))
            ) : (

              <tr>
                <td
                  colSpan="6"
                  className="p-6 text-center text-gray-500"
                >
                  No purchases found
                </td>
              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default PurchaseList;