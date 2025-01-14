// src/components/WeatherInfo.jsx
import React, { useState, useEffect } from 'react';
import { fetchWeather } from '../services/api';

const WeatherInfo = ({ city }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const getWeather = async () => {
      const data = await fetchWeather(city);
      setWeather(data);
    };
    getWeather();
  }, [city]);

  return weather ? (
    <div className="p-4 bg-blue-100 rounded-md">
      <h2>{city}</h2>
      <p>{weather.weather[0].description}</p>
      <p>{weather.main.temp}°C</p>
    </div>
  ) : (
    <p>Loading weather...</p>
  );
};

export default WeatherInfo;
