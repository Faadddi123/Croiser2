<?php

namespace App\Http\Controllers;

//
use App\Mail\TicketEmail;
use Illuminate\Support\Facades\Mail;
//for email sending
use App\Models\Events;
use App\Models\Reservations;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReservationController extends Controller
{

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

        // Send email with ticket information
        try {
            // Create an instance of TicketEmail and pass the required parameters
            $ticketEmail = new TicketEmail($event, $user, $reservation, 'Your custom message here');

            // Send the email
            Mail::to($user->email)->send($ticketEmail);

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
                $this->sendticket($reservation->id);
                return response()->json(['message' => 'Reservation created with email successfully'], 200);
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
        //
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
        //
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
