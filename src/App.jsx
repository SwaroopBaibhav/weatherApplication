import './App.css'
import Hero from './components/Hero'
import Header from './components/Header'
import WeatherChart from './components/weatherChart'
import { Provider } from 'react-redux'
import { store } from './store/Store'
import MapChart from './components/weatherMap'

function App() {
  

  return (
    <Provider store={store} className='flex flex-col'>
      <Header />
      <Hero />
      <WeatherChart />
      <MapChart />
    </Provider>
  )
}

export default App
