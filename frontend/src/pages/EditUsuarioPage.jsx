import { Link, Navigate, redirect, useParams } from "react-router-dom";
import { Layout } from "../components/Layout/DashboardLayout";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export const EditUsuarioPage = () => {
  const { idUsuario } = useParams();

  const [usuario, setUsuario] = useState({});
  const [nombre, setNombre] = useState("Lucas");

  useEffect(() => {
    setUsuario({
      id: 1,
      nombre: "Lucas",
      apellido: "Caraballo",
      usuario: "lcaraballo",
      tipo: "Estudiante",
      email: "lcaraballo@gmail.com",
      celular: "1157469384",
      activo: true,
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Datos guardados exitosamente",
      icon: "success",
      showCloseButton: false,
    });
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    let deletedUser = false;
    Swal.fire({
        title: `¿Estás seguro de borrar a <b>${usuario.nombre} ${usuario.apellido}</b>?`,
        text: "Este usuario dejará de existir para siempre en tu sistema",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "No, Cancelar",
        confirmButtonText: "Si, borrar"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Eliminado!",
            text: `${usuario.nombre} ${usuario.apellido} ha sido borrado exitosamente del sistema`,
            icon: "success"
          })
        }
    })
  };

  return (
    <Layout>
      <Link
        to={"/usuarios"}
        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
      >
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="text-blue-600 dark:text-blue-500 hover:underline"
        />
        Volver a Usuarios
      </Link>
      <h1 className="text-3xl py-5 font-bold text-black dark:text-white transition-all">
        Usuario: {idUsuario}
      </h1>

      <form onSubmit={handleSubmit}>
        <label
          for="tipo"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Tipo de Usuario:
        </label>
        <select
          id="tipo"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 lg:w-1/3 mb-5"
        >
          <option value={1}>Estudiante</option>
          <option value={2}>Administrador</option>
          <option value={3}>Profesor</option>
        </select>
        <p className="block mb-5 text-sm font-medium text-gray-900 dark:text-white">
          Datos Personales:
        </p>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="nombre"
              id="nombre"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={nombre}
              required
            />
            <label
              for="nombre"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Nombre
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="apellidos"
              id="apellidos"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={usuario.apellido}
              required
            />
            <label
              for="apellidos"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Apellido
            </label>
          </div>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={usuario.email}
            required
          />
          <label
            for="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Dirección de email
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="tel"
            name="telefono"
            id="telefono"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={usuario.celular}
            required
          />
          <label
            for="telefono"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Telefono / Celular
          </label>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Guardar
        </button>
      </form>
      <button
        type="button"
        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 mt-4 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        onClick={handleDelete}
      >
        Eliminar Usuario
      </button>
    </Layout>
  );
};
