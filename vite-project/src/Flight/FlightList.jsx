import React from 'react';

const FlightsList = ({ flights }) => {
  if (!flights || flights.length === 0) return <p>No flights found.</p>;

  return (
    <>
      <div className="flight-card-grid">
        {flights.map((flight, index) => {
          const airlineName = flight.airline || 'Unknown Airline';
          const flightNumber = flight.flightNumber || 'N/A';

          const departureAirport = flight.departureAirport || 'Unknown';
          const departureCode = flight.departureCode || 'N/A';
          const arrivalAirport = flight.arrivalAirport || 'Unknown';
          const arrivalCode = flight.arrivalCode || 'N/A';

          const departureDate = flight.departureTime
            ? new Date(flight.departureTime).toLocaleString()
            : 'N/A';
          const arrivalDate = flight.arrivalTime
            ? new Date(flight.arrivalTime).toLocaleString()
            : 'N/A';

          const cabinClass = flight.cabinClass || 'ECONOMY';
          const price = flight.price || 'Not Available';
          const currency = flight.currency || 'USD';

          const bookingLink = flight.bookingLink || '#';

          return (
            <div className="flight-card" key={index}>
              <h3>
                {airlineName} - Flight {flightNumber}
              </h3>
              <p>
                From: {departureAirport} ({departureCode})
              </p>
              <p>
                To: {arrivalAirport} ({arrivalCode})
              </p>
              <p>Departure: {departureDate}</p>
              <p>Arrival: {arrivalDate}</p>
              <p>Cabin: {cabinClass}</p>
              <p className="flight-card-price">
                Price: {currency} {price}
              </p>
              <a
                href={bookingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flight-card-button"
              >
                Book Now
              </a>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default FlightsList;
