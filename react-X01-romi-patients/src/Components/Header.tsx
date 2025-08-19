import { NavLink } from "react-router-dom"; //con NavLink  hereda todo lo de Link pero podemos agregarle ademas estilos como en el caso de abajo con condicionales

export default function Header() {
  return (
    <>
      <header className="bg-slate-800">
        <div className="mx-auto container px-5 py-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-10">
              <div>
                <NavLink to="/">
                  <img
                    src="/X01.png"
                    alt="logotipo"
                    className="w-25 bg-transparent"
                  />
                </NavLink>
              </div>
              <h1 className="text-white text-3xl">X01 ROMI Pacientes</h1>
            </div>
            <nav className="text-white uppercase font-bold flex gap-4">
              <NavLink
                to="/"
                className=  {({ isActive }) =>
                  isActive ? "rounded-4xl text-blue-500 font-bold text-lg transition-transform duration-200 hover:scale-110" : "text-white font-bold text-lg transition-transform duration-200 hover:scale-110"
                
              
              }
              >
                Inicio
              </NavLink>
              <NavLink
                to="/patients"
                className={({ isActive }) =>
                  isActive ? "text-blue-500 font-bold text-lg transition-transform duration-200 hover:scale-110" : "text-white font-bold text-lg transition-transform duration-200 hover:scale-110"
                }
              >
                Pacientes
              </NavLink>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
