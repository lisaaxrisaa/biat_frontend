import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(sessionStorage.getItem('user')) || null,
    token: sessionStorage.getItem('token') || null,
  },
  reducers: {
    registerUser: (state, action) => {
      console.log('Registering user with data:', action.payload.user);
      state.token = action.payload.token;
      state.user = action.payload.user || null;
      console.log('User after register:', state.user);
      if (state.user) {
        sessionStorage.setItem('token', action.payload.token);
        sessionStorage.setItem('user', JSON.stringify(action.payload.user));
        console.log('Saved to sessionStorage:', {
          token: action.payload.token,
          user: action.payload.user,
        });
      } else {
        console.warn('⚠ No user data received in registerUser action.');
      }
    },
    updateUser: (state, action) => {
      state.user = action.payload;
      sessionStorage.setItem('user', JSON.stringify(action.payload));
    },
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('token');
      console.log('Logged out and cleared session storage');
    },
  },
});

export const { registerUser, updateUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
