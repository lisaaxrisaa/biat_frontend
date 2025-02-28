import { useParams } from 'react-router-dom';
import {
  useGetPackingListItemsQuery,
  useUpdatePackingListMutation,
  useAddPackingItemMutation,
  useTogglePackingItemMutation,
} from '../store/packingListSlice';
import { useState } from 'react';
import EditPackingListForm from './EditPackingListForm';
import EditPackingItem from './EditPackingItem';
import DeletePackingItem from './DeletePackingItem';
import '../PackingListComponents/packinglistdetails.css';

export default function PackingListDetails() {
  const { id } = useParams();
  const {
    data: packingList,
    isLoading,
    isError,
  } = useGetPackingListItemsQuery(id);

  const [updatePackingList] = useUpdatePackingListMutation();
  const [addPackingItem] = useAddPackingItemMutation();
  const [togglePackingItem] = useTogglePackingItemMutation();

  const [itemText, setItemText] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  async function handleAddItem(e) {
    e.preventDefault();
    if (!itemText.trim()) return alert('Please enter an item.');

    try {
      await addPackingItem({
        packingListId: id,
        item: { description: itemText },
      }).unwrap();
      setItemText('');
    } catch (error) {
      console.error('Error adding item:', error);
    }
  }

  async function handleSave(updatedData) {
    try {
      await updatePackingList({ id, data: updatedData }).unwrap();
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update packing list:', error);
    }
  }

  function handleEditStart(itemId) {
    setEditingItem(itemId);
  }

  function handleEditCancel() {
    setEditingItem(null);
  }

  if (isLoading) return <p>Loading items...</p>;
  if (isError || !packingList) return <p>Failed to load items.</p>;

  return (
    <div className="packing-list">
      <div className="packing-list-card">
        <h2 className="packing-list-title">{packingList.name}</h2>

        {isEditing ? (
          <EditPackingListForm
            packingList={packingList}
            onSave={handleSave}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <>
            <div className="packing-list-details">
              <p>
                <strong>Destination:</strong>{' '}
                {packingList.destination || 'Not specified'}
              </p>
              <p>
                <strong>Departure:</strong>{' '}
                {packingList.departureDate
                  ? packingList.departureDate.split('T')[0]
                  : 'N/A'}
              </p>
              <p>
                <strong>Return:</strong>{' '}
                {packingList.returnDate
                  ? packingList.returnDate.split('T')[0]
                  : 'N/A'}
              </p>
              <p>
                <strong>Category:</strong> {packingList.category || 'Other'}
              </p>
              {packingList.notes && (
                <p className="packing-list-notes">
                  <strong>Notes:</strong> {packingList.notes}
                </p>
              )}
            </div>
            <button
              className="packing-list-btn"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          </>
        )}

        <form className="packing-list-form" onSubmit={handleAddItem}>
          <input
            className="packing-list-input"
            type="text"
            placeholder="Add an item..."
            value={itemText}
            onChange={(e) => setItemText(e.target.value)}
          />
          <button className="packing-list-btn" type="submit">
            Add Item
          </button>
        </form>

        {packingList.items?.length === 0 ? (
          <p>No items found.</p>
        ) : (
          <ul className="packing-list-items">
            {packingList.items.map((item) => (
              <li className="packing-list-item" key={item.id}>
                <input
                  className="packing-list-checkbox"
                  type="checkbox"
                  checked={item.packed}
                  onChange={() =>
                    togglePackingItem({ itemId: item.id, packed: !item.packed })
                  }
                />

                {editingItem === item.id ? (
                  <EditPackingItem item={item} onCancel={handleEditCancel} />
                ) : (
                  <>
                    <span>{item.description}</span>
                    <button
                      className="packing-list-btn"
                      onClick={() => handleEditStart(item.id)}
                    >
                      Edit
                    </button>
                    <DeletePackingItem
                      className="packing-list-delete-btn"
                      itemId={item.id}
                    />
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
