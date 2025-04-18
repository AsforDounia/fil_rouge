<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Collecte extends Model
{
    use HasFactory;
    protected $fillable = ['centre_id', 'date', 'location'];

    public function centre()
    {
        return $this->belongsTo(User::class, 'centre_id');
    }

    public function dons()
    {
        return $this->hasMany(Don::class);
    }
}

