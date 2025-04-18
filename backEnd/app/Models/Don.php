<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Don extends Model
{
    use HasFactory;
    protected $fillable = ['donor_id', 'collecte_id', 'donation_date', 'blood_group'];

    public function donor()
    {
        return $this->belongsTo(User::class, 'donor_id');
    }

    public function collecte()
    {
        return $this->belongsTo(Collecte::class);
    }
}

