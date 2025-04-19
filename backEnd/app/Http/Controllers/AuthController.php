<?php

namespace App\Http\Controllers;

use App\Models\Role;
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


        return response()->json([
            'user' => $user,
            'userRole' => $role,
            'token' => $token,
            'message' => 'Connexion réussie',
        ]);
    }


    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
            'accountType' => 'required|in:patient,donor,centre_manager,hospital_manager,bank_manager,admin'
        ]);

        $userCount = User::count();
        if($userCount == 0){
            $accountType = 'admin';
        }
        else{
            $accountType = $request->accountType;
        }


        $passwordH = Hash::make($request->password);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $passwordH,
            'accountType' => $accountType,
        ]);

        $role = Role::where('name', $accountType)->first();
        $user->roles()->attach($role);

        $token = $user->createToken($user->name . '_register_token')->plainTextToken;

        return response()->json([
            'message' => 'Inscription réussie',
            'user' => $user,
            'userRole' => $role->name,
            'token' => $token,
        ], 201);
    }
}
