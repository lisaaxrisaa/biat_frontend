import { useState } from 'react';
import { useLazySearchFlightsQuery } from '../store/flightSlice';
import FlightsList from './FlightList';
import './flight.css';

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
    await triggerSearch(searchParams);
  };

  return (
    <>
      <div className="flight-page">
        <div className="flight-search-container">
          <h2>Find Flights</h2>
          <form className="flight-search-form">
            <label>
              From
              <input
                type="text"
                name="fromQuery"
                placeholder="From (e.g., New York)"
                value={searchParams.fromQuery}
                onChange={handleChange}
              />
            </label>
            <label>
              To
              <input
                type="text"
                name="toQuery"
                placeholder="To (e.g., Los Angeles)"
                value={searchParams.toQuery}
                onChange={handleChange}
              />
            </label>
            <label>
              Departure Date
              <input
                type="date"
                name="departDate"
                value={searchParams.departDate}
                onChange={handleChange}
              />
            </label>
            <label>
              Return Date
              <input
                type="date"
                name="returnDate"
                value={searchParams.returnDate || ''}
                onChange={handleChange}
              />
            </label>
            <label>
              Passengers
              <input
                type="number"
                name="adults"
                min="1"
                value={searchParams.adults}
                onChange={handleChange}
              />
            </label>
          </form>
          <button className="flight-search-button" onClick={handleSearch}>
            Search Flights
          </button>
        </div>

        {isLoading && <p>Loading flights...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}

        {data?.flights && Array.isArray(data.flights) ? (
          <FlightsList flights={data.flights} />
        ) : (
          <p>No flights found.</p>
        )}
      </div>
    </>
  );
};

export default FlightSearch;
