<?php

namespace App\Http\Controllers;

use App\Models\CentreManager;
use App\Models\Don;
use App\Models\Donor;
use App\Models\Patient;
use App\Models\User;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $countDonors = Donor::count();
        $countPatients = Patient::count();
        $countCenters = CentreManager::count();
        $countDonations = Don::count();

        $statistics = [
            'countDonors' =>$countDonors,
            'countPatients' => $countPatients,
            'countCenters' => $countCenters,
            'countDonations' => $countDonations,
        ];

        return response()->json([
            "stats" => $statistics,
        ]);

    }
}
