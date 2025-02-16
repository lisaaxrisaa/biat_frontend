import React from 'react';
import { Link } from 'react-router-dom';
import './landing-page.css';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1 className="landing-title">Pack Ahead</h1>
        <p className="landing-slogan">Plan Smart, Travel Easy</p>
        <p className="landing-description">
          Organize your trips with ease—track your itinerary, budget, packing
          list, and more.
        </p>
      </div>
      <div className="landing-links">
        <Link to="/register" className="landing-link">
          Register
        </Link>
        <Link to="/login" className="landing-link">
          Login
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
