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

            // Donor
            $table->foreignId('donor_id')->constrained('users')->onDelete('cascade');

            // Centre (manager of donation)
            $table->foreignId('centre_id')->constrained('users')->onDelete('cascade');

            // Date & status
            $table->dateTime('appointment_date');
            $table->enum('status', ['en_attente', 'confirmée', 'annulée'])->default('en_attente');

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
