import { api } from './api';

const itinerarySlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getItineraries: builder.query({
      query: () => `/api/itinerary/user/itinerary`,
      transformResponse: (response) =>
        response.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
      providesTags: ['Itineraries'],
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
      invalidatesTags: ['Itineraries'],
    }),

    updateItinerary: builder.mutation({
      query: ({ id, updatedItinerary }) => ({
        url: `/api/itinerary/user/itinerary/${id}`,
        method: 'PUT',
        body: updatedItinerary,
      }),
      async onQueryStarted(
        { id, updatedItinerary },
        { dispatch, queryFulfilled }
      ) {
        try {
          dispatch(
            itinerarySlice.util.updateQueryData(
              'getItineraries',
              undefined,
              (draft) => {
                const index = draft.findIndex(
                  (itinerary) => itinerary.id === id
                );
                if (index !== -1) {
                  draft[index] = { ...draft[index], ...updatedItinerary };
                }
              }
            )
          );
          await queryFulfilled;
          dispatch(itinerarySlice.util.invalidateTags(['Itineraries']));
        } catch (error) {
          console.error('Error updating itinerary:', error);
        }
      },
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
