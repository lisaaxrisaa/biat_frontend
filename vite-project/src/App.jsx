import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';
import UpdateProfile from './pages/UpdateProfile';
import Profile from './pages/Profile';
import NavBar from '../../NavBar';
import ItineraryPage from './Itinerary/ItineraryPage';
import ItineraryForm from './Itinerary/ItineraryForm';
import ItineraryDetailPage from './Itinerary/ItineraryDetail';
import EditItineraryPage from './Itinerary/EditItinerary';
import { Provider } from 'react-redux';
import store from './store/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/itineraries" element={<ItineraryPage />} />
            <Route path="/itinerary-form" element={<ItineraryForm />} />
            <Route path="/itinerary/:id" element={<ItineraryDetailPage />} />
            <Route path="/edit-itinerary/:id" element={<EditItineraryPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/update-profile" element={<UpdateProfile />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
};

export default App;
