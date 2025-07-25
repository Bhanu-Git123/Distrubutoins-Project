import React, { useState, useEffect } from "react";
import axios from "axios";

const SellerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/seller-orders/all"
      );
      setOrders(res.data);
    } catch {
      console.error("Failed to load seller orders");
    }
  };

  const handleDeleteSeller = async (sellerId) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/sellers/delete/${sellerId}`
      );
      setMessage("✅ Seller deleted.");
      fetchOrders();
    } catch {
      setMessage("❌ Failed to delete seller.");
    }
  };

  return (
    <div className="min-h-screen p-10 bg-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        📦 Seller Orders
      </h2>

      {message && <p className="mb-4 text-green-600 font-medium">{message}</p>}

      <div className="overflow-auto rounded-lg shadow">
        <table className="min-w-full bg-white border">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3 text-left">Seller</th>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-left">Qty</th>
              <th className="p-3 text-left">Total</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const total = order.product.price * order.quantity;

              return (
                <tr key={order.id} className="border-b">
                  <td className="p-3">{order.seller.name}</td>
                  <td className="p-3">{order.product.name}</td>
                  <td className="p-3">{order.quantity}</td>
                  <td className="p-3 font-semibold">₹ {total}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDeleteSeller(order.seller.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete Seller
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellerOrders;
