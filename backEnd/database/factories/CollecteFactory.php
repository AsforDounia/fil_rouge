<?php

namespace Database\Factories;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Collecte>
 */
class CollecteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $centreManager = User::factory()->create();
        $centreManager->roles()->attach(Role::where('name', 'centre_manager')->first());

        return [
            'centre_id' => $centreManager->id,
            'date' => $this->faker->dateTimeThisMonth(),
            'location' => $this->faker->address(),
        ];
    }
}
