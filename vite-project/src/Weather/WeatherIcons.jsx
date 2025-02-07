import React from 'react';

const getWeatherIcon = (condition) => {
  const normalizedCondition = condition.toLowerCase().trim();

  if (normalizedCondition.includes('rain')) {
    return <i className="fas fa-cloud-showers-heavy"></i>;
  } else if (normalizedCondition.includes('snow')) {
    return <i className="fas fa-snowflake"></i>;
  } else if (normalizedCondition.includes('clear')) {
    return <i className="fas fa-sun"></i>;
  } else if (
    normalizedCondition.includes('cloudy') ||
    normalizedCondition.includes('clouds') ||
    normalizedCondition.includes('overcast')
  ) {
    return <i className="fas fa-cloud"></i>;
  } else if (normalizedCondition.includes('partly cloudy')) {
    return <i className="fas fa-cloud-sun"></i>;
  } else if (normalizedCondition.includes('thunderstorm')) {
    return <i className="fas fa-bolt"></i>;
  } else {
    return <i className="fas fa-question-circle"></i>;
  }
};

export default getWeatherIcon;
