import { Link, useNavigate } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState} from "react";
import { toast } from 'sonner';
import { API_URL } from "../utils/constants";

export const CrearCursosPage = () => {
  const navigate = useNavigate()
  const [ form, setForm ] = useState({
    "course_name": null,
    "description": null,
    "img_url": null,
    "is_active": true
  })

  const handleOnChangeInput = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
  }, []);

  const createCourse = async (formObject) => {
    try {
      const response = await fetch(`${API_URL}/api/courses`, {
      method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formObject),
      });
      const responseJSON = await response.json();
      // CHECK RESPONSE CONTAINS ACCESS TOKEN
      if(responseJSON.success) {
        return [true, "Curso creado exitosamente"];
      } else {
        return [false, responseJSON.message];
      }

    } catch (err) {
      return [false, "Algo ha salido mal, intenta de nuevo. En caso de persistir contacta un administrador."];
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const toastId = toast();
    console.log(form)
    // Simular un login exitoso de admin
    toast.loading("Creando curso...", {
      id: toastId
    })

    const [createResult, createMessage] = await createCourse(form);
    
    if(createResult) {
      toast.success('Curso creado exitosamente.', {
        id: toastId,
        duration: 1000
      });
      navigate("../cursos")
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
        to={"../cursos"}
        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
      >
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="text-blue-600 dark:text-blue-500 hover:underline"
        />{" "}
        Volver a Cursos
      </Link>
      <h2 className="text-3xl py-5 font-bold text-black dark:text-white transition-all">
        Crear Curso
      </h2>
      <form onSubmit={handleSubmit}>
       
        <p className="block mb-5 text-sm font-medium text-gray-900 dark:text-white">
          Datos generales:
        </p>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="course_name"
              id="course_name"
              onChange={handleOnChangeInput}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="course_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Nombre del curso
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="description"
              id="description"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange={handleOnChangeInput}
              required
            />
            <label
              htmlFor="description"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Descripción del curso
            </label>
          </div>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="img_url"
            id="img_url"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            onChange={handleOnChangeInput}
            required
          />
          <label
            htmlFor="img_url"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            URL de imagen
          </label>
        </div>
        
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Crear Curso
        </button>
      </form>
    </>
  );
};
