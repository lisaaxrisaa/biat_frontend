import React from 'react';
import { Link } from 'react-router-dom';
// import './itinerary-page.css';

const ItineraryCard = ({ itinerary }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="itinerary-card">
      <div className="itinerary-card-content">
        <h3>{itinerary.tripName}</h3>
        <p>
          <strong>Start Date:</strong> {formatDate(itinerary.startDate)}
        </p>
        <p>
          <strong>End Date:</strong> {formatDate(itinerary.endDate)}
        </p>
        <p>
          <strong>Type:</strong> {itinerary.type}
        </p>
      </div>
      <Link to={`/itinerary/${itinerary.id}`} className="view-details-btn">
        View Details
      </Link>
    </div>
  );
};

export default ItineraryCard;
