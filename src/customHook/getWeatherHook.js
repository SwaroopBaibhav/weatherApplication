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

export default {getAxis, getWeather};