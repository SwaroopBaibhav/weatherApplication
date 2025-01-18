import React, { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { scaleQuantile } from 'd3-scale';
import { Tooltip } from 'react-tooltip'
import './App.css';
import INDIA_TOPO_JSON from './india.topo.json';


// const INDIA_TOPO_JSON = require('./india.topo.json');

const PROJECTION_CONFIG = {
  scale: 350,
  center: [78.9629, 22.5937] // always in [East Latitude, North Longitude]
};

const COLOR_RANGE = [
  '#ff6666', // soft red
  '#ff4d4d', // light red
  '#ff3333', // light coral
  '#ff1a1a', // coral
  '#ff7518', // orange
  '#ffcc66', // light yellow-orange
  '#66a3ff', // light blue
  '#3385cc', // moderate blue
  '#006bb3'  // dark blue
];

const DEFAULT_COLOR = '#EEE';

const geographyStyle = {
  default: {
    outline: 'none'
  },
  hover: {
    fill: '#ccc',
    transition: 'all 250ms',
    outline: 'none'
  },
  pressed: {
    outline: 'none'
  }
};

const apiKey = '0dc5bc843fc9236eedf43292081a6f9d';

const getTemp = async (e) => {
  try {
    const value = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${e.state}&appid=${apiKey}&units=metric`
    );
    if (!value.ok) {
      throw new Error(`Failed to fetch data for ${e.state}`);
    }
    const data = await value.json();
    e.temp = data && data.main ? data.main.temp : 'N/A'; // Add temp to the state object
  } catch (error) {
    e.temp = 'N/A'; // Fallback if there's an error
  }
};

// Define the updateDataWithTemps function
const updateDataWithTemps = async (data) => {
  await Promise.all(data.map((e) => getTemp(e))); // Fetch temperatures for each state
  return data; // Return the updated data with temperature info
};

const getHeatMapData = () => {
  return [
    { id: 'AP', state: 'Andhra Pradesh' },
    { id: 'AR', state: 'Arunachal Pradesh' },
    { id: 'AS', state: 'Assam' },
    { id: 'BR', state: 'Bihar' },
    { id: 'CT', state: 'Chhattisgarh' },
    { id: 'GA', state: 'Goa' },
    { id: 'GJ', state: 'Gujarat' },
    { id: 'HR', state: 'Haryana' },
    { id: 'HP', state: 'Himachal Pradesh' },
    { id: 'JH', state: 'Jharkhand' },
    { id: 'KA', state: 'Karnataka' },
    { id: 'KL', state: 'Kerala' },
    { id: 'MP', state: 'Madhya Pradesh' },
    { id: 'MH', state: 'Maharashtra' },
    { id: 'MN', state: 'Manipur' },
    { id: 'ML', state: 'Meghalaya' },
    { id: 'MZ', state: 'Mizoram' },
    { id: 'NL', state: 'Nagaland' },
    { id: 'OR', state: 'Odisha' },
    { id: 'PB', state: 'Punjab' },
    { id: 'RJ', state: 'Rajasthan' },
    { id: 'SK', state: 'Sikkim' },
    { id: 'TN', state: 'Tamil Nadu' },
    { id: 'TG', state: 'Telangana' },
    { id: 'TR', state: 'Tripura' },
    { id: 'UT', state: 'Uttarakhand' },
    { id: 'UP', state: 'Uttar Pradesh' },
    { id: 'WB', state: 'West Bengal' },
    { id: 'AN', state: 'Andaman and Nicobar Islands' },
    { id: 'CH', state: 'Chandigarh' },
    { id: 'DN', state: 'Dadra and Nagar Haveli' },
    { id: 'DD', state: 'Daman and Diu' },
    { id: 'DL', state: 'Delhi' },
    { id: 'JK', state: 'Jammu and Kashmir' },
    { id: 'LA', state: 'Ladakh' },
    { id: 'LD', state: 'Lakshadweep' },
    { id: 'PY', state: 'Puducherry' }
  ];
};

const CountryMap = () => {
  const [tooltipContent, setTooltipContent] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const heatMapData = getHeatMapData();
      const updatedData = await updateDataWithTemps(heatMapData); // Update data with temperatures
      setData(updatedData); // Set the updated data to state
    };

    fetchData();
  }, []);

  const colorScale = scaleQuantile()
    .domain(data.map(d => d.temp !== 'N/A' ? d.temp : 0))  // Use temp values for color scaling
    .range(COLOR_RANGE);

  const onMouseEnter = (geo, current = { value: 'NA' }) => {
    return () => {
      setTooltipContent(`${geo.properties.name}: ${current.temp || 'N/A'}`);
    };
  };

  const onMouseLeave = () => {
    setTooltipContent('');
  };

  return (
    <div className='w-full flex items-center justify-around text-white p-8'>
      <div className="full-width-height container p-8">
        <Tooltip>{tooltipContent}</Tooltip>
        <ComposableMap
          projectionConfig={PROJECTION_CONFIG}
          projection="geoMercator"
          width={300}
          height={200}
          data-tip=""
        >
          <Geographies geography={INDIA_TOPO_JSON}>
            {({ geographies }) =>
              geographies.map(geo => {
                const current = data.find(s => s.id === geo.id);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={current ? colorScale(current.temp) : DEFAULT_COLOR}
                    style={geographyStyle}
                    onMouseEnter={onMouseEnter(geo, current)}
                    onMouseLeave={onMouseLeave}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
      </div>
      <div className='w-1/3'>
        <h2 className='text-5xl font-extrabold font-sans'>
          And the Average Temperature all over of India
        </h2>
      </div>
    </div>
  );
};

export default CountryMap;
