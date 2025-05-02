<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Event;
use Illuminate\Http\Request;

class CentreManagerController extends Controller
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
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }


    public function getStats(){

    $today = now()->format('Y-m-d');

    $todayAppointments = Appointment::with('donor')->whereDate('appointment_date', $today)->where('status' ,'confirmée')->orderBy('appointment_time','asc')->get();

    $upcomingEvents = Event::where('date', '>', now())->where('centre_id',auth()->id())->count();

    return response()->json([
        'todayAppointments' => $todayAppointments,
        'upcomingEvents' => $upcomingEvents,
    ]);
    }
}
