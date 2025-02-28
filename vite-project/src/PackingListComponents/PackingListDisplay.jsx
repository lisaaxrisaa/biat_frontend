import { Link } from 'react-router-dom';
import {
  useGetPackingListsQuery,
  useDeletePackingListMutation,
} from '../store/packingListSlice';
import './packinglistdisplay.css';

export default function PackingListsDisplay() {
  const { data: packingLists, isLoading, isError } = useGetPackingListsQuery();
  const [deletePackingList] = useDeletePackingListMutation();

  if (isLoading) return <p>Loading packing lists...</p>;
  if (isError) return <p>Failed to load packing lists.</p>;

  const handleDelete = async (id, e) => {
    e.preventDefault();
    try {
      await deletePackingList(id).unwrap();
    } catch (error) {
      console.error('Error deleting packing list:', error);
    }
  };

  return (
    <>
      <div className="packing-lists">
        <h2 className="packing-lists-title">Your Packing Lists</h2>
        <button className="packing-lists-create-btn">
          <Link className="packing-list-link" to="/packing-list">
            Create New Packing List
          </Link>
        </button>

        {packingLists?.length === 0 ? (
          <p>No packing lists found. Create one above!</p>
        ) : (
          <ul className="packing-lists-container">
            {packingLists.map((list) => (
              <Link
                key={list.id}
                className="packing-list-link"
                to={`/packing-list/${list.id}`}
              >
                <li className="packing-list-item">
                  <span className="packing-list-name">{list.name}</span>
                  <button
                    className="packing-list-delete-btn"
                    onClick={(e) => handleDelete(list.id, e)}
                  >
                    Delete
                  </button>
                </li>
              </Link>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
