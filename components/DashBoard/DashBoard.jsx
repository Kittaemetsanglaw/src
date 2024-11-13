import React, { useContext } from 'react';
import { WebSocketContext } from '../services/WebSocketProvider.jsx'; // แก้ไขพาธ
import ChartComponent from '../MyChart/ChartComponent.jsx';

const Dashboard = () => {
  const { data, isConnected } = useContext(WebSocketContext); // ดึงข้อมูลและสถานะการเชื่อมต่อจาก WebSocket

  return (
    <div className="flex-1 bg-gray-50 text-black p-4 grid grid-cols-3 gap-4 h-screen">
      <div className="bg-white rounded-lg p-4 shadow-md"> {/* ช่องซ้ายบน */}
        <h2 className="font-bold text-lg mb-2">Machine Status</h2>
        <p>{isConnected ? "Connected" : "Disconnected"}</p>
        <p>Latest Power Consumption: {data ? data["Energy Consumption"].Power.toFixed(2) + ' W' : 'N/A'}</p>
        <p>Latest L1-GND Voltage: {data ? data.Voltage["L1-GND"].toFixed(2) + ' V' : 'N/A'}</p>
        <p>Latest L2-GND Voltage: {data ? data.Voltage["L2-GND"].toFixed(2) + ' V' : 'N/A'}</p>
        <p>Latest L3-GND Voltage: {data ? data.Voltage["L3-GND"].toFixed(2) + ' V' : 'N/A'}</p>
        <p>Latest Pressure: {data ? data.Pressure.toFixed(2) + ' Pa' : 'N/A'}</p>
        <p>Latest Force: {data ? data.Force.toFixed(2) + ' N' : 'N/A'}</p>
        <p>Cycle Count: {data ? data["Cycle Count"] : 'N/A'}</p>
        <p>Position of the Punch: {data ? data["Position of the Punch"].toFixed(2) + ' mm' : 'N/A'}</p>
      </div>
      <div className="bg-white text-black rounded-lg p-4 shadow-md col-span-2"> {/* ช่องขวาบน */}
        <h2 className="font-bold text-lg mb-2">Machine Chart</h2>
        <ChartComponent /> {/* ใช้ ChartComponent แสดงข้อมูลในรูปแบบกราฟ */}
      </div>
      
    </div>
  );
};

export default Dashboard;