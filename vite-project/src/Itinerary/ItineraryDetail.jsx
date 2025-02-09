import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetItineraryQuery } from '../store/itinerarySlice';

const ItineraryDetail = () => {
  const { id } = useParams();
  const { data: itinerary, error, isLoading } = useGetItineraryQuery(id);

  if (isLoading) return <p>Loading itinerary...</p>;
  if (error) return <p>Error loading itinerary.</p>;

  return (
    <div>
      <h2>{itinerary.tripName}</h2>
      <p>Description: {itinerary.description}</p>
      <p>Start Date: {new Date(itinerary.startDate).toLocaleDateString()}</p>
      <p>End Date: {new Date(itinerary.endDate).toLocaleDateString()}</p>
      <p>Type: {itinerary.type}</p>
      <p>Date: {new Date(itinerary.date).toLocaleDateString()}</p>
      <p>Time: {itinerary.time}</p>
    </div>
  );
};

export default ItineraryDetail;
