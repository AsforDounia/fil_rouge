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
        $donorId = auth()->id();
        $now = Carbon::now();

        $nextAppointment = Appointment::where('donor_id', $donorId)
            ->where('appointment_date', '>=', $now->subDay())
            ->where('status', '!=', 'annulée')
            ->orderBy('appointment_date', 'asc')
            ->first();

        if ($nextAppointment) {
            $nextAppointmentDate = Carbon::parse($nextAppointment->appointment_date);
            $formattedNextAppointment = $nextAppointment->toArray();
            $formattedNextAppointment['date'] = $nextAppointmentDate->format('Y-m-d');
            $nextAppointmentTime = $nextAppointment->appointment_time;
        } else {
            $formattedNextAppointment = null;
            $nextAppointmentDate = null;
            $nextAppointmentTime = null;
        }

        $lastDonation = Don::where('donor_id', $donorId)
            ->where('donation_date', '<', $now)
            ->orderBy('donation_date', 'desc')
            ->first();

        $lastDonationDate = $lastDonation ? $lastDonation->donation_date : null;
        $timeRemaining = $nextAppointmentDate ? round($now->diffInDays($nextAppointmentDate, false)) : null;

        $totalDonations = Don::where('donor_id', $donorId)->count();

        $upcomingAppointments = Appointment::with('centre')
            ->where('donor_id', $donorId)
            ->where('appointment_date', '>=', Carbon::now()->subDay())
            ->where('status', '!=', 'annulée')
            ->orderBy('appointment_date', 'asc')
            ->get()
            ->map(function ($appointment) {
                $appointmentDate = Carbon::parse($appointment->appointment_date);
                $formattedAppointment = $appointment->toArray();
                $formattedAppointment['date'] = $appointmentDate->format('Y-m-d');

                return $formattedAppointment;
            });

        $appHistory = Appointment::with('centre')
            ->where('donor_id', $donorId)
            ->where(function ($query) {
                $query->where('appointment_date', '<', now())
                    ->orWhere('status', 'annulée');
            })
            ->orderBy('appointment_date', 'asc')
            ->get()
            ->map(function ($appointment) {
                $appointmentDate = Carbon::parse($appointment->appointment_date);
                $formattedAppointment = $appointment->toArray();
                $formattedAppointment['date'] = $appointmentDate->format('Y-m-d');

                return $formattedAppointment;
            });

        return response()->json([
            'next_appointment_date' => $nextAppointmentDate,
            'next_appointment_time' => $nextAppointmentTime,
            'last_donation_date' => $lastDonationDate,
            'time_remaining' => $timeRemaining,
            'total_donations' => $totalDonations,
            'upcoming_appointments' => $upcomingAppointments,
            'appHistory' => $appHistory,
        ]);
    }



}
