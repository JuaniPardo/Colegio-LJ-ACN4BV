import { Link, useNavigate } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState} from "react";
import { toast } from 'sonner';

export const CrearUsuarioPage = () => {
  const navigate = useNavigate()
  const [ userTypes, setUserTypes ] = useState(null)
  const [ usuarioForm, setUsuarioForm ] = useState({
    "username": null,
    "password": null,
    "confirmPassword": null,
    "nombre": null,
    "apellido": null,
    "email": null,
    "user_type": null
  })

  const handleOnChangeInput = (e) => {
    setUsuarioForm({
      ...usuarioForm,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    const getUserTypes = async () => {
      try {
        const userTypesData = await fetch("http://localhost:3000/api/users/types", {
          method: "GET",
          credentials: "include"
        })
        const userTypesDataJSON = await userTypesData.json()

        if(userTypesDataJSON.success) {
          setUserTypes(userTypesDataJSON.data)
        }
      } catch {
        console.log("Failed to fetch user types")
      }
    }
    getUserTypes()
  }, []);

  const createUser = async (formObject) => {
    try {
      const loginData = await fetch("http://localhost:3000/api/users/create", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formObject),
      });
      const loginDataJSON = await loginData.json();
      // CHECK RESPONSE CONTAINS ACCESS TOKEN
      if(loginDataJSON.success) {
        return [true, "Usuario creado exitosamente"];
      } else {
        return [false, loginDataJSON.message];
      }

    } catch (err) {
      return [false, "Algo ha salido mal, intenta de nuevo. En caso de persistir contacta un administrador."];
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const toastId = toast();
    // Simular un login exitoso de admin
    toast.loading("Creando usuario...", {
      id: toastId
    })

    const [createResult, createMessage] = await createUser(usuarioForm);
    
    if(createResult) {
      toast.success('Usuario creado exitosamente.', {
        id: toastId,
        duration: 1000
      });
      navigate("../usuarios")
    } else {
      toast.error(createMessage, {
        id: toastId,
        duration: 2000
      });
    }
  };

  return (
    <>
      <Link
        to={"../usuarios"}
        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
      >
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="text-blue-600 dark:text-blue-500 hover:underline"
        />{" "}
        Volver a Usuarios
      </Link>
      <h2 className="text-3xl py-5 font-bold text-black dark:text-white transition-all">
        Crear Usuario
      </h2>
      <form onSubmit={handleSubmit}>
        <label
          htmlFor="user_type"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Tipo de Usuario:
        </label>
        <select
          id="user_type"
          name="user_type"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 lg:w-1/3 mb-5"
          onChange={handleOnChangeInput}
        >
          <option disabled selected>Seleccionar tipo de usuario...</option>
          {userTypes && userTypes.map((userType, k) => {
            return (
              <option key={k} value={userType}>{userType.charAt(0).toUpperCase() + userType.slice(1)}</option>
            )
          })}
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
              onChange={handleOnChangeInput}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="nombre"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Nombre
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="apellido"
              id="apellido"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange={handleOnChangeInput}
              required
            />
            <label
              htmlFor="apellidos"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Apellido
            </label>
          </div>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="username"
            id="username"
            onChange={handleOnChangeInput}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=""
            required
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Nombre de usuario
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            id="email"
            onChange={handleOnChangeInput}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Dirección de email
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="password"
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            onChange={handleOnChangeInput}
            required
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Contraseña
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            onChange={handleOnChangeInput}
            required
          />
          <label
            htmlFor="confirmPassword"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Confirmar Contraseña
          </label>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Crear Usuario
        </button>
      </form>
    </>
  );
};
