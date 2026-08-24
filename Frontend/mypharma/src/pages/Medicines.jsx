import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

const Medicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Add Medicine form visibility
  const [showForm, setShowForm] = useState(false);

  // for search bar
  const [search, setSearch] = useState("");

  // =========================
  // EDIT MEDICINE
  // =========================

  // Edit popup visibility
  const [showEditPopup, setShowEditPopup] = useState(false);

  // Medicine ID which is being edited
  const [editMedicineId, setEditMedicineId] = useState(null);

  // Form data
  const [medicine, setMedicine] = useState({
    name: "",
    manufacturer: "",
    description: "",
    stockQuantity: 0,
    minimumStockLevel: 10,
  });

  // Medicine search bar
  const filteredMedicines = medicines.filter((medicine) =>
    medicine.name.toLowerCase().includes(search.toLowerCase()) ||
    medicine.manufacturer?.toLowerCase().includes(search.toLowerCase())
  );

  // Fetch medicines
  const fetchMedicines = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        "http://localhost:8080/api/medicines"
      );

      setMedicines(response.data);
    } catch (error) {
      console.error("Error fetching medicines:", error);
      setError("Failed to load medicines.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setMedicine({
      ...medicine,
      [name]:
        name === "stockQuantity" || name === "minimumStockLevel"
          ? Number(value)
          : value,
    });
  };

  // Add medicine
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/medicines",
        medicine
      );

      // Add newly created medicine to list
      setMedicines((prevMedicines) => [
        ...prevMedicines,
        response.data,
      ]);

      // Reset form
      setMedicine({
        name: "",
        manufacturer: "",
        description: "",
        stockQuantity: 0,
        minimumStockLevel: 10,
      });

      // Close form
      setShowForm(false);

      alert("Medicine added successfully!");
    } catch (error) {
      console.error("Error adding medicine:", error);
      alert("Failed to add medicine.");
    }
  };

  // Delete medicine
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this medicine?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:8080/api/medicines/${id}`
      );

      setMedicines((prevMedicines) =>
        prevMedicines.filter((medicine) => medicine.id !== id)
      );
    } catch (error) {
      console.error("Error deleting medicine:", error);
      alert("Failed to delete medicine.");
    }
  };

  // =========================
  // OPEN EDIT POPUP
  // =========================

  const handleEdit = (id) => {
    // Table mein se selected medicine find karo
    const selectedMedicine = medicines.find(
      (medicine) => medicine.id === id
    );

    if (!selectedMedicine) {
      return;
    }

    // ID store karo
    setEditMedicineId(id);

    // Existing medicine data form mein fill karo
    setMedicine({
      name: selectedMedicine.name || "",
      manufacturer: selectedMedicine.manufacturer || "",
      description: selectedMedicine.description || "",
      stockQuantity: selectedMedicine.stockQuantity ?? 0,
      minimumStockLevel: selectedMedicine.minimumStockLevel ?? 10,
    });

    // Popup open karo
    setShowEditPopup(true);
  };

  // =========================
  // UPDATE MEDICINE
  // =========================

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:8080/api/medicines/${editMedicineId}`,
        medicine
      );

      // Updated medicine ko list mein replace karo
      setMedicines((prevMedicines) =>
        prevMedicines.map((med) =>
          med.id === editMedicineId ? response.data : med
        )
      );

      // Popup close
      setShowEditPopup(false);

      // ID reset
      setEditMedicineId(null);

      // Form reset
      setMedicine({
        name: "",
        manufacturer: "",
        description: "",
        stockQuantity: 0,
        minimumStockLevel: 10,
      });

      alert("Medicine updated successfully!");
    } catch (error) {
      console.error("Error updating medicine:", error);
      alert("Failed to update medicine.");
    }
  };

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6 gap-4">

        <h1 className="text-2xl font-bold">
          Medicines
        </h1>

        <div className="flex items-center gap-3">

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search medicine..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-black rounded-lg px-4 py-3 w-64 focus:outline-none focus:ring-2 focus:ring-sky-400"
          />

          {/* Add Medicine */}
          <button
            onClick={() => setShowForm(true)}
            className="bg-sky-500 hover:bg-sky-600 text-white px-5 py-3 rounded-xl font-bold"
          >
            + Add Medicine
          </button>

        </div>

      </div>

      {/* Add Medicine Form */}
      {showForm && (
        <div className="bg-white shadow-md rounded-xl p-6 mb-6">

          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-bold">
              Add New Medicine
            </h2>

            <button
              onClick={() => setShowForm(false)}
              className="text-amber-50 hover:text-blue-500 text-xl font-bold bg-red-500 p-3"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit}>

            {/* Name */}
            <div className="mb-4">
              <label className="block font-semibold mb-2">
                Medicine Name
              </label>

              <input
                type="text"
                name="name"
                value={medicine.name}
                onChange={handleChange}
                placeholder="Enter medicine name"
                required
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
            </div>

            {/* Manufacturer */}
            <div className="mb-4">
              <label className="block font-semibold mb-2">
                Manufacturer
              </label>

              <input
                type="text"
                name="manufacturer"
                value={medicine.manufacturer}
                onChange={handleChange}
                placeholder="Enter manufacturer name"
                required
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="block font-semibold mb-2">
                Description
              </label>

              <textarea
                name="description"
                value={medicine.description}
                onChange={handleChange}
                placeholder="Enter medicine description"
                rows="3"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
            </div>

            {/* Stock + Minimum Stock */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>
                <label className="block font-semibold mb-2">
                  Stock Quantity
                </label>

                <input
                  type="number"
                  name="stockQuantity"
                  value={medicine.stockQuantity}
                  onChange={handleChange}
                  min="0"
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">
                  Minimum Stock Level
                </label>

                <input
                  type="number"
                  name="minimumStockLevel"
                  value={medicine.minimumStockLevel}
                  onChange={handleChange}
                  min="0"
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
              </div>

            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-6">

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-300 hover:bg-gray-400 px-5 py-2 rounded-lg font-semibold"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="bg-sky-500 hover:bg-sky-600 text-white px-5 py-2 rounded-lg font-semibold"
              >
                Save Medicine
              </button>

            </div>

          </form>
        </div>
      )}

      {/* ========================= */}
      {/* EDIT MEDICINE POPUP */}
      {/* ========================= */}

      {showEditPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white w-full max-w-lg rounded-xl shadow-xl p-6">

            {/* Popup Header */}
            <div className="flex justify-between items-center mb-5">

              <h2 className="text-xl font-bold">
                Edit Medicine
              </h2>

              <button
                type="button"
                onClick={() => setShowEditPopup(false)}
                className="text-amber-50 hover:text-blue-500 text-xl font-bold bg-red-500 p-3 rounded"
              >
                ✕
              </button>

            </div>

            {/* Edit Form */}
            <form onSubmit={handleUpdate}>

              {/* Name */}
              <div className="mb-4">
                <label className="block font-semibold mb-2">
                  Medicine Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={medicine.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
              </div>

              {/* Manufacturer */}
              <div className="mb-4">
                <label className="block font-semibold mb-2">
                  Manufacturer
                </label>

                <input
                  type="text"
                  name="manufacturer"
                  value={medicine.manufacturer}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
              </div>

              {/* Description */}
              <div className="mb-4">
                <label className="block font-semibold mb-2">
                  Description
                </label>

                <textarea
                  name="description"
                  value={medicine.description}
                  onChange={handleChange}
                  rows="3"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
              </div>

              {/* Stock + Minimum Stock */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                  <label className="block font-semibold mb-2">
                    Stock Quantity
                  </label>

                  <input
                    type="number"
                    name="stockQuantity"
                    value={medicine.stockQuantity}
                    onChange={handleChange}
                    min="0"
                    required
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-2">
                    Minimum Stock Level
                  </label>

                  <input
                    type="number"
                    name="minimumStockLevel"
                    value={medicine.minimumStockLevel}
                    onChange={handleChange}
                    min="0"
                    required
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />
                </div>

              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-6">

                <button
                  type="button"
                  onClick={() => setShowEditPopup(false)}
                  className="bg-gray-300 hover:bg-gray-400 px-5 py-2 rounded-lg font-semibold"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold"
                >
                  Update Medicine
                </button>

              </div>

            </form>

          </div>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <p className="text-gray-600">
          Loading medicines...
        </p>
      )}

      {/* Error */}
      {error && (
        <p className="text-red-600 mb-4">
          {error}
        </p>
      )}

      {/* No medicines */}
      {!loading && !error && medicines.length === 0 && (
        <p className="text-gray-600">
          No medicines found.
        </p>
      )}

      {/* Search Result Not Found */}
      {!loading &&
        !error &&
        medicines.length > 0 &&
        filteredMedicines.length === 0 && (
          <p className="text-gray-600 mt-4">
            No medicines found for "{search}".
          </p>
        )}

      {/* Medicine Table */}
      {!loading &&
        filteredMedicines.length > 0 && (
          <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">

            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-3 text-left">
                  Name
                </th>

                <th className="p-3 text-left">
                  Manufacturer
                </th>

                <th className="p-3 text-left">
                  Stock
                </th>

                <th className="p-3 text-left">
                  Minimum Stock Level
                </th>

                <th className="p-3 text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredMedicines.map((medicine) => (
                <tr
                  key={medicine.id}
                  className="border-b hover:bg-gray-100"
                >

                  <td className="p-3">
                    {medicine.name}
                  </td>

                  <td className="p-3">
                    {medicine.manufacturer || "-"}
                  </td>

                  <td className="p-3">
                    {medicine.stockQuantity}
                  </td>

                  <td className="p-3">
                    {medicine.minimumStockLevel}
                  </td>

                  <td className="p-3">
                    <div className="flex justify-center gap-4">

                      <button
                        onClick={() => handleEdit(medicine.id)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>

                      <button
                        onClick={() => handleDelete(medicine.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>

                    </div>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        )}

    </div>
  );
};

export default Medicines;