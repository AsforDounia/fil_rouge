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
        $donorRole = Role::where('name', 'donor')->first();
        $centreRole = Role::where('name', 'centre_manager')->first();
        $patientRole = Role::where('name', 'patient')->first();
        $adminRole = Role::where('name', 'admin')->first();


        $users = User::factory(20)->create();
        $roles = Role::all();

        $firstUser = $users->first();
        $firstUser->assignRoleToUser($adminRole->id);


        $users->skip(1)->each(function ($user) use ($roles) {
            $randomRole = $roles->random();
            $user->assignRoleToUser($randomRole->id);
        });



        Conversation::factory(10)->create();

        // Create messages
        Message::factory(30)->create();

        // Create blood collection campaigns
        Collecte::factory(5)->create();

        // Create donations
        // Don::factory(20)->create();

        // Create donation requests

        // Create events
        $events = Event::factory(5)->create();

        // Attach users to events (pivot)
        foreach ($events as $event) {
            $event->participants()->attach(
                $users->random(rand(3, 7))->pluck('id')->toArray()
            );
        }

        // Create reports


        // Localisation data
        Localisation::factory(20)->create();

        // Testimonials
        Temoignage::factory(10)->create();








        $donors = User::factory()->count(10)->create()->each(function ($user) use ($donorRole) {
            $user->roles()->attach($donorRole->id);
        });
        $patients = User::factory()->count(10)->create()->each(function ($user) use ($patientRole) {
            $user->roles()->attach($patientRole->id);
        });

        $centres = User::factory()->count(10)->create()->each(function ($user) use ($centreRole) {
            $user->roles()->attach($centreRole->id);
        });
        $admins = User::factory()->count(10)->create()->each(function ($user) use ($adminRole) {
            $user->roles()->attach($adminRole->id);
        });

        foreach ($admins as $admin) {
            Rapport::factory()->count(1)->create([
                'admin_id' => $admin->id
            ]);
        }



        foreach ($donors as $donor) {
            Don::factory()->count(5)->create([
                'donor_id' => $donor->id,
                'centre_id' => $centres->random()->id,
            ]);
            Appointment::factory()->count(3)->create(['donor_id' => $donor->id , 'centre_id' => $centres->random()->id]);


        }
        foreach ($patients as $patient) {
            DonRequest::factory()->count(5)->create([
                'patient_id' => $patient->id,
                'centre_id' => $centres->random()->id,
            ]);
        }

    }
}


