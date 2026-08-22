import React, { useState, useEffect } from "react";
import axios from "axios";

const NewPurchases = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [purchase, setPurchase] = useState({
    supplierId: "",
    invoiceNumber: "",
    purchaseDate: "",
    paymentStatus: "PAID",
    items: [],
  });

  const [newItem, setNewItem] = useState({
    medicineId: "",
    batchNumber: "",
    expiryDate: "",
    quantity: "",
    purchasePrice: "",
    sellingPrice: "",
  });

  const [total, setTotal] = useState(0);

  // Fetch suppliers for dropdown
  useEffect(() => {
    axios.get("http://localhost:8080/api/suppliers")
      .then((res) => setSuppliers(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Handle purchase form change
  const handleChange = (e) => {
    setPurchase({ ...purchase, [e.target.name]: e.target.value });
  };

  // Handle medicine item change
  const handleItemChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  // Add medicine row
  const addItem = () => {
    const updatedItems = [...purchase.items, newItem];
    setPurchase({ ...purchase, items: updatedItems });
    setNewItem({
      medicineId: "",
      batchNumber: "",
      expiryDate: "",
      quantity: "",
      purchasePrice: "",
      sellingPrice: "",
    });

    // Update total
    const itemTotal =
      parseFloat(newItem.purchasePrice || 0) *
      parseInt(newItem.quantity || 0);
    setTotal(total + itemTotal);
  };

  // Save purchase
  const handleSavePurchase = () => {
    axios.post("http://localhost:8080/api/purchases", purchase)
      .then((res) => {
        alert("Purchase saved successfully!");
        setPurchase({
          supplierId: "",
          invoiceNumber: "",
          purchaseDate: "",
          paymentStatus: "PAID",
          items: [],
        });
        setTotal(0);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">New Purchase</h1>

      {/* Supplier + Invoice Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <select
          name="supplierId"
          value={purchase.supplierId}
          onChange={handleChange}
          className="p-2 border rounded"
        >
          <option value="">Select Supplier</option>
          {suppliers.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="invoiceNumber"
          placeholder="Invoice No"
          value={purchase.invoiceNumber}
          onChange={handleChange}
          className="p-2 border rounded"
        />

        <input
          type="date"
          name="purchaseDate"
          value={purchase.purchaseDate}
          onChange={handleChange}
          className="p-2 border rounded"
        />

        <select
          name="paymentStatus"
          value={purchase.paymentStatus}
          onChange={handleChange}
          className="p-2 border rounded"
        >
          <option value="PAID">PAID</option>
          <option value="PENDING">PENDING</option>
        </select>
      </div>

      {/* Medicine Items Table */}
      <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden mb-6">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-3">Medicine</th>
            <th className="p-3">Batch</th>
            <th className="p-3">Expiry</th>
            <th className="p-3">Qty</th>
            <th className="p-3">Buy Price</th>
            <th className="p-3">Sell Price</th>
          </tr>
        </thead>
        <tbody>
          {purchase.items.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="p-3">{item.medicineId}</td>
              <td className="p-3">{item.batchNumber}</td>
              <td className="p-3">{item.expiryDate}</td>
              <td className="p-3">{item.quantity}</td>
              <td className="p-3">{item.purchasePrice}</td>
              <td className="p-3">{item.sellingPrice}</td>
            </tr>
          ))}
          {/* New Item Row */}
          <tr className="border-b bg-gray-50">
            <td className="p-3">
              <input
                type="text"
                name="medicineId"
                placeholder="Medicine ID"
                value={newItem.medicineId}
                onChange={handleItemChange}
                className="p-2 border rounded w-full"
              />
            </td>
            <td className="p-3">
              <input
                type="text"
                name="batchNumber"
                placeholder="Batch"
                value={newItem.batchNumber}
                onChange={handleItemChange}
                className="p-2 border rounded w-full"
              />
            </td>
            <td className="p-3">
              <input
                type="date"
                name="expiryDate"
                value={newItem.expiryDate}
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
                name="purchasePrice"
                placeholder="Buy Price"
                value={newItem.purchasePrice}
                onChange={handleItemChange}
                className="p-2 border rounded w-full"
              />
            </td>
            <td className="p-3">
              <input
                type="number"
                name="sellingPrice"
                placeholder="Sell Price"
                value={newItem.sellingPrice}
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
        + Add Medicine
      </button>

      {/* Total + Save */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Total: ₹{total}</h2>
        <div className="flex gap-4">
          <button
            onClick={() => setPurchase({ ...purchase, items: [] })}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSavePurchase}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save Purchase
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewPurchases;
