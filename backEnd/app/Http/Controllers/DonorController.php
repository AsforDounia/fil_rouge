<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\CentreManager;
use App\Models\Don;
use App\Models\Donor;
use App\Models\DonRequest;
use App\Models\Event;
use App\Models\User;
use Illuminate\Http\Request;

class DonorController extends Controller
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
    public function show(Donor $donorRequest)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Donor $donorRequest)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Donor $donorRequest)
    {
        //
    }

    public function donorDashboard()
    {
        $nbUrgRqsts = DonRequest::requestsMatchingUser()->where('urgency', 'Urgent')->count();

        $impact = DonRequest::requestsMatchingUser()->with('dons')->count();

        $upcomingEvents = Event::where('date', '>', now())->count();

        $totalDonations = Don::userDonations()->count();

        $lastDonation = Don::userDonations()->latest('created_at')->first();

        if ($lastDonation) {
            $lastDonationDate = $lastDonation->created_at;
            // Exemple : un délai de 56 jours entre deux dons
            $nextEligibleDate = $lastDonationDate->copy()->addDays(56);
            $daysUntilNextDonation = now()->lt($nextEligibleDate) ? ceil(now()->floatDiffInDays($nextEligibleDate)) : 0;

            $lastDonationDetails = [
                'lastDonationDate' => $lastDonationDate->diffForHumans(),
                'lastDonationLocation' => $lastDonation->localisation,
            ];
        } else {
            $daysUntilNextDonation = 0;
            $lastDonationDetails = [
                'lastDonationDate' => "00-00-00",
                'lastDonationLocation' => 'No recent donation activities available'
            ];
        }
        $recentActivities['lastDonationDetails'] = $lastDonationDetails;
        $urgenteRequest = DonRequest::requestsMatchingUser()->where('urgency', 'Urgent')->first();
        // return  $urgenteRequest;
        if ($urgenteRequest) {
            $recentActivities['urgentRequestDetails'] = [
                'blood_group' => $urgenteRequest->blood_group,
                'createdAt' => $urgenteRequest->created_at->diffForHumans()
            ];
        }


        // $firstAppointment = Donor::donorAppointments()->orderBy('appointment_date', 'desc')->first();
        // Option 1: Use collection methods
        $appointmentScheduled = Donor::donorAppointments()->sortByDesc('appointment_date')->first();
        if ($appointmentScheduled) {
            $centreId = $appointmentScheduled->centre_id;
            $centre = User::find($centreId);
            $location = $centre->localisation;
            $appointmentDetails = [
                'appointmentDate' => $appointmentScheduled->appointment_date,
                'appointmentLocation' => $location->address
            ];
        }
        else{
            $appointmentDetails = [
                'appointmentDate' => "vous n'avez aucun rendez-vous prévu",
                'appointmentLocation' => "---------------"
            ];
        }

        $recentActivities['appointmentDetails'] = $appointmentDetails;
        // $lastAppointment = $user->appointments()->orderBy('date', 'desc')->first();

        // $appointmentScheduled = $urgenteRequest->appointment_scheduled ?? null;

        return response()->json([
            'countUrgC' => $nbUrgRqsts,
            'countImpactedLives' => $impact,
            'upcomingEvents' => $upcomingEvents,
            'totalDonations' => $totalDonations,
            'daysUntilNextDonation' => $daysUntilNextDonation,
            'recentActivities' => $recentActivities,
        ]);
    }




}
