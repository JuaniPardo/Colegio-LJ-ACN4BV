import { useCallback, useEffect, useState } from "react";
import { LoadingSpinner } from "./LoadingSpinner";
import { API_URL } from "../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export const CursosTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDelete = useCallback(
    async (id) => {
      const toastId = toast();
      try {
        toast.loading(`Eliminando usuario: ${id}`, {
          id: toastId,
        });
        const response = await fetch(`${API_URL}/api/courses/${id}`, {
          method: "DELETE",
          credentials: "include",
        });
        const responseJSON = await response.json();
        if (responseJSON.success) {
          setData(data.filter((user) => user._id != id));
          toast.success(`Se ha eliminado "${responseJSON.data.course_name}" exitosamente`, {
            id: toastId,
            duration: 2500,
          });
        } else {
          toast.success(`No se ha podido eliminar el curso, intenta nuevamente.`, {
            id: toastId,
            duration: 2500,
          });
        }
      } catch {
        toast.success(`Ha ocurrido un error interno, intente nuevamente.`, {
          id: toastId,
          duration: 2500,
        });
      }
    },
    [data]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/courses`, {
          method: "GET",
          credentials: "include",
        });
        const responseJSON = await response.json();
        if (responseJSON.success) {
          setData(responseJSON.data);
        }
      } catch {
        console.log("Failed to fetch courses");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {loading && <LoadingSpinner loadMessage={"Cargando cursos..."} />}
      {!loading && (
        <>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Nombre
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Descripción
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Profesores
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Alumnos
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Estado
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.length <= 0 ? (
                  <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td colSpan={6} className="px-6 py-4">
                      No se encontrarón cursos
                    </td>
                  </tr>
                ) : (
                  data.map((curso, key) => {
                    return (
                      <tr key={key} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {curso.course_name}
                        </th>
                        <td className="px-6 py-4">{curso.description}</td>
                        <td className="px-6 py-4">
                          {curso.professor_list.length}
                        </td>
                        <td className="px-6 py-4">{curso.user_list.length}</td>
                        {curso.is_active ? <td className="px-6 py-4 text-green-600">Activo</td> : <td className="px-6 py-4 text-red-600">Inactivo</td>}
                        <td className="px-6 py-4">
                          {/* TODO: EDIT CURSOS */}
                          <Link to={curso._id} title="Editar" className="text-lg text-gray-700 dark:text-gray-400 hover:text-gray-400 dark:hover:text-gray-600">
                          <FontAwesomeIcon icon={faListCheck} />
                        </Link>

                          <button
                            onClick={() => {
                              Swal.fire({
                                title: `¿Estás seguro de eliminar "${curso.course_name}" del sistema?`,
                                text: "Esta acción es irreversible",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#d33",
                                cancelButtonColor: "#434343",
                                confirmButtonText: "Eliminar",
                                cancelButtonText: "Cancelar",
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  handleDelete(curso._id);
                                }
                              });
                            }}
                            title="Eliminar"
                            className="text-lg ms-4 text-gray-700 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-600"
                          >
                            <FontAwesomeIcon icon={faTrashCan} />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};
