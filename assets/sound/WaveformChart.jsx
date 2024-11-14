// WaveformChart.jsx
import React, { useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';

const WaveformChart = ({ audioData }) => {
  const chartRef = useRef(null);

  const chartData = {
    labels: audioData.map((_, index) => index), // ใช้ index เป็น label
    datasets: [
      {
        label: 'Waveform',
        data: audioData,
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
      },
    ],
  };

  return (
    <div>
      <h2 className="font-bold text-lg mb-2">Audio Waveform</h2>
      <Line data={chartData} />
    </div>
  );
};

export default WaveformChart;