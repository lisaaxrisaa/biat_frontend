import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useGetItinerariesQuery } from '../store/itinerarySlice';
import WeatherForm from '../Weather/WeatherForm';
import ItineraryList from '../Itinerary/ItineraryList';

const Home = () => {
  const navigate = useNavigate();
  const [weatherData, setWeatherData] = useState(null);
  const token = sessionStorage.getItem('token');
  const [showItineraries, setShowItineraries] = useState(false);
  // const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    if (!token) {
      navigate(`/login`);
    }
  }, [token, navigate]);

  const { data: itineraries, error, isLoading } = useGetItinerariesQuery();

  const fetchWeather = (location) => {
    setWeatherData(location);
  };

  const handleBuildItineraryClick = () => {
    setShowItineraries(true);
  };

  return (
    <>
      <h2>Start Planning:</h2>
      <div className="card-container">
        <div className="card">
          <h3>Weather</h3>
          <WeatherForm fetchWeather={fetchWeather} />
          {weatherData && (
            <div>
              <h4>Weather in {weatherData}</h4>
            </div>
          )}
        </div>
      </div>

      {/* "Build Itinerary" card */}
      <div className="card-container">
        <div className="card">
          <Link to="/itineraries">
            <h3>Build Itinerary</h3>
            <p>Click here to view your itineraries</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
