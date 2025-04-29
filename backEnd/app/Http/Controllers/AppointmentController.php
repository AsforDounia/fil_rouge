<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\CentreManager;
use App\Models\Don;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
        $validated = $request->validate([
            'appointment_date' => 'required|date',
            'type_don' => 'required|in:Plasma,Globules,Plaquettes,Sang Total',
            'appointment_time' => 'required|date_format:H:i:s',
            'centre_id' => 'required|exists:users,id',
        ]);


        $appointment = new Appointment();
        $appointment->donor_id = auth()->id();
        $appointment->centre_id = $request->centre_id;
        $appointment->type_don = $request->type_don;
        $appointment->appointment_date = $request->appointment_date;
        $appointment->appointment_time = $request->appointment_time;
        $appointment->status = 'en_attente';
        $appointment->save();

        return response()->json([
            'message' => 'Appointment created successfully!',
            'appointment' => $appointment,
        ], 201);
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
    public function destroy($id)
    {
        $appointment = Appointment::find($id);

        if ($appointment) {
            $appointment->status = 'annulée';
            $appointment->save();
            return response()->json(['message' => 'Rendez-vous annulé avec succès.']);
        }

        return response()->json(['message' => 'Rendez-vous non trouvé.'], 404);
    }


    public function getAppointmentFileds(){
        $appointments = Appointment::all();

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
                return $group->count() >= 24;
            })
            ->keys();

        return response()->json([
            'dates_unavailable' => $dates_unavailable,
        ]);
    }


    public function getUnavailableTimes(Request $request)
    {
        $request->validate([
            'appointment_date' => 'required|date',
            'centre_id' => 'required|exists:users,id',
        ]);

        $centreId = $request->centre_id;

        $appointmentDate = $request->appointment_date;

        $date = Carbon::parse($appointmentDate)->format('Y-m-d');

        $unavailableTimes = DB::table('appointments')
            ->where('centre_id', $centreId)
            ->whereDate('appointment_date', $date)
            ->pluck('appointment_time');

        return response()->json([
            'unavailable_times' => $unavailableTimes,
        ]);
    }


}
