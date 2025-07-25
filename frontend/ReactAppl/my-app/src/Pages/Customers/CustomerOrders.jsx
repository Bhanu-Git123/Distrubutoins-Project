import React, { useState, useEffect } from "react";
import axios from "axios";

const CustomerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [editData, setEditData] = useState({
    quantity: 0,
    advancePayment: 0,
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/orders/all");
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to load orders");
    }
  };

  const handleEdit = (order) => {
    setEditingOrderId(order.id);
    setEditData({
      quantity: order.quantity,
      advancePayment: order.advancePayment,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(
        `http://localhost:8080/api/orders/update/${id}`,
        editData
      );
      setMessage("✅ Order updated.");
      setEditingOrderId(null);
      fetchOrders();
    } catch (err) {
      console.error("Update failed");
      setMessage("❌ Failed to update.");
    }
  };

  const handleDeleteCustomer = async (customerId) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/customers/delete/${customerId}`
      );
      setMessage("✅ Customer deleted.");
      fetchOrders();
    } catch (err) {
      setMessage("❌ Failed to delete customer.");
    }
  };

  return (
    <div className="min-h-screen p-10 bg-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        🧾 Customer Orders
      </h2>

      {message && <p className="mb-4 text-green-600 font-medium">{message}</p>}

      <div className="overflow-auto rounded-lg shadow">
        <table className="min-w-full bg-white border">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3 text-left">Customer Name</th>
              <th className="p-3 text-left">Mobile</th>
              <th className="p-3 text-left">District</th>
              <th className="p-3 text-left">Shop</th>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-left">Qty</th>
              <th className="p-3 text-left">Advance</th>
              <th className="p-3 text-left">Total</th>
              <th className="p-3 text-left">Balance</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const total = order.product.price * order.quantity;
              const balance = total - order.advancePayment;

              return (
                <tr key={order.id} className="border-b">
                  <td className="p-3">{order.customer.name}</td>
                  <td className="p-3">{order.customer.mobile}</td>
                  <td className="p-3">{order.customer.district}</td>
                  <td className="p-3">{order.customer.shopName}</td>
                  <td className="p-3">{order.product.name}</td>

                  <td className="p-3">
                    {editingOrderId === order.id ? (
                      <input
                        type="number"
                        name="quantity"
                        value={editData.quantity}
                        onChange={handleChange}
                        className="w-16 border px-2 py-1 rounded"
                      />
                    ) : (
                      order.quantity
                    )}
                  </td>

                  <td className="p-3">
                    {editingOrderId === order.id ? (
                      <input
                        type="number"
                        name="advancePayment"
                        value={editData.advancePayment}
                        onChange={handleChange}
                        className="w-20 border px-2 py-1 rounded"
                      />
                    ) : (
                      `₹ ${order.advancePayment}`
                    )}
                  </td>

                  <td className="p-3">₹ {total}</td>
                  <td className="p-3 text-red-600 font-semibold">
                    ₹ {balance}
                  </td>

                  <td className="p-3 space-x-2">
                    {editingOrderId === order.id ? (
                      <button
                        onClick={() => handleUpdate(order.id)}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEdit(order)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                    )}

                    {balance <= 0 && (
                      <button
                        onClick={() => handleDeleteCustomer(order.customer.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        Delete Customer
                      </button>
                    )}
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

export default CustomerOrders;
