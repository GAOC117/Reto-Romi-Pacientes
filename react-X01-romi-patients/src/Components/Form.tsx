import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { PacienteDraft } from "../types";
import Mensajes from "./Mensajes";
import { toast } from "react-toastify";
import { addPatient, updatePatient } from "../services/PatientsServices";
import { useEffect } from "react";

export default function Form({
  fetchPatients,
  paciente,
  onClose
}: {
  fetchPatients?: () => Promise<void>;
  paciente?: { id: number; name: string; age: number; symptoms: string };
  onClose?: () => void;
}) {
  const { pathname } = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<PacienteDraft>();



    useEffect(() => {
    if (paciente) {
      setValue("name", paciente.name);
      setValue("age", paciente.age);
      setValue("symptoms", paciente.symptoms);
    } else {
      reset();
    }
  }, [paciente, reset, setValue]);



  const fetchAddPatients = async (data: PacienteDraft) => {
    const respuesta = await addPatient(data);

    if (respuesta.success) toast.success(respuesta.message);
    else toast.error(respuesta.message);
  };

  const fetchEditPatients = async (id: number, data: PacienteDraft) => {
  
    const respuesta = await updatePatient(id, data);

    if (respuesta.success) 
    
        toast.success(respuesta.message);
    
    else toast.error(respuesta.message);
  };

  const onSubmitPaciente = async (data: PacienteDraft) => {
    //data es el parametro que contiene los datos del formulario al hacer submit
    if (paciente) {
      await fetchEditPatients(paciente.id, data);
      onClose?.();
    } else {
      await fetchAddPatients(data);
    }
    
    fetchPatients?.(); //para la tabla de la pagina principal
    reset();
    
  };

  const isHome = pathname === "/";
  return (
    <>
      {/* {isHome && ( */}
        <form
          onSubmit={handleSubmit(onSubmitPaciente)}
          className={`${isHome === true ? 'md:w-1/2 2xl:w-1/3' : 'w-full'}  bg-slate-800 p-10 rounded-lg shadow space-y-6 w-full`}
        >
          <div className="space-y-4">
            <label
              htmlFor="name"
              className="block text-white uppercase font-bold text-lg"
            >
              Nombre del paciente
            </label>
            <input
              type="text"
              id="name"
              placeholder="Nombre del paciente"
              className="p-3 w-full rounded-lg focus:outline-none bg-white"
              {...register("name", {
                required: "El nombre del paciente es obligatorio",
              })}
            />
            {errors.name && (
              <Mensajes type={"error"}>{errors.name?.message}</Mensajes>
            )}
          </div>
          <div className="space-y-4">
            <label
              htmlFor="age"
              className="block text-white uppercase font-bold text-lg"
            >
              Edad del paciente
            </label>
            <input
              type="number"
              id="age"
              placeholder="Edad del paciente"
              className="p-3 w-full rounded-lg focus:outline-none bg-white"
              min="0"
              {...register("age", {
                required: "La edad del paciente es obligatorio",
                min: {
                  value: 0, // edad mínima
                  message: "La edad debe ser al menos 0", // mensaje de error
                },
              })}
            />
            {errors.age && (
              <Mensajes type={"error"}>{errors.age?.message}</Mensajes>
            )}
          </div>
          <div className="space-y-4">
            <label
              htmlFor="symptoms"
              className="block text-white uppercase font-bold text-lg"
            >
              Síntomas del paciente
            </label>
            <textarea
              id="symptoms"
              placeholder="Síntomas del paciente"
              className="p-3 w-full rounded-lg focus:outline-none bg-white resize-none"
              {...register("symptoms", {
                required: "Los síntomas son obligatorios",
              })}
            ></textarea>
            {errors.symptoms && (
              <Mensajes type={"error"}>{errors.symptoms?.message}</Mensajes>
            )}
          </div>

          <input
            type="submit"
            value={paciente ? 'Actualizar paciente' : 'Agregar paciente'}
            className="cursor-pointer bg-blue-800 hover:bg-blue-900 text-white font-bold w-full p-2 rounded-lg uppercase"
          />
        </form>
      {/* )} */}
    </>
  );
}
