<?php

use App\Http\Controllers\PatientController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');



//Mostrar los 10 ultimos pacientes
Route::get('/patients/latest',[PatientController::class, 'principal']); 
//Agregar un paciente
Route::post('/patients',[PatientController::class, 'store']); 
//Listar pacientes con paginador y input de busqueda
Route::get('/patients',[PatientController::class, 'index']); 
//Actualizar un paciente
Route::put('/patients/{id}',[PatientController::class, 'update']);
//Eliminar un paciente
Route::delete('/patients/{id}', [PatientController::class, 'destroy']);