import { Link, useNavigate, useParams } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { API_URL } from "../../utils/constants";
import { LoadingSpinner } from "../../components/LoadingSpinner";

export const EditCursoPage = () => {
  const { idCurso } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [form, setForm] = useState({});

  const handleOnChangeInput = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/courses/${idCurso}`, {
          method: "GET",
          credentials: "include",
        });
        const responseJSON = await response.json();

        if (responseJSON.success) {
          setData(responseJSON.data);
          setForm({
            course_name: responseJSON.data.course_name,
            description: responseJSON.data.description,
            user_list: responseJSON.data.user_list,
            professor_list: responseJSON.data.professor_list
          });
        } else {
          toast.error("El curso que intentas buscar no existe.");
          navigate(`../cursos`);
        }
      } catch {
        throw new Error("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [idCurso, navigate]);

  // const updateUser = async (formObject) => {
  //   try {
  //     const loginData = await fetch(`${API_URL}/api/users/${form.id}`, {
  //       method: "PUT",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       credentials: "include",
  //       body: JSON.stringify(formObject),
  //     });
  //     const loginDataJSON = await loginData.json();
  //     // CHECK RESPONSE CONTAINS ACCESS TOKEN
  //     if (loginDataJSON.success) {
  //       return [true, "Usuario creado exitosamente"];
  //     } else {
  //       return [false, loginDataJSON.message];
  //     }
  //   } catch (err) {
  //     return [false, "Algo ha salido mal, intenta de nuevo. En caso de persistir contacta un administrador."];
  //   }
  // };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const toastId = toast();
  //   // Simular un login exitoso de admin
  //   toast.loading("Actualizando usuario...", {
  //     id: toastId,
  //   });
  //   const [createResult, createMessage] = await updateUser(form);

  //   if (createResult) {
  //     toast.success(`${form.username} ha sido actualizado exitosamente.`, {
  //       id: toastId,
  //       duration: 2500,
  //     });
  //     navigate("../usuarios");
  //   } else {
  //     toast.error(createMessage, {
  //       id: toastId,
  //       duration: 2500,
  //     });
  //   }
  // };

  return (
    <>
      {loading && (
        <>
          <LoadingSpinner loadMessage={"Cargando curso..."} />
        </>
      )}
      {!loading && (
        <>
          <Link to={"../usuarios"} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
            <FontAwesomeIcon icon={faArrowLeft} className="text-blue-600 dark:text-blue-500 hover:underline" />
            Volver a Usuarios
          </Link>
          <h1 className="text-3xl py-5 font-bold text-black dark:text-white transition-all">{data.username}</h1>

          <form>
            
            {/* <label className="inline-flex items-center mb-5 cursor-pointer">
              <input type="checkbox" name="is_active" value={false} checked={form.is_active}  className="sr-only peer" onChange={() => {
                setForm({
                  ...form,
                  is_active: !form.is_active,
                });
              }} />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Activo</span>
            </label> */}
            <p className="block mb-5 text-sm font-medium text-gray-900 dark:text-white">Datos del curso:</p>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <input type="text" name="course_name" disabled id="course_name" onChange={handleOnChangeInput} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={form.course_name} required />
                <label htmlFor="course_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Nombre
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input type="text" name="description" disabled id="description" value={form.description} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " onChange={handleOnChangeInput} required />
                <label htmlFor="description" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Descripción
                </label>
              </div>
            </div>
          </form>
          
          <h2 className="text-3xl py-5 font-bold text-black dark:text-white transition-all">Estudiantes</h2>
          <h2 className="text-3xl py-5 font-bold text-black dark:text-white transition-all">Profesores</h2>
        </>
      )}
    </>
  );
};
