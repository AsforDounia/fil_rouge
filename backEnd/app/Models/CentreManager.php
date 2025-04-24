<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class CentreManager extends User
{
    protected $table = 'users';
    protected static function booted()
    {
        static::addGlobalScope('CentreManagerRole', function (Builder $builder) {
            $builder->whereHas('roles', function ($query) {
                $query->where('name', 'centre_manager');
            });
        });


    }

    public function appointments()
    {
        return $this->hasMany(Appointment::class, 'centre_id');
    }

    public function localisation()
    {
        return $this->hasOne(Localisation::class);
    }

    public function donations(){
        return $this->hasMany(Don::class, 'centre_id');
    }
}
