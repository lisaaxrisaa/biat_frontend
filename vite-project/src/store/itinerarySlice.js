import { api } from './api';

const itinerarySlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getItineraries: builder.query({
      query: (userId) => {
        console.log('Fetching itineraries for user with ID:', userId);
        return `/api/itinerary/user/itinerary`;
      },
      transformResponse: (response) => {
        return response;
      },
    }),
    getItinerary: builder.query({
      query: (id) => {
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
    deleteActivity: builder.mutation({
      query: (activityId) => ({
        url: `/api/itinerary/user/itinerary/activity/${activityId}`,
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
  useDeleteActivityMutation,
} = itinerarySlice;

export default itinerarySlice;
