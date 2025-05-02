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
            'appointment_date' => $this->faker->dateTimeBetween('+1 days', '+1 month')->setTime(rand(9, 18), rand(0, 59))->format('Y-m-d'),
            'appointment_time' => $this->generateRandomAppointmentTime(),
            'status' => $this->faker->randomElement(['confirmée', 'annulée' , 'effectuée']),
            'type_don' => $this->faker->randomElement( ['Plasma', 'Globules', 'Plaquettes' , 'Sang Total']),
            'quantity' => $this->faker->numberBetween(1, 5),
        ];
    }

    protected function generateRandomAppointmentTime()
    {
        $allSlots = collect([
            '09:00', '09:15', '09:30', '09:45',
            '10:00', '10:15', '10:30', '10:45',
            '11:00', '11:15', '11:30', '11:45',

            '14:00', '14:15', '14:30', '14:45',
            '15:00', '15:15', '15:30', '15:45',
            '16:00', '16:15', '16:30', '16:45',
        ]);

        return $allSlots->random();
    }
}


