import React from 'react';
import { useState, useEffect } from 'react';
import { useGetWeatherQuery } from '../store/weatherSlice';
import getWeatherIcon from './WeatherIcons';
import WeatherCard from './WeatherCard';
import './weather.css';

const WeatherForm = () => {
  const [location, setLocation] = useState('');
  const { data, error, isLoading } = useGetWeatherQuery(location, {
    skip: !location || location.length < 3,
  });

  useEffect(() => {
    const savedLocation = localStorage.getItem('weatherLocation');
    if (savedLocation) {
      setLocation(savedLocation);
    }
  }, []);

  useEffect(() => {
    if (location) {
      localStorage.setItem('weatherLocation', location);
    }
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location.trim().length < 3) {
      alert('Please enter a valid location');
    }
  };

  return (
    <>
      <div className="home-weather-card">
        <form onSubmit={handleSubmit} className="weather-form">
          <input
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <button className="weather-btn" type="submit">
            Get Weather
          </button>
        </form>
        <br />
        {isLoading && <p>Loading...</p>}

        {error && (
          <p>Error: {error.message || 'Unable to fetch weather data.'}</p>
        )}

        {data && data.currentConditions ? (
          <div className="weather-info">
            <h4>{data.address}</h4>
            <div>{getWeatherIcon(data.currentConditions.conditions)}</div>
            <p>Temperature: {data.currentConditions?.temp ?? 'N/A'}°F</p>
            <p>Feels Like: {data.currentConditions?.feelslike ?? 'N/A'}°F</p>
            <p>Precipitation: {data.currentConditions?.precip ?? 'N/A'}</p>
            <p>
              Precipitation Probability:{' '}
              {data.currentConditions?.precipprob ?? 'N/A'}%
            </p>
            <p>Humidity: {data.currentConditions?.humidity ?? 'N/A'}%</p>
            <p>Wind Speed: {data.currentConditions?.windspeed ?? 'N/A'} mph</p>
            <p>Cloud Cover: {data.currentConditions?.cloudcover ?? 'N/A'}%</p>
            <p>Conditions: {data.currentConditions?.conditions ?? 'N/A'}</p>
          </div>
        ) : (
          <p>No weather data available</p>
        )}
      </div>
    </>
  );
};

export default WeatherForm;
