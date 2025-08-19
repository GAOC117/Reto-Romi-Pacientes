// import "bootstrap/dist/css/bootstrap.min.css";
import obtenerPaginasPaginacion from "../utils/usePaginacion";

type PaginadorProps ={
    
 totalPaginas: number,
  paginaActual: number,
  setPaginaActual: (pagina : number) => void,
  botonesPorPagina: number,
}

export default function Paginador({
  totalPaginas,
  paginaActual,
  setPaginaActual,
  botonesPorPagina,
}: PaginadorProps) {
  
  const { paginas } = obtenerPaginasPaginacion(
    paginaActual,
    totalPaginas,
    botonesPorPagina
  );
  return (
  
    <>
    
   <nav className="container mx-auto my-5">
  <ul className="flex justify-end space-x-1">

    {/* Botón anterior (comentado) */}
    {/* <li className={`${paginaActual === 1 ? "opacity-50 pointer-events-none" : ""}`}>
      <button
        className="px-3 py-1 border rounded hover:bg-gray-200"
        onClick={() => setPaginaActual(paginaActual - 1)}
      >
        &laquo;
      </button>
    </li> */}

    {paginaActual > 1 && (
      <li>
        <button
          className="px-3 py-1 border-1 border-blue-500 rounded hover:bg-gray-200"
          onClick={() => setPaginaActual(paginaActual - 1)}
        >
          &laquo;
        </button>
      </li>
    )}

    {paginas.map((pagina) => (
      <li key={pagina}>
        <button
          className={`px-3 py-1 border-1 border-blue-500 rounded hover:bg-gray-200 ${
            pagina === paginaActual ? "bg-blue-500 text-white" : ""
          }`}
          onClick={() => setPaginaActual(pagina)}
        >
          {pagina}
        </button>
      </li>
    ))}

    {/* Botón siguiente (comentado) */}
    {/* <li className={`${paginaActual === totalPaginas ? "opacity-50 pointer-events-none" : ""}`}>
      <button
        className="px-3 py-1 border rounded hover:bg-gray-200"
        onClick={() => setPaginaActual(paginaActual + 1)}
      >
        &raquo;
      </button>
    </li> */}

    {paginaActual < totalPaginas && (
      <li>
        <button
          className="px-3 py-1 border-1 border-blue-500 rounded hover:bg-gray-200"
          onClick={() => setPaginaActual(paginaActual + 1)}
        >
          &raquo;
        </button>
      </li>
    )}
  </ul>
</nav>

      
      
        <p className="text-end text-small pb-5">
        Mostrando página {paginaActual} de {totalPaginas} páginas
      </p>
        
      
      
    </>
  );
}
