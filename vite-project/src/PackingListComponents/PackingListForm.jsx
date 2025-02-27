import { useState } from 'react';
import { useCreatePackingListMutation } from '../store/packingListSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './packinglistform.css';

export default function CreatePackingListForm() {
  const [listName, setListName] = useState('');
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
        <form className="packing-list-form" onSubmit={handleSubmit}>
          <h3 className="packing-list-title">Create a New Packing List</h3>
          <input
            className="packing-list-input"
            type="text"
            placeholder="Trip Name (e.g., Hawaii)"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
          />
          <button className="packing-list-btn" type="submit">
            Create Packing List
          </button>
        </form>
        {/* {previousPackingListId &&
          previousPackingListId !== 'null' &&
          previousPackingListId !== 'undefined' && (
            <Link
              to={`/packing-list/${previousPackingListId}`}
              className="back-link"
            >
              ← Back to Packing Details
            </Link>
          )} */}
      </div>
    </>
  );
}
