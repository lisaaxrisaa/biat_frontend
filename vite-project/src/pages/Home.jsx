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

          {/* Feature Cards */}
          <Link to="/itineraries" className="home-card home-card-itinerary">
            <div className="home-card-content">
              <h3>Itinerary</h3>
              <p>Start building your travel plans with ease.</p>
            </div>
          </Link>

          <Link to="/user/journals" className="home-card home-card-journal">
            <div className="home-card-content">
              <h3>Journal</h3>
              <p>Keep track of your travel memories and notes.</p>
            </div>
          </Link>

<<<<<<< HEAD
          <div className="card">
            <h3>Journal</h3>
            <Link to="/user/journal">
              <h4>Click here to view your journal</h4>
            </Link>
          </div>
=======
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
>>>>>>> 119202d2f1ddc99eeb38f71c13307acedb5f706b
        </div>
      </div>
    </>
  );
};

export default Home;
