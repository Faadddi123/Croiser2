import React from 'react';
import axios from 'axios';
import { Inertia } from '@inertiajs/inertia';

const EventForm = ({ event, user }) => {
  const { name, description, date_depart, heur_depart, duree, id ,organisateurs_id} = event;
  const { id: userId } = user;
    console.log(organisateurs_id , userId);
  const handleClick = () => {

    Inertia.visit(`/event/details/${id}`);
  };

  const handleReserve = async () => {
    try {
      // Make a POST request to your API endpoint to save the reservation
      const response = await axios.post('/api/reservations', { eventId: id, userId });
      console.log('Reservation saved:', response.data);
    } catch (error) {
      console.error('Error saving reservation:', error);
    }
  };
  const handleudate = async () => {
    Inertia.visit(`/events/edit/${id}`);
  };

  return (
    <div>
      <h2>{name}</h2>
      <p>{description}</p>
      <p>Date: {date_depart}</p>
      <p>Period: {heur_depart} - {duree} hours</p>
      <button onClick={handleClick}>View Details</button>
      <button onClick={handleReserve}>Reserve</button>
      {organisateurs_id == userId && <button onClick={handleudate }>Update</button>}
    </div>
  );
};

export default EventForm;
