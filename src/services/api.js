// src/services/api.js
import axios from 'axios';

const api ={
    base: "https://api.openweathermap.org/data/2.5/",
    key: '82da6264f62b4677551c040f5e6c6437'
}

// Add error checking
if (!api.key) {
  console.error('Weather API key is missing. Make sure REACT_APP_WEATHER_API_KEY is set in .env file');
}

export const fetchWeather = async (city) => {
  try {
    const response = await axios.get(
      `${api.base}weather?q=${city}&appid=${api.key}&units=metric`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};
