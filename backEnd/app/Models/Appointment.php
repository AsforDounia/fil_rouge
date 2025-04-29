<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    use HasFactory;

    protected $fillable = [
        'donor_id',
        'centre_id',
        'appointment_date',
        'appointment_time',
        'status',
    ];

    public function donor()
    {
        return $this->belongsTo(Donor::class, 'donor_id');
    }

    public function centre()
    {
        return $this->belongsTo(User::class, 'centre_id');
    }


}

