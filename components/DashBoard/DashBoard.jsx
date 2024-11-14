import React, { useContext, useState } from 'react';
import { WebSocketContext } from '../services/WebSocketProvider.jsx'; // แก้ไขพาธ
import ChartComponent from '../MyChart/ChartComponent.jsx';

const Dashboard = () => {
  const { data, isConnected } = useContext(WebSocketContext); // ดึงข้อมูลและสถานะการเชื่อมต่อจาก WebSocket
  const [isDataRunning, setIsDataRunning] = useState(true); // สถานะการแสดงผลข้อมูล

  const toggleData = () => {
    setIsDataRunning((prev) => !prev); // สลับสถานะการแสดงผลข้อมูล
  };

  return (
    <div className="flex-1 bg-gray-50 text-black p-4 grid grid-cols-3 gap-4 h-screen">
      <div className="bg-white rounded-lg p-4 shadow-md"> {/* ช่องซ้ายบน */}
        <h2 className="font-bold text-lg mb-2">Machine Status</h2>
        <p>{isConnected ? "Connected" : "Disconnected"}</p>
        <p>Latest Power Consumption: {isDataRunning && data ? data["Energy Consumption"].Power.toFixed(2) + ' W' : 'N/A'}</p>
        <p>Latest Pressure: {isDataRunning && data ? data.Pressure.toFixed(2) + ' Pa' : 'N/A'}</p>
        <p>Latest Force: {isDataRunning && data ? data.Force.toFixed(2) + ' N' : 'N/A'}</p>
        <p>Position of the Punch: {isDataRunning && data ? data["Position of the Punch"].toFixed(2) + ' mm' : 'N/A'}</p>
        <button 
          onClick={toggleData} 
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          {isDataRunning ? 'หยุดการแสดงผล' : 'เริ่มการแสดงผล'}
        </button>
      </div>
      <div className="bg-white text-black rounded-lg p-4 shadow-md col-span-2"> {/* ช่องขวาบน */}
        <h2 className="font-bold text-lg mb-2">Machine Chart</h2>
        <ChartComponent isDataRunning={isDataRunning} /> {/* ส่ง props ไปยัง ChartComponent */}
      </div>
    </div>
  );
};

export default Dashboard;