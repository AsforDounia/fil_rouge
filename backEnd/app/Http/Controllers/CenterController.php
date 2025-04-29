<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class CenterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(){
        $centers = User::with('roles','localisation')->whereHas('roles', function ($query) {
            $query->where('name', 'centre_manager');
        })->paginate(6);
        //
        return response()->json([
            "centers" => $centers
        ]);
    }

    public function allCentres(){
        $centers = User::whereHas('roles', function ($query) {
            $query->where('name', 'centre_manager');
        })->get();
        
        return response()->json([
            "centers" => $centers
        ]);
    }

    public function search(Request $request)
    {
        $query = $request->input('q');

        if (!$query || strlen($query) < 1) {
            return response()->json(['data' => []], 200);
        }

        $centers = User::where('name', 'LIKE', "%{$query}%")->orWhereHas('localisation', function($q) use ($query) {
                $q->where('address', 'LIKE', "%{$query}%")->orWhere('city', 'LIKE', "%{$query}%");
            })->with('localisation')->take(6)->get();

        return response()->json(['data' => $centers], 200);
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
