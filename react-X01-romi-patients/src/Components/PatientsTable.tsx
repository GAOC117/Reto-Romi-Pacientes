import type { Pacientes, Paciente} from "../types";

type pacientesProps = {
  pacientes: Pacientes;
  paginaPrincipal: boolean;
  handleEdit?: (paciente: Paciente) => void;
  handleDelete?: (paciente: Paciente) => void;
};

export default function PatientsTable({
  pacientes,
  paginaPrincipal,
  handleEdit,
  handleDelete,
}: pacientesProps) {
  return (


    <div className={`overflow-x-auto flex-1 ${paginaPrincipal === true ? 'ps-50' : ''}`}>
       <table className="w-full text-sm text-center  text-slate-800 ">
        <thead className="text-xs text-white uppercase bg-slate-800">
          <tr className="">
            <th className="px-4 py-2 border border-black">Nombre</th>
            <th className="px-4 py-2 border border-black">Edad - años</th>
            <th className="px-4 py-2 border border-black">Síntomas</th>
            {!paginaPrincipal && <th className="px-4 py-2 border  border-black">Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {pacientes.map((paciente) => (
            <tr key={paciente.id} className="text-center text-black bg-white border-b border-gray-200 hover:bg-slate-300 transition-colors duration-300"
>
              <td className="px-4 py-2 border">{paciente.name}</td>
              <td className="px-4 py-2 border">{paciente.age}</td>
              <td className="px-4 py-2 border">{paciente.symptoms}</td>
              {!paginaPrincipal && (
                <td className="border space-x-2 py-2">
                  <button
                    className="cursor-pointer p-1 bg-blue-500 text-white rounded-4xl hover:bg-blue-600"
                    onClick={() => handleEdit?.(paciente)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </button>
                  <button
                    className="cursor-pointer p-1 bg-red-500 text-white rounded-4xl hover:bg-red-600"
                    onClick={() => handleDelete?.(paciente)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
