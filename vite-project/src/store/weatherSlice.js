import { api } from './api';

const weatherSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getWeather: builder.query({
      query: (location) => ({
        url: '/api/weather',
        params: { location },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetWeatherQuery } = weatherSlice;
export default weatherSlice;
