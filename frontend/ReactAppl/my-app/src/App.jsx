import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Core Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

// Customer Pages
import AddCustomer from "./pages/Customers/AddCustomer";
import PlaceOrder from "./pages/Customers/PlaceOrder";
import CustomerOrders from "./pages/Customers/CustomerOrders";

// Seller Pages
import AddSeller from "./pages/Sellers/AddSeller";
import SellerOrders from "./pages/Sellers/SellerOrders";

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth */}
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Customer Routes */}
        <Route
          path="/customers"
          element={<Navigate to="/customers/orders" replace />}
        />
        <Route path="/customers/add" element={<AddCustomer />} />
        <Route path="/customers/orders" element={<CustomerOrders />} />
        <Route path="/customers/place-order" element={<PlaceOrder />} />

        {/* Seller Routes */}
        <Route
          path="/sellers"
          element={<Navigate to="/sellers/orders" replace />}
        />
        <Route path="/sellers/add" element={<AddSeller />} />
        <Route path="/sellers/orders" element={<SellerOrders />} />

        {/* Fallback for undefined routes */}
        <Route
          path="*"
          element={
            <h2 className="text-center text-red-500 mt-10">
              404 - Page Not Found
            </h2>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
