import React from 'react';

const Activity = ({ activity, index, handleChange }) => {
  return (
    <>
      <div className="input-group">
        <input
          type="text"
          name="name"
          placeholder="Activity Name"
          value={activity.name}
          onChange={(e) => handleChange(e, index)}
          className="form-input"
        />
        <textarea
          name="description"
          placeholder="Activity Description"
          value={activity.description}
          onChange={(e) => handleChange(e, index)}
          className="form-input"
        />
        <div className="input-group">
          <input
            type="time"
            name="activityTime"
            placeholder="Activity Time"
            value={activity.activityTime}
            onChange={(e) => handleChange(e, index)}
            className="form-input"
          />
          <input
            type="text"
            name="location"
            placeholder="Activity Location"
            value={activity.location}
            onChange={(e) => handleChange(e, index)}
            className="form-input"
          />
        </div>
      </div>
    </>
  );
};

export default Activity;
