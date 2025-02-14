import React from 'react';

const Activity = ({ activity, index, handleChange, handleDeleteActivity }) => {
  return (
    <tr key={index}>
      <td>
        <input
          type="date"
          name="date"
          value={activity.date || ''}
          onChange={(e) => handleChange(e, index)}
          className="form-input"
        />
      </td>
      <td>
        <input
          type="text"
          name="name"
          value={activity.name}
          onChange={(e) => handleChange(e, index)}
          placeholder="Activity Name"
          className="form-input"
        />
      </td>
      <td>
        <input
          type="text"
          name="description"
          value={activity.description}
          onChange={(e) => handleChange(e, index)}
          placeholder="Activity Description"
          className="form-input"
        />
      </td>
      <td>
        <input
          type="time"
          name="activityTime"
          value={activity.activityTime}
          onChange={(e) => handleChange(e, index)}
          className="form-input"
        />
      </td>
      <td>
        <input
          type="text"
          name="location"
          value={activity.location}
          onChange={(e) => handleChange(e, index)}
          placeholder="Activity Location"
          className="form-input"
        />
      </td>
      <td>
        <button
          className="form-delete-btn"
          onClick={() => handleDeleteActivity(index)}
        >
          ❌
        </button>
      </td>
    </tr>
  );
};

export default Activity;
