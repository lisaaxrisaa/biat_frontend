import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetItinerariesQuery } from '../store/itinerarySlice';
import ItineraryList from '../Itinerary/ItineraryList';
import ItineraryForm from './ItineraryForm';

const ItineraryPage = () => {
  const [isAddingItinerary, setIsAddingItinerary] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  const navigate = useNavigate();
  const token = sessionStorage.getItem('token');

  const {
    data: apiItineraries,
    error,
    isLoading,
    refetch,
  } = useGetItinerariesQuery();

  useEffect(() => {
    if (!token) {
      navigate(`/login`);
    }
  }, [token, navigate]);

  const handleAddItineraryClick = () => {
    setIsAddingItinerary(true);
    navigate('/itinerary-form');
  };

  useEffect(() => {
    if (reloadKey > 0) {
      refetch();
    }
  }, [reloadKey, refetch]);

  useEffect(() => {
    if (!isAddingItinerary) {
      setReloadKey((prevKey) => prevKey + 1);
    }
  }, [isAddingItinerary]);

  return (
    <div className="itinerary-page">
      <h2>Your Itineraries</h2>

      {!isAddingItinerary && (
        <button onClick={handleAddItineraryClick}>Add Itinerary</button>
      )}

      {isAddingItinerary ? (
        <ItineraryForm />
      ) : (
        <>
          {isLoading ? (
            <p>Loading itineraries...</p>
          ) : error ? (
            <p>Error loading itineraries.</p>
          ) : (
            <ItineraryList itineraries={apiItineraries} />
          )}
        </>
      )}
    </div>
  );
};

export default ItineraryPage;
