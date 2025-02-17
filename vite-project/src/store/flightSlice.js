import { api } from './api';

const flightSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    searchFlights: builder.query({
      query: ({ fromQuery, toQuery, departDate, adults, currency_code }) => ({
        url: `/api/flight/search`,
        params: { fromQuery, toQuery, departDate, adults, currency_code },
      }),
      providesTags: ['Flights'],
    }),
  }),

  overrideExisting: false,
});

export const { useSearchFlightsQuery, useLazySearchFlightsQuery } = flightSlice;

export default flightSlice;
