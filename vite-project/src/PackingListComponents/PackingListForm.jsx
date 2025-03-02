import { useState } from 'react';
import { useCreatePackingListMutation } from '../store/packingListSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './packinglistform.css';

export default function CreatePackingListForm() {
  const [listName, setListName] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [category, setCategory] = useState('Vacation');
  const [notes, setNotes] = useState('');

  const [createPackingList] = useCreatePackingListMutation();
  const navigate = useNavigate();
  const location = useLocation();

  const previousPackingListId =
    location.state?.packingListId ||
    localStorage.getItem('lastPackingListId') ||
    null;

  console.log('previousPackingListId retrieved:', previousPackingListId);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!listName) return alert('Enter a name for the packing list.');

    try {
      const newPackingList = await createPackingList({
        name: listName,
        destination: destination || null,
        departureDate: departureDate || null,
        returnDate: returnDate || null,
        category: category || null,
        notes: notes || null,
      }).unwrap();

      if (newPackingList.id) {
        localStorage.setItem('lastPackingListId', String(newPackingList.id));
        navigate('/packing-list-display', {
          state: { packingListId: newPackingList.id },
        });
      } else {
        console.error('Error: newPackingList.id is undefined');
      }
    } catch (error) {
      console.error('Error creating packing list:', error);
    }
  }

  return (
    <>
      <div className="packing-list-container">
        <Link to="/packing-list-display" className="back-link">
          ← Back to Packing Lists
        </Link>

        <form className="packing-list-form" onSubmit={handleSubmit}>
          <h3 className="packing-list-title">Create a New Packing List</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="listName">Trip Name</label>
              <input
                id="listName"
                className="packing-list-input"
                type="text"
                placeholder="e.g., Hawaii"
                value={listName}
                onChange={(e) => setListName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="destination">Destination</label>
              <input
                id="destination"
                className="packing-list-input"
                type="text"
                placeholder="e.g., Paris"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="departureDate">Departure Date</label>
              <input
                id="departureDate"
                className="packing-list-input"
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="returnDate">Return Date</label>
              <input
                id="returnDate"
                className="packing-list-input"
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              className="packing-list-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
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
              className="packing-list-textarea"
              placeholder="Any additional notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <button className="packing-list-btn-create" type="submit">
            Create Packing List
          </button>
        </form>
      </div>
    </>
  );
}
