import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useCreateItineraryMutation } from '../store/itinerarySlice';
import Activity from './Activity';
import { Link } from 'react-router-dom';
import './itinerary-form.css';

const ItineraryForm = () => {
  const [formData, setFormData] = useState({
    tripName: '',
    startDate: '',
    endDate: '',
    type: '',
    description: '',
    name: '',
    date: '',
    time: '',
    activities: [
      { name: '', description: '', activityTime: '', date: '', location: '' },
    ],
  });

  const [createItinerary] = useCreateItineraryMutation();
  const navigate = useNavigate();

  const handleChange = (e, index) => {
    const { name, value } = e.target;

    if (index !== undefined) {
      setFormData((prevFormData) => {
        const updatedActivities = [...prevFormData.activities];
        updatedActivities[index] = {
          ...updatedActivities[index],
          [name]: value,
        };
        return { ...prevFormData, activities: updatedActivities };
      });
    } else {
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }
  };

  const handleAddActivity = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      activities: [
        ...prevFormData.activities,
        { name: '', description: '', activityTime: '', date: '', location: '' },
      ],
    }));
  };

  const handleDeleteActivity = (index) => {
    setFormData((prevFormData) => {
      const updatedActivities = prevFormData.activities.filter(
        (_, i) => i !== index
      );
      return {
        ...prevFormData,
        activities:
          updatedActivities.length > 0
            ? updatedActivities
            : [{ name: '', description: '', activityTime: '', location: '' }],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.tripName) {
      alert('Please enter a trip name');
      return;
    }

    const finalFormData = {
      ...formData,
      startDate: formData.startDate
        ? new Date(formData.startDate).toISOString()
        : null,
      endDate: formData.endDate
        ? new Date(formData.endDate).toISOString()
        : null,
      date: formData.date ? new Date(formData.date).toISOString() : null,
      activities: formData.activities.filter(
        (activity) =>
          activity.name.trim() !== '' || activity.description.trim() !== ''
      ),
    };

    try {
      await createItinerary(finalFormData).unwrap();
      alert('Itinerary added successfully');
      navigate('/itineraries');
    } catch (error) {
      console.error('Failed to add itinerary:', error);
      alert('Error adding itinerary. Please try again.');
    }
  };

  return (
    <>
      <div className="itinerary-form-wrapper">
        <Link to="/itineraries" className="form-back-link">
          &lt; Back to Itineraries
        </Link>
        <form onSubmit={handleSubmit} className="itinerary-form-container">
          <h2>Create Itinerary</h2>

          <label>Trip Name</label>
          <input
            type="text"
            name="tripName"
            placeholder="Enter trip name"
            value={formData.tripName}
            onChange={handleChange}
            className="form-input"
          />

          <div className="date-inputs">
            <label>
              Start Date
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="form-input"
              />
            </label>

            <label>
              End Date
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="form-input"
              />
            </label>
          </div>

          <label>Type of Trip</label>
          <input
            type="text"
            name="type"
            placeholder="e.g., Vacation, Business, Adventure"
            value={formData.type}
            onChange={handleChange}
            className="form-input"
          />

          <label>Description</label>
          <textarea
            name="description"
            placeholder="Brief description of your trip"
            value={formData.description}
            onChange={handleChange}
            className="form-input"
          />
          <div className="date-inputs">
            <label>
              Flight Date
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="form-input"
              />
            </label>

            <label>
              Flight Time
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="form-input"
              />
            </label>
          </div>
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
                <Activity
                  key={index}
                  activity={activity}
                  index={index}
                  handleChange={handleChange}
                  handleDeleteActivity={handleDeleteActivity}
                />
              ))}
            </tbody>
          </table>
          <div className="button-container">
            <button
              type="button"
              className="add-activity"
              onClick={handleAddActivity}
            >
              + Add Activity
            </button>
            <button type="submit" className="save-button">
              Save and Submit Itinerary
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ItineraryForm;
