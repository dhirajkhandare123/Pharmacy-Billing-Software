import React, { useEffect, useState } from "react";
import { FaEdit, FaPlus } from "react-icons/fa";
import axios from "axios";
import { FaDeleteLeft } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

const Suppliers = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [search, setSearch] = useState("");
    const [showForm, setShowForm] = useState(false);



    const [newSupplier, setNewSupplier] = useState({
        name: "",
        companyName: "",
        phone: "",
        email: "",
        gstNumber: "",
        address: "",
    });

    // for edit
    const [editId, setEditId] = useState(null);

    const handleEdit = (supplier) => {
        setNewSupplier({
            name: supplier.name || "",
            companyName: supplier.companyName || "",
            phone: supplier.phone || "",
            email: supplier.email || "",
            gstNumber: supplier.gstNumber || "",
            address: supplier.address || "",
        });

        setEditId(supplier.id);
        setShowForm(true);
    };

    // Fetch suppliers
    // Fetch suppliers
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

    // Handle input change
    const handleChange = (e) => {
        setNewSupplier({ ...newSupplier, [e.target.name]: e.target.value });
    };

    // Save supplier
    const handleSave = (e) => {
        e.preventDefault();

        if (editId) {
            // UPDATE
            axios
                .put(`http://localhost:8080/api/suppliers/${editId}`, newSupplier)
                .then((res) => {
                    setSuppliers(
                        suppliers.map((supplier) =>
                            supplier.id === editId ? res.data : supplier
                        )
                    );

                    resetForm();
                })
                .catch((err) => {
                    console.error("Error updating supplier:", err);
                });
        } else {
            // CREATE
            axios
                .post("http://localhost:8080/api/suppliers", newSupplier)
                .then((res) => {
                    setSuppliers([...suppliers, res.data]);

                    resetForm();
                })
                .catch((err) => {
                    console.error("Error adding supplier:", err);
                });
        }
    };

    // form reset after adding or created supplier
    const resetForm = () => {
        setNewSupplier({
            name: "",
            companyName: "",
            phone: "",
            email: "",
            gstNumber: "",
            address: "",
        });

        setEditId(null);
        setShowForm(false);
    };

    // for delete
    const handleDelete = (id) => {
        if (!window.confirm("Are you sure you want to delete this supplier?")) {
            return;
        }

        axios
            .delete(`http://localhost:8080/api/suppliers/${id}`)
            .then(() => {
                setSuppliers(
                    suppliers.filter((supplier) => supplier.id !== id)
                );
            })
            .catch((err) => {
                console.error("Error deleting supplier:", err);
            });
    };

    // Filter suppliers by search
    const filteredSuppliers = suppliers.filter((s) =>
        s.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Suppliers</h1>
                <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    <FaPlus /> Add Supplier
                </button>
            </div>

            {/* Search */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search Supplier..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-1/3 p-2 border rounded"
                />
            </div>

            {/* Table */}
            <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-purple-600 text-white">
                    <tr>
                        <th className="p-3 text-left">ID</th>
                        <th className="p-3 text-left">Name</th>
                        <th className="p-3 text-left">Company</th>
                        <th className="p-3 text-left">Phone</th>
                        <th className="p-3 text-left">Address</th>
                        <th className="p-3 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredSuppliers.map((s) => (
                        <tr key={s.id} className="border-b hover:bg-gray-100">
                            <td className="p-3">{s.id}</td>
                            <td className="p-3">{s.name}</td>
                            <td className="p-3">{s.companyName}</td>
                            <td className="p-3">{s.phone}</td>
                            <td className="p-3">{s.address}</td>


                            <td className="p-3">
                                <div className="flex justify-center items-center gap-3">

                                    <button
                                        onClick={() => handleEdit(s)}
                                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                                    >
                                        <FaEdit />
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => handleDelete(s.id)}
                                        className="text-red-600 hover:text-red-800 flex items-center gap-1"
                                    >
                                        <MdDelete />
                                        Delete
                                    </button>

                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Add Supplier Form (Modal style) */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Add Supplier</h2>
                        <form onSubmit={handleSave} className="space-y-3">
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={newSupplier.name}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                            <input
                                type="text"
                                name="companyName"
                                placeholder="Company"
                                value={newSupplier.companyName}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />
                            <input
                                type="text"
                                name="phone"
                                placeholder="Phone"
                                value={newSupplier.phone}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={newSupplier.email}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />
                            <input
                                type="text"
                                name="gstNumber"
                                placeholder="GST Number"
                                value={newSupplier.gstNumber}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />
                            <input
                                type="text"
                                name="address"
                                placeholder="Address"
                                value={newSupplier.address}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />

                            <div className="flex justify-end gap-3 mt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Save Supplier
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Suppliers;
