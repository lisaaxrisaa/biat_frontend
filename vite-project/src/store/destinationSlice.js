import { api } from './api';

const destinationSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    generateDestination: builder.query({
      query: () => '/api/destination/generate',
      providesTags: ['Destination'],
    }),
  }),

  overrideExisting: false,
});

export const { useGenerateDestinationQuery, useLazyGenerateDestinationQuery } =
  destinationSlice;

export default destinationSlice;
