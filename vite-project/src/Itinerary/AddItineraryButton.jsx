import React, { useState } from 'react';
import ItineraryForm from './ItineraryForm';

const AddItineraryButton = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleClick = () => {
    setIsFormVisible((prevState) => !prevState);
  };

  return (
    <div>
      <button onClick={handleClick}>
        {isFormVisible ? 'Cancel' : 'Add New Itinerary'}
      </button>
      {isFormVisible && <ItineraryForm />}
    </div>
  );
};

export default AddItineraryButton;
