import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Hero from './components/Hero'
import Header from './components/Header'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='flex flex-col'>
      <Header />
      <Hero />
    </div>
  )
}

export default App
