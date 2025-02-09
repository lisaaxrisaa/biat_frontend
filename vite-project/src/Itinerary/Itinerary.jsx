import React, { useState } from 'react';
import {
  useGetItinerariesQuery,
  useDeleteItineraryMutation,
} from '../store/itinerarySlice';
import { Link } from 'react-router-dom';

const Itinerary = () => {
  const [viewType, setViewType] = useState('card');
  const { data: itineraries, error, isLoading } = useGetItinerariesQuery();
  const [deleteItinerary] = useDeleteItineraryMutation();

  const handleDelete = async (id) => {
    try {
      await deleteItinerary(id);
      console.log('Itinerary deleted:', id);
    } catch (err) {
      console.error('Error deleting itinerary:', err);
    }
  };

  if (isLoading) return <p>Loading itineraries...</p>;
  if (error) return <p>Error loading itineraries!</p>;

  return (
    <div>
      <h2>Your Itineraries</h2>
      <div>
        <button onClick={() => setViewType('card')}>Card View</button>
        <button onClick={() => setViewType('table')}>Table View</button>
      </div>
      {itineraries?.length > 0 ? (
        <div>
          {viewType === 'card' ? (
            <div className="itinerary-cards">
              {itineraries.map((itinerary) => (
                <div key={itinerary.id} className="itinerary-card">
                  <h3>{itinerary.tripName}</h3>
                  <p>
                    Start Date:{' '}
                    {new Date(itinerary.startDate).toLocaleDateString()}
                  </p>
                  <p>
                    End Date: {new Date(itinerary.endDate).toLocaleDateString()}
                  </p>
                  <p>Type: {itinerary.type}</p>
                  <button onClick={() => handleDelete(itinerary.id)}>
                    Delete
                  </button>
                  <Link to={`/itinerary/${itinerary.id}`}>View Details</Link>
                </div>
              ))}
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Trip Name</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Type</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {itineraries.map((itinerary) => (
                  <tr key={itinerary.id}>
                    <td>{itinerary.tripName}</td>
                    <td>
                      {new Date(itinerary.startDate).toLocaleDateString()}
                    </td>
                    <td>{new Date(itinerary.endDate).toLocaleDateString()}</td>
                    <td>{itinerary.type}</td>
                    <td>
                      <button onClick={() => handleDelete(itinerary.id)}>
                        Delete
                      </button>
                      <Link to={`/itinerary/${itinerary.id}`}>
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ) : (
        <p>No itineraries found.</p>
      )}
    </div>
  );
};

export default Itinerary;
