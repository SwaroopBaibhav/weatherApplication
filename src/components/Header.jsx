import React from 'react'

function Header() {
  return (
    <div className='sticky top-0 z-20'>
        <header>
            <nav className='flex justify-around p-5 bg-gradient-to-r from-orange-400 to-blue-400 items-center'>
            <div id='LogoImage' className='w-1/3'>
                <p></p>
                <img src="src\assets\sun.png" className='aspect-square h-12 ml-10' alt="" />
            </div>
            <div id='NavigationLinks' className='flex mx-10 justify-around w-2/3'>
                <div className='hover:scale-105 hover:bg-orange-400 hover:ease-in duration-100 p-1.5 rounded-lg'>
                <a href="">Get Latitude and Longitude</a>
                </div>
                <div className='hover:scale-105 hover:bg-orange-400 hover:ease-in duration-100 p-1.5 rounded-lg'>
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