// src/pages/Dashboard.jsx
import React from "react";
import DashboardLayout from "../Components/DashboardLayout";
import { FaUsers, FaStore, FaPlus, FaList } from "react-icons/fa";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-900 drop-shadow">
        Welcome to the Admin Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Customers Card */}
        <div className="bg-white shadow-xl rounded-xl p-8 flex flex-col items-center hover:scale-105 transition-transform duration-200">
          <FaUsers className="text-5xl text-blue-600 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Customers</h2>
          <p className="text-gray-600 mb-4 text-center">
            Manage, update, and view all customers. Add new customers, update
            details, or see their orders and place orders.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="/customers/add"
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              <FaPlus /> Add Customer
            </a>
            <a
              href="/customers/orders"
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
            >
              <FaList /> View Orders
            </a>
            <a
              href="/customers/update"
              className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700 transition"
            >
              <FaPlus /> Update Customer
            </a>
            <a
              href="/customers/place-order"
              className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-800 transition"
            >
              <FaPlus /> Place Order
            </a>
          </div>
        </div>
        {/* Sellers Card */}
        <div className="bg-white shadow-xl rounded-xl p-8 flex flex-col items-center hover:scale-105 transition-transform duration-200">
          <FaStore className="text-5xl text-green-600 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Sellers</h2>
          <p className="text-gray-600 mb-4 text-center">
            Manage, update, and view all sellers. Add new sellers, update
            details, or see their orders and place orders.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="/sellers/add"
              className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              <FaPlus /> Add Seller
            </a>
            <a
              href="/sellers/orders"
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800 transition"
            >
              <FaList /> View Orders
            </a>
            <a
              href="/sellers/update"
              className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700 transition"
            >
              <FaPlus /> Update Seller
            </a>
            <a
              href="/sellers/place-order"
              className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-800 transition"
            >
              <FaPlus /> Place Order
            </a>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
