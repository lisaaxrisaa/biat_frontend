import { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';
import UpdateProfile from './pages/UpdateProfile';
import Profile from './pages/Profile';
import ItineraryPage from './Itinerary/ItineraryPage';
import ItineraryForm from './Itinerary/ItineraryForm';
import ItineraryDetailPage from './Itinerary/ItineraryDetail';
import EditItineraryPage from './Itinerary/EditItinerary';
import JournalList from './journal-components/JournalList';
import Layout from './pages/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </Provider>
  );
};

const AppContent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    setIsLoggedIn(!!token);
    console.log('Checking login status:', token);
    console.log('Current route:', location.pathname);
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} />
      {isLoggedIn ? (
        <Route element={<Layout />}>
          <Route path="/itineraries" element={<ItineraryPage />} />
          <Route path="/itinerary-form" element={<ItineraryForm />} />
          <Route path="/itinerary/:id" element={<ItineraryDetailPage />} />
          <Route path="/edit-itinerary/:id" element={<EditItineraryPage />} />
          <Route path="/journals" element={<JournalList />} />
          <Route path="/update-profile" element={<UpdateProfile />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      ) : (
        <Route path="*" element={<Navigate to="/login" />} />
      )}
      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
    </Routes>
  );
};

export default App;
