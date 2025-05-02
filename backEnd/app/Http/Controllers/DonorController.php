<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\CentreManager;
use App\Models\Don;
use App\Models\Donor;
use App\Models\DonRequest;
use App\Models\Event;
use App\Models\User;
use Carbon\Carbon;
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
            $nextEligibleDate = $lastDonationDate->copy()->addDays(56);
            $daysUntilNextDonation = now()->lt($nextEligibleDate) ? ceil(now()->floatDiffInDays($nextEligibleDate)) : 0;

            $lastDonationDetails = [
                'lastDonationDate' => $lastDonationDate->diffForHumans(),
                'lastDonationLocation' => $lastDonation->centre->name,
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

        if ($urgenteRequest) {
            $recentActivities['urgentRequestDetails'] = [
                'blood_group' => $urgenteRequest->blood_group,
                'createdAt' => $urgenteRequest->created_at->diffForHumans()
            ];
        }else{
            $recentActivities['urgentRequestDetails'] = [
                'blood_group' => " : Aucune Demande de Sang",
                'createdAt' => "compatible avec votre group de sang"
            ];

        }
        $appointmentScheduled = Donor::donorAppointments()->sortByDesc('appointment_date')->first();
        if ($appointmentScheduled) {
            $centreId = $appointmentScheduled->centre_id;
            $centre = User::find($centreId);
            $location = $centre->name;
            $appointmentDetails = [
                'appointmentDate' => $appointmentScheduled->appointment_date,
                'appointmentLocation' => $location
            ];
        }
        else{
            $appointmentDetails = [
                'appointmentDate' => "vous n'avez aucun rendez-vous prévu",
                'appointmentLocation' => "---------------"
            ];
        }

        $recentActivities['appointmentDetails'] = $appointmentDetails;


        return response()->json([
            'countUrgC' => $nbUrgRqsts,
            'countImpactedLives' => $impact,
            'upcomingEvents' => $upcomingEvents,
            'totalDonations' => $totalDonations,
            'daysUntilNextDonation' => $daysUntilNextDonation,
            'recentActivities' => $recentActivities,
        ]);
    }



    public function getAppointmentsStats()
    {

        $next_appointment = Appointment::where('donor_id', auth()->id())->where('appointment_date', '>=', Carbon::now()->subDay())->where('status', '!=', 'annulée')->orderBy('appointment_date', 'asc')->first();
        $next_appointment_date = $next_appointment ? $next_appointment->appointment_date : null;


        $last_donation = Don::where('donor_id', auth()->id())->where('donation_date', '<', now())->orderBy('donation_date', 'desc')->first();
        $last_donation_date = $last_donation ? $last_donation->donation_date : null;
        $time_remaining = $next_appointment_date ? round(now()->diffInDays($next_appointment_date, true)) : null;

        $total_donations = Don::where('donor_id', auth()->id())->count();


        $upcoming_appointments = Appointment::with('centre')->where('donor_id', auth()->id())->where('appointment_date', '>=', Carbon::now()->subDay())->where('status', '!=', 'annulée')->orderBy('appointment_date', 'asc')->get();

        $upcoming_appointments = $upcoming_appointments->map(function($appointment) {
            $appointment_date = Carbon::parse($appointment->appointment_date);
            $formatted_appointment = $appointment->toArray();
            $formatted_appointment['date'] = $appointment_date->format('Y-m-d');

            return $formatted_appointment;
        });

        $appHistory = Appointment::with('centre')->where('donor_id', auth()->id())->where(function ($query) {
        $query->where('appointment_date', '<', now())
              ->orWhere('status', 'annulée');
    })
    ->orderBy('appointment_date', 'asc')
    ->get();

        $appHistory = $appHistory->map(function($appointment) {
            $appointment_date = Carbon::parse($appointment->appointment_date);
            $formatted_appointment = $appointment->toArray();
            $formatted_appointment['date'] = $appointment_date->format('Y-m-d');

            return $formatted_appointment;
        });

        return response()->json([
            'next_appointment_date' => $next_appointment_date,
            'next_appointment_time' => $next_appointment->appointment_time,
            'last_donation_date' => $last_donation_date,
            'time_remaining' => $time_remaining,
            'total_donations' => $total_donations,
            'upcoming_appointments' =>  $upcoming_appointments,
            'appHistory' => $appHistory
        ]);
    }


}
