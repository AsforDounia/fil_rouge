<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DonRequest extends Model
{
    use HasFactory;
    protected $fillable = ['patient_id', 'blood_group', 'rh_factor', 'description', 'status'];

    public function patient()
    {
        return $this->belongsTo(User::class, 'patient_id');
    }
}
