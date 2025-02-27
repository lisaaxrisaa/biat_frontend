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
    <div className="flight-page">
      <div className="flight-search-container">
        <h2>Find Flights</h2>
        <form className="flight-search-form">
          <div>
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
          </div>
          <div>
            <label>
              Departure
              <input
                type="date"
                name="departDate"
                value={searchParams.departDate}
                onChange={handleChange}
              />
            </label>
            <label>
              Return
              <input
                type="date"
                name="returnDate"
                value={searchParams.returnDate || ''}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="passenger-container">
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
          </div>
        </form>
        <button className="flight-search-button" onClick={handleSearch}>
          Search Flights
        </button>
      </div>

      {isLoading && <p>Loading flights...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}

      {data?.flights && Array.isArray(data.flights) ? (
        <div className="flights-container">
          <FlightsList flights={data.flights} />
        </div>
      ) : (
        <p>No flights found.</p>
      )}
    </div>
  );
};

export default FlightSearch;
