import './App.css'
import Hero from './components/Hero'
import Header from './components/Header'
// import ContextProvider from './context/ContextProvider'
import WeatherChart from './components/weatherChart'
import { Provider } from 'react-redux'
import { store } from './store/Store'

function App() {
  

  return (
    <Provider store={store} className='flex flex-col'>
      <Header />
      <Hero />
      <WeatherChart />
    </Provider>
  )
}

export default App
