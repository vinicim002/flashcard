import type { MateriaModel } from "@/models/MateriaModel";
import { useState } from "react";

export function useMaterias() {
  const [materias, setMaterias] = useState<MateriaModel[]>(() => {
    const materiasSalvas = localStorage.getItem("materias");
    return materiasSalvas ? JSON.parse(materiasSalvas) : [];
  });

  function handleAddMateria(newMateria: MateriaModel) {
    setMaterias((prevNewMateria) => [...prevNewMateria, newMateria]);
  }

  return {
    materias,
    handleAddMateria,
  };
}
