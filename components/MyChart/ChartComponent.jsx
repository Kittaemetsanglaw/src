import React, { useContext, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import { WebSocketContext } from '../services/WebSocketProvider.jsx';
import zoomPlugin from 'chartjs-plugin-zoom';

Chart.register(CategoryScale);

const MAX_DATA_POINTS = 50; // จำนวนข้อมูลสูงสุดที่ต้องการเก็บ

const ChartComponent = ({ isDataRunning }) => {
  const { data, isConnected } = useContext(WebSocketContext);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Power Consumption',
        data: [],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0,
      },
      {
        label: 'Pressure',
        data: [],
        borderColor: 'rgb(153, 102, 255)',
        tension: 0,
      },
      {
        label: 'Force',
        data: [],
        borderColor: 'rgb(255, 159, 64)',
        tension: 0,
      },
      {
        label: 'Position of the Punch',
        data: [],
        borderColor: 'rgb(0, 0, 255)',
        tension: 0,
      },
    ],
  });

  useEffect(() => {
    if (data && isDataRunning) {
      setChartData((prevData) => {
        const newChartData = {
          labels: [...prevData.labels, new Date().toLocaleTimeString()],
          datasets: prevData.datasets.map((dataset, index) => {
            let newDataPoint;
            switch (index) {
              case 0:
                newDataPoint = data["Energy Consumption"].Power;
                break;
              case 1:
                newDataPoint = data.Pressure;
                break;
              case 2:
                newDataPoint = data.Force;
                break;
              case 3:
                newDataPoint = data["Position of the Punch"];
                break;
              default:
                newDataPoint = null;
            }

            // เพิ่มข้อมูลใหม่และลบข้อมูลเก่าถ้าจำนวนข้อมูลเกิน MAX_DATA_POINTS
            const updatedData = [...dataset.data, newDataPoint].slice(-MAX_DATA_POINTS);
            return {
              ...dataset,
              data: updatedData,
            };
          }),
        };

        // ลบ label เก่าถ้าจำนวน label เกิน MAX_DATA_POINTS
        const updatedLabels = [...newChartData.labels].slice(-MAX_DATA_POINTS);
        newChartData.labels = updatedLabels;

        return newChartData;
      });
    }
  }, [data, isDataRunning]);

  return (
    <div className="w-full p-4">
      {!isConnected && (
        <div className="text-red-500 font-bold mb-4">
          Disconnected. Attempting to reconnect...
        </div>
      )}
      {isConnected && (
        <div className="text-green-500 font-bold mb-4">
          Connected to WebSocket!
        </div>
      )}
      <Line data={chartData} options={{ responsive: true }} />
    </div>
  );
};

export default ChartComponent;