<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable , HasApiTokens;

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
        'password',
        'localisation_id'
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


        public function roles()
        {
            return $this->belongsToMany(Role::class, 'role_user', 'user_id', 'role_id');
        }

        public function assignRoleToUser($roleId )
        {
            $this->roles()->attach($roleId);
        }

        public function localisation()
        {
            return $this->hasOne(Localisation::class);
        }


        // Events
        public function events()
        {
            return $this->belongsToMany(Event::class, 'inscription_event');
        }

        public function hostingEvents()
        {
            return $this->hasMany(Event::class);
        }


        public function dons()
        {
            return $this->hasMany(Don::class, 'donor_id');
        }



        public function demandes()
        {
            return $this->hasMany(DonRequest::class, 'patient_id');
        }



        public function temoignages()
        {
            return $this->hasOne(Temoignage::class);
        }


        public function donRequest(){
            return $this->hasMany(DonRequest::class, 'centre_id');
        }



        public function hasRole($roleName)
        {
            return $this->roles()->where('name', $roleName)->exists();
        }
}




