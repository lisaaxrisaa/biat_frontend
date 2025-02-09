// // /components/Itinerary/ItineraryTable.jsx
// import React from 'react';
// import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

// const ItineraryTable = ({ itineraries, onDelete }) => {
//   return (
//     <div className="itinerary-table">
//       <table>
//         <thead>
//           <tr>
//             <th>Trip Name</th>
//             <th>Start Date</th>
//             <th>End Date</th>
//             <th>Type</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {itineraries.map((itinerary) => (
//             <tr key={itinerary.id}>
//               <td>{itinerary.tripName}</td>
//               <td>{new Date(itinerary.startDate).toLocaleDateString()}</td>
//               <td>{new Date(itinerary.endDate).toLocaleDateString()}</td>
//               <td>{itinerary.type}</td>
//               <td>
//                 <Link to={`/itinerary/${itinerary.id}`}>View</Link>
//                 <button onClick={() => onDelete(itinerary.id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// ItineraryTable.propTypes = {
//   itineraries: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string.isRequired,
//       tripName: PropTypes.string.isRequired,
//       startDate: PropTypes.string.isRequired,
//       endDate: PropTypes.string.isRequired,
//       type: PropTypes.string.isRequired,
//     })
//   ).isRequired,
//   onDelete: PropTypes.func,
// };

// export default ItineraryTable;
