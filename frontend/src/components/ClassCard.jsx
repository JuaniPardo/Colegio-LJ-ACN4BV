import { useState } from "react"
import { Link } from "react-router-dom"

export const ClassCard = () => {

    const [materia, setMateria] = useState({
        id_materia: 1,
        profesor: {
            nombre: "Lucas",
            apellido: "Caraballo"
        },
        nombre: "matematica",
        descripcion: "Matematica de 1er año"
    });

    return <>
        <Link to={`/materia/` + materia.id_materia} className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 mb-4 p-2 hover:cursor-pointer">
            <div className=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:-translate-y-1 hover:shadow-md transition-all">
                <div className="w-full h-28">
                    <img className="rounded-t-lg w-full h-full object-cover" src="https://picsum.photos/200" alt="" />
                </div>
                <div className="p-5">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Matematica</h5>
                    <p className="mb-2 text-1l font-bold tracking-tight text-gray-900 dark:text-white">{`${materia.profesor.nombre} ${materia.profesor.apellido}` }</p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Descripción de la materia.</p>
                    <p className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Read more
                    </p>
                </div>
            </div>
        </Link>
    </>
}