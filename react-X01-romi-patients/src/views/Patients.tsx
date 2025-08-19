import { useEffect, useState } from "react";
import Paginador from "../Components/Paginador";
import PatientsTable from "../Components/PatientsTable";
import { type PacientesResponse, type Paciente } from "../types";
import { getPatients } from "../services/PatientsServices";
import Modal from "../Components/Modal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Patients() {
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [patientsState, setPatientsState] = useState<PacientesResponse>({
    current_page: 1,
    data: [],
    last_page: 1,
  });
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const botonesPorPagina = 5;
  const [modalOpen, setModalOpen] = useState(false);
  const [type, setType] = useState("");
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState<Paciente>({
    id: 0,
    name: "",
    age: 0,
    symptoms: "",
  });

  const handleEdit = (paciente: Paciente) => {
    
    setPacienteSeleccionado(paciente);
    setType("edicion");
    setModalOpen(true);
  };

  const handleDelete = (paciente: Paciente) => {

    setPacienteSeleccionado(paciente);
    setType("eliminar");
    setModalOpen(true);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPaginaActual(1); // <-- aquí lo reiniciamos
  };

  const fetchPatients = async () => {
    setLoading(true);
    const patients = await getPatients(search, paginaActual);

    setLoading(false);
    setPatientsState(patients);
    setTotalPaginas(patients.last_page); // total de páginas
    // setPaginaActual(patients.current_page); // sincronizar la página actual
  };

  useEffect(() => {
    fetchPatients();
  }, [paginaActual, search]);

  return (
    <>
      <ToastContainer position="top-left" autoClose={2000} />
      <div className="mt-10">
        {(patientsState.data.length > 0 || search) && (
          <input
            type="text"
            placeholder="Buscar paciente, edad o síntoma"
            value={search}
            onChange={handleSearchChange}
            className="border px-3 w-1/3 py-2 rounded-md mb-10"
          />
        )}

        {patientsState.data.length > 0 ? (
          <>
            <PatientsTable
              pacientes={patientsState.data}
              paginaPrincipal={false}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
            <Paginador
              totalPaginas={totalPaginas}
              paginaActual={paginaActual}
              setPaginaActual={setPaginaActual}
              botonesPorPagina={botonesPorPagina}
            />
            <Modal
              type={type}
              paciente={pacienteSeleccionado}
              show={modalOpen}
              onClose={() => setModalOpen(false)}
              fetchPatients={fetchPatients}
            />
          </>
        ) : search ? (
          <p className="text-gray-500 text-center mt-10">
            No se encontraron coincidencias con "{search}"
          </p>
        ) : (
          <p className="text-gray-500 text-center mt-10">
            No hay pacientes que mostrar
          </p>
        )}
      </div>
    </>
  );
}
