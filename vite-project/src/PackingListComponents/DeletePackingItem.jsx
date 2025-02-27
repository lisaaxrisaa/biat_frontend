import { useDeletePackingItemMutation } from '../store/packingListSlice';

export default function DeletePackingItem({ itemId }) {
  const [deletePackingItem] = useDeletePackingItemMutation();

  async function handleDeleteItem() {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await deletePackingItem(itemId).unwrap();
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  }

  return (
    <button className="packing-list-delete-btn" onClick={handleDeleteItem}>
      Delete
    </button>
  );
}
