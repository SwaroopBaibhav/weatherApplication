import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { addCurrentWeatherData, addForecastWeatherData, addCurrentCity } from '../weatherSlice/WeatherSlice';
import { useDispatch, useSelector } from 'react-redux';

function Hero() {
    const {register, handleSubmit, getValues} = useForm();
    const apiKey = import.meta.env.VITE_openWeather_APIKey;
    const dispatch = useDispatch();
    const [city, setCity] = useState('');
    
    useEffect(() => {
        const getUserLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const userPosition = {
                            Latitude: position.coords.latitude,
                            Longitude: position.coords.longitude,
                        };
                        console.log("User Position:", userPosition); // Logs the location to the console

                        try {
                            const response = await fetch(
                                `https://api.openweathermap.org/data/2.5/weather?lat=${userPosition.Latitude}&lon=${userPosition.Longitude}&appid=${apiKey}&units=metric`
                            );
                            const data = await response.json();
                            console.log(data);
                            dispatch(addForecastWeatherData(data)); // Dispatch the weather data to Redux
                        } catch (error) {
                            console.error("Error fetching weather data:", error);
                        }
                    },
                    (error) => {
                        console.error("Error fetching location:", error);
                        alert('Failed to get location. Please enable location services.');
                    }
                );
            } else {
                alert('Geolocation is not supported in this browser!!!');
            }
        };

        getUserLocation(); // Call the function to get user location
    }, [apiKey, dispatch]);

    const setForecastWeather = (city) => {
        (async function setWeather(){
            try {
                const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
                const data = await response.json();
                dispatch(addForecastWeatherData(data))
            } catch (error) {
                console.log('Error :: set forecast weather error :: ' + error);
            }
        })();
    }

    const setCurrentWeather = (city) => {
        setCity(city.charAt(0).toUpperCase() + city.slice(1));
        console.log(city);
        (async function setWeather(){
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
                const data = await response.json();
                dispatch(addCurrentWeatherData(data))
                dispatch(addCurrentCity(data))
            } catch (error) {
                console.log('Error :: set weather error :: ' + error);
            }
        })();
        setForecastWeather(city);
    }

    const currentWeatherData = useSelector((state) => state.currentWeatherData);
    console.log(currentWeatherData);

    return (
        <div className='w-full h-screen text-center text-white items-center flex flex-col md:flex-row'>
            <div id='leftSide' className='w-full md:w-2/4'>
                <h3 className="text-5xl md:text-8xl font-extrabold bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient overflow-visible">
                    Weather At Your <br />Fingertips !
                </h3>
            </div>

            <div id='rightSide' className='flex w-full md:w-2/4 gap-5 p-5 h-3/4 justify-center'>
                <div className='flex flex-col items-center p-10 rounded-lg w-11/12 md:w-3/4 bg-gradient-to-tl from-amber-500 to-teal-500'>
                    <form onSubmit={handleSubmit((e) => setCurrentWeather(e.city))} className='flex flex-col gap-5 items-center'>
                        <h2 className='text-3xl md:text-5xl font-extrabold font-sans underline underline-offset-8'>
                            Enter city name
                        </h2>
                        <br />
                        <input 
                            type="text" 
                            className='p-2 text-black text-xl md:text-2xl rounded-lg h-12 w-3/4 md:w-1/2 text-center' 
                            {...register('city', {required: 'This is required !!!'})} 
                            placeholder='Manhattan'
                        />
                        <button 
                            type='submit' 
                            className='px-4 py-2 rounded-lg h-10 bg-blue-400 hover:bg-gradient-to-r hover:from-blue-400 hover:to-blue-500 hover:shadow-lg hover:ease-in duration-150 transition-all'
                        >
                            Submit
                        </button>
                        {(currentWeatherData[city] && getValues().city) ? (
                            <div className='justify-center'>
                                <h1 className='text-2xl md:text-3xl font-extrabold'>{getValues().city.charAt(0).toUpperCase() + getValues().city.slice(1)}</h1>
                                <img className='m-auto my-0 py-0' src={`https://openweathermap.org/img/wn/${currentWeatherData[city].weather[0].icon}@2x.png`} alt="weather-icon" />
                                <h1 className='text-xl md:text-3xl font-extrabold'>
                                    Temperature: {currentWeatherData[city].main.temp} <sup>o</sup>C
                                </h1>
                                <h1 className='text-xl md:text-3xl font-extrabold'>
                                    Humidity: {currentWeatherData[city].main.humidity}
                                </h1>
                            </div>
                        ) : (
                            <h1 className='text-xl md:text-3xl font-extrabold'>Enter Valid City, not state or any landmarks.</h1>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Hero;
