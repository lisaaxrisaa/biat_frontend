import { api } from './api';

const itinerarySlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getItineraries: builder.query({
      query: (userId) => {
        console.log('Fetching itineraries for user with ID:', userId);
        return `/api/itinerary/user/itinerary`;
      },
      transformResponse: (response) => {
        console.log('Fetched itineraries from API:', response);
        return response;
      },
    }),
    getItinerary: builder.query({
      query: (id) => {
        console.log('Fetching itinerary with ID:', id);
        return `/api/itinerary/user/itinerary/${id}`;
      },
    }),
    createItinerary: builder.mutation({
      query: (newItinerary) => ({
        url: '/api/itinerary/user/itinerary',
        method: 'POST',
        body: newItinerary,
      }),
    }),
    updateItinerary: builder.mutation({
      query: ({ id, updatedItinerary }) => ({
        url: `/api/itinerary/user/itinerary/${id}`,
        method: 'PUT',
        body: updatedItinerary,
      }),
    }),
    deleteItinerary: builder.mutation({
      query: (id) => ({
        url: `/api/itinerary/user/itinerary/${id}`,
        method: 'DELETE',
      }),
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetItinerariesQuery,
  useGetItineraryQuery,
  useCreateItineraryMutation,
  useUpdateItineraryMutation,
  useDeleteItineraryMutation,
} = itinerarySlice;

export default itinerarySlice;
