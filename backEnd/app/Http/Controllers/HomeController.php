<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $countUserDonor = User::whereHas('roles', function ($query) {
            $query->where('name', 'donor');
        })->count();

        $countUserPatient = User::whereHas('roles', function ($query) {
            $query->where('name', 'patient');
        })->count();

        $countUserCentreManager = User::whereHas('roles', function ($query) {
            $query->where('name', 'centre_manager');
        })->count();

        $statistics = [
            'countUserDonor' =>$countUserDonor,
            'countUserPatient' => $countUserPatient,
            'countCenters' => $countUserCentreManager,
            'countDonations' => 3,
        ];

       return response()->json([
        "stats" => $statistics,
       ]);

    }
}
