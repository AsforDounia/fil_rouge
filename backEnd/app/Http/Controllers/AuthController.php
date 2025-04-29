<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

// use Illuminate\Support\Facades\Storage;

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


    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return [
            'status' => 'success',
            'message' => 'User logged out successfully'
        ];
    }



    public function updateProfile(Request $request)
    {
        $user = auth()->user();
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|max:255|unique:users,email,' . $user->id,
            'date_of_birth' => 'sometimes|date',
            'blood_type' => 'sometimes|string|in:A+,A-,B+,B-,AB+,AB-,O+,O-',
            'address' => 'sometimes|string',
            'city' => 'sometimes|string|max:255',
            'postal_code' => 'sometimes|string|max:20',
            'country' => 'sometimes|string|max:255',
            'weight' => 'sometimes|numeric|min:0|max:500',
            'height' => 'sometimes|integer|min:0|max:300',
            'profile_image' => 'sometimes|image|max:5120',
            'newPassword' => 'sometimes|string|min:8',
            'currentPassword' => 'sometimes|string',
        ]);

        if ($request->hasFile('profile_image')) {
            $file = $request->file('profile_image');
            if ($user->profile_image) {
                Storage::disk('public')->delete($user->profile_image);
            }

            $path = $file->store('product_images', 'public');

            $validated['profile_image'] = $path;
        }

        if ($request->filled('newPassword') && $request->filled('currentPassword')) {
            if (Hash::check($request->currentPassword, $user->password)) {
                $user->password = bcrypt($request->newPassword);
            } else {
                return response()->json([
                    'message' => 'Le mot de passe actuel est incorrect.'
                ], 422);
            }
        }

        $user->update($validated);

        return response()->json([
            'message' => 'Profil mis à jour avec succès',
            'user' => $user
        ], 200);
    }


    public function deleteProfile(){
        $user = auth()->user();
        if ($user->profile_image) {
            Storage::disk('public')->delete($user->profile_image);
        }

        $user->delete();

        return response()->json([
            'message' => 'Votre profil a été supprimé avec succès.'
        ], 200);
    }
}
