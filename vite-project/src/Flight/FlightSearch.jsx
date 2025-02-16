import { useState } from 'react';
import { useSearchFlightsQuery } from '../store/flightSlice';

const FlightSearch = () => {
  const [searchParams, setSearchParams] = useState({
    fromQuery: '',
    toQuery: '',
    departDate: '',
    adults: 1,
    currency_code: 'USD',
  });

  const { data, error, isLoading, refetch } = useSearchFlightsQuery(
    searchParams,
    { skip: true }
  );

  const handleChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  return (
    <div className="flight-search">
      <h2>Find Flights</h2>
      <div>
        <input
          type="text"
          name="fromQuery"
          placeholder="From (e.g., New York)"
          value={searchParams.fromQuery}
          onChange={handleChange}
        />
        <input
          type="text"
          name="toQuery"
          placeholder="To (e.g., Los Angeles)"
          value={searchParams.toQuery}
          onChange={handleChange}
        />
        <input
          type="date"
          name="departDate"
          value={searchParams.departDate}
          onChange={handleChange}
        />
        <input
          type="number"
          name="adults"
          min="1"
          value={searchParams.adults}
          onChange={handleChange}
        />
        <button onClick={refetch}>Search Flights</button>
      </div>

      {isLoading && <p>Loading flights...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}

      <ul>
        {data?.data?.aggregation?.stops?.map((flight, index) => (
          <li key={index}>
            Stops: {flight.numberOfStops} - From ${flight.minPrice?.units}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FlightSearch;
