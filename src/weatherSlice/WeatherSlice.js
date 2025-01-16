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
            const city = action.payload.name.toLowerCase();
            if (!state.currentWeatherData[city]){
                state.currentWeatherData[city] = action.payload
            }
        },
        addForecastWeatherData: (state, action) => {
            let mainData = {};
            action.payload.list.map((e) => {
                const day = new Date(e.dt * 1000).toLocaleString('en-US', { weekday: 'long' });                
                if (!mainData[day]){
                    mainData[day] = {
                        sum: 0,
                        count: 0,
                    };
                }
                mainData[day].sum += e.main.temp;
                mainData[day].count += 1;
            })

            Object.keys(mainData).forEach((day) => {
                mainData[day].average = mainData[day].sum / mainData[day].count;
            });
            state.forecastWeatherData = mainData;
        }
    }
})

export const {addCurrentWeatherData, addForecastWeatherData} = weatherSlice.actions;

export default weatherSlice.reducer;