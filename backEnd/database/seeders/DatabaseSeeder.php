<?php

namespace Database\Seeders;

use App\Models\Appointment;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Conversation;
use App\Models\Message;
use App\Models\Collecte;
use App\Models\Don;
use App\Models\DonRequest;
use App\Models\Event;
use App\Models\Rapport;
use App\Models\Localisation;
use App\Models\Role;
use App\Models\Temoignage;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create users
        $users = User::factory(20)->create();
        $roles = Role::all();

        // Assign a random role to each user
        $users->each(function ($user) use ($roles) {
            $randomRole = $roles->random();
            $user->assignRoleToUser($randomRole->id);
        });

        // Create conversations
        Conversation::factory(10)->create();

        // Create messages
        Message::factory(30)->create();

        // Create blood collection campaigns
        Collecte::factory(5)->create();

        // Create donations
        // Don::factory(20)->create();

        // Create donation requests
        DonRequest::factory(15)->create();

        // Create events
        $events = Event::factory(5)->create();

        // Attach users to events (pivot)
        foreach ($events as $event) {
            $event->participants()->attach(
                $users->random(rand(3, 7))->pluck('id')->toArray()
            );
        }

        // Create reports
        $adminRole = Role::where('name', 'admin')->first();

        User::factory()->count(5)->create()->each(function ($user) use ($adminRole) {
            $user->roles()->attach($adminRole->id);
            Rapport::factory()->count(2)->create(['admin_id' => $user->id]);
        });

        // Localisation data
        Localisation::factory(20)->create();

        // Testimonials
        Temoignage::factory(10)->create();


        $donorRole = Role::where('name', 'donor')->first();
        $centreRole = Role::where('name', 'centre_manager')->first();

        User::factory()->count(5)->create()->each(function ($user) use ($donorRole , $centreRole) {
            $user->roles()->attach($donorRole->id);
            $user->roles()->attach($centreRole->id);
            Appointment::factory()->count(10)->create(['donor_id' => $user->id , 'centre_id' => $centreRole->id]);
        });


        User::factory()->count(20)->create()->each(function ($user) use ($donorRole , $centreRole) {
            $user->roles()->attach($donorRole->id);
            $user->roles()->attach($centreRole->id);
            Don::factory()->count(10)->create(['donor_id' => $user->id , 'centre_id' => $centreRole->id]);
        });

    }
}


