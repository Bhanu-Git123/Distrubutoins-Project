import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCustomer = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    district: "",
    shopName: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/customers/add", formData);
      setMessage("✅ Customer added successfully!");
      setTimeout(() => navigate("/customers/place-order"), 1000);
    } catch (err) {
      setMessage("❌ Failed to add customer.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Add New Customer
        </h2>

        {message && (
          <p className="text-center mb-4 text-sm font-medium text-green-600">
            {message}
          </p>
        )}

        <div className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Customer Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="input"
          />
          <input
            name="mobile"
            type="text"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            required
            className="input"
          />
          <input
            name="district"
            type="text"
            placeholder="District"
            value={formData.district}
            onChange={handleChange}
            className="input"
          />
          <input
            name="shopName"
            type="text"
            placeholder="Shop Name"
            value={formData.shopName}
            onChange={handleChange}
            className="input"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Save Customer
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCustomer;
