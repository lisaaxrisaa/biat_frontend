import { useState } from 'react';
import { useCreatePackingListMutation } from '../store/packingListSlice';
import { useNavigate } from 'react-router-dom';

export default function CreatePackingListForm() {
  const [listName, setListName] = useState('');
  const [createPackingList] = useCreatePackingListMutation();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!listName) return alert('Enter a name for the packing list.');

    try {
      await createPackingList({ name: listName }).unwrap();
      navigate('/packing-list-display');
    } catch (error) {
      console.error('Error creating packing list:', error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create a New Packing List</h3>
      <input
        type="text"
        placeholder="Trip Name (e.g., Hawaii)"
        value={listName}
        onChange={(e) => setListName(e.target.value)}
      />
      <button type="submit">Create Packing List</button>
    </form>
  );
}
