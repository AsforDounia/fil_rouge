<?php

namespace Database\Factories;

use App\Models\Collecte;
use App\Models\Localisation;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Don>
 */
class DonFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'donor_id' => User::factory(),
            'localisation_id' => Localisation::factory(),
            'collecte_id' => Collecte::factory(),
            'donation_date' => $this->faker->date(),
            'blood_group' => $this->faker->randomElement(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
        ];
    }
}
