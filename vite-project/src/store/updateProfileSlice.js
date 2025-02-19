import { api } from './api';

const updateProfileSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    updateUser: builder.mutation({
      query: (updateUserData) => ({
        url: '/api/auth/user/update',
        method: 'PUT',
        body: updateUserData,
      }),
    }),
  }),
});

export const { useUpdateUserMutation } = updateProfileSlice;
export default updateProfileSlice;
