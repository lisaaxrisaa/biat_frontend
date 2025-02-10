import { api } from './api';

const registrationSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: '/register',
        method: 'POST',
        body: userData,
      }),
    }),
  }),
});

export const { useRegisterUserMutation } = registrationSlice;
export default registrationSlice;
