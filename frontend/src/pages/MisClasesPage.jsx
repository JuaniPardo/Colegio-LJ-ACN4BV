import { useEffect, useState } from "react";
import { ClassCard } from "../components/ClassCard";
import { API_URL } from "../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faSadCry } from "@fortawesome/free-regular-svg-icons";
import { LoadingSpinner } from "../components/LoadingSpinner";

export const MisClasesPage = () => {
  const [clases, setClases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchClases = async () => {
      try {
        const response = await fetch(`${API_URL}/api/user-courses`, {
          method: "GET",
          credentials: "include",
        });
        const responseJSON = await response.json();
        if (responseJSON.success) {
          setClases(responseJSON.data);
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchClases();
  });

  return (
    <>
      <h1 className="text-3xl py-5 mb-4 font-bold text-black dark:text-white transition-all">Mis Clases</h1>
      {loading && <LoadingSpinner loadMessage={"Cargando clases del alumno..."} />}
      {!loading && (
        <div className="flex flex-wrap">
          {error && (
            <div className="flex flex-col text-gray-400 dark:text-gray-500 justify-center py-20 items-center md:h-5/6 w-full">
              <FontAwesomeIcon icon={faSadCry} className="opacity-100 text-6xl" />
              <p className="text-1xl md:text-2xl text-center py-5 md:px-40 opacity-100">Algo ha salido mal al cargar la información. Intenta de nuevo y en caso de que persista el error, contacta un administrador.</p>
            </div>
          )}
          {!error && (
            <>
              {clases.length > 0 ? (
                clases.map((clase) => <ClassCard key={clase._id} titulo={clase.course_name} descripcion={clase.description} imgURL={clase.img_url} />)
              ) : (
                <div className="flex flex-col text-gray-400 dark:text-gray-500 justify-center py-20 items-center md:h-5/6 w-full">
                  <FontAwesomeIcon icon={faBookmark} className="opacity-100 text-6xl" />
                  <p className="text-1xl md:text-2xl text-center py-5 md:px-40 opacity-100">Al parecer no tienes ninguna clase asignada de momento.</p>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};
