import { z } from "zod";
import type { PatientDraftSchema, PatientSchema, PatientsResponseSchema, PatientsSchema } from "../schema/patient-schema";

export type Pacientes = z.infer<typeof PatientsSchema>
export type Paciente = z.infer<typeof PatientSchema>
export type PacienteDraft = z.infer<typeof PatientDraftSchema>
export type PacientesResponse = z.infer<typeof PatientsResponseSchema>
