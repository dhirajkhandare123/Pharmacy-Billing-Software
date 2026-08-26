import React, { useEffect, useState } from "react";
import axios from "axios";

const Sales = () => {
  const [medicines, setMedicines] = useState([]);
  const [customerName, setCustomerName] = useState("");

  const [items, setItems] = useState([]);

  const [newItem, setNewItem] = useState({
    medicineId: "",
    quantity: "",
    price: "",
  });

  const [total, setTotal] = useState(0);

  const [loadingMedicines, setLoadingMedicines] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ==============================
  // FETCH MEDICINES
  // ==============================
  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        setLoadingMedicines(true);

        const response = await axios.get(
          "http://localhost:8080/api/medicines"
        );

        console.log("Medicines:", response.data);

        setMedicines(response.data);
      } catch (err) {
        console.error("Medicine fetch error:", err);
        setError("Failed to load medicines");
      } finally {
        setLoadingMedicines(false);
      }
    };

    fetchMedicines();
  }, []);

  // ==============================
  // HANDLE INPUT
  // ==============================
  const handleItemChange = (e) => {
    const { name, value } = e.target;

    setNewItem((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  // ==============================
  // ADD ITEM
  // ==============================
  const addItem = () => {
    setError("");
    setSuccess("");

    console.log("New Item:", newItem);

    // Medicine validation
    if (!newItem.medicineId) {
      setError("Please select a medicine");
      return;
    }

    // Quantity validation
    if (!newItem.quantity || Number(newItem.quantity) <= 0) {
      setError("Please enter a valid quantity");
      return;
    }

    // Price validation
    if (!newItem.price || Number(newItem.price) <= 0) {
      setError("Please enter a valid selling price");
      return;
    }

    // Find medicine
    const selectedMedicine = medicines.find(
      (medicine) => medicine.id === Number(newItem.medicineId)
    );

    console.log("Selected Medicine:", selectedMedicine);

    if (!selectedMedicine) {
      setError("Selected medicine not found");
      return;
    }

    // Stock validation
    if (
      selectedMedicine.stockQuantity !== null &&
      Number(newItem.quantity) > selectedMedicine.stockQuantity
    ) {
      setError(
        `Only ${selectedMedicine.stockQuantity} units available for ${selectedMedicine.name}`
      );
      return;
    }

    // Calculate item total
    const itemTotal =
      Number(newItem.quantity) * Number(newItem.price);

    const item = {
      medicineId: selectedMedicine.id,
      medicineName: selectedMedicine.name,
      quantity: Number(newItem.quantity),
      price: Number(newItem.price),
      totalPrice: itemTotal,
    };

    console.log("Adding Item:", item);

    // Add item
    setItems((prevItems) => [...prevItems, item]);

    // Update total
    setTotal((prevTotal) => prevTotal + itemTotal);

    // Clear new item
    setNewItem({
      medicineId: "",
      quantity: "",
      price: "",
    });
  };

  // ==============================
  // REMOVE ITEM
  // ==============================
  const removeItem = (index) => {
    const removedItem = items[index];

    setItems((prevItems) =>
      prevItems.filter((_, i) => i !== index)
    );

    setTotal(
      (prevTotal) =>
        prevTotal - removedItem.totalPrice
    );
  };

  // ==============================
  // SAVE SALE
  // ==============================
  const handleSaveSale = async () => {
    setError("");
    setSuccess("");

    console.log("Items before save:", items);

    if (items.length === 0) {
      setError("Please add at least one medicine");
      return;
    }

    try {
      setSaving(true);

      const saleData = {
        invoiceNumber: `INV-${Date.now()}`,
        paymentStatus: "PAID",

        items: items.map((item) => ({
          medicineId: item.medicineId,
          quantity: item.quantity,
          sellingPrice: item.price,
        })),
      };

      console.log("Sale Request:", saleData);

      const response = await axios.post(
        "http://localhost:8080/api/sales",
        saleData
      );

      console.log("Sale Response:", response.data);

      setSuccess("Sale saved successfully!");

      // Reset
      setCustomerName("");
      setItems([]);
      setTotal(0);

      setNewItem({
        medicineId: "",
        quantity: "",
        price: "",
      });

    } catch (err) {
      console.error("Sale error:", err);

      if (err.response) {
        console.log("Backend response:", err.response.data);

        if (typeof err.response.data === "string") {
          setError(err.response.data);
        } else if (err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError("Failed to save sale");
        }
      } else {
        setError("Unable to connect to backend");
      }
    } finally {
      setSaving(false);
    }
  };

  // ==============================
  // CANCEL
  // ==============================
  const handleCancel = () => {
    setCustomerName("");
    setItems([]);
    setTotal(0);

    setNewItem({
      medicineId: "",
      quantity: "",
      price: "",
    });

    setError("");
    setSuccess("");
  };

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        New Sale
      </h1>

      {/* SUCCESS */}
      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          {success}
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* CUSTOMER */}
      <div className="mb-4">

        <input
          type="text"
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) =>
            setCustomerName(e.target.value)
          }
          className="p-2 border rounded w-1/3"
        />

      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">

        <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden mb-6">

          <thead className="bg-blue-600 text-white">

            <tr>

              <th className="p-3 text-left">
                Medicine
              </th>

              <th className="p-3 text-left">
                Quantity
              </th>

              <th className="p-3 text-left">
                Price
              </th>

              <th className="p-3 text-left">
                Total
              </th>

              <th className="p-3 text-left">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {/* ADDED ITEMS */}

            {items.map((item, index) => (

              <tr
                key={index}
                className="border-b"
              >

                <td className="p-3">
                  {item.medicineName}
                </td>

                <td className="p-3">
                  {item.quantity}
                </td>

                <td className="p-3">
                  ₹{item.price}
                </td>

                <td className="p-3">
                  ₹{item.totalPrice.toFixed(2)}
                </td>

                <td className="p-3">

                  <button
                    onClick={() =>
                      removeItem(index)
                    }
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>

                </td>

              </tr>

            ))}

            {/* NEW ITEM */}

            <tr className="border-b bg-gray-50">

              {/* MEDICINE */}

              <td className="p-3">

                <select
                  name="medicineId"
                  value={newItem.medicineId}
                  onChange={handleItemChange}
                  className="p-2 border rounded w-full"
                  disabled={loadingMedicines}
                >

                  <option value="">
                    {loadingMedicines
                      ? "Loading..."
                      : "Select Medicine"}
                  </option>

                  {medicines.map((medicine) => (

                    <option
                      key={medicine.id}
                      value={medicine.id}
                    >
                      {medicine.name} - Stock:{" "}
                      {medicine.stockQuantity}
                    </option>

                  ))}

                </select>

              </td>

              {/* QUANTITY */}

              <td className="p-3">

                <input
                  type="number"
                  name="quantity"
                  min="1"
                  placeholder="Quantity"
                  value={newItem.quantity}
                  onChange={handleItemChange}
                  className="p-2 border rounded w-full"
                />

              </td>

              {/* PRICE */}

              <td className="p-3">

                <input
                  type="number"
                  name="price"
                  min="0"
                  step="0.01"
                  placeholder="Selling Price"
                  value={newItem.price}
                  onChange={handleItemChange}
                  className="p-2 border rounded w-full"
                />

              </td>

              <td className="p-3">
                -
              </td>

              <td className="p-3">
                -
              </td>

            </tr>

          </tbody>

        </table>

      </div>

      {/* ADD ITEM */}

      <button
        onClick={addItem}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mb-6"
      >
        + Add Item
      </button>

      {/* TOTAL */}

      <div className="flex justify-between items-center">

        <h2 className="text-xl font-semibold">
          Total: ₹{total.toFixed(2)}
        </h2>

        <div className="flex gap-4">

          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Cancel
          </button>

          <button
            onClick={handleSaveSale}
            disabled={saving}
            className={`px-4 py-2 text-white rounded ${
              saving
                ? "bg-blue-300"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {saving ? "Saving..." : "Save Sale"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default Sales;