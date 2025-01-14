import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from '../weatherSlice/WeatherSlice'

export const store = configureStore({
    reducer: weatherReducer,
})