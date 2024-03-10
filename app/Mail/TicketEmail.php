<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class TicketEmail extends Mailable
{
    use Queueable, SerializesModels;




    public $event;
    public $user;
    public $reservation;
    public $message;


    /**
     * Create a new message instance.
     */
    public function __construct($event, $user, $reservation, $message)
    {
        $this->event = $event;
        $this->user = $user;
        $this->reservation = $reservation;
        $this->message = $message;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Ticket Email',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.ticket', // Update this to the correct view name
        );
    }


    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.ticket') // Assuming you have an email template named 'ticket'
                    ->with([
                        'event' => $this->event,
                        'user' => $this->user,
                        'reservation' => $this->reservation,
                        'message' => $this->message, // Pass the message to the email template
                    ]);
    }



    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
