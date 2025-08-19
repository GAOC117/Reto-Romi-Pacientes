<?php

namespace App\Http\Controllers;

use App\Http\Resources\PatientCollection;
use App\Models\Patient;
use Illuminate\Http\Request;

class PatientController extends Controller
{

    public function principal()
    {

        return new PatientCollection(Patient::latest()->take(10)->get());
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Patient::query();

        if ($request->has('search') && !empty($request->search)) {
            $search = $request->search;

            $query->where(function ($q) use ($search) {
                $q->where('name', 'LIKE', "%{$search}%")
                    ->orWhere('age', 'LIKE', "%{$search}%")
                    ->orWhere('symptoms', 'LIKE', "%{$search}%");
            });
        }

        $patients = $query->orderBy('id', 'DESC')->paginate(10);

        return response()->json($patients);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'age' => 'required|min:0|integer',
            'symptoms' => 'required'
        ]);

        try {
            $patient = Patient::create([
                'name' => $request->name,
                'age' => $request->age,
                'symptoms' => $request->symptoms
            ]);



            return response()->json([
                'success' => true,
                'message' => 'Paciente agregado con éxito',
                'data' => $patient
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Ocurrió un error al agregar el paciente',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required',
            'age' => 'required|min:0|integer',
            'symptoms' => 'required'
        ]);

        try {
            $patient = Patient::findOrFail($id);

            $patient->update([
                'name' => $request->name,
                'age' => $request->age,
                'symptoms' => $request->symptoms
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Paciente actualizado con éxito',
                'data' => $patient
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Ocurrió un error al actualizar el paciente',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
           $patient = Patient::find($id);

    if (!$patient) {
        return response()->json([
            'success' => false,
            'message' => 'Paciente no encontrado'
        ], 404);
    }

    try {
        $patient->delete();
        return response()->json([
            'success' => true,
            'message' => 'Paciente eliminado correctamente'
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Error al eliminar el paciente'
        ], 500);
    }
    }
}
