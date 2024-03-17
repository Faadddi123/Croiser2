<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Events extends Model
{
    use HasFactory;
        /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'Events';


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id',
        'name',
        'description',
        'localisation',
        'organisateurs_id',
        'categories_id',
        'available_seats',
        'date_depart',
        'duree',
        'heur_depart',
        'Auto_accept',
        'Accepted',
    ];


}
