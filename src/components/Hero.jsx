import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

function Hero() {

    const apiKey = import.meta.env.VITE_openWeather_APIKey;

    const {register, handleSubmit, getValues} = useForm();

    const [data, setData] = useState(null)


    const getAxis = async(city, apiKey) => {
        try {
            const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`);
            const geoLocation = await response.json();
            return geoLocation;
        } catch (error) {
            console.log('Error :: get Latitude and Longitude error :: ' + error);
        }
    }

    const weather = async(city, apiKey) => {

        const location = await getAxis(city, apiKey);
        const {lon, lat} = location[0];
        console.log(lon, lat);

        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);
            // const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
            // const response = await fetch(`https://api.weatherapi.com/v1/current.json?q=${city}&lang=en&key=${apiKey}`);
            const data = await response.json();
            setData(data)
        } catch (error) {
            console.log('Error :: get weather error :: ' + error);
        }
    }

    console.log(data);
        
    return (
    <div className='w-full h-screen text-center text-white items-center bg-slate-900 flex'>
        <div id='leftSide' className='w-2/4'>
            <h3 className="text-6xl md:text-8xl font-extrabold bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient overflow-visible">Weather At Your <br />Fingertips !</h3>
        </div>


        <div id='rightSide' className='flex w-2/4 gap-5 flex-col rounded-lg p-5 h-3/4 bg-gradient-to-tl from-amber-400 to-teal-500'>
            <form onSubmit={handleSubmit((e) => weather(e.city, apiKey))} className='flex flex-col items-center gap-5 p-4'>
                <h2 className='text-5xl'>Enter city name: </h2>
                <input type="text" className='p-1 text-black h-10 w-1/2' onChange={(e) => setCity(e.target.value)} {...register('city', {required: 'This is required !!!'})} placeholder='Manhatten'/>
                <button type='submit' className='p-1 h-10 bg-blue-400'>Submit</button>
            </form>
            {data && (
                <div className='flex flex-col text-4xl font-bold items-center'>
                    {/* <p>{getValues().city}</p> */}
                    {/* <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} className='aspect-square w-24' alt="" />
                    <p>Temperature: {data.main.temp}</p>
                    <p>Humidity: {data.main.humidity}</p> */}
                </div>
            )}
        </div>
    </div>
  )
}

export default Hero;