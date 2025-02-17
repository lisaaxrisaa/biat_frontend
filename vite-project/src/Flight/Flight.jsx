import { useState } from 'react';
import { useLazySearchFlightsQuery } from '../store/flightSlice';
import FlightsList from './FlightList';

const FlightSearch = () => {
  const [searchParams, setSearchParams] = useState({
    fromQuery: '',
    toQuery: '',
    departDate: '',
    returnDate: '',
    adults: 1,
    currency_code: 'USD',
  });

  const [triggerSearch, { data, error, isLoading }] =
    useLazySearchFlightsQuery();

  const handleChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    console.log('🛠️ Sending Search Params:', searchParams);
    const result = await triggerSearch(searchParams);
    console.log('📡 Full API Response:', result);
    console.log('📦 Extracted Data:', result.data?.data?.flightOffers); // Log the flight data
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
          type="date"
          name="returnDate"
          value={searchParams.returnDate || ''}
          onChange={handleChange}
        />
        <input
          type="number"
          name="adults"
          min="1"
          value={searchParams.adults}
          onChange={handleChange}
        />
        <button onClick={handleSearch}>Search Flights</button>
      </div>

      {isLoading && <p>Loading flights...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}

      {data?.flights && Array.isArray(data.flights) ? (
        <FlightsList flights={data.flights} />
      ) : (
        <p>No flights found.</p>
      )}
    </div>
  );
};

export default FlightSearch;
