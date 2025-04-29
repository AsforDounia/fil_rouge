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

        $users->each(function ($user) {
            Localisation::factory()->create([
                'user_id' => $user->id,
            ]);
        });


        $roles = Role::all();

        $firstUser = $users->first();
        $firstUser->assignRoleToUser($adminRole->id);


        $users->skip(1)->each(function ($user) use ($roles) {
            $randomRole = $roles->random();
            $user->assignRoleToUser($randomRole->id);
        });



        // Conversation::factory(10)->create();
        // Message::factory(30)->create();


        // Collecte::factory(5)->create();

        $events = Event::factory(5)->create();

        foreach ($events as $event) {
            $event->participants()->attach(
                $users->random(rand(3, 7))->pluck('id')->toArray()
            );
        }




        $temoignages = Temoignage::factory(10)->create();


        foreach ($temoignages as $temoignage) {
            $temoignage->user_id = $users->random()->id;
            $temoignage->save();
        }


        $donors = User::factory(10)->create();

        $donors->each(function ($donor) use ($donorRole) {
            Localisation::factory()->create([
                'user_id' => $donor->id,
            ]);
            $donor->roles()->attach($donorRole->id);
        });

        $patients = User::factory(10)->create();

        $patients->each(function ($patient) use ($patientRole) {
            Localisation::factory()->create([
                'user_id' => $patient->id,
            ]);
            $patient->roles()->attach($patientRole->id);
        });


        $centres = User::factory(10)->create();

        $centres->each(function ($centre) use ($centreRole) {
            Localisation::factory()->create([
                'user_id' => $centre->id,
            ]);
            $centre->roles()->attach($centreRole->id);
        });


        $admins = User::factory(10)->create();

        $admins->each(function ($admin) use ($adminRole) {
            Localisation::factory()->create([
                'user_id' => $admin->id,
            ]);
            $admin->roles()->attach($adminRole->id);
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
            Appointment::factory()->count(3)->create([
                'donor_id' => $donor->id ,
                'centre_id' => $centres->random()->id
            ]);
        }
        
        foreach ($patients as $patient) {
            DonRequest::factory()->count(5)->create([
                'patient_id' => $patient->id,
                'centre_id' => $centres->random()->id,
            ]);
        }

    }
}


