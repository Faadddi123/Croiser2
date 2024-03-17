import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const EventList = ( {auth} ) => {
  const [events, setEvents] = useState([]);
  const [editedEventName, setEditedEventName] = useState('');
  const [editingEventId, setEditingEventId] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('/api/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleDelete = async (eventId) => {
    try {
      await axios.delete(`/api/events/${eventId}`);
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleAccept = async (eventId) => {
    try {
      await axios.put(`/api/events/${eventId}/accept`);
      console.log('Accepted event with ID:', eventId);
      fetchEvents(); // Fetch events again to update the list
    } catch (error) {
      console.error('Error accepting event:', error);
    }
  };

  const handleDeny = async (eventId) => {
    try {
      await axios.put(`/api/events/${eventId}/deny`);
      console.log('Denied event with ID:', eventId);
      fetchEvents(); // Fetch events again to update the list
    } catch (error) {
      console.error('Error denying event:', error);
    }
  };

  return (
    <AuthenticatedLayout
    user={auth.user}
    header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create a event</h2>}
>
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-semibold mb-4">Events List</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id} className="flex items-center justify-between py-2 border-b">
            <span>{event.name}</span>
            <div>
            {event.Accepted ? (
                <button
                    onClick={() => handleDeny(event.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded mr-2"
                >
                  Deny
                </button>
              ) : (
                <button
                  onClick={() => handleAccept(event.id)}
                  className="px-3 py-1 bg-green-500 text-white rounded mr-2"
                >
                  Accept
                </button>
              )}
              <button
                onClick={() => handleDelete(event.id)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </AuthenticatedLayout>
  );
};

export default EventList;
