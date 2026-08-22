import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const Customers = () => {
  // Dummy data for now
  const customers = [
    {
      id: 1,
      name: "Rahul Sharma",
      mobile: "9876543210",
      address: "Pune, MH",
      history: "5 purchases",
    },
    {
      id: 2,
      name: "Priya Mehta",
      mobile: "9123456780",
      address: "Mumbai, MH",
      history: "2 purchases",
    },
    {
      id: 3,
      name: "Amit Verma",
      mobile: "9988776655",
      address: "Delhi",
      history: "8 purchases",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Customers</h1>

      <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-green-600 text-white">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Mobile</th>
            <th className="p-3 text-left">Address</th>
            <th className="p-3 text-left">Purchase History</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((cust) => (
            <tr key={cust.id} className="border-b hover:bg-gray-100">
              <td className="p-3">{cust.name}</td>
              <td className="p-3">{cust.mobile}</td>
              <td className="p-3">{cust.address}</td>
              <td className="p-3">{cust.history}</td>
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

export default Customers;
