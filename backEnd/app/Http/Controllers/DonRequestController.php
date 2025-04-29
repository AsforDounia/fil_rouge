<?php

namespace App\Http\Controllers;

use App\Models\DonRequest;
use Illuminate\Http\Request;

class DonRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $donRequests = DonRequest::with('centre')->where('status', 'en_attente')->get();
    return response()->json([
            "don_requests" => $donRequests,
        ]);
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
    public function show(DonRequest $donRequest)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, DonRequest $donRequest)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DonRequest $donRequest)
    {
        //
    }



    public function nbRstUrgM(){
        $user = auth()->user();
        $nbRstUrg = DonRequest::where('blood_group', $user->blood_type);
        $nbRstUrg = $nbRstUrg->where('urgency', 'Urgent')->count();

        return response()->json(['countUrgC' => $nbRstUrg]);
    }



}
