import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"], // x-axis labels
  datasets: [
    {
      data: [65, 59, 80, 81, 56, 55, 40, 70], // y-axis values
      borderColor: 'red', // Line color
      tension: 0.2,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    tooltip: {
      enabled: true,
    },
  },
  animation: {
    duration: 2000, // Total animation duration (ms)
    easing: "easeInOutQuart",
  },
};

function LinePlot() {
  return (
    <div>
        <div className="w-full">
            <Line data={data} options={options} />
        </div>
    </div>
  );
}

export default LinePlot;
