import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import WeatherForm from '../Weather/WeatherForm';
import CountdownTimer from '../CountDown/CountdownTimer';
import Destination from '../Destination/Destination';
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
      <div className="home-container">
        <h2 className="home-title">Start Packing:</h2>

        <div className="home-card-grid">
          <div className="home-weather-card-container">
            <WeatherForm fetchWeather={fetchWeather} />
            {weatherData && (
              <div className="home-weather-card">
                <h4>Weather in {weatherData}</h4>
              </div>
            )}
          </div>

          <Link to="/itineraries" className="home-card home-card-itinerary">
            <div className="home-card-content">
              <h3>Itinerary</h3>
              <p>Start building your travel plans with ease.</p>
            </div>
          </Link>

          <Link to="/user/journal" className="home-card home-card-journal">
            <div className="home-card-content">
              <h3>Journal</h3>
              <p>Keep track of your travel memories and notes.</p>
            </div>
          </Link>

          <Link to="/budget" className="home-card home-card-budget">
            <div className="home-card-content">
              <h3>Budget Planner</h3>
              <p>Manage your expenses and stay within budget.</p>
            </div>
          </Link>

          <Link to="/packing-list" className="home-card home-card-packing">
            <div className="home-card-content">
              <h3>Packing List</h3>
              <p>Ensure you have everything you need for your trip.</p>
            </div>
          </Link>

          <Link to="/flights" className="home-card home-card-flight">
            <div className="home-card-content">
              <h3>Flights</h3>
              <p>Look up your upcoming flights.</p>
            </div>
          </Link>

          <Link to="/checklist" className="home-card home-card-checklist">
            <div className="home-card-content">
              <h3>Checklist</h3>
              <p>Keep track of important items.</p>
            </div>
          </Link>

          <Link to="/set-countdown" className="home-card home-card-time">
            <div className="home-card-content">
              <CountdownTimer />
            </div>
          </Link>

          <Link
            to="/random-destination"
            className="home-card home-card-destination"
          >
            <div className="home-card-content">
              <h3>Destination</h3>
              <p>Discover your next adventure.</p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
