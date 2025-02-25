import { Link } from 'react-router-dom';
import {
  useGetPackingListsQuery,
  useDeletePackingListMutation,
} from '../store/packingListSlice';

export default function PackingListsDisplay() {
  const { data: packingLists, isLoading, isError } = useGetPackingListsQuery();
  const [deletePackingList] = useDeletePackingListMutation();

  if (isLoading) return <p>Loading packing lists...</p>;
  if (isError) return <p>Failed to load packing lists.</p>;

  return (
    <div className="packing-lists">
      <h2>Your Packing Lists</h2>
      <button>
        <Link to="/packing-list"> Create New Packing List</Link>
      </button>

      {packingLists?.length === 0 ? (
        <p>No packing lists found. Create one above!</p>
      ) : (
        <ul>
          {packingLists.map((list) => (
            <li key={list.id}>
              <Link to={`/packing-list/${list.id}`}>{list.name}</Link>
              <button onClick={() => deletePackingList(list.id)}>❌</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
