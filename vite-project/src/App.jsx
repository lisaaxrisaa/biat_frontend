import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import UpdateProfile from "./pages/UpdateProfile";
import Profile from "./pages/Profile";
import ItineraryPage from "./Itinerary/ItineraryPage";
import ItineraryForm from "./Itinerary/ItineraryForm";
import ItineraryDetailPage from "./Itinerary/ItineraryDetail";
import EditItineraryPage from "./Itinerary/EditItinerary";
import JournalList from "./journal-components/JournalList";
import NewEntry from "./journal-components/NewEntry";
import JournalEntry from "./journal-components/JournalEntry";
import EditEntry from "./journal-components/EditEntry";
import BudgetList from "./Budget/BudgetList";
import BudgetForm from "./Budget/BudgetForm";
import DeleteBudget from "./Budget/DeleteBudget";
import EditBudget from "./Budget/EditBudget";
import IndividualBudget from "./Budget/IndividualBudget";
import Layout from "./pages/Layout";
import Logout from "./pages/Logout";
import LandingPage from "./Landing Page/LandingPage";
import Flight from "./Flight/Flight";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

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
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!sessionStorage.getItem("token")
  );

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]);

  useEffect(() => {
    if (location.pathname !== "/login" && location.pathname !== "/register") {
      sessionStorage.setItem("lastPage", location.pathname);
    }
  }, [location]);

  const lastPage = sessionStorage.getItem("lastPage") || "/";

  return (
    <Routes>
      {isLoggedIn ? (
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/itineraries" element={<ItineraryPage />} />
          <Route path="/itinerary-form" element={<ItineraryForm />} />
          <Route path="/itinerary/:id" element={<ItineraryDetailPage />} />
          <Route path="/edit-itinerary/:id" element={<EditItineraryPage />} />
          <Route path="/journals" element={<JournalList />} />
          <Route path="/user/journal" element={<JournalList />} />
          <Route path="/create-journal-entry" element={<NewEntry />} />
          <Route path="/journal/:id" element={<JournalEntry />} />
          <Route path="/edit-entry/:id" element={<EditEntry />} />
          <Route path="/budget" element={<BudgetList />} />
          <Route path="/create-budget" element={<BudgetForm />} />
          <Route path="/edit-budget/:id" element={<EditBudget />} />
          <Route path="/budget/:id" element={<IndividualBudget />} />
          <Route path="/update-profile" element={<UpdateProfile />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/flights" element={<Flight />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<Navigate to={lastPage} replace />} />
        </Route>
      ) : (
        <>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  );
};

export default App;
