import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useGetItineraryQuery } from '../store/itinerarySlice';
import useDeleteItinerary from './DeleteItinerary';
import './itinerary-detail.css';

const ItineraryDetailPage = () => {
  const { id } = useParams();
  const { data: itinerary, error, isLoading } = useGetItineraryQuery(id);
  const deleteHandler = useDeleteItinerary();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Fetched itinerary:', itinerary);
  }, [itinerary]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleEditClick = () => {
    navigate(`/edit-itinerary/${id}`);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading itinerary details.</p>;

  return (
    <>
      <div className="itinerary-details-wrapper">
        <div className="itinerary-details-container">
          <h2>{itinerary.tripName}</h2>
          <p className="trip-dates">
            <strong>Date:</strong>{' '}
            {new Date(itinerary.startDate).toLocaleDateString()} -{' '}
            {new Date(itinerary.endDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Type:</strong> {itinerary.type}
          </p>
          <p>
            <strong>Description:</strong> {itinerary.description}
          </p>

          <h3>Activities</h3>
          {itinerary.activities && itinerary.activities.length > 0 ? (
            <table className="activities-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Activity Name</th>
                  <th>Description</th>
                  <th>Time</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                {itinerary.activities.map((activity, index) => (
                  <tr key={index}>
                    <td>
                      {activity.date
                        ? new Date(activity.date).toLocaleDateString()
                        : 'N/A'}
                    </td>
                    <td>{activity.name}</td>
                    <td>{activity.description}</td>
                    <td>{activity.activityTime || 'N/A'}</td>
                    <td>{activity.location || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No activities available for this itinerary.</p>
          )}

          <div className="button-group">
            <button
              className="edit-btn"
              onClick={() => navigate(`/edit-itinerary/${id}`)}
            >
              Edit Itinerary
            </button>
            <button className="delete-btn">Delete Itinerary</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItineraryDetailPage;
