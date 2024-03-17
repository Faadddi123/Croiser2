import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventForm from '@/Layouts/EventForm';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout'; // Make sure this path is correct
import { Inertia, route } from '@inertiajs/inertia';

const EventList = ({ auth }) => {
    const [events, setEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

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
        console.log(eventId);

        Inertia.visit(Inertia.route('event.details', { id: eventId }));
    };

    const handleSearch = () => {

        const filteredEvents = events.filter(event => event.name.toLowerCase().includes(searchTerm.toLowerCase()));
        setEvents(filteredEvents);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Show Event</h2>}
        >
            <div>
                <input
                    type="text"
                    placeholder="Search Events..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-300 rounded-md px-4 py-2 mb-4"
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-500 text-white rounded-md px-4 py-2"
                >
                    Search
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

            {events.map(event => event.Accepted == 1 ? <EventForm key={event.id} user={auth.user} event={event} onButtonClick={() => handleButtonClick(event.id)} />:null


            )}


            </div>
        </AuthenticatedLayout>
    );
};

export default EventList;
