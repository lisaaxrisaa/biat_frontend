import { useParams } from 'react-router-dom';
import {
  useGetPackingListItemsQuery,
  useAddPackingItemMutation,
  useTogglePackingItemMutation,
} from '../store/packingListSlice';
import { useState } from 'react';
import EditPackingItem from './EditPackingItem';
import DeletePackingItem from './DeletePackingItem';
import './packinglistdetails.css';

export default function PackingListDetails() {
  const { id } = useParams();
  const {
    data: packingList,
    isLoading,
    isError,
  } = useGetPackingListItemsQuery(id);
  const [addPackingItem] = useAddPackingItemMutation();
  const [togglePackingItem] = useTogglePackingItemMutation();
  const [itemText, setItemText] = useState('');
  const [editingItem, setEditingItem] = useState(null);

  if (isLoading) return <p>Loading items...</p>;
  if (isError) return <p>Failed to load items.</p>;

  async function handleAddItem(e) {
    e.preventDefault();
    if (!itemText) return;
    await addPackingItem({
      packingListId: id,
      item: { description: itemText },
    }).unwrap();
    setItemText('');
  }

  return (
    <>
      <div className="packing-list">
        <h2 className="packing-list-title">{packingList.name}</h2>

        <form className="packing-list-form" onSubmit={handleAddItem}>
          <input
            className="packing-list-input"
            type="text"
            placeholder="Add an item..."
            value={itemText}
            onChange={(e) => setItemText(e.target.value)}
          />
          <button className="packing-list-add-btn" type="submit">
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
                  <EditPackingItem
                    item={item}
                    onCancel={() => setEditingItem(null)}
                  />
                ) : (
                  <>
                    <span>{item.description}</span>
                    <button
                      className="packing-list-edit-btn"
                      onClick={() => setEditingItem(item.id)}
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
    </>
  );
}
