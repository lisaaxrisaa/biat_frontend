import { configureStore } from '@reduxjs/toolkit';
import { api } from './api';
import registrationSlice from './registrationSlice';
import weatherSlice from './weatherSlice';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    [api.reducerPath]: api.reducer,
    [registrationSlice.reducerPath]: registrationSlice.reducer,
    [weatherSlice.reducerPath]: weatherSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      api.middleware,
      registrationSlice.middleware,
      weatherSlice.middleware
    ),
});

export default store;
