import React from 'react'

function Header() {
  return (
    <div className='sticky top-0 z-20'>
        <header>
            <nav className='flex flex-col sm:flex-row justify-between sm:justify-around p-5 bg-gradient-to-r from-orange-400 to-blue-400 items-center'>
            <div id='LogoImage' className='w-full sm:w-1/3 flex justify-center sm:justify-start'>
                <p></p>
                <img src="src\assets\sun.png" className='aspect-square h-12 ml-10 sm:ml-0' alt="Logo" />
            </div>
            <div id='NavigationLinks' className='flex flex-col sm:flex-row sm:mx-10 justify-center sm:justify-around w-full sm:w-2/3'>
                <div className='hover:scale-105 hover:bg-orange-400 hover:ease-in duration-100 p-1.5 rounded-lg mb-2 sm:mb-0'>
                <a href="">Get Latitude and Longitude</a>
                </div>
                <div className='hover:scale-105 hover:bg-orange-400 hover:ease-in duration-100 p-1.5 rounded-lg mb-2 sm:mb-0'>
                <a href="">Get Daily Updates</a>
                </div>
                <div className='hover:scale-105 hover:bg-orange-400 hover:ease-in duration-100 p-1.5 rounded-lg'>
                <a href="">Github</a>
                </div>
            </div>
            </nav>
        </header>
    </div>
  )
}

export default Header
