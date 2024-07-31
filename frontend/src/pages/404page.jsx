import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export const Page404 = () => {

  return (
    <div className="flex flex-col justify-center h-screen items-center gap-4 p-4">
      <p className="text-2xl font-semibold">
        <span className="text-blue-500">¡404!</span> Oh no... la pagina que es estás buscando no existe.
      </p>  
      <Link to={"/dashboard"} className="text-blue-500 hover:underline underline-offset-4" ><FontAwesomeIcon icon={faArrowLeft} ></FontAwesomeIcon> Volver a la página principal</Link>
    </div>
  );
};
