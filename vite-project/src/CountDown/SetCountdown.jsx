import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './countdown.css';

const SetCountdown = () => {
  const navigate = useNavigate();
  const [tripDate, setTripDate] = useState(
    localStorage.getItem('tripDate') || ''
  );

  const handleSave = () => {
    if (!tripDate) {
      alert('Please select a date.');
      return;
    }
    localStorage.setItem('tripDate', tripDate);
    alert('Countdown updated!');
    navigate('/');
  };

  return (
    <>
      <div className="set-countdown-container">
        <div className="set-countdown-content">
          <h2>Set Your Trip Date</h2>
          <input
            type="date"
            value={tripDate}
            onChange={(e) => setTripDate(e.target.value)}
            className="countdown-input"
          />
          <button onClick={handleSave} className="save-countdown-button">
            Save Date
          </button>
        </div>
      </div>
    </>
  );
};

export default SetCountdown;
