import { useEffect, useState } from "react";
import Form from "../Components/Form";
import PatientsTable from "../Components/PatientsTable";
import { getPatientPrincipal } from "../services/PatientsServices";
import type { Pacientes } from "../types";
import Spinner from "../Components/Spinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function IndexPage() {
  const [patientsState, setPatientsState] = useState<Pacientes>([]);
  const [loading, setLoading] = useState(false);

  const fetchPatients = async () => {
    setLoading(true);
    const patients = await getPatientPrincipal();
    setPatientsState(patients);
    setLoading(false);
  };

  useEffect(() => {
    fetchPatients(); // llamada inicial
  }, []);

  // const handleEdit = (id: number) => {
  //   console.log("Editando el id ", id);
  // };

  // const handleDelete = (id: number) => {
  //   console.log("Eliminando el id ", id);
  // };

  return (
    <>
      <ToastContainer position="top-left" autoClose={2000} />
      <div className="flex flex-col md:flex-row md:justify-around items-center gap-5 mx-auto container px-5 mt-16">
        <Form fetchPatients={fetchPatients} />
        {loading ? (
          <Spinner />
        ) : patientsState.length > 0 ? (
          <PatientsTable
            pacientes={patientsState}
            paginaPrincipal={true}
            
          />
        ) : (
          <p>No hay pacientes que mostrar</p>
        )}
      </div>
    </>
  );
}
