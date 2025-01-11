import React, { useState } from 'react'
import weatherContext from './ContextAPI'

function ContextProvider({children}) {

    const [weather, setWeather] = useState(null);

  return (
    <weatherContext.Provider value={{weather, setWeather}}>
        {children}
    </weatherContext.Provider>
  )
}

export default ContextProvider;