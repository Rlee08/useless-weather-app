"use client"

import React, {useState, useEffect} from 'react';
import {fetchWeatherData, getUserLocation} from '../components/weatherFetcher.js';

const HomePage = () => {

  const [description, setDescription] = useState(null);

  useEffect(() => {
    const getWeather = async () => {
      try {
        const {lat,long} = await getUserLocation();
        console.log(lat);
        console.log('fetchingweatherdata');
        const forecast = await fetchWeatherData(lat,long);
        setDescription(forecast);
      } catch (error) {
        setDescription('Unable to fetch weather data');
      }
    };

    getWeather();
  }, []);

  return(
    <div className="flex flex-col justify-center items-center w-full h-screen gap-4 text-center">
      <h1 className="text-4xl">What's the weather today?</h1>
      <h1 id="weather" className="text-4xl max-w-lg">{description || 'Loading...'}</h1>
    </div>
  )
}

export default HomePage