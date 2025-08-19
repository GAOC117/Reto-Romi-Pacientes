import { z } from "zod"

//como obtengo los datos en el form
export const PatientDraftSchema = z.object({
    name: z.string(),
    age: z.number(),
    symptoms: z.string()
});

//como espero que sean los datos de la API
export const PatientSchema = z.object({
    id: z.number(),
    name: z.string(),
    age: z.number(),
    symptoms: z.string()
});


export const PatientsSchema = z.array(PatientSchema);

export const SuccessAddPatientResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  data: PatientSchema, 
});

export const ErrorAddPatientResponseSchema = z.object({
  success: z.literal(false),
  message: z.string(),
  errors: z.any().optional(), 
});


export const PatientsResponseSchema = z.object({
  current_page: z.number(),
  data: PatientsSchema,
  last_page: z.number(),
  });





export const SuccessDeletePatientResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(), 
});

// Schema para respuesta de error de delete
export const ErrorDeletePatientResponseSchema = z.object({
  success: z.literal(false),
  message: z.string(), 
});