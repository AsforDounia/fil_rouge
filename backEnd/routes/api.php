<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CenterController;
use App\Http\Controllers\ConversationController;
use App\Http\Controllers\DonController;
use App\Http\Controllers\DonorController;
use App\Http\Controllers\DonRequestController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\TemoignageController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::get('/user/roles', function (Request $request) {
    return $request->user()->roles;
})->middleware('auth:sanctum');


Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);


Route::get('stats',[HomeController::class,'index']);
Route::get('testimonials',[TemoignageController::class,'index']);
Route::get('events',[EventController::class,'index']);
Route::get('centers',[CenterController::class,'index']);
Route::get('centers/search', [CenterController::class, 'search']);


Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::post('logout', [AuthController::class, 'logout']);

    Route::get('requests', [DonRequestController::class, 'index']);
    Route::get('requests/{id}', [DonRequestController::class, 'show']);
    Route::post('requests', [DonRequestController::class, 'store']);
    Route::put('requests/{id}', [DonRequestController::class, 'update']);
    Route::delete('requests/{id}', [DonRequestController::class, 'destroy']);



    Route::get('events/coming/count', [EventController::class, 'comingCount']);



    // donor




    // Route::get('conversations',[ConversationController::class,'index']);
    Route::get('events/user/participer',[EventController::class,'userParticiper']);
    Route::get('events/participer/{eventId}',[EventController::class,'participer']);
    Route::get('events/annuler/participer/{eventId}',[EventController::class,'annuler']);

    Route::post('user/update/profile', [AuthController::class, 'updateProfile']);
    Route::post('user/delete/profile', [AuthController::class, 'deleteProfile']);

});



Route::group(['middleware' => ['auth:sanctum', 'role:donor']], function () {
    Route::get('statistics', [DonorController::class, 'donorDashboard' ]);

    Route::get('donations/user/count', [DonController::class, 'donationsCountUser' ]);
    Route::get('requests/match/count' , [DonorController::class, 'donorDashboard']);

    Route::get('appointments/statistics', [DonorController::class, 'getAppointmentsStats']);

    Route::get('appointment/filds' , [AppointmentController::class,'getAppointmentFileds']);
    Route::get('appointment/unavailableDates/{id}', [AppointmentController::class, 'getUnavailableDates']);
    Route::post('appointment/unavailableTimes', [AppointmentController::class, 'getUnavailableTimes']);
    Route::get('donations',[DonController::class,'index']);
    Route::post('appointments',[AppointmentController::class,'store']);
    Route::post('donor/annuler/appointment/{id}',[AppointmentController::class,'destroy']);
});


Route::group(['middleware' => ['auth:sanctum', 'role:admin']], function () {
    Route::get('admin/dashboard', [AdminController::class, 'Dashboard' ]);
    Route::get('admin/users', [AdminController::class, 'getUsers' ]);
    Route::post('admin/addUser', [AdminController::class, 'addUser' ]);
    Route::post('admin/deleteUser/{id}', [AdminController::class, 'deleteUser' ]);
});
