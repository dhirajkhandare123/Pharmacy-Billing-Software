import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const PurchaseDetails = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [purchase, setPurchase] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    axios
      .get(`http://localhost:8080/api/purchases/${id}`)
      .then((res) => {
        setPurchase(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(
          "Error fetching purchase:",
          err
        );

        setLoading(false);
      });

  }, [id]);

  if (loading) {
    return (
      <div className="p-6">
        Loading purchase details...
      </div>
    );
  }

  if (!purchase) {
    return (
      <div className="p-6">
        <p className="text-red-600">
          Purchase not found.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">

      {/* Back Button */}
      <button
        onClick={() => navigate("/purchases")}
        className="mb-4 text-blue-600 hover:text-blue-800"
      >
        ← Back to Purchases
      </button>

      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">

        <div className="flex justify-between items-start">

          <div>
            <h1 className="text-2xl font-bold mb-4">
              Purchase #{purchase.id}
            </h1>

            <p className="mb-2">
              <span className="font-semibold">
                Invoice:
              </span>{" "}
              {purchase.invoiceNumber}
            </p>

            <p className="mb-2">
              <span className="font-semibold">
                Supplier:
              </span>{" "}
              {purchase.supplier?.name}
            </p>

            <p>
              <span className="font-semibold">
                Date:
              </span>{" "}
              {purchase.purchaseDate}
            </p>
          </div>

          {/* Payment Status */}
          <div>

            <span className="font-semibold">
              Payment:
            </span>{" "}

            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                purchase.paymentStatus === "PAID"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {purchase.paymentStatus}
            </span>

          </div>

        </div>

      </div>

      {/* Purchase Items */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">

        <table className="w-full border-collapse">

          <thead className="bg-purple-600 text-white">

            <tr>
              <th className="p-3 text-left">
                Medicine
              </th>

              <th className="p-3 text-left">
                Batch
              </th>

              <th className="p-3 text-right">
                Qty
              </th>

              <th className="p-3 text-right">
                Buy Price
              </th>

              <th className="p-3 text-right">
                Total
              </th>
            </tr>

          </thead>

          <tbody>

            {purchase.items?.map((item) => (

              <tr
                key={item.id}
                className="border-b"
              >

                <td className="p-3">
                  {item.medicine?.name}
                </td>

                <td className="p-3">
                  {item.batchNumber}
                </td>

                <td className="p-3 text-right">
                  {item.quantity}
                </td>

                <td className="p-3 text-right">
                  ₹{item.buyPrice}
                </td>

                <td className="p-3 text-right font-semibold">
                  ₹{item.total}
                </td>

              </tr>

            ))}

          </tbody>

          {/* Total */}
          <tfoot>

            <tr>
              <td
                colSpan="4"
                className="p-4 text-right font-bold"
              >
                Total:
              </td>

              <td className="p-4 text-right font-bold text-lg">
                ₹{purchase.totalAmount}
              </td>
            </tr>

          </tfoot>

        </table>

      </div>

    </div>
  );
};

export default PurchaseDetails;