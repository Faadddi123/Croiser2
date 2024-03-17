<?php

namespace App\Http\Controllers;

//
use App\Mail\TicketEmail;
use App\Models\Events;
//for email sending
use App\Models\Reservations;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class ReservationController extends Controller
{

    public function manage(){
        return Inertia::render('reservation/manage_reservation');
    }
    public function sendticket($reservationId)
    {
        // Retrieve the reservation details
        $reservation = Reservations::findOrFail($reservationId);


        // Check if the reservation exists
        if (!$reservation) {
            return response()->json(['message' => 'Reservation not found'], 404);
        }

        // Retrieve the associated event details
        $event = $reservation->event;

        // Retrieve the associated user details
        $user = $reservation->user;
        $message = 'Your custom message here';

        // Send email with ticket information
        try {
            // Create an instance of TicketEmail and pass the required parameters
            $ticketEmail = new TicketEmail($event, $user, $reservation,$message);

            // Send the email
            Mail::to($user->email)->send($ticketEmail);
            return $ticketEmail;
            return response()->json(['message' => 'Ticket sent successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to send ticket', 'error' => $e->getMessage()], 500);
        }
    }


    public function make_a_reservation(Request $request)
    {


        // Get the event ID from the request data
        $eventId = $request->input('eventId');

        // Get the authenticated user's ID
        $userId = $request->input('userId');

        $existingReservation = Reservations::where('users_id', $userId)
                                        ->where('Events_id', $eventId)
                                        ->first();

        $event = Events::find($eventId);
        if ($existingReservation) {
            $existingReservation->delete();
            $event->available_seats += 1;
            $event->save();
            return response()->json(['message' => 'Reservation deleted successfully'], 200);
        }else{

            $reservation = new Reservations();

            $reservation->users_id = $userId;
            $reservation->Events_id = $eventId;




            if ($event->Auto_accept) {
                $reservation->generate_ticket = 1;

            } else {

                $reservation->generate_ticket = 0;
            }
            $reservation->save();
            $event->available_seats -= 1;
            $event->save();
            if($reservation->generate_ticket){
                $ticketEmail = $this->sendticket($reservation->id);
                return response()->json(['message' => 'Reservation created with email successfully' , 'ticket' => $ticketEmail], 200);
            }

            return response()->json(['message' => 'Reservation created successfully', 'reservation' => $reservation], 200);

            // Return a success response

        }
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $reservations = Reservations::join('Events', 'reservations.Events_id', '=', 'Events.id')
            ->join('users' , 'users.id' , '=' , 'reservations.users_id')
            ->where('Events.organisateurs_id', '=', $id)
            ->select('users.name as username' , 'reservations.generate_ticket' , 'reservations.id')
            ->get();


        if ($reservations->isEmpty()) {
            return response()->json(['message' => 'Reservations not found'], 404);
        }

        return response()->json(['reservations' => $reservations], 200);
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
    public function update( $id)
    {
        // dd('ee');
        // return response()->json(['message' => 'Reservation not found' , 'id' => $id], 200);
        $reservation = Reservations::findOrfail($id);

        // Check if the reservation exists
        if (!$reservation) {
            return response()->json(['message' => 'Reservation not found'], 404);
        }

        // Update the reservation with the request data
        $reservation->update(['generate_ticket' => 1]);

        // Return the response with a success message
        return response()->json(['message' => 'Reservation updated successfully', 'reservation' => $reservation], 200);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $reservation = Reservations::find($id);

        // Check if the reservation exists
        if (!$reservation) {
            return response()->json(['message' => 'Reservation not found'], 404);
        }

        // Delete the reservation
        $reservation->delete();

        return response()->json(['message' => 'Reservation deleted successfully'], 200);
    }
}
