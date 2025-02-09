// /components/Itinerary/ItineraryForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useCreateItineraryMutation } from '../store/itinerarySlice';

const ItineraryForm = () => {
  const [tripName, setTripName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const [createItinerary] = useCreateItineraryMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newItinerary = {
      tripName,
      startDate,
      endDate,
      type,
      name,
      description,
      date,
      time,
    };

    try {
      await createItinerary(newItinerary).unwrap();
      alert('Itinerary added successfully');
      navigate('/itineraries');
    } catch (error) {
      console.error('Failed to add itinerary:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Trip Name"
        value={tripName}
        onChange={(e) => setTripName(e.target.value)}
      />
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <input
        type="text"
        placeholder="Type"
        value={type}
        onChange={(e) => setType(e.target.value)}
      />
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <button type="submit">Add Itinerary</button>
    </form>
  );
};

export default ItineraryForm;
