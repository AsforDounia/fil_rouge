<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Donor extends User
{
    protected $table = 'users';
    protected static function booted()
    {
        static::addGlobalScope('donorRole', function (Builder $builder) {
            $builder->whereHas('roles', function ($query) {
                $query->where('name', 'donor');
            });
        });


    }

    public function appointments()
    {
        return $this->hasMany(Appointment::class, 'donor_id');
    }

    public static function donorAppointments()
    {
        $user = auth()->user();
        $donor = self::find($user->id);
        if ($donor) {
            return $donor->appointments;
        }
    }
}
