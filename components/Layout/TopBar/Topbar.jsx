import React from 'react';

const Topbar = () => {
  return (
    <div className="bg-white text-black p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Dashboard</h1>
      <div className="flex items-center space-x-4">
        <button className="text-black hover:text-white">
          <i className="fas fa-bell"></i>
        </button>
        <img src="/path/to/profile-icon.png" alt="Profile Icon" className="h-8 w-8 rounded-full" /> {/* ใส่ path รูปโปรไฟล์ */}
      </div>
    </div>
  );
};

export default Topbar;
