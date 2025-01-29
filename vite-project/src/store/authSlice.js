import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: sessionStorage.getItem('token') | null,
  },
  reducers: {
    registerUser: (state, action) => {
      state.token = action.payload.token;
      sessionStorage.setItem('token', action.payload.token);
    },
  },
});

export const { registerUser } = authSlice.actions;
export default authSlice.reducer;
