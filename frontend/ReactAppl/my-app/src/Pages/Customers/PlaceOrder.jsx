import React, { useState, useEffect } from "react";
import axios from "axios";

const PlaceOrder = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [orderData, setOrderData] = useState({
    productName: "",
    price: 0,
    quantity: 1,
    advancePayment: 0,
  });
  const [message, setMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const totalAmount = orderData.price * orderData.quantity;
  const balance = totalAmount - orderData.advancePayment;

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/customers/all")
      .then((res) => setCustomers(res.data))
      .catch(() => console.error("Failed to load customers"));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "quantity" || name === "advancePayment"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/orders/place", {
        customerId: selectedCustomerId,
        productName: orderData.productName,
        price: orderData.price,
        quantity: orderData.quantity,
        advancePayment: orderData.advancePayment,
      });

      setShowSuccess(true);
      setMessage("✅ Order placed successfully!");
      setTimeout(() => {
        setShowSuccess(false);
        window.location.href = "/dashboard";
      }, 2000);
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to place order.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-50 p-8 rounded-xl shadow-xl w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Place Order
        </h2>

        {showSuccess && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white p-8 rounded-xl shadow-xl text-center">
              <h3 className="text-green-600 text-2xl font-bold mb-2">
                Success!
              </h3>
              <p className="text-lg">Order placed successfully.</p>
            </div>
          </div>
        )}

        {message && !showSuccess && (
          <p className="text-center mb-4 text-red-600 font-medium">{message}</p>
        )}

        <div className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Select Customer</label>
            <select
              className="input w-full border border-gray-300 p-2 rounded"
              required
              value={selectedCustomerId}
              onChange={(e) => setSelectedCustomerId(e.target.value)}
            >
              <option value="">Select Customer</option>
              {customers.map((cust) => (
                <option key={cust.id} value={cust.id}>
                  {cust.name} - {cust.mobile}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">Product Name</label>
            <input
              type="text"
              name="productName"
              placeholder="Enter product name"
              value={orderData.productName}
              onChange={handleChange}
              required
              className="input w-full border border-gray-300 p-2 rounded"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Product Price</label>
            <input
              type="number"
              name="price"
              placeholder="Price per unit"
              value={orderData.price}
              onChange={handleChange}
              required
              min={0}
              className="input w-full border border-gray-300 p-2 rounded"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Quantity</label>
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={orderData.quantity}
              onChange={handleChange}
              required
              min={1}
              className="input w-full border border-gray-300 p-2 rounded"
            />
          </div>

          <div className="flex justify-between items-center">
            <span className="font-semibold">Total Amount:</span>
            <span className="text-blue-700 font-bold">₹{totalAmount}</span>
          </div>

          <div>
            <label className="block font-semibold mb-1">Advance Payment</label>
            <input
              type="number"
              name="advancePayment"
              placeholder="Advance"
              value={orderData.advancePayment}
              onChange={handleChange}
              required
              min={0}
              className="input w-full border border-gray-300 p-2 rounded"
            />
          </div>

          <div className="flex justify-between items-center">
            <span className="font-semibold">Balance Payment:</span>
            <span className="text-red-600 font-bold">₹{balance}</span>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Confirm Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
