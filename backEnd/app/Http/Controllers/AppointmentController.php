<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\CentreManager;
use App\Models\Don;
use App\Models\Stock;
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
        $centre_id = auth()->id();
        $appointments = Appointment::with('donor')->where('centre_id',$centre_id)->orderBy('appointment_date', 'asc')->get();

        return response()->json([
            'appointments' => $appointments,
        ]);

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
            'quantity' => 'required|integer|min:1|max:5',
        ]);

        $appointment = new Appointment([
            'donor_id' => auth()->id(),
            'centre_id' => $validated['centre_id'],
            'type_don' => $validated['type_don'],
            'appointment_date' => $validated['appointment_date'],
            'appointment_time' => $validated['appointment_time'],
            'quantity' => $validated['quantity'],
            'status' => 'confirmée',
        ]);

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
    public function update(Request $request, $id)
    {

        $validated = $request->validate([
            'status' => 'required|string|in:annulée,effectuée',
        ]);

        $appointment= Appointment::find($id);

        if (!$appointment) {
            return response()->json([
                'success' => false,
                'message' => 'Rendez-vous non trouvé.',
            ], 404);
        }

        $appointment->update([
            'status' => $validated['status'],
        ]);

        if($request->status === "effectuée"){
            $danation = Don::create([
                'donor_id' => $appointment->donor_id,
                'centre_id' => $appointment->centre_id,
                'type_don' => $appointment->type_don,
                'donation_date' => now(),
                'blood_group' => $appointment->donor->blood_type,
                'quantity' => $appointment->quantity
            ]);


            $stock = Stock::where('groupSanguin', $danation->blood_group)->where('composantSanguin', $danation->type_don)->where('centre_id', $danation->centre_id)->first();

            if ($stock) {
                $stock->quantite += $danation->quantity;
                $stock->save();
            }
            else {
                Stock::create([
                    'groupSanguin' => $danation->blood_group,
                    'composantSanguin' => $danation->type_don,
                    'quantite' => $danation->quantity,
                    'centre_id' => $danation->centre_id,
                ]);
            }
        }

        $appointment->update($validated);
        return response()->json([
            'success' => true,
            'message' => 'Le statut du rendez-vous a été mis à jour avec succès.',
            'appointment' => $appointment,
        ]);
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
