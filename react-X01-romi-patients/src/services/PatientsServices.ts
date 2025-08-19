import {
  PatientsSchema,
  SuccessAddPatientResponseSchema,
  ErrorAddPatientResponseSchema,
  PatientsResponseSchema,
  SuccessDeletePatientResponseSchema,
  ErrorDeletePatientResponseSchema,
} from "../schema/patient-schema";
import clienteAxios from "../config/axios";
import type { PacienteDraft } from "../types";

export async function getPatientPrincipal() {
  const url = "/api/patients-principal";

  try {
    const {
      data: { data },
    } = await clienteAxios(url);
    const result = PatientsSchema.safeParse(data);

    if (result.success) return result.data;
    
    return []; //si no se cumple el if se retorna un arreglo que es lo que esta esperando el useState de patienState
  } catch (error) {
    console.log(error);
    return [];
  }
}



export async function getPatients(search: string, paginaActual: number) {
  const url = `/api/patients?search=${search}&page=${paginaActual}`;

  try {
    const {
      data
    } = await clienteAxios(url);

    const result = PatientsResponseSchema.safeParse(data);
   

     if (result.success) return result.data;
  
     return { current_page: 1, data: [], last_page: 1 }; //si no se cumple el if se retorna un arreglo que es lo que esta esperando el useState de patienState
  } catch (error) {
    console.log(error);
    return { current_page: 1, data: [], last_page: 1 };
  }
}

export async function addPatient(data: PacienteDraft) {
  const url = "/api/add-patient";
  try {
    const respuesta = await clienteAxios.post(url, data);
    
    const parsedSuccess = SuccessAddPatientResponseSchema.safeParse(
        respuesta.data
    );
    
    if (parsedSuccess.success) {
      return { success: true, message: parsedSuccess.data.message as string};
    }

    // Intentamos parsear como error
    const parsedError = ErrorAddPatientResponseSchema.safeParse(respuesta.data);
    if (parsedError.success) {
      return { success: false, message: parsedError.data.message as string};
    }

    // Respuesta inesperada
    return { success: false, message: "Respuesta inesperada del servidor" };
  } catch (error: any) {
    return {
      success: false,
      message: error?.response?.data?.message as string || "Error de red o servidor",
    };
  }
}

export async function updatePatient(id: number, data: PacienteDraft) {

    const url = `/api/patients/${id}`; 
    
 try {
    const respuesta = await clienteAxios.put(url, data); // usamos PUT para update

    
    // Parseamos como respuesta de éxito
    const parsedSuccess = SuccessAddPatientResponseSchema.safeParse(respuesta.data);

    if (parsedSuccess.success) {
      return { success: true, message: parsedSuccess.data.message as string };
    }

    // Parseamos como error
    const parsedError = ErrorAddPatientResponseSchema.safeParse(respuesta.data);
    if (parsedError.success) {
      return { success: false, message: parsedError.data.message as string };
    }

    // Respuesta inesperada
    return { success: false, message: "Respuesta inesperada del servidor" };
  } catch (error: any) {
    return {
      success: false,
      message: error?.response?.data?.message as string || "Error de red o servidor",
    };
  }

}



export async function deletePatientById(id: number) {

    const url = `/api/patients/${id}`; 
    
 try {
    const respuesta = await clienteAxios.delete(url); // usamos delete para eliminar

    
    // Parseamos como respuesta de éxito
    const parsedSuccess = SuccessDeletePatientResponseSchema.safeParse(respuesta.data);

    if (parsedSuccess.success) {
      return { success: true, message: parsedSuccess.data.message as string };
    }

    // Parseamos como error
    const parsedError = ErrorDeletePatientResponseSchema.safeParse(respuesta.data);
    if (parsedError.success) {
      return { success: false, message: parsedError.data.message as string };
    }

    // Respuesta inesperada
    return { success: false, message: "Respuesta inesperada del servidor" };
  } catch (error: any) {
    return {
      success: false,
      message: error?.response?.data?.message as string || "Error de red o servidor",
    };
  }

}


