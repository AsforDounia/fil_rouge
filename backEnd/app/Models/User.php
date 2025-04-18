<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */

    protected $fillable = [
        'name',
        'email',
        'profile_image',
        'accountStatus',
        'date_of_birth',
        'blood_type',
        'address',
        'city',
        'postal_code',
        'country',
        'weight',
        'height',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }


        // Roles and permissions
        public function roles()
        {
            return $this->belongsToMany(Role::class);
        }

        public function assignRoleToUser($roleId )
        {
            $this->roles()->attach($roleId);
        }

        // Geolocation
        public function localisation()
        {
            return $this->hasOne(Localisation::class);
        }

        // Messaging
        public function conversations()
        {
            return $this->hasMany(Conversation::class, 'sender_id');
        }

        public function messages()
        {
            return $this->hasMany(Message::class, 'sender_id');
        }

        // Events
        public function events()
        {
            return $this->belongsToMany(Event::class, 'inscription_event');
        }

        // Donations
        public function dons()
        {
            return $this->hasMany(Don::class, 'donor_id');
        }

        public function collectes()
        {
            return $this->hasMany(Collecte::class, 'centre_id');
        }

        // Requests
        public function demandes()
        {
            return $this->hasMany(DonRequest::class, 'patient_id');
        }

        // Admin reports
        public function rapports()
        {
            return $this->hasMany(Rapport::class, 'admin_id');
        }

        public function temoignages()
        {
            return $this->hasOne(Temoignage::class);
        }
}




