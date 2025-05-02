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
        // Récupérer les rôles
        $donorRole = Role::where('name', 'donor')->first();
        $centreRole = Role::where('name', 'centre_manager')->first();
        $patientRole = Role::where('name', 'patient')->first();
        $adminRole = Role::where('name', 'admin')->first();

        // Créer les utilisateurs
        $users = User::factory(20)->create();

        // Ajouter une localisation pour chaque utilisateur
        $users->each(function ($user) {
            Localisation::factory()->create([
                'user_id' => $user->id,
            ]);
        });

        // Assigner un rôle à l'admin
        $firstUser = $users->first();
        $firstUser->roles()->attach($adminRole);

        // Assigner un rôle aléatoire à chaque autre utilisateur
        $users->skip(1)->each(function ($user) use ($donorRole, $centreRole, $patientRole) {
            $randomRole = [$donorRole, $centreRole, $patientRole][array_rand([0, 1, 2])];
            $user->roles()->attach($randomRole->id);

        });

        // Créer des témoignages
        $temoignages = Temoignage::factory(10)->create();
        foreach ($temoignages as $temoignage) {
            $temoignage->user_id = $users->random()->id;
            $temoignage->save();
        }

        // Créer des donneurs et les associer à un rôle
        $donors = User::factory(10)->create();
        $donors->each(function ($donor) use ($donorRole) {
            Localisation::factory()->create([
                'user_id' => $donor->id,
            ]);
            $donor->roles()->attach($donorRole->id);
   
        });

        // Créer des patients et les associer à un rôle
        $patients = User::factory(10)->create();
        $patients->each(function ($patient) use ($patientRole) {
            Localisation::factory()->create([
                'user_id' => $patient->id,
            ]);
            $patient->roles()->attach($patientRole->id);
        });

        // Créer des centres et les associer à un rôle
        $centres = User::factory(10)->create();
        $centres->each(function ($centre) use ($centreRole, $users) {
            Localisation::factory()->create([
                'user_id' => $centre->id,
            ]);

            // Créer des événements pour chaque centre
            $event = Event::factory()->create([
                'centre_id' => $centre->id,
            ]);

            // Assigner des participants à l'événement
            $event->participants()->attach(
                $users->random(rand(3, 7))->pluck('id')->toArray()
            );

            $centre->roles()->attach($centreRole->id);

        });

        // Créer des administrateurs et les associer à un rôle
        $admins = User::factory(10)->create();
        $admins->each(function ($admin) use ($adminRole) {
            Localisation::factory()->create([
                'user_id' => $admin->id,
            ]);
            $admin->roles()->attach($adminRole->id);
        });

        // Créer des rapports pour chaque administrateur
        foreach ($admins as $admin) {
            Rapport::factory()->count(1)->create([
                'admin_id' => $admin->id
            ]);
        }

        // Créer des dons et des rendez-vous pour les donneurs
        foreach ($donors as $donor) {
            Don::factory()->count(5)->create([
                'donor_id' => $donor->id,
                'centre_id' => $centres->random()->id,
            ]);
            Appointment::factory()->count(3)->create([
                'donor_id' => $donor->id,
                'centre_id' => $centres->random()->id
            ]);
        }

        // Créer des demandes de dons pour les patients
        foreach ($patients as $patient) {
            DonRequest::factory()->count(5)->create([
                'patient_id' => $patient->id,
                'centre_id' => $centres->random()->id,
            ]);
        }
    }
}
