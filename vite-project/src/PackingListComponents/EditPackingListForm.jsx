import { useState } from 'react';

export default function EditPackingListForm({ packingList, onSave, onCancel }) {
  const [formState, setFormState] = useState({
    name: packingList.name || '',
    destination: packingList.destination || '',
    departureDate: packingList.departureDate
      ? new Date(packingList.departureDate).toISOString().split('T')[0]
      : '',
    returnDate: packingList.returnDate
      ? new Date(packingList.returnDate).toISOString().split('T')[0]
      : '',
    category: packingList.category || 'Other',
    notes: packingList.notes || '',
  });

  function handleChange(e) {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave(formState);
  }

  return (
    <form className="packing-list-edit-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="name">Trip Name</label>
          <input
            id="name"
            name="name"
            className="packing-list-input"
            type="text"
            value={formState.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="destination">Destination</label>
          <input
            id="destination"
            name="destination"
            className="packing-list-input"
            type="text"
            value={formState.destination}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="departureDate">Departure Date</label>
          <input
            id="departureDate"
            name="departureDate"
            className="packing-list-input"
            type="date"
            value={formState.departureDate}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="returnDate">Return Date</label>
          <input
            id="returnDate"
            name="returnDate"
            className="packing-list-input"
            type="date"
            value={formState.returnDate}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          className="packing-list-select"
          value={formState.category}
          onChange={handleChange}
        >
          <option value="Vacation">Vacation</option>
          <option value="Business Trip">Business Trip</option>
          <option value="Camping">Camping</option>
          <option value="Cruise">Cruise</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="notes">Notes</label>
        <textarea
          id="notes"
          name="notes"
          className="packing-list-textarea"
          value={formState.notes}
          onChange={handleChange}
        />
      </div>

      <button className="packing-list-btn" type="submit">
        Save Changes
      </button>
      <button
        className="packing-list-cancel-btn"
        type="button"
        onClick={onCancel}
      >
        Cancel
      </button>
    </form>
  );
}
