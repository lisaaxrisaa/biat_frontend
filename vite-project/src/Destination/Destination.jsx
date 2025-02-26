import React, { useState, useEffect } from 'react';
import { useLazyGenerateDestinationQuery } from '../store/destinationSlice';
import './destination.css';
import DOMPurify from 'dompurify';

const Destination = () => {
  const [fetchDestination, { data, error, isLoading }] =
    useLazyGenerateDestinationQuery();
  const [loadingNewDestination, setLoadingNewDestination] = useState(false);

  const [currentDestination, setCurrentDestination] = useState(() => {
    const savedDestination = localStorage.getItem('currentDestination');
    return savedDestination ? JSON.parse(savedDestination) : null;
  });

  useEffect(() => {
    if (!currentDestination) {
      fetchDestination();
    }
  }, [fetchDestination, currentDestination]);

  useEffect(() => {
    if (data) {
      localStorage.setItem('currentDestination', JSON.stringify(data));
      setCurrentDestination(data);
    }
  }, [data]);

  const handleRegenerate = async () => {
    setLoadingNewDestination(true);
    try {
      await fetchDestination();
    } catch (err) {
      console.error('Error fetching new destination:', err);
    }
    setLoadingNewDestination(false);
  };

  const sanitizedReasonsToVisit = currentDestination?.reasonsToVisit
    ? DOMPurify.sanitize(currentDestination.reasonsToVisit)
    : '';

  return (
    <div className="destination-wrapper">
      <div className="destination-container">
        {isLoading || loadingNewDestination ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error fetching destination: {error.message}</p>
        ) : currentDestination ? (
          <>
            <h1 className="destination-title">
              {currentDestination.destination}
            </h1>

            <div
              className="destination-description"
              dangerouslySetInnerHTML={{ __html: sanitizedReasonsToVisit }}
            />
            {currentDestination.imageUrl && (
              <img
                className="destination-image"
                src={currentDestination.imageUrl}
                alt={currentDestination.destination}
              />
            )}
            <a
              className="destination-link"
              href={`https://en.wikipedia.org/wiki/${currentDestination.destination}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>Read more on Wikipedia</strong>
            </a>
            <br />
            <br />
            <button
              onClick={handleRegenerate}
              className="regenerate-button"
              disabled={loadingNewDestination}
            >
              {loadingNewDestination
                ? 'Generating...'
                : 'Regenerate Destination'}
            </button>
          </>
        ) : (
          <p>No destination found.</p>
        )}
      </div>
    </div>
  );
};

export default Destination;
