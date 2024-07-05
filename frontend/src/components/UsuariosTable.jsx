import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const usuariosPrueba = [
    {
        id: 1,
        nombre: "Lucas",
        apellido: "Caraballo",
        usuario: "lcaraballo",
        tipo: "Estudiante",
        email: "lcaraballo@gmail.com",
        activo: true
    },
    {
        id: 2,
        nombre: "Juan Ignacio",
        apellido: "Pardo",
        usuario: "jpardo",
        tipo: "Docente",
        email: "jpardo@gmail.com",
        activo: false
    }
];

export const UsuariosTable = () => {

    const [ usuarios, setUsuarios ] = useState([]);
    
    const generarUsuarios = () => {
        return usuarios.map((usuario, key) => {
            return (
                <tr key={key} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {usuario.usuario}
                        </th>
                        <td className="px-6 py-4">
                            {usuario.nombre}
                        </td>
                        <td className="px-6 py-4">
                            {usuario.apellido}
                        </td>
                        <td className="px-6 py-4">
                            {usuario.tipo}
                        </td>
                        <td className="px-6 py-4">
                            {usuario.email}
                        </td>
                        {
                        (usuario.activo) ?
                        <td className="px-6 py-4 text-green-600">
                            Activo
                        </td>  
                        :
                        <td className="px-6 py-4 text-gray-600">
                            Inactivo
                        </td>
                        }
                        <td className="px-6 py-4">
                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit ID {usuario.id}</a>
                        </td>
                    </tr>
            )
        });
    }

    useEffect(() => {
        setUsuarios(usuariosPrueba);
    }, []);

    return <>
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
                    { generarUsuarios() }
                </tbody>
            </table>
        </div>
    </>

}