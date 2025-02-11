import React from 'react';
import ItineraryCard from './ItineraryCard';
import './itinerary.css';

const ItineraryList = ({ itineraries }) => {
  return (
    <div className="itinerary-container">
      {itineraries.map((itinerary) => (
        <ItineraryCard key={itinerary.id} itinerary={itinerary} />
      ))}
    </div>
  );
};

export default ItineraryList;
