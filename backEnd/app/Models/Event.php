<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;
    protected $fillable = ['title', 'description', 'date', 'localisation_id'];

    public function localisation()
    {
        return $this->belongsTo(Localisation::class);
    }

    public function participants()
    {
        return $this->belongsToMany(User::class, 'inscription_event');
    }
}

