// src/pages/Dashboard.js
import React from 'react';
import MyChart from '../MyChart/MyChart';
import BarChart from '../MyChart/BarChart';

const Dashboard = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">Dashboard</h1>
      <div className="space-y-8">
        {/* แสดง MyChart ในแถวแรก */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <MyChart />
        </div>

        {/* แสดง BarChart ในแถวที่สอง */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <BarChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
