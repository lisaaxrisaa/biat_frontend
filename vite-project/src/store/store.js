import { configureStore } from '@reduxjs/toolkit';
import { api } from './api';
import registrationSlice from './registrationSlice';
import weatherSlice from './weatherSlice';
import itinerarySlice from './itinerarySlice';
import destinationSlice from './destinationSlice';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    [api.reducerPath]: api.reducer,
    [registrationSlice.reducerPath]: registrationSlice.reducer,
    [weatherSlice.reducerPath]: weatherSlice.reducer,
    [itinerarySlice.reducerPath]: itinerarySlice.reducer,
    [destinationSlice.reducerPath]: destinationSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      api.middleware,
      registrationSlice.middleware,
      itinerarySlice.middleware,
      weatherSlice.middleware
    ),
});

export default store;
