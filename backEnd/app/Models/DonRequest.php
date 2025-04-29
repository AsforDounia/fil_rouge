<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DonRequest extends Model
{
    use HasFactory;
    protected $fillable = ['patient_id','centre_id', 'blood_group', 'component', 'quantity', 'description','urgency', 'status'];


    public function patient()
    {
        return $this->belongsTo(User::class, 'patient_id');
    }

    public function dons()
    {
        return $this->belongsToMany(Don::class, 'donation_requests');
    }


    public function centre(){
        return $this->belongsTo(User::class,"centre_id");
    }

    public static function requestsMatchingUser()
    {
        $user = auth()->user();
        return self::where('blood_group', $user->blood_type);
    }



}
