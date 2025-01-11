import { useState } from 'react'
import './App.css'
import Hero from './components/Hero'
import Header from './components/Header'
import ContextProvider from './context/ContextProvider'

function App() {
  const [count, setCount] = useState(0)

  return (
    <ContextProvider className='flex flex-col'>
      <Header />
      <Hero />
    </ContextProvider>
  )
}

export default App
