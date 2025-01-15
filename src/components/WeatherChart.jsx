import React from "react";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
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

function LinePlot() {
  const dates = useSelector((state) => state.forecastWeatherData)
  // console.log(dates);
  
  let dayLabels = []
  let temperature = []
  Object.entries(dates).forEach(([date, data]) => {
    dayLabels.push(date);
    temperature.push(data.average);
  });
  // console.log(dayLabels);
  // console.log(temperature);
  
  const data = {
    labels: dayLabels, // x-axis labels
    datasets: [
      {
        data: temperature, // y-axis values
        borderColor: 'red', // Line color
        tension: 0.2,
      },
    ],
  };
  
  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: true,
      },
    },
    animation: {
      duration: 2000, // Total animation duration (ms)
      easing: "easeInOutQuart",
    },
  };
  
  return (
    <div>
        <div className="w-full">
            <Line data={data} options={options} />
        </div>
    </div>
  );
}

export default LinePlot;
