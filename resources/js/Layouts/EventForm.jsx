import React from 'react';

const EventForm = ({ event, onButtonClick }) => {
  const { name, description, date_depart, heur_depart, duree, id } = event;

  const handleClick = () => {
    onButtonClick(id);
  };

  return (
    <div>
      <h2>{name}</h2>
      <p>{description}</p>
      <p>Date: {date_depart}</p>
      <p>Period: {heur_depart} - {duree} hours</p>
      <button onClick={handleClick}>View Details</button>
    </div>
  );
};

export default EventForm;
