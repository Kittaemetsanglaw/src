// src/components/WebSocketProvider.js
import React, { createContext, useEffect, useState } from 'react';

export const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);

  const DataKey = 'e57972d26910e9d9e4caf68fd941c775'; // เปลี่ยนชื่อจาก APIKey เป็น DataKey

  useEffect(() => {
    const socket = new WebSocket('ws://technest.ddns.net:8001/ws');

    socket.addEventListener("open", (event) => {
      setIsConnected(true);
      setError(null); // Reset error state
      console.log('WebSocket connection established');
      // ส่ง DataKey ไปยังเซิร์ฟเวอร์เมื่อเชื่อมต่อสำเร็จ
      socket.send(DataKey);
    });

    // Listen for messages
    socket.addEventListener("message", (event) => {
      console.log("Message from server ", event.data);
      // ตรวจสอบว่าข้อมูลที่ได้รับเป็น JSON หรือไม่
      try {
        const receivedData = JSON.parse(event.data);
        console.log('Parsed data:', receivedData); // แสดงข้อมูลที่ถูกแปลง
        setData(receivedData);
      } catch (error) {
        console.warn('Received non-JSON data:', event.data);
        // คุณสามารถจัดการข้อความที่ไม่ใช่ JSON ที่นี่
        if (event.data === "Connection authorized") {
          console.log("Connection authorized by server.");
        } else {
          console.error('Error parsing data:', error);
        }
      }
    });

    socket.addEventListener("close", () => {
      setIsConnected(false);
      console.log('WebSocket connection closed');
    });

    socket.addEventListener("error", (error) => {
      setError(error);
      console.error('WebSocket error:', error);
    });

    // Cleanup function to close the socket when the component unmounts
    return () => {
      socket.close();
    };
  }, []); // Dependency array is empty to run only on mount and unmount

  return (
    <WebSocketContext.Provider value={{ data, isConnected, error }}>
      {children}
    </WebSocketContext.Provider>
  );
};