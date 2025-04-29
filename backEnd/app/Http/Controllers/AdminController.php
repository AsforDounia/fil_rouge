<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\CentreManager;
use App\Models\Donor;
use App\Models\DonRequest;
use App\Models\Localisation;
use App\Models\Patient;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    public function Dashboard(){
        $donorsCount = Donor::count();
        $patientsCount = Patient::count();
        $centresCount = CentreManager::count();

        $appointmentsToday = Appointment::whereDate('appointment_date', today())->count();


        return response()->json([
            'donorsCount' => $donorsCount,
            'patientsCount' => $patientsCount,
            'appointmentsToday' => $appointmentsToday,
            'centresCount' => $centresCount,
        ]);
    }


    public function getUsers(){

        $users = User::with('roles')->where('id', '!=', auth()->id())->orderBy('created_at', 'desc')->get();

        return response()->json([
            "users" => $users,
        ]);
    }

    public function addUser(Request $request)
    {
        $rules = [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
            'accountType' => 'required|in:patient,donor,centre_manager,hospital_manager,bank_manager,admin',
        ];

        if ($request->accountType === 'centre_manager') {
            $rules = array_merge($rules, [
                'address' => 'required|string|max:255',
                'city' => 'required|string|max:100',
                'latitude' => 'required|numeric|between:-90,90',
                'longitude' => 'required|numeric|between:-180,180'
            ]);
        } else {
            $rules = array_merge($rules, [
                'address' => 'sometimes|string|max:255',
                'city' => 'sometimes|string|max:100',
                'latitude' => 'sometimes|numeric|between:-90,90',
                'longitude' => 'sometimes|numeric|between:-180,180'
            ]);
        }

        $request->validate($rules);

        $passwordH = Hash::make($request->password);

        // Create user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $passwordH,
            'accountType' => $request->accountType,
            'city' => $request->city ?? null,
        ]);

        // Handle location data
        if ($request->accountType === 'centre_manager' ||
            ($request->has('address') && $request->has('latitude') && $request->has('longitude'))) {

            Localisation::create([
                'user_id' => $user->id,
                'address' => $request->address,
                'city' => $request->city ?? null,
                'latitude' => $request->latitude,
                'longitude' => $request->longitude,
            ]);
        }

        $role = Role::where('name', $request->accountType)->first();
        $user->roles()->attach($role);


        $responseData = [
            'message' => 'Inscription réussie',
            'user' => $user,
            'userRole' => $role->name,
        ];

        if ($user->localisation) {
            $responseData['location'] = $user->localisation;
        }

        return response()->json($responseData, 201);
    }


    public function deleteUser($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'Utilisateur non trouvé'], 404);
        }

        $user->delete();

        return response()->json(['message' => 'Utilisateur supprimé avec succès'], 200);
    }


    public function changeAccountStatus($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'Utilisateur non trouvé'], 404);
        }

        $user->accountStatus = $user->accountStatus === 'bloque' ? 'actif' : 'bloque';
        $user->save();

        return response()->json([
            'message' => 'Statut du compte mis à jour avec succès',
            'nouveau_statut' => $user->accountStatus
        ]);
    }
}
