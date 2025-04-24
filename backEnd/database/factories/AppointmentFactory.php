<?php

namespace Database\Factories;

use App\Models\Appointment;
use App\Models\Donor;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class AppointmentFactory extends Factory
{
    protected $model = Appointment::class;

    public function definition(): array
    {
        return [
            'donor_id' => User::factory(),
            'centre_id' => User::factory(),
            'appointment_date' => $this->faker->dateTimeBetween('+1 days', '+1 month')->setTime(rand(9, 18), rand(0, 59)), 
            'status' => $this->faker->randomElement(['en_attente', 'confirmée', 'annulée']),
        ];
    }
}


