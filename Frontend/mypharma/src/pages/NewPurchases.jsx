import React, { useState, useEffect } from "react";
import axios from "axios";

const NewPurchases = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [medicines, setMedicines] = useState([]);

  // Purchase state
  const [purchase, setPurchase] = useState({
    supplierId: "",
    invoiceNumber: "",
    purchaseDate: "",
    paymentStatus: "PAID",
    items: [],
  });

  // New medicine item state
  const [newItem, setNewItem] = useState({
    medicineId: "",
    batchNumber: "",
    expiryDate: "",
    quantity: "",
    purchasePrice: "",
    sellingPrice: "",
  });

  const [total, setTotal] = useState(0);

  // ==========================================
  // FETCH SUPPLIERS
  // ==========================================
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/suppliers")
      .then((res) => {
        setSuppliers(res.data);
      })
      .catch((err) => {
        console.error("Error fetching suppliers:", err);
      });
  }, []);

  // ==========================================
  // FETCH MEDICINES
  // ==========================================
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/medicines")
      .then((res) => {
        console.log("Medicines API Response:", res.data);
        setMedicines(res.data);
      })
      .catch((err) => {
        console.error("Error fetching medicines:", err);
      });
  }, []);

  // ==========================================
  // PURCHASE FORM CHANGE
  // ==========================================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setPurchase((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  // MEDICINE ITEM FORM CHANGE
  // ==========================================
  const handleItemChange = (e) => {
    const { name, value } = e.target;

    setNewItem((prev) => ({
      ...prev,
      [name]:
        name === "medicineId"
          ? value
          : value,
    }));

    // Medicine select hone ke baad check
    if (name === "medicineId") {
      console.log("Selected Medicine ID:", value);
    }
  };

  // ==========================================
  // ADD MEDICINE ITEM
  // ==========================================
  const addItem = () => {
    console.log("New Item Before Add:", newItem);

    if (!newItem.medicineId) {
      alert("Please select a medicine");
      return;
    }

    if (!newItem.batchNumber.trim()) {
      alert("Please enter batch number");
      return;
    }

    if (!newItem.expiryDate) {
      alert("Please select expiry date");
      return;
    }

    if (!newItem.quantity || Number(newItem.quantity) <= 0) {
      alert("Please enter valid quantity");
      return;
    }

    if (
      newItem.purchasePrice === "" ||
      Number(newItem.purchasePrice) < 0
    ) {
      alert("Please enter valid purchase price");
      return;
    }

    if (
      newItem.sellingPrice === "" ||
      Number(newItem.sellingPrice) < 0
    ) {
      alert("Please enter valid selling price");
      return;
    }

    // Backend PurchaseItemDTO ke exactly according object
    const item = {
      medicineId: Number(newItem.medicineId),
      batchNumber: newItem.batchNumber,
      expiryDate: newItem.expiryDate,
      quantity: Number(newItem.quantity),
      purchasePrice: Number(newItem.purchasePrice),
      sellingPrice: Number(newItem.sellingPrice),
    };

    console.log("Medicine Item Added:", item);

    // Frontend display ke liye total calculate
    const itemTotal =
      item.purchasePrice * item.quantity;

    setPurchase((prev) => ({
      ...prev,
      items: [...prev.items, item],
    }));

    setTotal((prev) => prev + itemTotal);

    // Clear item form
    setNewItem({
      medicineId: "",
      batchNumber: "",
      expiryDate: "",
      quantity: "",
      purchasePrice: "",
      sellingPrice: "",
    });
  };

  // ==========================================
  // SAVE PURCHASE
  // ==========================================
  const handleSavePurchase = () => {
  if (!purchase.supplierId) {
    alert("Please select supplier");
    return;
  }

  if (!purchase.invoiceNumber.trim()) {
    alert("Please enter invoice number");
    return;
  }

  if (!purchase.purchaseDate) {
    alert("Please select purchase date");
    return;
  }

  // ==========================================
  // CURRENT MEDICINE ROW VALIDATION
  // ==========================================

  if (!newItem.medicineId) {
    alert("Please select a medicine");
    return;
  }

  if (!newItem.batchNumber.trim()) {
    alert("Please enter batch number");
    return;
  }

  if (!newItem.expiryDate) {
    alert("Please select expiry date");
    return;
  }

  if (!newItem.quantity || Number(newItem.quantity) <= 0) {
    alert("Please enter valid quantity");
    return;
  }

  if (
    newItem.purchasePrice === "" ||
    Number(newItem.purchasePrice) < 0
  ) {
    alert("Please enter valid purchase price");
    return;
  }

  if (
    newItem.sellingPrice === "" ||
    Number(newItem.sellingPrice) < 0
  ) {
    alert("Please enter valid selling price");
    return;
  }

  // ==========================================
  // CREATE MEDICINE ITEM
  // ==========================================

  const currentItem = {
    medicineId: Number(newItem.medicineId),
    batchNumber: newItem.batchNumber.trim(),
    expiryDate: newItem.expiryDate,
    quantity: Number(newItem.quantity),
    purchasePrice: Number(newItem.purchasePrice),
    sellingPrice: Number(newItem.sellingPrice),
  };

  // Existing items + current medicine
  const finalItems = [
    ...purchase.items,
    currentItem,
  ];

  // ==========================================
  // FINAL PURCHASE
  // ==========================================

  const finalPurchase = {
    supplierId: Number(purchase.supplierId),
    invoiceNumber: purchase.invoiceNumber.trim(),
    purchaseDate: purchase.purchaseDate,
    paymentStatus: purchase.paymentStatus,
    items: finalItems,
  };

  console.log(
    "FINAL PURCHASE:",
    JSON.stringify(finalPurchase, null, 2)
  );

  // ==========================================
  // SAVE TO BACKEND
  // ==========================================

  axios
    .post(
      "http://localhost:8080/api/purchases",
      finalPurchase
    )
    .then((res) => {
      console.log("Purchase Response:", res.data);

      alert("Purchase saved successfully!");

      // Reset purchase
      setPurchase({
        supplierId: "",
        invoiceNumber: "",
        purchaseDate: "",
        paymentStatus: "PAID",
        items: [],
      });

      // Reset medicine item
      setNewItem({
        medicineId: "",
        batchNumber: "",
        expiryDate: "",
        quantity: "",
        purchasePrice: "",
        sellingPrice: "",
      });

      // Reset total
      setTotal(0);
    })
    .catch((err) => {
      console.error(
        "Save Purchase Error:",
        err.response?.data || err.message
      );

      alert(
        err.response?.data?.message ||
          "Error saving purchase. Check console for details."
      );
    });
};

  // ==========================================
  // CANCEL PURCHASE
  // ==========================================
  const handleCancel = () => {
    setPurchase({
      supplierId: "",
      invoiceNumber: "",
      purchaseDate: "",
      paymentStatus: "PAID",
      items: [],
    });

    setNewItem({
      medicineId: "",
      batchNumber: "",
      expiryDate: "",
      quantity: "",
      purchasePrice: "",
      sellingPrice: "",
    });

    setTotal(0);
  };

  // ==========================================
  // REMOVE ITEM
  // ==========================================
  const removeItem = (indexToRemove) => {
    const itemToRemove = purchase.items[indexToRemove];

    const itemTotal =
      itemToRemove.purchasePrice *
      itemToRemove.quantity;

    setPurchase((prev) => ({
      ...prev,
      items: prev.items.filter(
        (_, index) => index !== indexToRemove
      ),
    }));

    setTotal((prev) => prev - itemTotal);
  };

  return (
    <div className="p-6">

      {/* ======================================
          PAGE TITLE
      ====================================== */}
      <h1 className="text-2xl font-bold mb-6">
        New Purchase
      </h1>

      {/* ======================================
          SUPPLIER + PURCHASE DETAILS
      ====================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

        {/* Supplier */}
        <select
          name="supplierId"
          value={purchase.supplierId}
          onChange={handleChange}
          className="p-2 border rounded"
        >
          <option value="">
            Select Supplier
          </option>

          {suppliers.map((supplier) => (
            <option
              key={supplier.id}
              value={supplier.id}
            >
              {supplier.name}
            </option>
          ))}
        </select>

        {/* Invoice Number */}
        <input
          type="text"
          name="invoiceNumber"
          placeholder="Invoice No"
          value={purchase.invoiceNumber}
          onChange={handleChange}
          className="p-2 border rounded"
        />

        {/* Purchase Date */}
        <input
          type="date"
          name="purchaseDate"
          value={purchase.purchaseDate}
          onChange={handleChange}
          className="p-2 border rounded"
        />

        {/* Payment Status */}
        <select
          name="paymentStatus"
          value={purchase.paymentStatus}
          onChange={handleChange}
          className="p-2 border rounded"
        >
          <option value="PAID">
            PAID
          </option>

          <option value="PENDING">
            PENDING
          </option>
        </select>

      </div>

      {/* ======================================
          MEDICINE ITEMS TABLE
      ====================================== */}
      <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden mb-6">

        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-3">
              Medicine
            </th>

            <th className="p-3">
              Batch
            </th>

            <th className="p-3">
              Expiry
            </th>

            <th className="p-3">
              Qty
            </th>

            <th className="p-3">
              Buy Price
            </th>

            <th className="p-3">
              Sell Price
            </th>

            
          </tr>
        </thead>

        <tbody>

          {/* ==================================
              ADDED MEDICINES
          ================================== */}
          {purchase.items.map((item, index) => {

            const medicine = medicines.find(
              (m) =>
                Number(m.id) ===
                Number(item.medicineId)
            );

            return (
              <tr
                key={index}
                className="border-b"
              >

                <td className="p-3">
                  {medicine?.name ||
                    item.medicineId}
                </td>

                <td className="p-3">
                  {item.batchNumber}
                </td>

                <td className="p-3">
                  {item.expiryDate}
                </td>

                <td className="p-3">
                  {item.quantity}
                </td>

                <td className="p-3">
                  ₹{item.purchasePrice}
                </td>

                <td className="p-3">
                  ₹{item.sellingPrice}
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
            );
          })}

          {/* ==================================
              NEW MEDICINE ROW
          ================================== */}
          <tr className="border-b bg-gray-50">

            {/* Medicine */}
            <td className="p-3">
              <select
                name="medicineId"
                value={newItem.medicineId}
                onChange={handleItemChange}
                className="p-2 border rounded w-full"
              >
                <option value="">
                  Select Medicine
                </option>

                {medicines.map((medicine) => (
                  <option
                    key={medicine.id}
                    value={medicine.id}
                  >
                    {medicine.name}
                  </option>
                ))}
              </select>
            </td>

            {/* Batch */}
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

            {/* Expiry */}
            <td className="p-3">
              <input
                type="date"
                name="expiryDate"
                value={newItem.expiryDate}
                onChange={handleItemChange}
                className="p-2 border rounded w-full"
              />
            </td>

            {/* Quantity */}
            <td className="p-3">
              <input
                type="number"
                name="quantity"
                placeholder="Qty"
                min="1"
                value={newItem.quantity}
                onChange={handleItemChange}
                className="p-2 border rounded w-full"
              />
            </td>

            {/* Purchase Price */}
            <td className="p-3">
              <input
                type="number"
                name="purchasePrice"
                placeholder="Buy Price"
                min="0"
                value={newItem.purchasePrice}
                onChange={handleItemChange}
                className="p-2 border rounded w-full"
              />
            </td>

            {/* Selling Price */}
            <td className="p-3">
              <input
                type="number"
                name="sellingPrice"
                placeholder="Sell Price"
                min="0"
                value={newItem.sellingPrice}
                onChange={handleItemChange}
                className="p-2 border rounded w-full"
              />
            </td>

            {/* Empty action column */}
            

          </tr>

        </tbody>
      </table>

      {/* ======================================
          ADD MEDICINE BUTTON
      ====================================== */}
      <button
        type="button"
        onClick={addItem}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mb-4"
      >
        + Add Medicine
      </button>

      {/* ======================================
          TOTAL + ACTION BUTTONS
      ====================================== */}
      <div className="flex justify-between items-center">

        <h2 className="text-xl font-semibold">
          Total: ₹{total.toFixed(2)}
        </h2>

        <div className="flex gap-4">

          {/* Cancel */}
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Cancel
          </button>

          {/* Save */}
          <button
            type="button"
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