<?php

namespace App\Models;

use App\Models\Events;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservations extends Model
{
    use HasFactory;

    protected $table = 'reservations';
    protected $fillable = ['users_id', 'Events_id'];


    /**
     * Get the user that owns the reservation.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'users_id');
    }

    /**
     * Get the event that the reservation belongs to.
     */
    public function event()
    {
        return $this->belongsTo(Events::class, 'Events_id');
    }


}
