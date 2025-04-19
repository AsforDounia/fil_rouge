<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
            'remember' => 'boolean',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Ces identifiants ne correspondent pas à nos enregistrements.'
            ], 401);
        }


        $token = $user->createToken($user->name . '_login_token')->plainTextToken;

        $role = $user->roles()->pluck('name');

        if($request->remember) {
            session(['userSession' => $user]);
            session(['userRole' => $role[0]]);
            session()->save();
        }


        Auth::login($user);

        return response()->json([
            'user' => $user,
            'userRole' => $role,
            'token' => $token,
            'message' => 'Connexion réussie',
        ]);
    }
}
