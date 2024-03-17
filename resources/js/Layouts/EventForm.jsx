import React from 'react';
import axios from 'axios';
import { Inertia } from '@inertiajs/inertia';

const EventForm = ({ event, user }) => {
  const { name, description, date_depart, heur_depart, duree, id, organisateurs_id } = event;
  const { id: userId } = user;

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

  const handleUpdate = () => {
    Inertia.visit(`/events/edit/${id}`);
  };

  return (
    <div className="border rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold">{name}</h2>
      <p className="text-gray-600 mb-2">{description}</p>
      <p><strong>Date:</strong> {date_depart}</p>
      <p><strong>Period:</strong> {heur_depart} - {duree} hours</p>
      <div className="mt-4">
        <button onClick={handleClick} className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2">View Details</button>
        <button onClick={handleReserve} className="bg-green-500 text-white py-2 px-4 rounded-md mr-2">Reserve</button>
        {organisateurs_id === userId && (
          <button onClick={handleUpdate} className="bg-yellow-500 text-white py-2 px-4 rounded-md">Update</button>
        )}
      </div>
    </div>
  );
};

export default EventForm;
