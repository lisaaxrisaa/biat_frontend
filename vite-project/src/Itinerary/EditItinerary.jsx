import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useGetItineraryQuery,
  useCreateItineraryMutation,
} from '../store/itinerarySlice';

const EditItineraryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: itinerary,
    error,
    isLoading,
    refetch,
  } = useGetItineraryQuery(id);

  const [createItinerary] = useCreateItineraryMutation();

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

  const convertTo24HourFormat = (time) => {
    const [hoursMinutes, ampm] = time.split(' ');
    const [hours, minutes] = hoursMinutes.split(':');

    let newHour = parseInt(hours, 10);
    if (ampm === 'PM' && newHour < 12) {
      newHour += 12;
    }
    if (ampm === 'AM' && newHour === 12) {
      newHour = 0;
    }
    return `${newHour.toString().padStart(2, '0')}:${minutes}`;
  };

  useEffect(() => {
    if (itinerary) {
      setFormData({
        tripName: itinerary.tripName,
        startDate: itinerary.startDate.split('T')[0],
        endDate: itinerary.endDate.split('T')[0],
        type: itinerary.type,
        description: itinerary.description,
        date: itinerary.date.split('T')[0],
        time: convertTo24HourFormat(itinerary.time),
        activities: itinerary.activities || [],
      });
    }
  }, [itinerary]);

  console.log('Activities:', formData.activities);

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
    updatedActivities[index] = {
      ...updatedActivities[index],
      [name]: value,
    };
    setFormData({ ...formData, activities: updatedActivities });
  };

  const handleAddActivity = () => {
    setFormData({
      ...formData,
      activities: [
        ...formData.activities,
        { name: '', description: '', activityTime: '', location: '' },
      ],
    });
  };

  const handleDeleteActivity = (index) => {
    const updatedActivities = [...formData.activities];
    if (updatedActivities[index].id) {
      updatedActivities[index].toBeDeleted = true;
    } else {
      updatedActivities.splice(index, 1);
    }

    setFormData({ ...formData, activities: updatedActivities });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.tripName) {
      alert('Please enter a trip name');
      return;
    }

    const filteredActivities = formData.activities.filter(
      (activity) =>
        activity.name.trim() !== '' || activity.description.trim() !== ''
    );

    const finalFormData = {
      ...formData,
      startDate: formData.startDate
        ? new Date(formData.startDate).toISOString()
        : null,
      endDate: formData.endDate
        ? new Date(formData.endDate).toISOString()
        : null,
      date: formData.date ? new Date(formData.date).toISOString() : null,
      activities: filteredActivities.length > 0 ? filteredActivities : [],
    };

    console.log('Submitting:', finalFormData);

    try {
      const response = await createItinerary(finalFormData).unwrap();
      alert('Itinerary added successfully');
      navigate(`/itinerary/${response.id}`);
    } catch (error) {
      console.error('Failed to add itinerary:', error);
    }
  };

  if (isLoading) return <p>Loading itinerary...</p>;
  if (error) return <p>Error fetching itinerary: {error.message}</p>;

  return (
    <div className="edit-itinerary-page">
      <h2>Edit Itinerary</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Trip Name:
          <input
            type="text"
            name="tripName"
            value={formData.tripName}
            onChange={handleChange}
          />
        </label>
        <label>
          Start Date:
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
          />
        </label>
        <label>
          Type:
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </label>
        <label>
          Time:
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
          />
        </label>

        <h3>Activities</h3>
        {formData.activities.map((activity, index) => (
          <div key={index}>
            <input
              type="text"
              name="name"
              placeholder="Activity Name"
              value={activity.name}
              onChange={(e) => handleActivityChange(e, index)}
            />
            <textarea
              name="description"
              placeholder="Activity Description"
              value={activity.description}
              onChange={(e) => handleActivityChange(e, index)}
            />
            <input
              type="time"
              name="activityTime"
              placeholder="Activity Time"
              value={activity.activityTime}
              onChange={(e) => handleActivityChange(e, index)}
            />
            <input
              type="text"
              name="location"
              placeholder="Activity Location"
              value={activity.location}
              onChange={(e) => handleActivityChange(e, index)}
            />

            <button type="button" onClick={() => handleDeleteActivity(index)}>
              Delete
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddActivity}>
          + Add Activity
        </button>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditItineraryPage;
