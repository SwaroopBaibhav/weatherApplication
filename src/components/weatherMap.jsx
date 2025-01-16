import React, { useEffect, useState } from "react";
import DatamapsIndia from "react-datamaps-india";

const MapChart = () => {

    const apiKey = import.meta.env.VITE_openWeather_APIKey;

    const getTemp = async(state) => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${apiKey}&units=metric`)
        const data = await response.json()
        return data.main?.temp || 'N/A';
      } catch (error) {
        // console.log(`getTemp :: error :: ${error}`);
        return 'N/A';
      }
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
                    const data = await getTemp(state);
                    if (!temps[state]){
                      temps[state] = data
                    }
                  } catch (error) {
                    temps[state] = 'N/A'
                  }
                }
                setTempData(temps)
              }
              fetchTemp()
            }, [apiKey])

  return (
    <div className="h-full bg-red-200 w-full">
      <div className="relative m-auto w-1/2 bg-blend-multiply bg-fuchsia-200">
        <DatamapsIndia
          regionData={tempData}
          hoverComponent={({ value }) => {
            const temp = tempData[value.name];
            return(
            <div>
              <strong>{value.name}</strong>: {temp}°C
            </div>
          )}}
          mapLayout={{
            startColor: "green",
            endColor: "#005ce6",
            hoverTitle: "Count",
            noDataColor: "red",
            borderColor: "#8D8D8D",
            hoverColor: "blue",
            hoverBorderColor: "green",
          }}
        />
      </div>
    </div>
  );
};

export default MapChart;
