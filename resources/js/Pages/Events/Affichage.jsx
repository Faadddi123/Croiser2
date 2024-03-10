import React, { useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import SelectOption from '@/Components/SelectOption';
import TheOption from '@/Components/TheOption';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import axios from 'axios';
import { Head, Link, useForm } from '@inertiajs/react';

export default function EventForm({ auth , event}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        eventName: event ? event.name : '',
        eventLocation: event ? event.localisation : '',
        eventDescription: event ? event.description : '',
        eventCategory: event ? event.categories_id : '', 
        availableSeats: event ? event.available_seats : '',
        eventDepartureDate: event ? event.date_depart : '',
        eventDuration: event ? event.duree : '',
        eventDepartureTime: event ? event.heur_depart : '',
        autoAccept: event ? event.auto_accept : false,
    });



    const [categories, setcategories] = useState([]);

    useEffect(() => {
        axios.get('/api/categories')
            .then(response => {
                console.log('categories data:', response.data);
                setcategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    const updateEvent = () => {
        axios.put(`/api/events/${event.id}`, data)
            .then(response => {
                // Handle success, if needed
                console.log('Event updated successfully:', response.data);
                // Optionally, you can redirect the user after successful update
                // For example, redirect to event details page
                // Inertia.visit(route('event.details', { id: event.id }));
            })
            .catch(error => {
                console.error('Error updating event:', error);
            });
    };


    const submit = (e) => {
        e.preventDefault();
        if (event) {
            // Call the function to update the event
            updateEvent();
        } else {
            // Call the function to create a new event
            post(route('events.store'));
        }
    };

    return (

        <AuthenticatedLayout
    user={auth.user}
    header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create a event</h2>}
>
        <GuestLayout>
            <Head title="Create an Event" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="eventName" value="Event Name" />

                    <TextInput
                        id="eventName"
                        name="eventName"
                        value={data.eventName}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('eventName', e.target.value)}
                        required
                    />

                    <InputError message={errors.eventName} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="eventLocation" value="Event Location" />

                    <TextInput
                        id="eventLocation"
                        name="eventLocation"
                        value={data.eventLocation}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('eventLocation', e.target.value)}
                        required
                    />

                    <InputError message={errors.eventLocation} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="eventDescription" value="Event Description" />

                    <TextInput
                        id="eventDescription"
                        name="eventDescription"
                        value={data.eventDescription}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('eventDescription', e.target.value)}
                        required
                    />

                    <InputError message={errors.eventDescription} className="mt-2" />
                </div>



                <div className="mt-4">
                    <InputLabel htmlFor="availableSeats" value="Available Seats" />

                    <TextInput
                        id="availableSeats"
                        type="number"
                        name="availableSeats"
                        value={data.availableSeats}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('availableSeats', e.target.value)}
                        required
                    />

                    <InputError message={errors.availableSeats} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="eventDepartureDate" value="Event Departure Date" />

                    <TextInput
                        id="eventDepartureDate"
                        type="date"
                        name="eventDepartureDate"
                        value={data.eventDepartureDate}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('eventDepartureDate', e.target.value)}
                        required
                    />

                    <InputError message={errors.eventDepartureDate} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="eventDuration" value="Event Duration (hours)" />

                    <TextInput
                        id="eventDuration"
                        type="number"
                        name="eventDuration"
                        value={data.eventDuration}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('eventDuration', e.target.value)}
                        required
                    />

                    <InputError message={errors.eventDuration} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="eventDepartureTime" value="Event Departure Time" />

                    <TextInput
                        id="eventDepartureTime"
                        type="time"
                        name="eventDepartureTime"
                        value={data.eventDepartureTime}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('eventDepartureTime', e.target.value)}
                        required
                    />

                    <InputError message={errors.eventDepartureTime} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="autoAccept" value="Auto Accept" />

                    <input
                        type="checkbox"
                        id="autoAccept"
                        name="autoAccept"
                        checked={data.autoAccept}
                        onChange={(e) => setData('autoAccept', e.target.checked)}
                    />
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="event Category"  />

                    <SelectOption  value={data.eventCategory || (event ? event.categories_id : false)} onChange={(e) => setData('eventCategory', e.target.value)}>
                        {categories.map(category => (
                             <TheOption key={category.id} children_Value = {category.id} >{category.name}</TheOption>
                         ))}
                    </SelectOption>

                    <InputError message={errors.eventCategory} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route('dashboard')} // Update link destination
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Cancel
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        {event ? 'Edit' : 'Submit'}
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
        </AuthenticatedLayout>

    );
}
