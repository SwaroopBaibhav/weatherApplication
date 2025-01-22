import React from "react";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip
);

function LinePlot() {
  const dates = useSelector((state) => state.forecastWeatherData);
  
  let dayLabels = [];
  let temperature = [];
  
  Object.entries(dates).forEach(([date, data]) => {
    dayLabels.push(date);
    temperature.push(data.average);
  });
  
  const data = {
    labels: dayLabels, // x-axis labels
    datasets: [
      {
        data: temperature, // y-axis values
        borderColor: 'white', // Line color
        tension: 0.2,
        backgroundColor: 'green',
        color: 'white',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: true,
        bodyColor: 'white',
        padding: 15,
        weight: 'bolder',
      },
      colors: {
        enabled: true,
        forceOverride: true,
      },
    },
    animation: {
      duration: 1000, // Total animation duration (ms)
      easing: "easeInOutQuart",
    },
  };

  const city = useSelector((state) => state.currentCity);  

  return (
    <div className="w-full p-4 md:p-8 text-white">
      <div className="flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="w-full md:w-1/3 relative">
          <div className="absolute inset-0 flex justify-center items-center z-0">
            <div className="h-60 bg-blue-400 rounded-lg skew-y-12 w-full max-w-xs"></div>
          </div>
          <h2 className="relative text-4xl md:text-5xl font-extrabold font-sans z-10 text-center md:text-left">
            Here's the 5-Day Forecast Report of {city}
          </h2>
        </div>
        <div className="w-full md:w-2/3">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
}

export default LinePlot;
