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
  data: PatientSchema, // objeto paciente
});

export const ErrorAddPatientResponseSchema = z.object({
  success: z.literal(false),
  message: z.string(),
  errors: z.any().optional(), // a veces Laravel manda un array de errores
});


export const PatientsResponseSchema = z.object({
  current_page: z.number(),
  data: PatientsSchema,
  last_page: z.number(),
  });


//  export const PatientFormSchema = z.object({
//   name: z.string().nonempty("El nombre es obligatorio"),
//   age: z
//     .string() // input tipo text
//     .refine((val) => /^\d+$/.test(val), {
//       message: "La edad debe ser un número entero",
//     })
//     .transform((val) => parseInt(val, 10)), // lo convierte a number
//   symptoms: z.string().nonempty("Los síntomas son obligatorios"),
// });


export const SuccessDeletePatientResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(), // ejemplo: "Paciente eliminado correctamente"
});

// Schema para respuesta de error de delete
export const ErrorDeletePatientResponseSchema = z.object({
  success: z.literal(false),
  message: z.string(), // ejemplo: "No se pudo eliminar el paciente"
});