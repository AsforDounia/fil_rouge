<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


// Route::get('/', function () {
//     return Inertia::render('Home');
// });

Route::get('login', [AuthController::class, 'displayLoginPage'])->name('login');
Route::get('register', [AuthController::class, 'displayRegisterPage'])->name('register');
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);




// Route::middleware('auth:sanctum')->group(function () {
//     Route::middleware('role:donor')->group(function () {
//         Route::get('dashboardDonor',function(){
//             return "hello donor";
//         });
//     });

//     Route::middleware('role:patient')->group(function () {
//         Route::get('dashboardPatient',function(){
//             return "hello patient";
//         });
//     });

// });


Route::middleware(['auth:sanctum', 'role:donor'])->group(function () {
    Route::get('donor/dashboard', function () {
        return Inertia::render('donor/dashboard');
    });
    // Route::get('dashboardDonor', [AuthController::class, 'dashboardDonor']);
});


Route::middleware(['auth:sanctum', 'role:patient'])->group(function () {
    Route::get('patient/dashboard', function () {
        return Inertia::render('patient/dashboard');
    });
});

// Route::get('/dashboardDonor', function () {
//     return Inertia::render('dashboardDonor');
// })->middleware('auth');

