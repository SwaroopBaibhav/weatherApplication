import React, { useEffect, useState } from "react";
import DatamapsIndia from "react-datamaps-india";

const MapChart = () => {

    const apiKey = import.meta.env.VITE_openWeather_APIKey;

    const getTemp = async(state) => {
        await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${apiKey}&units=metric`)
    }

    const states = [
        "Andaman & Nicobar Island",
        "Andhra Pradesh",
        "Arunanchal Pradesh",
        "Assam",
        "Bihar",
        "Chandigarh",
        "Chhattisgarh",
        "Delhi",
        "Goa",
        "Gujarat",
        "Haryana",
        "Himachal Pradesh",
        "Jammu & Kashmir",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Lakshadweep",
        "Madhya Pradesh",
        "Maharashtra",
        "Manipur",
        "Meghalaya",
        "Mizoram",
        "Nagaland",
        "Odisha",
        "Puducherry",
        "Punjab",
        "Rajasthan",
        "Sikkim",
        "Tamil Nadu",
        "Telangana",
        "Tripura",
        "Uttar Pradesh",
        "Uttarakhand",
        "West Bengal",
      ];

      const [tempData, setTempData] = useState({})

      useEffect(() => {
        const fetchTemp = async() => {
            const temps = {};
            for (const state of states){
                try {
                    data = await getTemp(state).json()
                    temps[state] = getTemp(state).main?.temp
                } catch (error) {
                    temps[state] = 'N/A'
                }
            }
            setTempData(temps)
        }
        fetchTemp()
      })

  return (
    <div style={{ position: "relative" }}>
      <DatamapsIndia
        regionData={tempData}
        hoverComponent={({ value }) => {
          return (
            <div>
              <div>
                {value.name} {value.value} OCs
              </div>
            </div>
          );
        }}
        mapLayout={{
          title: "Average temperature in India",
          legendTitle: "Number of OCs",
          startColor: "#b3d1ff",
          endColor: "#005ce6",
          hoverTitle: "Count",
          noDataColor: "red",
          borderColor: "#8D8D8D",
          hoverColor: "blue",
          hoverBorderColor: "green",
          height: 10,
          weight: 30,
        }}
      />
    </div>
  );
};

export default MapChart;
