<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $events = Event::with('localisation.user')->paginate(3);
        return response()->json([
            'events' => $events
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
    public function show(Event $event)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Event $event)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event)
    {
        //
    }



    public function comingCount(Request $request){
        $count = Event::where('date', '>', date('Y-m-d'))->count();
        return response()->json([
            'count' => $count
            ]);
    }
    public function participer($eventId)
    {
        $userId = auth()->id();

        $event = Event::find($eventId);
        if (!$event) {
            return response()->json([
                'error' => 'Événement non trouvé.'
            ], 404);
        }

        $event->participants()->attach($userId);

        return response()->json([
            'success'=> 'Vous participez maintenant à cet événement.'
        ]);
    }
    public function annuler($eventId)
    {
        $userId = auth()->id();

        $event = Event::find($eventId);
        if (!$event) {
            return response()->json([
                'error' => 'Événement non trouvé.'
            ], 404);
        }

        $event->participants()->detach($userId);

        return response()->json([
            'success' => 'Votre participation a été annulée.'
        ]);
    }

    public function userParticiper()
    {
        $userId = auth()->id();

        $events = Event::whereHas('participants', function($query) use ($userId) {
            $query->where('user_id', $userId);
        })->get();

        $isParticipating = DB::table('inscription_event')->where('user_id', $userId)->get();

            return response()->json([
                'userEvents' => $isParticipating
            ]);


    }
}
