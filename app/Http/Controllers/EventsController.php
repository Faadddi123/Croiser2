<?php

namespace App\Http\Controllers;
use App\Models\Events;

use Illuminate\Http\Request;
use Inertia\Inertia;

class EventsController extends Controller
{
    public function showdetails($id){
        $event = Events::findOrFail($id);

        return Inertia::render('Events/Specific_info', [
            'event' => $event,
        ]);
    }

    public function showAllEvents(){
        return Inertia::render('Events/showEvents');
    }
    /**
     * Display a listing of the events.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $events = Events::all();

        return response()->json($events);

    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Events/Affichage');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $request->validate([
            'eventName' => 'required|string|max:255',
            'eventLocation' => 'required|string|max:255',
            'eventDescription' => 'required|string',
            'eventCategory' => 'required',
            'availableSeats' => 'required|integer|min:1',
            'eventDepartureDate' => 'required|date',
            'eventDuration' => 'required|integer|min:1',
            'eventDepartureTime' => 'required|date_format:H:i',
            'autoAccept' => 'boolean',
        ]);

        $event = new Events();
        $event->name = $request->eventName;
        $event->description = $request->eventDescription;
        $event->localisation = $request->eventLocation;
        $event->organisateurs_id = auth()->id(); // Assuming you're storing the user ID of the organizer
        $event->categories_id = $request->eventCategory;
        $event->available_seats = $request->availableSeats;
        $event->date_depart = $request->eventDepartureDate;
        $event->duree = $request->eventDuration;
        $event->heur_depart = $request->eventDepartureTime;
        $event->Auto_accept = $request->autoAccept ?? false; // If autoAccept is not provided, default to false
        $event->save();

        return response()->json(['message' => 'Event created successfully'], 201);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
