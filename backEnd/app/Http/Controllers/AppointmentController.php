<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\CentreManager;
use App\Models\Don;
use Carbon\Carbon;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Appointment $appointment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Appointment $appointment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Appointment $appointment)
    {
        //
    }


    public function getAppointmentFileds(){
        $appointments = Appointment::all();

        // $dates_unavailable = $appointments->pluck('appointment_date');
        $centres = CentreManager::all();

        return response()->json([
            'appointments' => $appointments,
            'centres' => $centres
        ]);


    }

    public function getUnavailableDates($id) {

        $appointments = Appointment::where('centre_id', $id)->get();

        $dates_unavailable = $appointments->groupBy(function ($appointment) {
                return Carbon::parse($appointment->appointment_date)->format('Y-m-d');
            })
            ->filter(function ($group) {
                return $group->count() >= 1;
            })
            ->keys();

        return response()->json([
            'dates_unavailable' => $dates_unavailable,
        ]);
    }

}
