import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { LoadingSpinner } from "./LoadingSpinner";
import { API_URL } from "../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { toast } from "sonner";
import Swal from "sweetalert2"

export const UsuariosTable = () => {
  const { userData } = useAuth();
  const [usuarios, setUsuarios] = useState([]);
  const [loadingUsuarios, setLoadingUsuarios] = useState(false);
  
  const handleDelete = useCallback(async (id) => {
    const toastId = toast();
    try {
      toast.loading(`Eliminando usuario: ${id}`, {
        id: toastId
      });
      const response = await fetch(`${API_URL}/api/users/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      })
      const responseJSON = await response.json();
      if (responseJSON.success) {
        setUsuarios(usuarios.filter((user) => user._id != id))
        toast.success(`Se ha eliminado a ${responseJSON.data.nombre} exitosamente`, {
          id: toastId,
          duration: 2500
        });
      } else {
        toast.success(`No se ha podido eliminar el usuario, intenta nuevamente.`, {
          id: toastId,
          duration: 2500
        });
      }
    } catch {
      toast.success(`Ha ocurrido un error interno, intente nuevamente.`, {
        id: toastId,
        duration: 2500
      });
    }
  }, [usuarios])

  useEffect(() => {
    const getUsuarios = async () => {
      setLoadingUsuarios(true);
      try {
        const usersData = await fetch(`${API_URL}/api/users`, {
          method: "GET",
          credentials: "include",
        });
        const usersDataJSON = await usersData.json();

        if (usersDataJSON.success) {
          setUsuarios(usersDataJSON.data);
        }
      } catch {
        console.log("Failed to fetch user types");
      } finally {
        setLoadingUsuarios(false);
      }
    };
    getUsuarios();
  }, []);

  return (
    <>
      {loadingUsuarios && <LoadingSpinner loadMessage={"Cargando usuarios..."} />}
      {!loadingUsuarios && (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Nombre de usuario
                </th>
                <th scope="col" className="px-6 py-3">
                  Nombre
                </th>
                <th scope="col" className="px-6 py-3">
                  Apellido
                </th>
                <th scope="col" className="px-6 py-3">
                  Tipo
                </th>
                <th scope="col" className="px-6 py-3">
                  Correo
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
              {usuarios.length <= 0 ? (
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <td colSpan={7} className="px-6 py-4">
                    No se encontrarón usuarios
                  </td>
                </tr>
              ) : (
                usuarios.map((usuario, key) => {
                  if (usuario.username == userData.username) return;
                  return (
                    <tr key={key} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {usuario.username}
                      </th>
                      <td className="px-6 py-4">{usuario.nombre}</td>
                      <td className="px-6 py-4">{usuario.apellido}</td>
                      <td className="px-6 py-4">{usuario.user_type}</td>
                      <td className="px-6 py-4">{usuario.email}</td>
                      {usuario.is_active ? <td className="px-6 py-4 text-green-600">Activo</td> : <td className="px-6 py-4 text-red-600">Inactivo</td>}
                      <td className="px-6 py-4">
                        <Link to={usuario._id} title="Editar" className="text-lg text-gray-700 dark:text-gray-400 hover:text-gray-400 dark:hover:text-gray-600">
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </Link>

                        <button
                          onClick={() => {
                            Swal.fire({
                              title: `¿Estás seguro de borrar a ${usuario.nombre} ${usuario.apellido} del sistema?`,
                              text: "Esta acción es irreversible",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#d33",
                              cancelButtonColor: "#434343",
                              confirmButtonText: "Eliminar",
                              cancelButtonText: "Cancelar"
                            }).then((result) => {
                              if (result.isConfirmed) {
                                handleDelete(usuario._id)
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
      )}
    </>
  );
};
