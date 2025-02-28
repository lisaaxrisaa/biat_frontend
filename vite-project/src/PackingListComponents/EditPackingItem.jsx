import { useState } from 'react';
import { useEditPackingItemMutation } from '../store/packingListSlice';

export default function EditPackingItem({ item, onCancel }) {
  const [editedText, setEditedText] = useState(item.description);
  const [editPackingItem] = useEditPackingItemMutation();

  async function handleEditItem() {
    if (!editedText.trim()) return;
    try {
      await editPackingItem({
        itemId: item.id,
        description: editedText,
      }).unwrap();
      onCancel();
    } catch (error) {
      console.error('Error updating item:', error);
    }
  }

  return (
    <div>
      <input
        type="text"
        value={editedText}
        onChange={(e) => setEditedText(e.target.value)}
        placeholder="Edit item"
        className="packing-list-input"
      />
      <button className="packing-list-save-btn" onClick={handleEditItem}>
        Save
      </button>
      <button className="packing-list-cancel-btn" onClick={onCancel}>
        Cancel
      </button>
    </div>
  );
}
