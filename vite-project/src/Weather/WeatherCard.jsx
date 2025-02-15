import React from 'react';
import PropTypes from 'prop-types';

const WeatherCard = ({ title, children }) => {
  return (
    <div className="home-card">
      <h3 className="card-title">{title}</h3>
      <div className="card-content">{children}</div>
    </div>
  );
};

WeatherCard.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default WeatherCard;
