<?php

use App\Http\Controllers\PatientController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');



Route::get('/patients-principal',[PatientController::class, 'principal']); //mostrar los 10 ultimos pacientes
Route::post('/add-patient',[PatientController::class, 'store']); //agregar un paciente
Route::get('/patients',[PatientController::class, 'index']); //mostrar los pacientes con paginador
Route::put('/patients/{id}',[PatientController::class, 'update']);
Route::delete('/patients/{id}', [PatientController::class, 'destroy']);
