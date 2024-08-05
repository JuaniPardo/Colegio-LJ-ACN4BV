import { Link } from "react-router-dom";
import { UsuariosTable } from "../components/UsuariosTable";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const UsuariosPage = () => {

  return (
    <>
      <h1 className="text-3xl py-5 mb-4 font-bold text-black dark:text-white transition-all">
        Usuarios
      </h1>
      <div className="my-5">
        <Link
          to={"crear"}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <FontAwesomeIcon
          icon={faUserPlus}
          className="text-white hover:underline"
        /> Crear Usuario
        </Link>
      </div>

      <UsuariosTable />
    </>
  );
};
