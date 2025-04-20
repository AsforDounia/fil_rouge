<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CenterController;
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
    Route::apiResource('requests', DonRequestController::class);



});
