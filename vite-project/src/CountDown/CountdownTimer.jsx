import React, { useEffect, useState } from 'react';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({});

  const calculateTimeLeft = () => {
    const savedTripDate = localStorage.getItem('tripDate');
    if (!savedTripDate) return {};

    const difference = new Date(savedTripDate) - new Date();
    if (difference <= 0) return {};

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="countdown-timer">
        {timeLeft.days !== undefined ? (
          <>
            <h3>Days Until Trip:</h3>
            <h3>
              {timeLeft.days} Days {timeLeft.hours} Hours {timeLeft.minutes}{' '}
              Minutes {timeLeft.seconds} Seconds
            </h3>
          </>
        ) : (
          <h3>No countdown set. Click to add one.</h3>
        )}
      </div>
    </>
  );
};

export default CountdownTimer;
