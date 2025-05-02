<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Don;
use Illuminate\Http\Request;

class DonController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $id = auth()->id();
        $donations = Don::with('centre')->where('donor_id',$id)->paginate(10);

        return response()->json([
            'donations' => $donations
        ]);
    }

    public function getCentreDonations()
    {
        $id = auth()->id();
        $donations = Don::with('donor')->where('centre_id',$id)->get();

        return response()->json([
            'donations' => $donations
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {



    }

    /**
     * Display the specified resource.
     */
    public function show(Don $don)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Don $don)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Don $don)
    {
        //
    }


    public function donationsCountUser(){
        $userId = auth()->id();
        $donationsCount = Don::where('donor_id', $userId)->count();
        return response()->json(['count' => $donationsCount]);
    }
}
