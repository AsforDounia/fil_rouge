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


    public function getMyResquests(){
        $donRequests = DonRequest::with('centre')->where('patient_id',auth()->id())->orderBy('created_at', 'desc')->get();
        return response()->json([
            'success' => true,
            'requests' => $donRequests
        ]);
    }

    public function getAllRequest()
    {
        $donRequests = DonRequest::with('centre')->orderBy('created_at', 'desc')->get();
        return response()->json([
            "allRequest" => $donRequests,
        ]);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'blood_group' => 'required|string|in:A+,A-,B+,B-,AB+,AB-,O+,O-',
            'urgency' => 'required|string|in:Normal,Urgent',
            'component' => 'required|string|in:Sang total,Plaquettes,Plasma,Globules',
            'centre_id' => 'required|integer|exists:users,id',
            'quantity' => 'required|integer|min:1|max:5',
            'description' => 'nullable|string|max:500',
        ]);

        $validatedData['status'] = 'en_attente';
        $validatedData['patient_id'] = auth()->id();


        $request = DonRequest::create($validatedData);

        $request->load('centre');


        return response()->json([
            'success' => true,
            'message' => 'Demande de don créée avec succès',
            'request' => $request
        ], 201);

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
    public function destroy($id)
    {
        $donRequest=DonRequest::find($id);
        if (!$donRequest) {
            return response()->json(['message' => 'Request non trouvé'], 404);
        }
        $donRequest->delete();
        return response()->json([
            'message' => 'Demande de don supprimée avec succès.'
        ], 200);
    }




    public function nbRstUrgM(){
        $user = auth()->user();
        $nbRstUrg = DonRequest::where('blood_group', $user->blood_type);
        $nbRstUrg = $nbRstUrg->where('urgency', 'Urgent')->count();

        return response()->json(['countUrgC' => $nbRstUrg]);
    }



}
