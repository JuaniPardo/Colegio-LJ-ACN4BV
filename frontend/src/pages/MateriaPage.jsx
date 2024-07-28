import { Layout } from "../components/Layout/DashboardLayout";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const materias = [
  {
    id_materia: 1,
    nombre: "Matematica",
    profesor: { nombre: "Juan", apellido: "Perez" },
    descripcion: "Matematica de Primer Año",
    notas: [8, 9, 7, 10],
  },
  {
    id_materia: 2,
    nombre: "Historia",
    profesor: { nombre: "Ana", apellido: "Gomez" },
    descripcion: "Descripción detallada de Historia",
    notas: [6, 8, 7, 9],
  },
  {
    id_materia: 3,
    nombre: "Inglés",
    profesor: { nombre: "Pedro", apellido: "Lopez" },
    descripcion: "Descripción detallada de Historia",
    notas: [6, 7, 7, 9],
  },
];

export const MateriaPage = () => {
  const { idMateria } = useParams();
  // const [materia, setMateria] = useState(null);

  // useEffect(() => {
  //   const materiaEncontrada = materias.find(m => m.id_materia === parseInt(idMateria));
  //   setMateria(materiaEncontrada);
  // }, [idMateria]);

  // if (!materia) {
  //   return <Layout><p className="text-center text-xl font-semibold">Cargando...</p></Layout>;
  // }

  // const promedio = materia.notas.reduce((a, b) => a + b, 0) / materia.notas.length;

  return (
    <>
      <h1 className="text-3xl py-5 mb-4 font-bold text-black dark:text-white transition-all">
        Mis Clases
      </h1>
      {idMateria}
    </>
  );

  // return (
  //   <div className="p-10">
  //     <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
  //       <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
  //         {materia.nombre}
  //       </h1>
  //       <p className="text-2xl text-gray-700 dark:text-gray-300 mb-2">{`Profesor: ${materia.profesor.nombre} ${materia.profesor.apellido}`}</p>
  //       <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
  //         {materia.descripcion}
  //       </p>
  //       <p className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
  //         Promedio:{" "}
  //         <span className="text-indigo-600 dark:text-indigo-400">
  //           {promedio.toFixed(2)}
  //         </span>
  //       </p>
  //       <div className="mt-6">
  //         <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
  //           Notas:
  //         </h2>
  //         <ul className="space-y-4">
  //           {materia.notas.map((nota, index) => (
  //             <li
  //               key={index}
  //               className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-700 rounded-md shadow-sm"
  //             >
  //               <span className="text-lg font-medium text-gray-900 dark:text-white">
  //                 Nota {index + 1}:
  //               </span>
  //               <span className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
  //                 {nota}
  //               </span>
  //             </li>
  //           ))}
  //         </ul>
  //       </div>
  //     </div>
  //   </div>
  // );
};
