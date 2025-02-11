import { useDeleteItineraryMutation } from '../store/itinerarySlice';
import { useNavigate } from 'react-router-dom';

const useDeleteItinerary = () => {
  const [deleteItinerary] = useDeleteItineraryMutation();
  const navigate = useNavigate();

  const deleteHandler = async (id) => {
    try {
      await deleteItinerary(id).unwrap();
      alert('Itinerary deleted successfully');
      navigate('/itineraries');
    } catch (error) {
      console.error('Failed to delete itinerary:', error);
      alert('Failed to delete itinerary');
    }
  };
  return deleteHandler;
};

export default useDeleteItinerary;
