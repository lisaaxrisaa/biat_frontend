import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  useGetItineraryQuery,
  useUpdateItineraryMutation,
  useDeleteActivityMutation,
} from '../store/itinerarySlice';
import itinerarySlice from '../store/itinerarySlice';
import { Link } from 'react-router-dom';
import './edit-itinerary.css';

const EditItineraryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    data: itinerary,
    error,
    isLoading,
    refetch,
  } = useGetItineraryQuery(id);
  const [updateItinerary] = useUpdateItineraryMutation();
  const [deleteActivity] = useDeleteActivityMutation();

  const [formData, setFormData] = useState({
    tripName: '',
    startDate: '',
    endDate: '',
    type: '',
    description: '',
    date: '',
    time: '',
    activities: [],
  });

  useEffect(() => {
    if (itinerary) {
      setFormData({
        tripName: itinerary.tripName || '',
        startDate: itinerary.startDate ? itinerary.startDate.split('T')[0] : '',
        endDate: itinerary.endDate ? itinerary.endDate.split('T')[0] : '',
        type: itinerary.type || '',
        description: itinerary.description || '',
        date: itinerary.date ? itinerary.date.split('T')[0] : '',
        time: itinerary.time || '',
        activities: itinerary.activities
          ? itinerary.activities.map((activity) => ({
              id: activity.id || null,
              name: activity.name || '',
              description: activity.description || '',
              activityTime: activity.activityTime || '',
              date: activity.date ? activity.date.split('T')[0] : '',
              location: activity.location || '',
            }))
          : [],
      });
    }
  }, [itinerary]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleActivityChange = (e, index) => {
    const { name, value } = e.target;
    const updatedActivities = [...formData.activities];
    updatedActivities[index] = { ...updatedActivities[index], [name]: value };
    setFormData({ ...formData, activities: updatedActivities });
  };

  const handleAddActivity = () => {
    setFormData({
      ...formData,
      activities: [
        ...formData.activities,
        {
          id: null,
          name: '',
          description: '',
          activityTime: '',
          date: '',
          location: '',
        },
      ],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.tripName) {
      alert('Please enter a trip name');
      return;
    }

    const filteredActivities = formData.activities.filter(
      (activity) =>
        (activity.name.trim() !== '' || activity.description.trim() !== '') &&
        !activity.deleteFlag
    );

    const deletedActivityIds = formData.activities
      .filter((activity) => activity.id && activity.deleteFlag)
      .map((activity) => activity.id);

    const finalFormData = {
      ...formData,
      startDate: formData.startDate
        ? new Date(formData.startDate).toISOString()
        : null,
      endDate: formData.endDate
        ? new Date(formData.endDate).toISOString()
        : null,
      date: formData.date ? new Date(formData.date).toISOString() : null,
      activities: filteredActivities,
      deletedActivityIds,
    };

    try {
      dispatch(
        itinerarySlice.util.updateQueryData(
          'getItineraries',
          undefined,
          (draft) => {
            const index = draft.findIndex((itinerary) => itinerary.id === id);
            if (index !== -1) {
              draft[index] = { ...draft[index], ...finalFormData };
            }
          }
        )
      );

      await updateItinerary({
        id,
        updatedItinerary: finalFormData,
      }).unwrap();

      if (refetch) {
        await refetch();
      }

      navigate(`/itinerary/${id}`);
    } catch (err) {
      console.error('Failed to update itinerary:', err);
    }
  };

  if (isLoading) return <p>Loading itinerary...</p>;
  if (error) return <p>Error fetching itinerary: {error.message}</p>;

  return (
    <>
      <div className="edit-itinerary-wrapper">
        <div className="edit-itinerary-page">
          <div className="edit-itinerary-container">
            <Link to="/itineraries" className="edit-back-link">
              &lt; Back to Itineraries
            </Link>
            <h2>Edit Itinerary</h2>
            <form onSubmit={handleSubmit}>
              <label>Trip Name</label>
              <input
                type="text"
                name="tripName"
                value={formData.tripName}
                onChange={handleChange}
              />

              <label>Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
              />

              <label>End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
              />

              <label>Type</label>
              <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleChange}
              />

              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
              />

              <label>Flight Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />

              <label>Flight Time</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
              />

              <h3>Activities</h3>
              <table className="activities-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Activity Name</th>
                    <th>Description</th>
                    <th>Time</th>
                    <th>Location</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.activities.map((activity, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          type="date"
                          name="date"
                          value={activity.date || ''}
                          onChange={(e) => handleActivityChange(e, index)}
                          placeholder="Activity Date"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="name"
                          value={activity.name}
                          onChange={(e) => handleActivityChange(e, index)}
                          placeholder="Activity Name"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="description"
                          value={activity.description}
                          onChange={(e) => handleActivityChange(e, index)}
                          placeholder="Description"
                        />
                      </td>
                      <td>
                        <input
                          type="time"
                          name="activityTime"
                          value={activity.activityTime}
                          onChange={(e) => handleActivityChange(e, index)}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="location"
                          value={activity.location}
                          onChange={(e) => handleActivityChange(e, index)}
                          placeholder="Location"
                        />
                      </td>
                      <td>
                        <button
                          className="edit-delete-btn"
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              activities: prev.activities.filter(
                                (_, i) => i !== index
                              ),
                            }));
                          }}
                        >
                          ❌
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="button-container">
                <button
                  type="button"
                  onClick={handleAddActivity}
                  className="add-activity"
                >
                  + Add Activity
                </button>
                <button type="submit" className="save-button">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditItineraryPage;
