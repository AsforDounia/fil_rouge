<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rapport extends Model
{
    protected $fillable = ['admin_id', 'title', 'content'];

    public function admin()
    {
        return $this->belongsTo(User::class, 'admin_id');
    }
}

