// import React, { useState } from 'react';
// import { useNavigate } from 'react-router';
// import { useCreateItineraryMutation } from '../store/itinerarySlice';
// import Activity from './Activity';
// import './itinerary-form.css';

// const ItineraryForm = () => {
//   const [formData, setFormData] = useState({
//     tripName: '',
//     startDate: '',
//     endDate: '',
//     type: '',
//     description: '',
//     name: '',
//     date: '',
//     time: '',
//     activities: [{ name: '', description: '', activityTime: '', location: '' }],
//   });

//   const [createItinerary] = useCreateItineraryMutation();
//   const navigate = useNavigate();

//   const handleChange = (e, index) => {
//     const { name, value } = e.target;

//     console.log('Current Index:', index, 'Field Name:', name, 'Value:', value);

//     if (index !== undefined) {
//       const updatedActivities = [...formData.activities];
//       updatedActivities[index] = { ...updatedActivities[index], [name]: value };
//       setFormData({ ...formData, activities: updatedActivities });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleAddActivity = () => {
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       activities: [
//         ...prevFormData.activities,
//         { name: '', description: '', activityTime: '', location: '' },
//       ],
//     }));
//   };

//   const handleDeleteActivity = (index) => {
//     setFormData((prevFormData) => {
//       const updatedActivities = prevFormData.activities.filter(
//         (_, i) => i !== index
//       );
//       return {
//         ...prevFormData,
//         activities:
//           updatedActivities.length > 0
//             ? updatedActivities
//             : [{ name: '', description: '', activityTime: '', location: '' }],
//       };
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.tripName) {
//       alert('Please enter a trip name');
//       return;
//     }

//     const filteredActivities = formData.activities.filter(
//       (activity) =>
//         activity.name.trim() !== '' || activity.description.trim() !== ''
//     );

//     const finalFormData = {
//       ...formData,
//       startDate: formData.startDate
//         ? new Date(formData.startDate).toISOString()
//         : null,
//       endDate: formData.endDate
//         ? new Date(formData.endDate).toISOString()
//         : null,
//       date: formData.date ? new Date(formData.date).toISOString() : null,
//       activities: filteredActivities,
//     };

//     console.log('Submitting:', finalFormData);

//     try {
//       await createItinerary(finalFormData).unwrap();
//       alert('Itinerary added successfully');
//       navigate('/itineraries');
//     } catch (error) {
//       console.error('Failed to add itinerary:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="form-container">
//       <div className="input-group">
//         <input
//           type="text"
//           name="tripName"
//           placeholder="Trip Name"
//           value={formData.tripName}
//           onChange={handleChange}
//           className="form-input"
//         />
//         <input
//           type="date"
//           name="startDate"
//           value={formData.startDate}
//           onChange={handleChange}
//           className="form-input"
//         />
//         <input
//           type="date"
//           name="endDate"
//           value={formData.endDate}
//           onChange={handleChange}
//           className="form-input"
//         />
//       </div>
//       <input
//         type="text"
//         name="type"
//         placeholder="Type"
//         value={formData.type}
//         onChange={handleChange}
//         className="form-input"
//       />
//       <textarea
//         name="description"
//         placeholder="Description"
//         value={formData.description}
//         onChange={handleChange}
//         className="form-input"
//       />
//       <div className="input-group">
//         <input
//           type="date"
//           name="date"
//           value={formData.date}
//           onChange={handleChange}
//           className="form-input"
//         />
//         <input
//           type="time"
//           name="time"
//           value={formData.time}
//           onChange={handleChange}
//           className="form-input"
//         />
//       </div>

//       <h3>Activities</h3>

//       {formData.activities.map((activity, index) => (
//         <div key={index} className="activity-container">
//           <Activity
//             activity={activity}
//             index={index}
//             handleChange={handleChange}
//           />
//           <button
//             type="button"
//             onClick={() => handleDeleteActivity(index)}
//             className="delete-activity-btn"
//           >
//             Delete Activity
//           </button>
//         </div>
//       ))}
//       <button
//         type="button"
//         onClick={handleAddActivity}
//         className="add-activity-btn"
//       >
//         + Add Activity
//       </button>

//       <button type="submit" className="submit-btn">
//         Save and Submit Itinerary
//       </button>
//     </form>
//   );
// };

// export default ItineraryForm;

import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useCreateItineraryMutation } from '../store/itinerarySlice';
import Activity from './Activity';
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
    activities: [{ name: '', description: '', activityTime: '', location: '' }],
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
        { name: '', description: '', activityTime: '', location: '' },
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
      await createItinerary(finalFormData).unwrap();
      alert('Itinerary added successfully');
      navigate('/itineraries');
    } catch (error) {
      console.error('Failed to add itinerary:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="input-group">
        <input
          type="text"
          name="tripName"
          placeholder="Trip Name"
          value={formData.tripName}
          onChange={handleChange}
          className="form-input"
        />
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          className="form-input"
        />
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          className="form-input"
        />
      </div>
      <input
        type="text"
        name="type"
        placeholder="Type"
        value={formData.type}
        onChange={handleChange}
        className="form-input"
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="form-input"
      />
      <div className="input-group">
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="form-input"
        />
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          className="form-input"
        />
      </div>

      <h3>Activities</h3>

      {formData.activities.map((activity, index) => (
        <div key={index} className="activity-container">
          <Activity
            activity={activity}
            index={index}
            handleChange={handleChange}
          />
          <button
            type="button"
            onClick={() => handleDeleteActivity(index)}
            className="delete-activity-btn"
          >
            Delete Activity
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddActivity}
        className="add-activity-btn"
      >
        + Add Activity
      </button>

      <button type="submit" className="submit-btn">
        Save and Submit Itinerary
      </button>
    </form>
  );
};

export default ItineraryForm;
