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
      <div className="itinerary-detail-page">
        <div className="itinerary-detail-content">
          <h2>{itinerary.tripName}</h2>
          <p>
            <strong>Start Date:</strong> {formatDate(itinerary.startDate)}
          </p>
          <p>
            <strong>End Date:</strong> {formatDate(itinerary.endDate)}
          </p>
          <p>
            <strong>Type:</strong> {itinerary.type}
          </p>
          <p>
            <strong>Description:</strong> {itinerary.description}
          </p>
          <p>
            <strong>Date:</strong> {formatDate(itinerary.date)}
          </p>
          <p>
            <strong>Time:</strong> {itinerary.time}
          </p>

          <h3>Activities</h3>
          {itinerary.activities && itinerary.activities.length > 0 ? (
            <ul>
              {itinerary.activities.map((activity, index) => (
                <li className="activity-list" key={index}>
                  <p>
                    <strong>{activity.name}</strong>
                  </p>
                  <p>
                    <strong>Description:</strong> {activity.description}
                  </p>
                  <p>
                    <strong>Time:</strong> {activity.activityTime}
                  </p>
                  <p>
                    <strong>Location:</strong> {activity.location}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No activities available for this itinerary.</p>
          )}

          <button className="edit-itinerary-btn" onClick={handleEditClick}>
            Edit Itinerary
          </button>
          <button
            onClick={() => deleteHandler(id)}
            className="delete-itinerary-btn"
          >
            Delete Itinerary
          </button>
        </div>
      </div>
    </>
  );
};

export default ItineraryDetailPage;
