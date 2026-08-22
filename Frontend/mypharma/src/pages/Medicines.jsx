import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const Medicines = () => {
  // Dummy data for now
  const medicines = [
    {
      id: 1,
      name: "Paracetamol",
      manufacturer: "Cipla",
      stock: 120,
      price: "₹20",
      expiry: "2027-05-30",
    },
    {
      id: 2,
      name: "Azithromycin",
      manufacturer: "Sun Pharma",
      stock: 80,
      price: "₹85",
      expiry: "2026-12-31",
    },
    {
      id: 3,
      name: "Vitamin C",
      manufacturer: "Dr. Reddy’s",
      stock: 200,
      price: "₹60",
      expiry: "2028-03-15",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Medicines</h1>

      <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Manufacturer</th>
            <th className="p-3 text-left">Stock</th>
            <th className="p-3 text-left">Price</th>
            <th className="p-3 text-left">Expiry Date</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((med) => (
            <tr key={med.id} className="border-b hover:bg-gray-100">
              <td className="p-3">{med.name}</td>
              <td className="p-3">{med.manufacturer}</td>
              <td className="p-3">{med.stock}</td>
              <td className="p-3">{med.price}</td>
              <td className="p-3">{med.expiry}</td>
              <td className="p-3 flex justify-center gap-4">
                <button className="text-blue-600 hover:text-blue-800">
                  <FaEdit />
                </button>
                <button className="text-red-600 hover:text-red-800">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Medicines;
