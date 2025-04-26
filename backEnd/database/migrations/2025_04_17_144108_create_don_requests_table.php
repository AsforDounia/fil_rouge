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
        Schema::create('don_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('patient_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('centre_id')->constrained('users')->onDelete('cascade');
            $table->enum('blood_group', ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']);
            $table->enum('component', ['Plasma', 'Globules', 'Plaquettes' ,'Sang Total']);

            $table->integer('quantity')->min(1)->max(5);
            $table->enum('urgency', ['Urgent', 'Normal']);
            $table->text('description')->nullable();
            $table->enum('status', ['en_attente', 'approuvée', 'rejetée', 'complétée'])->default('en_attente');
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('don_requests');
    }
};
