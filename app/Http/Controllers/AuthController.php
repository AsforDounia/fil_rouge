<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function displayLoginPage(Request $request){
        return Inertia::render('Auth/Login');
    }
    public function displayRegisterPage(Request $request){
        return Inertia::render('Auth/Register');
    }

    public function register(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
            'accountType' => 'required|in:patient,donor',
        ]);

        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'accountType' => $request->accountType,
        ]);
        $role = Role::where('name', $request->accountType)->first();
        $user->roles()->attach($role);

        $token = $user->createToken($user->last_name . '_register_token')->plainTextToken;
        $role = $user->roles()->pluck('name');

        return response()->json([
            'message' => 'Inscription réussie',
            'user' => $user,
            'userRole' => $role,
            'token' => $token,
        ], 201);
    }


    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Ces identifiants ne correspondent pas à nos enregistrements.'
            ], 401);
        }


        $token = $user->createToken($user->last_name . '_login_token')->plainTextToken;
        $role = $user->roles()->pluck('name');

        return response()->json([
            'user' => $user,
            'userRole' => $role,
            'token' => $token,
            'message' => 'Connexion réussie'
        ]);
    }


    public function dashboardDonor(){
        return Inertia::render('dashboardPatient');
    }
}
