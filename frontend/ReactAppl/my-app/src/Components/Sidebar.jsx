import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <aside className="w-64 bg-blue-900 text-white shadow-lg">
      <div className="p-6 text-2xl font-bold border-b border-blue-700">
        PR Admin
      </div>
      <nav className="mt-6 space-y-2 px-4">
        <button
          className="block w-full text-left px-4 py-2 rounded hover:bg-red-700"
          onClick={() => navigate("/admin/login")}
        >
          🔒 Logout
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
