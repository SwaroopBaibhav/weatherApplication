import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import NavCards from './NavCards';
import weatherContext from '../context/ContextAPI';

function Hero() {

    const apiKey = import.meta.env.VITE_openWeather_APIKey;
    const {register, handleSubmit, getValues} = useForm();
    const {weather, setWeather} = useContext(weatherContext)


    const getAxis = async(city, apiKey) => {
        try {
            const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`);
            const geoLocation = await response.json();
            return geoLocation;
        } catch (error) {
            console.log('Error :: get Latitude and Longitude error :: ' + error);
        }
    }


    const getWeather = async(city, apiKey) => {
        const location = await getAxis(city, apiKey);
        const {lon, lat} = location[0];
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
            const data = await response.json();
            setWeather(data)
        } catch (error) {
            console.log('Error :: get weather error :: ' + error);
        }
    }

    console.log(weather);
        
    return (
    <div className='w-full h-screen text-center text-white items-center bg-slate-900 flex'>
        <div id='leftSide' className='w-2/4'>
            <h3 className="text-6xl md:text-8xl font-extrabold bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient overflow-visible">Weather At Your <br />Fingertips !</h3>
        </div>


        <div id='rightSide' className='flex w-2/4 gap-5 p-5 h-3/4 justify-center'>
            <div className='flex flex-col items-center p-10 rounded-lg w-3/4 bg-gradient-to-tl from-amber-500 to-teal-500'>
                <form onSubmit={handleSubmit((e) => getWeather(e.city, apiKey))} className='flex flex-col gap-5 items-center'>
                    <h2 className='text-5xl font-extrabold font-sans underline underline-offset-8'>Enter city name </h2>
                    <br />
                    <input type="text" className='p-1 text-black rounded-lg h-10 w-1/2 text-center' onChange={(e) => setCity(e.target.value)} {...register('city', {required: 'This is required !!!'})} placeholder='Manhatten'/>
                    <button 
                    type='submit' 
                    className='px-2.5 py-2 rounded-lg h-10 bg-blue-400 hover:bg-gradient-to-r hover:from-blue-400 hover:to-blue-500 hover:shadow-lg hover:ease-in duration-300 transition-all'
                    >
                    Submit
                    </button>
                </form>
                {weather && (
                    <div className='flex flex-col text-4xl font-bold items-center'>
                        <p>{(getValues().city).charAt(0).toUpperCase() + (getValues().city).slice(1)}</p>
                        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} className='aspect-square w-24' alt="" />
                        <p>Temperature: {weather.main.temp} <sup>o</sup>C</p>
                        <p>Humidity: {weather.main.humidity}</p>
                    </div>
                )}
            </div>
        </div>

        <NavCards props={{bottom:'red', top: 'yellow'}}/>

    </div>
  )
}

export default Hero;