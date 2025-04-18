<?php

namespace Database\Factories;

use App\Models\Conversation;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Message>
 */
class MessageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'conversation_id' => Conversation::factory(),  // Associate the message with a random conversation
            'sender_id' => User::factory(),  // Random user for sender
            'message' => $this->faker->paragraph,  // Generate a random message
            'is_read' => $this->faker->boolean,  // Random read status
        ];

    }
}
