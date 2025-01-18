import './App.css'
import Hero from './components/Hero'
import Header from './components/Header'
import WeatherChart from './components/weatherChart'
import { Provider } from 'react-redux'
import { store } from './store/Store'
import LinePlot from './components/D3plot'
import { useState } from 'react'
import * as d3 from 'd3'
import CountryMap from './components/IndiaMapTemp/CountryMap'

function App() {
  
  const [data, setData] = useState(() => d3.ticks(-2, 5, 200).map(Math.sin));

  return (
    <Provider store={store} className='flex flex-col'>
      <Header />
      <Hero />
      <WeatherChart />
      <CountryMap />
    </Provider>
  )
}

export default App;