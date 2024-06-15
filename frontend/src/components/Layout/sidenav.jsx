import { useState } from "react";
import NavLinks from "./nav-links.jsx";
import { Link } from "react-router-dom";

export default function SideNav() {
  const [usuario, setUsuario] = useState({
    nombre: "Lucas",
    apellido: "Caraballo"
  })

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <a
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4"
        href="/"
      >
        <div className="text-white text-2xl font-bold">
          {`${usuario.nombre} ${usuario.apellido}`}
        </div>
      </a>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full rounded-md bg-gray-50 md:block"></div>
        <form className="grow">
          <Link to={ "/" } className="flex py-4 px-5 w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start">
            <div className="">Cerrar Sesión</div>
          </Link>
        </form>
      </div>
    </div>
  );
}
