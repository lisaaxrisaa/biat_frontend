import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import UpdateProfile from "./pages/UpdateProfile";
import Profile from "./pages/Profile";
import NavBar from "../../NavBar";
import ItineraryPage from "./Itinerary/ItineraryPage";
import ItineraryForm from "./Itinerary/ItineraryForm";
import ItineraryDetailPage from "./Itinerary/ItineraryDetail";
import EditItineraryPage from "./Itinerary/EditItinerary";
// add JournalList import and Route Path
import JournalList from "./journal-components/JournalList";
import NewEntry from "./journal-components/NewEntry";
import JournalEntry from "./journal-components/JournalEntry";
import EditEntry from "./journal-components/EditEntry";
import { Provider } from "react-redux";
import store from "./store/store";
// import Logout from "./pages/Logout";
// import { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

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
            <Route path="/journals" element={<JournalList />} />
            <Route path="/user/journals" element={<JournalList />} />
            <Route path="/create-journal-entry" element={<NewEntry />} />
            <Route path="/journal/:id" element={<JournalEntry />} />
            <Route path="/edit-entry/:id" element={<EditEntry />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path="/logout" element={<Logout />} /> */}
            <Route path="/register" element={<Registration />} />
            <Route path="/update-profile" element={<UpdateProfile />} />
            <Route path="/profile" element={<Profile />} />
            {/* <Route path="/logout" element={<Logout />} /> */}
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
};

export default App;
