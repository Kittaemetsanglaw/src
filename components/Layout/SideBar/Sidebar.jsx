// src/components/Sidebar.js
import React from 'react';

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-gray-100 p-4">
      <div className="text-2xl font-bold mb-6">🦆 Ped-Bro</div>
      <ul className="space-y-4">
        <li className="flex items-center space-x-2"><span className="icon">📊</span> <span>Dashboard</span></li>
        <li className="flex items-center space-x-2"><span className="icon">📄</span> <span>Log</span></li>
        <li className="flex items-center space-x-2"><span className="icon">👤</span> <span>Profile</span></li>
        <li className="flex items-center space-x-2"><span className="icon">⚙️</span> <span>Setting</span></li>
        <li className="flex items-center space-x-2"><span className="icon">🚪</span> <span>Sign out</span></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
