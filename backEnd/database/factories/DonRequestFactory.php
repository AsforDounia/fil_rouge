<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DonRequest>
 */
class DonRequestFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {


        return [
            'patient_id' => User::factory(),  // Random user for the patient
            'blood_group' => $this->faker->randomElement(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),  // Random blood group
            'component' => $this->faker->randomElement(['Plasma', 'Globules', 'Plaquettes']),  // Random component
            'quantity' => $this->faker->numberBetween(1, 5),  // Random quantity between 1 and 5
            'urgency' => $this->faker->randomElement(['Urgent', 'Non Urgent']),  // Random urgency
            'description' => $this->faker->optional()->text(),  // Optional description
            'status' => $this->faker->randomElement(['en_attente', 'approuvée', 'rejetée', 'complétée']),  // Random status
        ];

    }
}
