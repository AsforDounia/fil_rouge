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
        Schema::create('appointments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('donor_id')->constrained('users')->onDelete('cascade');

            $table->foreignId('centre_id')->constrained('users')->onDelete('cascade');
            $table->enum('type_don', ['Plasma', 'Globules', 'Plaquettes' , 'Sang Total']);

            $table->dateTime('appointment_date');
            $table->time('appointment_time');

            $table->enum('status', ['confirmée', 'annulée'])->default('confirmée');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appointments');
    }
};
