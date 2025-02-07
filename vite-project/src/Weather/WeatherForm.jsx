import React from 'react';
import { useState } from 'react';
import { useGetWeatherQuery } from '../store/weatherSlice';

const WeatherForm = () => {
  const [location, setLocation] = useState('');
  const { data, error, isLoading } = useGetWeatherQuery(location, {
    skip: !location,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <h2>The Weather Is...</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button type="submit">Get Weather</button>
      </form>

      {isLoading && <p>Loading...</p>}

      {error && <p>Unable to fetch weather data. Please try again.</p>}

      {data && (
        <div>
          <h3>Weather in {data.location.name}</h3>
          <p>Temperature: {data.currentConditions.temp}°F</p>
          <p>Feels Like: {data.currentConditions.feelslike} °F</p>
          <p>Precipitation amount: {data.currentConditions.precip}</p>
          <p>
            Precipitation probability:
            {data.currentConditions.precipprob}
          </p>
          <p>Humidity: {data.currentConditions.humidity}%</p>
          <p>Wind Speed: {data.currentConditions.windspeed} mph</p>
          <p>Cloud Cover: {data.currentConditions.cloudcover} mph</p>
          <p>Conditions: {data.currentConditions.conditions}</p>
        </div>
      )}
    </>
  );
};

export default WeatherForm;
