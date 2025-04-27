<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Models\Message;
use Illuminate\Http\Request;

class ConversationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userId = auth()->id();

        // Récupérer les conversations où l'utilisateur est le receiver
        $conversations = Conversation::where('receiver_id', $userId)->get();

        // Extraire tous les ids des conversations
        $conversationIds = $conversations->pluck('id');

        // Récupérer tous les messages liés à ces conversations
        $messages = Message::whereIn('conversation_id', $conversationIds)->get();

        return response()->json([
            'conversations' => $conversations,
            'messages' => $messages,
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
    public function show(Conversation $conversation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Conversation $conversation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Conversation $conversation)
    {
        //
    }
}
