<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Don extends Model
{
    use HasFactory;
    protected $fillable = ['donor_id', 'collecte_id', 'donation_date', 'blood_group' , 'centre_id'];

    public function donor()
    {
        return $this->belongsTo(User::class, 'donor_id');
    }

    public function collecte()
    {
        return $this->belongsTo(Collecte::class);
    }

    public function requests()
    {
        return $this->belongsToMany(DonRequest::class, 'donation_requests');
    }

    public static function userDonations()
    {
        $user = auth()->user();
        return self::where('donor_id', $user->id);
    }

    public function localisation()
    {
        return $this->belongsTo(Localisation::class);
    }

    public function centre(){
        return $this->belongsTo(User::class,"centre_id");
    }
}

