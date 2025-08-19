import { deletePatientById } from "../services/PatientsServices";
import type { Paciente } from "../types";
import { toast } from "react-toastify";

type MensajeConfirmacionProps = {
  paciente: Paciente;
  onClose: () => void;
  fetchPatients: () => Promise<void>;
};

export default function MensajeConfirmacion({
  paciente,
  onClose,
  fetchPatients
}: MensajeConfirmacionProps) {


const deletePatient = async (id: number) => {
    const respuesta = await deletePatientById(id);
    

    if (respuesta.success) toast.success(respuesta.message);
    else toast.error(respuesta.message);
  };

  const aceptarBtn = async () => {
    
    await deletePatient(paciente.id);
    await fetchPatients();
    onClose();
  };

  const cancelarBtn = () => {
        
    onClose();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6  mx-auto">
  <h2 className="text-xl font-semibold text-gray-800 mb-4">
    ¿Estás seguro que deseas eliminar a este paciente?
  </h2>
  
  <div className="bg-gray-100 rounded-lg p-4 mb-6 relative flex flex-col gap-3 shadow-lg shadow-red-500/50">
    <p className="text-gray-700"><span className="font-medium">Nombre:</span> {paciente.name}</p>
    <p className="text-gray-700"><span className="font-medium">Edad:</span> {paciente.age}</p>
    <p className="text-gray-700"><span className="font-medium">Síntomas:</span> {paciente.symptoms}</p>
    <span className="absolute top-2 right-2 text-xs text-gray-400">ID paciente: {paciente.id}</span>
  </div>
  
  <div className="flex justify-end gap-4">
    <button
      onClick={cancelarBtn}
      className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
    >
      Cancelar
    </button>
    <button
      onClick={aceptarBtn}
      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
    >
      Aceptar
    </button>
  </div>
</div>

  );
}
