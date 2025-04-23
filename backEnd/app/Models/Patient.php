<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Patient extends User
{
    protected $table = 'users';
    protected static function booted()
    {
        static::addGlobalScope('PatientRole', function (Builder $builder) {
            $builder->whereHas('roles', function ($query) {
                $query->where('name', 'patient');
            });
        });


    }
}
