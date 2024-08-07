import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { LoadingSpinner } from "./LoadingSpinner";

export const UsuariosTable = () => {
  const { userData } = useAuth();
  const [usuarios, setUsuarios] = useState([]);
  const [loadingUsuarios, setLoadingUsuarios] = useState(false);


  useEffect(() => {
    const getUsuarios = async () => {
      
      setLoadingUsuarios(true);
      try {
        const usersData = await fetch("http://localhost:3000/api/users", {
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
        setLoadingUsuarios(false)
      }
    };
    getUsuarios();
  }, []);

  return (
    <>
      {loadingUsuarios && (
        <LoadingSpinner loadMessage={"Cargando usuarios..."}/>
      )}
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
                        <Link to={usuario._id} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                          Editar
                        </Link>
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
