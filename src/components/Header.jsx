import React from 'react'

function Header() {
  return (
    <div className='sticky top-0'>
        <header>
            <nav className='flex justify-around p-5 bg-gradient-to-r from-orange-400 to-blue-400'>
            <div id='LogoImage' className='w-1/3'>
                {/* <img src="https://e7.pngegg.com/pngimages/487/562/png-clipart-sun-logo-sunlight-thumbnail.png" className='mix-blend-multiply' alt="" /> */}
                <h2>Sun Logo</h2>
            </div>
            <div id='NavigationLinks' className='flex justify-around w-2/3'>
                <div className='hover:scale-105 hover:bg-orange-400 hover:ease-in duration-100 p-1 rounded-lg'>
                <a href="">Get Latitude and Longitude</a>
                </div>
                <div className='hover:scale-105 hover:bg-orange-400 hover:ease-in duration-100 p-1 rounded-lg'>
                <a href="">Get Daily Updates</a>
                </div>
                <div className='hover:scale-105 hover:bg-orange-400 hover:ease-in duration-100 p-1 rounded-lg'>
                <a href="">Github</a>
                </div>
            </div>
            </nav>
        </header>
    </div>
  )
}

export default Header