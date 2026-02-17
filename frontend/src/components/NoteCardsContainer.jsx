import React from 'react';
import NoteCard from './NoteCard';

const NoteCardsContainer = ({ materias }) => {
  return (
    <div className="flex flex-wrap">
      {materias.map(materia => (
        <NoteCard key={materia.id_materia} materia={materia} />
      ))}
    </div>
  );
};

export default NoteCardsContainer;