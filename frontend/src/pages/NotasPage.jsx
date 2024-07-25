import { Layout } from '../components/Layout/DashboardLayout';
import NoteCardsContainer from '../components/NoteCardsContainer';

const materias = [
  { id_materia: 1, profesor: { nombre: 'Juan', apellido: 'Perez' }, nombre: 'Matematica', promedio: 8.5 },
  { id_materia: 2, profesor: { nombre: 'Ana', apellido: 'Gomez' }, nombre: 'Historia', promedio: 7.8 },
  { id_materia: 3, profesor: { nombre: 'Pedro', apellido: 'Lopez' }, nombre: 'Ingles', promedio: 7.2 },
];

export const NotasPage = () => {
  return (
    <>
      <h1 className="text-3xl py-5 mb-4 font-bold text-black dark:text-white transition-all">Notas</h1>
      <NoteCardsContainer materias={materias} />
    </>
  );
};