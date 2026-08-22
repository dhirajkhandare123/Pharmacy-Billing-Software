import React, { useState } from "react";

const Sales = () => {
  const [customerName, setCustomerName] = useState("");
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    medicineName: "",
    quantity: "",
    price: "",
  });
  const [total, setTotal] = useState(0);

  // Handle new item input
  const handleItemChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  // Add item to bill
  const addItem = () => {
    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    const itemTotal =
      parseFloat(newItem.price || 0) * parseInt(newItem.quantity || 0);
    setTotal(total + itemTotal);
    setNewItem({ medicineName: "", quantity: "", price: "" });
  };

  // Save sale (later integrate with backend)
  const handleSaveSale = () => {
    alert("Sale saved successfully!");
    setCustomerName("");
    setItems([]);
    setTotal(0);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">New Sale</h1>

      {/* Customer Name */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="p-2 border rounded w-1/3"
        />
      </div>

      {/* Sales Table */}
      <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden mb-6">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-3">Medicine</th>
            <th className="p-3">Quantity</th>
            <th className="p-3">Price</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="p-3">{item.medicineName}</td>
              <td className="p-3">{item.quantity}</td>
              <td className="p-3">₹{item.price}</td>
            </tr>
          ))}
          {/* New Item Row */}
          <tr className="border-b bg-gray-50">
            <td className="p-3">
              <input
                type="text"
                name="medicineName"
                placeholder="Medicine"
                value={newItem.medicineName}
                onChange={handleItemChange}
                className="p-2 border rounded w-full"
              />
            </td>
            <td className="p-3">
              <input
                type="number"
                name="quantity"
                placeholder="Qty"
                value={newItem.quantity}
                onChange={handleItemChange}
                className="p-2 border rounded w-full"
              />
            </td>
            <td className="p-3">
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={newItem.price}
                onChange={handleItemChange}
                className="p-2 border rounded w-full"
              />
            </td>
          </tr>
        </tbody>
      </table>

      <button
        onClick={addItem}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mb-4"
      >
        + Add Item
      </button>

      {/* Total + Save */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Total: ₹{total}</h2>
        <div className="flex gap-4">
          <button
            onClick={() => {
              setItems([]);
              setTotal(0);
            }}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveSale}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save Sale
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sales;
