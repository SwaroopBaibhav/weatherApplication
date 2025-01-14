import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    currentWeatherData: {},
    forecastWeatherData: {},
}

const weatherSlice = createSlice({
    name: 'weatherData',
    initialState,
    reducers: {
        addCurrentWeatherData: (state, action) => {
            const data = {
                id: action.payload.name,
                weatherToday: action.payload,
            }
            action.payload.id !== undefined ? (state.currentWeatherData[action.payload.id] = data) : null;
            
        },
        addForecastWeatherData: (state, action) => {
            const data = {
                id: action.payload.city.name,
                weatherForecast: action.payload,
            }
            state.forecastWeatherData[data.id] = data;
        }
    }
})

export const {addCurrentWeatherData, addForecastWeatherData} = weatherSlice.actions;

export default weatherSlice.reducer;