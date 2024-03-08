import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventForm from '@/Layouts/EventForm';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import { Inertia } from '@inertiajs/inertia';

const EventList = ({  auth }) => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios.get('/api/events')
            .then(response => {
                console.log('Events data:', response.data);
                setEvents(response.data);
            })
            .catch(error => {
                console.error('Error fetching events:', error);
            });
    }, []);

    const handleButtonClick = (eventId) => {
        // Pass the event ID to the onButtonClick function
        console.log(eventId);
        Inertia.visit(route('event.details', { id: eventId }));

    };


    return (
        <AuthenticatedLayout
    user={auth.user}
    header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create a event</h2>}
>

        <div>
        <GuestLayout>
            {events.map(event => (

                <EventForm key={event.id} event={event} onButtonClick={() => handleButtonClick(event.id)} />

            ))}
            </GuestLayout>
        </div>
        </AuthenticatedLayout>
    );
};

export default EventList;
