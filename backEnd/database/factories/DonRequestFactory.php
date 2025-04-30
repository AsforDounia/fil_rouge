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
            'patient_id' => User::factory(),
            'centre_id' => User::factory(),
            'blood_group' => $this->faker->randomElement(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),  // Random blood group
            'component' => $this->faker->randomElement(['Plasma', 'Globules', 'Plaquettes']),  // Random component
            'quantity' => $this->faker->numberBetween(1, 5),  // Random quantity between 1 and 5
            'urgency' => $this->faker->randomElement(['Urgent', 'Normal']),  // Random urgency
            'description' => $this->faker->optional()->words(6, true),
            'status' => $this->faker->randomElement(['en_attente', 'rejetée', 'complétée']),  // Random status
        ];

    }
}
