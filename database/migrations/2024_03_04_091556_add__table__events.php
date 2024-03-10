<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('Events', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description');
            $table->string('localisation');
            $table->foreignId('organisateurs_id')->constrained('users' , 'id');
            $table->foreignId('categories_id')->constrained('categories' , 'id');
            $table->integer('available_seats');
            $table->date('date_depart');
            $table->integer('duree');
            $table->time('heur_depart');
            $table->boolean('Auto_accept');
            $table->boolean('Accepted')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('Events');
    }
};
