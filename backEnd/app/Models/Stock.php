<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    use HasFactory;

    protected $fillable = [
        'groupSanguin',
        'composantSanguin',
        'quantite',
        'centre_id',
    ];

    public function centre()
    {
        return $this->belongsTo(CentreManager::class);
    }
}
