
import React, { useEffect, useState } from "react";
import axios from "axios";

const Sales = () => {
  // ==============================
  // STATES
  // ==============================

  const [medicines, setMedicines] = useState([]);

  const [customerName, setCustomerName] = useState("");

  const [items, setItems] = useState([]);

  const [newItem, setNewItem] = useState({
    medicineId: "",
    quantity: "",
    price: "",
  });

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
        setError("");

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
  // CALCULATE TOTAL
  // ==============================

  const total = items.reduce(
    (sum, item) => sum + item.totalPrice,
    0
  );

  // ==============================
  // HANDLE ITEM INPUT
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

    console.log("========== ADD ITEM ==========");
    console.log("New Item:", newItem);

    // ------------------------------
    // MEDICINE VALIDATION
    // ------------------------------

    if (!newItem.medicineId) {
      setError("Please select a medicine");
      return;
    }

    // ------------------------------
    // QUANTITY VALIDATION
    // ------------------------------

    const quantity = Number(newItem.quantity);

    if (!newItem.quantity || quantity <= 0) {
      setError("Please enter a valid quantity");
      return;
    }

    // ------------------------------
    // PRICE VALIDATION
    // ------------------------------

    const price = Number(newItem.price);

    if (!newItem.price || price <= 0) {
      setError("Please enter a valid selling price");
      return;
    }

    // ------------------------------
    // FIND MEDICINE
    // ------------------------------

    const selectedMedicine = medicines.find(
      (medicine) =>
        Number(medicine.id) === Number(newItem.medicineId)
    );

    console.log("Selected Medicine:", selectedMedicine);

    if (!selectedMedicine) {
      setError("Selected medicine not found");
      return;
    }

    // ------------------------------
    // STOCK VALIDATION
    // ------------------------------

    const availableStock = Number(
      selectedMedicine.stockQuantity ?? 0
    );

    if (quantity > availableStock) {
      setError(
        `Only ${availableStock} units available for ${selectedMedicine.name}`
      );
      return;
    }

    // ------------------------------
    // CHECK DUPLICATE MEDICINE
    // ------------------------------

    const alreadyAdded = items.find(
      (item) =>
        Number(item.medicineId) === Number(selectedMedicine.id)
    );

    if (alreadyAdded) {
      setError(
        `${selectedMedicine.name} is already added. Remove it and add again.`
      );
      return;
    }

    // ------------------------------
    // CALCULATE ITEM TOTAL
    // ------------------------------

    const itemTotal = quantity * price;

    // ------------------------------
    // CREATE ITEM
    // ------------------------------

    const item = {
      medicineId: Number(selectedMedicine.id),
      medicineName: selectedMedicine.name,
      quantity: quantity,
      price: price,
      totalPrice: itemTotal,
    };

    console.log("Adding Item:", item);

    // ------------------------------
    // ADD TO ITEMS
    // ------------------------------

    setItems((prevItems) => {
      const updatedItems = [...prevItems, item];

      console.log("Updated Items:", updatedItems);

      return updatedItems;
    });

    // ------------------------------
    // RESET INPUT
    // ------------------------------

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
    setItems((prevItems) =>
      prevItems.filter((_, i) => i !== index)
    );

    setError("");
    setSuccess("");
  };

  // ==============================
  // SAVE SALE
  // ==============================

  const handleSaveSale = async () => {
    setError("");
    setSuccess("");

    console.log("========== SAVE SALE ==========");
    console.log("Items before save:", items);

    // ------------------------------
    // ITEMS VALIDATION
    // ------------------------------

    if (items.length === 0) {
      setError("Please add at least one medicine");
      return;
    }

    try {
      setSaving(true);

      // ------------------------------
      // CREATE REQUEST
      // ------------------------------

      const saleData = {
        invoiceNumber: `INV-${Date.now()}`,

        totalAmount: Number(total.toFixed(2)),

        paymentStatus: "PAID",

        items: items.map((item) => ({
          medicineId: Number(item.medicineId),
          quantity: Number(item.quantity),
          sellingPrice: Number(item.price),
        })),
      };

      console.log("Sale Request:", saleData);

      // ------------------------------
      // POST SALE
      // ------------------------------

      const response = await axios.post(
        "http://localhost:8080/api/sales",
        saleData
      );

      console.log("Sale Response:", response.data);

      // ------------------------------
      // SUCCESS
      // ------------------------------

      setSuccess("Sale saved successfully!");

      // ------------------------------
      // RESET FORM
      // ------------------------------

      setCustomerName("");

      setItems([]);

      setNewItem({
        medicineId: "",
        quantity: "",
        price: "",
      });

      // Refresh medicines so updated stock appears
      const medicineResponse = await axios.get(
        "http://localhost:8080/api/medicines"
      );

      setMedicines(medicineResponse.data);
    } catch (err) {
      console.error("Sale error:", err);

      if (err.response) {
        console.error(
          "Backend response:",
          err.response.data
        );

        if (typeof err.response.data === "string") {
          setError(err.response.data);
        } else if (err.response.data?.message) {
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

    setNewItem({
      medicineId: "",
      quantity: "",
      price: "",
    });

    setError("");
    setSuccess("");
  };

  // ==============================
  // UI
  // ==============================

  return (
    <div className="p-6">

      {/* PAGE TITLE */}

      <h1 className="text-2xl font-bold mb-6">
        New Sale
      </h1>

      {/* SUCCESS MESSAGE */}

      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          {success}
        </div>
      )}

      {/* ERROR MESSAGE */}

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* CUSTOMER */}

      <div className="mb-6">

        <label className="block text-sm font-medium mb-2">
          Customer Name
        </label>

        <input
          type="text"
          placeholder="Enter customer name"
          value={customerName}
          onChange={(e) =>
            setCustomerName(e.target.value)
          }
          className="p-2 border rounded w-full md:w-1/3"
        />

      </div>

      {/* SALES TABLE */}

      <div className="overflow-x-auto">

        <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden mb-6">

          {/* HEADER */}

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
                key={`${item.medicineId}-${index}`}
                className="border-b"
              >

                <td className="p-3 font-medium">
                  {item.medicineName}
                </td>

                <td className="p-3">
                  {item.quantity}
                </td>

                <td className="p-3">
                  ₹{item.price.toFixed(2)}
                </td>

                <td className="p-3">
                  ₹{item.totalPrice.toFixed(2)}
                </td>

                <td className="p-3">

                  <button
                    type="button"
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

            {/* EMPTY STATE */}

            {items.length === 0 && (

              <tr>

                <td
                  colSpan="5"
                  className="p-6 text-center text-gray-500"
                >
                  No medicines added yet
                </td>

              </tr>

            )}

            {/* NEW ITEM */}

            <tr className="border-b bg-gray-50">

              {/* MEDICINE */}

              <td className="p-3">

                <select
                  name="medicineId"
                  value={newItem.medicineId}
                  onChange={handleItemChange}
                  disabled={loadingMedicines}
                  className="p-2 border rounded w-full"
                >

                  <option value="">
                    {loadingMedicines
                      ? "Loading medicines..."
                      : "Select Medicine"}
                  </option>

                  {medicines.map((medicine) => (

                    <option
                      key={medicine.id}
                      value={medicine.id}
                      disabled={
                        Number(medicine.stockQuantity) <= 0
                      }
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
                  min="0.01"
                  step="0.01"
                  placeholder="Selling Price"
                  value={newItem.price}
                  onChange={handleItemChange}
                  className="p-2 border rounded w-full"
                />

              </td>

              {/* TOTAL */}

              <td className="p-3">
                -
              </td>

              {/* ACTION */}

              <td className="p-3">

                <button
                  type="button"
                  onClick={addItem}
                  className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 whitespace-nowrap"
                >
                  + Add Item
                </button>

              </td>

            </tr>

          </tbody>

        </table>

      </div>

      {/* BOTTOM SECTION */}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">

        {/* TOTAL */}

        <div>

          <h2 className="text-xl font-semibold">
            Total: ₹{total.toFixed(2)}
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            {items.length} medicine
            {items.length !== 1 ? "s" : ""} added
          </p>

        </div>

        {/* ACTION BUTTONS */}

        <div className="flex gap-4">

          <button
            type="button"
            onClick={handleCancel}
            disabled={saving}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSaveSale}
            disabled={saving || items.length === 0}
            className={`px-5 py-2 text-white rounded ${
              saving || items.length === 0
                ? "bg-blue-300 cursor-not-allowed"
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

