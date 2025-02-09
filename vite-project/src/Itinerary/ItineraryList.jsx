import React from 'react';
import { Link } from 'react-router-dom';

const ItineraryList = ({ itineraries, isLoading, error }) => {
  if (isLoading) return <p>Loading itineraries...</p>;
  if (error) return <p>Error loading itineraries.</p>;

  return (
    <div>
      <h2>Your Itineraries</h2>
      <div className="itinerary-cards">
        {itineraries?.length > 0 ? (
          itineraries.map((itinerary) => (
            <div key={itinerary.id} className="itinerary-card">
              <h3>{itinerary.tripName}</h3>
              <p>
                Start Date: {new Date(itinerary.startDate).toLocaleDateString()}
              </p>
              <p>
                End Date: {new Date(itinerary.endDate).toLocaleDateString()}
              </p>
              <p>Type: {itinerary.type}</p>
              <Link to={`/itinerary/${itinerary.id}`}>View Details</Link>
            </div>
          ))
        ) : (
          <p>No itineraries found.</p>
        )}
      </div>
    </div>
  );
};

export default ItineraryList;
