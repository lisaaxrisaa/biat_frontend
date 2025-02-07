import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WeatherForm from '../Weather/WeatherForm';

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
      <h2>Welcome to the Home Page</h2>

      <WeatherForm fetchWeather={fetchWeather} />

      {weatherData && (
        <div>
          <h3>Weather in {weatherData}</h3>
        </div>
      )}
    </>
  );
};

export default Home;
