import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import WeatherForm from '../Weather/WeatherForm';
import './home.css';

const Home = () => {
  const navigate = useNavigate();
  const [weatherData, setWeatherData] = useState(null);

  const token = sessionStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate(`/login`);
    }
  }, [token, navigate]);

  const fetchWeather = (location) => {
    setWeatherData(location);
  };

  return (
    <>
      <div className="home-wrapper">
        <h2 className="home-title">Start Planning:</h2>
        <div className="card-grid">
          <WeatherForm fetchWeather={fetchWeather} />
          {weatherData && (
            <div className="card">
              <h4>Weather in {weatherData}</h4>
            </div>
          )}

          <div className="card">
            <h3>Itinerary</h3>
            <Link to="/itineraries">
              <h4>Start building your itineraries</h4>
            </Link>
          </div>

          <div className="card">
            <h3>Journal</h3>
            <Link to="/user/journals">
              <h4>Click here to view your journal</h4>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
