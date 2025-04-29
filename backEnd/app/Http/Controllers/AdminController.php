<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\CentreManager;
use App\Models\Donor;
use App\Models\DonRequest;
use App\Models\Patient;
use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function Dashboard(){
        $donorsCount = Donor::count();
        $patientsCount = Patient::count();
        $centresCount = CentreManager::count();

        $appointmentsToday = Appointment::whereDate('appointment_date', today())->count();


        return response()->json([
            'donorsCount' => $donorsCount,
            'patientsCount' => $patientsCount,
            'appointmentsToday' => $appointmentsToday,
            'centresCount' => $centresCount,
        ]);
    }


    public function getUsers(){

        $users = User::with('roles')->whereNot('id',user()->auth()->id)->get();

        return response()->json([
            "users" => $users,
        ]);
    }
}
