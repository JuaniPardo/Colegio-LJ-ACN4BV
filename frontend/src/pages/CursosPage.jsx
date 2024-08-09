import { Link } from "react-router-dom";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CursosTable } from "../components/CursosTable";

export const CursosPage = () => {

  return (
    <>
      <h1 className="text-3xl py-5 mb-4 font-bold text-black dark:text-white transition-all">
        Gestionar Cursos
      </h1>
      <div className="my-5">
        <Link
          to={"crear"}
          className="text-white transition-all bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <FontAwesomeIcon
          icon={faPlusSquare}
          className="text-white hover:underline me-2"
        /> Crear Curso
        </Link>
      </div>

      <CursosTable />
    </>
  );
};
